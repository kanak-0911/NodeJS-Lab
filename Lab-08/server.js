const http = require("http");
const fs = require("fs");
const fsp = require("fs").promises;
const path = require("path");
const { execFile } = require("child_process");
const labs = require("./labs");
const logger = require("./modules/logger");

const PORT = process.env.PORT || 3000;
const HOST = "0.0.0.0";

const ROOT_DIR = path.join(__dirname, "..");
const SCREENSHOT_DIR = path.join(__dirname, "public", "screenshots");
const LOG_FILE = path.join(__dirname, "logs", "server.log");

function send(res, status, data, contentType = "application/json") {
    res.writeHead(status, {
        "Content-Type": contentType
    });

    if (contentType === "application/json") {
        res.end(JSON.stringify(data, null, 2));
    } else {
        res.end(data);
    }
}

function escapeHtml(text) {
    return String(text)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

function getLab(id) {
    return labs.find(lab => lab.id === id);
}

function getLabFilePath(lab, fileName) {
    return path.join(ROOT_DIR, lab.folder, fileName);
}

async function handleRequest(req, res) {
    const parsedUrl = new URL(req.url, `http://${req.headers.host || "localhost"}`);
    const pathname = parsedUrl.pathname;

    logger.logRequest(`${req.method} ${req.url}`);

    // GET /
    if (req.method === "GET" && pathname === "/") {
        const studentName = process.env.STUDENT_NAME || "Kanak";

        const labLinks = labs.map(lab => `
            <li>
                <a href="/labs/${lab.id}">
                    Lab ${lab.id} - ${escapeHtml(lab.title)}
                </a>
            </li>
        `).join("");

        const html = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Node.js Lab 08 Portal</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background: #f4f7fb;
            color: #1f2937;
            padding: 40px;
        }

        .container {
            max-width: 900px;
            margin: auto;
            background: white;
            padding: 35px;
            border-radius: 15px;
            box-shadow: 0 8px 25px rgba(0,0,0,0.08);
        }

        h1 {
            color: #2563eb;
        }

        a {
            color: #2563eb;
            text-decoration: none;
        }

        li {
            margin: 12px 0;
        }

        .links {
            margin-top: 25px;
        }

        .info {
            background: #eff6ff;
            padding: 15px;
            border-radius: 10px;
            margin-top: 20px;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Node.js Lab Portfolio</h1>

        <p>
            Integrated server for Lab 01 to Lab 07.
        </p>

        <div class="info">
            <strong>Student:</strong> ${escapeHtml(studentName)}<br>
            <strong>Environment:</strong> ${escapeHtml(process.env.NODE_ENV || "development")}<br>
            <strong>Node Version:</strong> ${escapeHtml(process.version)}
        </div>

        <div class="links">
            <h2>Available Labs</h2>
            <ul>
                ${labLinks}
            </ul>

            <p><a href="/about">About</a></p>
            <p><a href="/health">Health</a></p>
            <p><a href="/labs">All Labs JSON</a></p>
            <p><a href="/api/dashboard">Dashboard API</a></p>
        </div>
    </div>
</body>
</html>
        `;

        return send(res, 200, html, "text/html");
    }

    // GET /about
    if (req.method === "GET" && pathname === "/about") {
        return send(res, 200, {
            project: "Integrated Node.js Lab Server",
            labs: "Lab 01 to Lab 07",
            student: process.env.STUDENT_NAME || "Kanak",
            nodeVersion: process.version
        });
    }

    // GET /health
    if (req.method === "GET" && pathname === "/health") {
        return send(res, 200, {
            status: "ok",
            uptime: process.uptime(),
            timestamp: new Date().toISOString()
        });
    }

    // GET /labs
    if (req.method === "GET" && pathname === "/labs") {
        return send(res, 200, labs);
    }

    // GET /labs/:id/run
    const runMatch = pathname.match(/^\/labs\/([^/]+)\/run$/);

    if (req.method === "GET" && runMatch) {
        const lab = getLab(runMatch[1]);

        if (!lab) {
            return send(res, 404, {
                error: "Lab not found"
            });
        }

        if (lab.type !== "script") {
            return send(res, 400, {
                error: "This lab is a server lab and cannot be run as a script."
            });
        }

        const fileName = parsedUrl.searchParams.get("file");

        if (!fileName || !lab.files.includes(fileName)) {
            return send(res, 400, {
                error: "Invalid or missing file. Only listed lab files can be executed.",
                allowedFiles: lab.files
            });
        }

        const filePath = getLabFilePath(lab, fileName);

        return new Promise(resolve => {
            execFile(
                process.execPath,
                [filePath],
                {
                    timeout: 10000,
                    cwd: path.dirname(filePath)
                },
                (error, stdout, stderr) => {
                    send(res, 200, {
                        ok: !error,
                        file: fileName,
                        output: stdout,
                        error: stderr || (error ? error.message : "")
                    });

                    resolve();
                }
            );
        });
    }

    // GET /labs/:id/app/...
    const appMatch = pathname.match(/^\/labs\/([^/]+)\/app(\/.*)?$/);

    if (req.method === "GET" && appMatch) {
        const lab = getLab(appMatch[1]);

        if (!lab) {
            return send(res, 404, {
                error: "Lab not found"
            });
        }

        if (lab.type !== "server") {
            return send(res, 400, {
                error: "This lab is not a server lab."
            });
        }

        const serverFile = getLabFilePath(lab, lab.entry);

        if (!lab.files.includes(lab.entry)) {
            return send(res, 403, {
                error: "Server file is not allowed."
            });
        }

        try {
            const handler = require(serverFile);

            if (typeof handler !== "function") {
                return send(res, 500, {
                    error: "Lab server does not export a handler."
                });
            }

            const originalUrl = req.url;
            const appPath = appMatch[2] || "/";

            req.url = appPath + (parsedUrl.search || "");

            handler(req, res);

            req.url = originalUrl;

            return;
        } catch (error) {
            return send(res, 500, {
                error: "Unable to run lab server.",
                message: error.message
            });
        }
    }

    // GET /labs/:id
    const labMatch = pathname.match(/^\/labs\/([^/]+)$/);

    if (req.method === "GET" && labMatch) {
        const lab = getLab(labMatch[1]);

        if (!lab) {
            return send(res, 404, {
                error: "Lab not found"
            });
        }

        const sourceFiles = [];

        for (const fileName of lab.files) {
            try {
                const filePath = getLabFilePath(lab, fileName);
                const source = await fsp.readFile(filePath, "utf8");

                sourceFiles.push({
                    file: fileName,
                    source
                });
            } catch (error) {
                sourceFiles.push({
                    file: fileName,
                    source: `Unable to read file: ${error.message}`
                });
            }
        }

        let screenshots = [];

        try {
            const screenshotFiles = await fsp.readdir(SCREENSHOT_DIR);

            screenshots = screenshotFiles.filter(file => {
                const lowerFile = file.toLowerCase();
            
                const isImage =
                    lowerFile.endsWith(".png") ||
                    lowerFile.endsWith(".jpg") ||
                    lowerFile.endsWith(".jpeg");
            
                const labPrefix = `lab${lab.id.toLowerCase()}-`;
            
                return isImage && lowerFile.startsWith(labPrefix);
            });
        } catch {
            screenshots = [];
        }

        const sourceHtml = sourceFiles.map(item => `
            <h3>${escapeHtml(item.file)}</h3>
            <pre><code>${escapeHtml(item.source)}</code></pre>
        `).join("");

        const screenshotHtml = screenshots.length
            ? screenshots.map(file =>
                `<li><a href="/screenshots/${encodeURIComponent(file)}">${escapeHtml(file)}</a></li>`
            ).join("")
            : "<li>No screenshots added yet.</li>";

        const html = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Lab ${escapeHtml(lab.id)} - ${escapeHtml(lab.title)}</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background: #f4f7fb;
            padding: 30px;
            color: #1f2937;
        }

        .container {
            max-width: 1100px;
            margin: auto;
        }

        .box {
            background: white;
            padding: 25px;
            margin-bottom: 20px;
            border-radius: 12px;
            box-shadow: 0 5px 18px rgba(0,0,0,0.08);
        }

        pre {
            background: #111827;
            color: #f9fafb;
            padding: 18px;
            overflow-x: auto;
            border-radius: 8px;
        }

        a {
            color: #2563eb;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="box">
            <h1>Lab ${escapeHtml(lab.id)} - ${escapeHtml(lab.title)}</h1>
            <p>${escapeHtml(lab.description)}</p>
            <p><strong>Type:</strong> ${escapeHtml(lab.type)}</p>
        </div>

        <div class="box">
            <h2>Source Code</h2>
            ${sourceHtml}
        </div>

        <div class="box">
            <h2>Screenshots</h2>
            <ul>
                ${screenshotHtml}
            </ul>
        </div>

        <div class="box">
            <a href="/">← Back to Portal</a>
        </div>
    </div>
</body>
</html>
        `;

        return send(res, 200, html, "text/html");
    }

    // GET /screenshots/:name
    const screenshotMatch = pathname.match(/^\/screenshots\/(.+)$/);

    if (req.method === "GET" && screenshotMatch) {
        const fileName = path.basename(decodeURIComponent(screenshotMatch[1]));

        if (!/\.(png|jpg|jpeg)$/i.test(fileName)) {
            return send(res, 400, {
                error: "Only image files are allowed."
            });
        }

        const filePath = path.join(SCREENSHOT_DIR, fileName);

        try {
            const image = await fsp.readFile(filePath);

            const extension = path.extname(fileName).toLowerCase();

            const contentType =
                extension === ".png"
                    ? "image/png"
                    : "image/jpeg";

            res.writeHead(200, {
                "Content-Type": contentType
            });

            return res.end(image);
        } catch {
            return send(res, 404, {
                error: "Screenshot not found"
            });
        }
    }

    // GET /api/dashboard
    if (req.method === "GET" && pathname === "/api/dashboard") {
        let logContent = "";
        let screenshotCount = 0;

        try {
            logContent = await fsp.readFile(LOG_FILE, "utf8");
        } catch {
            logContent = "";
        }

        try {
            const files = await fsp.readdir(SCREENSHOT_DIR);

            screenshotCount = files.filter(file =>
                /\.(png|jpg|jpeg)$/i.test(file)
            ).length;
        } catch {
            screenshotCount = 0;
        }

        return send(res, 200, {
            totalLabs: labs.length,
            serverLabs: labs.filter(lab => lab.type === "server").length,
            scriptLabs: labs.filter(lab => lab.type === "script").length,
            screenshotCount,
            logLines: logContent
                ? logContent.trim().split("\n").length
                : 0
        });
    }

    // 404
    return send(res, 404, {
        error: "Route not found",
        path: pathname
    });
}

const server = http.createServer((req, res) => {
    Promise.resolve(handleRequest(req, res))
        .catch(error => {
            console.error("Unexpected server error:", error);

            if (!res.headersSent) {
                send(res, 500, {
                    error: "Internal Server Error"
                });
            }
        });
});

server.listen(PORT, HOST, () => {
    console.log(`Lab 08 integrated server running at http://localhost:${PORT}`);
});