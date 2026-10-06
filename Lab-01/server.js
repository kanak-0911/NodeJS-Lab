const http = require("http");

const labs = [
    {
        number: "01",
        title: "Node.js HTTP Server",
        task: "Creating a basic HTTP server using Node.js",
        description:
            "Created a basic HTTP server and worked with different routes to return webpages and JSON responses.",
        concepts: ["HTTP Server", "Routing", "Request & Response", "JSON"],
        status: "Completed"
    },
    {
        number: "02",
        title: "Node.js Fundamentals",
        task: "Understanding Node.js fundamentals and core concepts",
        description:
            "Worked with the basic concepts of Node.js and understood how Node.js applications work.",
        concepts: ["Node.js", "Modules", "Core Concepts"],
        status: "Completed"
    },
    {
        number: "03",
        title: "Student Directory",
        task: "Creating and working with student data and routes",
        description:
            "Created a student directory containing student information and implemented routes for accessing student data.",
        concepts: ["Routes", "Arrays", "Objects", "Query Parameters"],
        status: "Completed"
    },
    {
        number: "04",
        title: "Node.js Modules",
        task: "Working with Node.js built-in modules",
        description:
            "Worked with Node.js modules and understood how built-in modules are used in applications.",
        concepts: ["Modules", "Core Modules", "Require"],
        status: "Completed"
    },
    {
        number: "05",
        title: "Food Delivery Tracker",
        task: "Working with asynchronous programming",
        description:
            "Created a Food Delivery Tracker using callbacks, promises, promise chaining, async-await and concurrent orders.",
        concepts: ["Callbacks", "Promises", "Async/Await", "Concurrency"],
        status: "Completed"
    },
    {
        number: "06",
        title: "File System Module",
        task: "Working with the File System (fs) module",
        description:
            "Worked with file handling operations including reading, writing, appending and deleting files using Node.js.",
        concepts: ["fs Module", "Read File", "Write File", "Append File", "Delete File"],
        status: "Completed"
    }
];

function handler(req, res) {

    if (req.url === "/") {

        let labCards = "";

        labs.forEach((lab) => {

            let conceptTags = "";

            lab.concepts.forEach((concept) => {
                conceptTags += `<span class="tag">${concept}</span>`;
            });

            labCards += `
                <div class="lab-card">

                    <div class="lab-number">
                        LAB ${lab.number}
                    </div>

                    <div class="lab-content">

                        <div class="card-top">
                            <h2>${lab.title}</h2>
                            <span class="status">${lab.status}</span>
                        </div>

                        <p class="task">
                            <strong>Task:</strong> ${lab.task}
                        </p>

                        <p class="description">
                            ${lab.description}
                        </p>

                        <div class="tags">
                            ${conceptTags}
                        </div>

                        <a class="view-button" href="/lab/${lab.number}">
                            View Lab Details →
                        </a>

                    </div>

                </div>
            `;
        });

        const webpage = `
<!DOCTYPE html>
<html lang="en">

<head>

    <meta charset="UTF-8">

    <meta name="viewport"
          content="width=device-width, initial-scale=1.0">

    <title>Node.js Lab Portfolio</title>

    <style>

        * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
        }

        body {
            font-family: Arial, sans-serif;
            background: #f4f7fb;
            color: #1f2937;
        }

        .hero {
            background: linear-gradient(135deg, #111827, #2563eb);
            color: white;
            padding: 65px 20px;
            text-align: center;
        }

        .hero h1 {
            font-size: 42px;
            margin-bottom: 15px;
        }

        .hero p {
            font-size: 17px;
            opacity: 0.9;
            max-width: 700px;
            margin: auto;
            line-height: 1.6;
        }

        .container {
            max-width: 1100px;
            margin: 45px auto;
            padding: 0 20px;
        }

        .intro {
            text-align: center;
            margin-bottom: 35px;
        }

        .intro h2 {
            font-size: 28px;
            margin-bottom: 10px;
        }

        .intro p {
            color: #6b7280;
        }

        .lab-card {
            background: white;
            border-radius: 16px;
            margin-bottom: 22px;
            display: flex;
            overflow: hidden;
            box-shadow: 0 8px 25px rgba(0,0,0,0.08);
            transition: 0.25s;
        }

        .lab-card:hover {
            transform: translateY(-4px);
            box-shadow: 0 12px 30px rgba(0,0,0,0.12);
        }

        .lab-number {
            width: 125px;
            min-width: 125px;
            background: #2563eb;
            color: white;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 20px;
            font-weight: bold;
        }

        .lab-content {
            padding: 25px;
            width: 100%;
        }

        .card-top {
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: 15px;
            margin-bottom: 15px;
        }

        .card-top h2 {
            font-size: 23px;
        }

        .status {
            background: #dcfce7;
            color: #166534;
            padding: 6px 12px;
            border-radius: 20px;
            font-size: 13px;
            font-weight: bold;
        }

        .task {
            margin-bottom: 10px;
            color: #374151;
        }

        .description {
            color: #6b7280;
            line-height: 1.6;
            margin-bottom: 18px;
        }

        .tags {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
            margin-bottom: 20px;
        }

        .tag {
            background: #eff6ff;
            color: #1d4ed8;
            padding: 6px 10px;
            border-radius: 8px;
            font-size: 13px;
        }

        .view-button {
            display: inline-block;
            text-decoration: none;
            background: #111827;
            color: white;
            padding: 10px 17px;
            border-radius: 8px;
            font-size: 14px;
            font-weight: bold;
        }

        .view-button:hover {
            background: #2563eb;
        }

        footer {
            text-align: center;
            padding: 30px;
            color: #6b7280;
            font-size: 14px;
        }

        @media (max-width: 650px) {

            .hero h1 {
                font-size: 30px;
            }

            .lab-card {
                flex-direction: column;
            }

            .lab-number {
                width: 100%;
                height: 65px;
            }

            .card-top {
                align-items: flex-start;
                flex-direction: column;
            }

        }

    </style>

</head>

<body>

    <section class="hero">

        <h1>Node.js Lab Portfolio</h1>

        <p>
            A central dashboard containing my Node.js laboratory
            work, tasks, concepts and practical implementations.
        </p>

    </section>

    <main class="container">

        <div class="intro">

            <h2>My Lab Work</h2>

            <p>
                Explore the tasks and concepts covered in each laboratory.
            </p>

        </div>

        ${labCards}

    </main>

    <footer>

        BCA Semester VII • Node.js Laboratory • Kanak

    </footer>

</body>

</html>
        `;

        res.writeHead(200, {
            "Content-Type": "text/html"
        });

        res.end(webpage);

        return;
    }

    if (req.url.startsWith("/lab/")) {

        const labNumber = req.url.split("/")[2];

        const lab = labs.find(
            item => item.number === labNumber
        );

        if (!lab) {

            res.writeHead(404, {
                "Content-Type": "text/html"
            });

            res.end("<h1>Lab Not Found</h1>");

            return;
        }

        res.writeHead(200, {
            "Content-Type": "text/html"
        });

        res.end(`
            <html>

            <head>

                <title>${lab.title}</title>

                <style>

                    body {
                        font-family: Arial, sans-serif;
                        background: #f4f7fb;
                        padding: 40px;
                        color: #1f2937;
                    }

                    .box {
                        max-width: 800px;
                        margin: auto;
                        background: white;
                        padding: 35px;
                        border-radius: 15px;
                        box-shadow: 0 8px 25px rgba(0,0,0,0.08);
                    }

                    h1 {
                        color: #2563eb;
                    }

                    p {
                        line-height: 1.7;
                    }

                    .back {
                        display: inline-block;
                        margin-top: 25px;
                        background: #111827;
                        color: white;
                        padding: 10px 16px;
                        text-decoration: none;
                        border-radius: 8px;
                    }

                </style>

            </head>

            <body>

                <div class="box">

                    <h1>Lab ${lab.number} - ${lab.title}</h1>

                    <br>

                    <p>
                        <strong>Task:</strong><br>
                        ${lab.task}
                    </p>

                    <br>

                    <p>
                        <strong>What I Did:</strong><br>
                        ${lab.description}
                    </p>

                    <br>

                    <p>
                        <strong>Concepts Used:</strong><br>
                        ${lab.concepts.join(", ")}
                    </p>

                    <a class="back" href="/">
                        ← Back to Dashboard
                    </a>

                </div>

            </body>

            </html>
        `);

        return;
    }

    res.writeHead(404, {
        "Content-Type": "text/html"
    });

    res.end(`
        <h1>404 - Page Not Found</h1>
        <p>The requested page does not exist.</p>
    `);

}

module.exports = handler;

if (require.main === module) {
    http.createServer(handler).listen(3000, () => {
        console.log("Main Lab Dashboard running at http://localhost:3000");
    });
}