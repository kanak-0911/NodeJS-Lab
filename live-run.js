const { execFile } = require("child_process");

const labFiles = {
    "01": ["app.js", "server.js"],
    "02": ["server.js"],
    "03": ["students-server.js"],
    "04": ["advanced-server.js"],
    "05": [
        "async-await-version.js",
        "callback-version.js",
        "chaining-version.js",
        "concurrent-orders.js",
        "promise-version.js"
    ],
    "06": [
        "add-note.js",
        "append-file.js",
        "async-await-version.js",
        "delete-file.js",
        "read-async.js",
        "read-notes.js",
        "read-sync.js",
        "write-file.js"
    ],
    "07": [
        "error-handling-fixed.js",
        "error-handling.js",
        "events-basic.js",
        "multiple-listeners.js",
        "notify-student.js",
        "once-only-listener.js",
        "order-tracker.js"
    ]
};

function runLabProgram(lab, file, callback) {
    execFile(
        "node",
        [file],
        {
            cwd: `Lab-${lab}`,
            timeout: 5000
        },
        (error, stdout, stderr) => {
            callback({
                success: !error,
                output: stdout,
                error: stderr || (error ? error.message : null)
            });
        }
    );
}

function liveRunHTML(selectedLab) {
    if (!selectedLab || !labFiles[selectedLab]) {
    return "";
    }
    
    const files = labFiles[selectedLab];
    
    return `
        <div class="live-run-box">
            <h2>Live Program Output</h2>
    
            <div id="liveFiles-${selectedLab}"></div>
        </div>
    
        <script>
            (function() {
                const lab = ${JSON.stringify(selectedLab)};
                const files = ${JSON.stringify(files)};
                const container =
                    document.getElementById("liveFiles-" + lab);
    
                if (!container) return;
    
                files.forEach(function(file) {
                    const button = document.createElement("button");
    
                    button.className = "button";
                    button.textContent = "Run " + file;
    
                    button.onclick = function() {
                        runLab(lab, file);
                    };
    
                    container.appendChild(button);
    
                    const output = document.createElement("pre");
    
                    output.id =
                        "output-" +
                        lab +
                        "-" +
                        file.replace(/[^a-zA-Z0-9]/g, "");
    
                    output.textContent = "Click Run to execute " + file;
                    container.appendChild(output);
                });
    
                async function runLab(lab, file) {
                    const id =
                        "output-" +
                        lab +
                        "-" +
                        file.replace(/[^a-zA-Z0-9]/g, "");
    
                    const output = document.getElementById(id);
                    output.textContent = "Running...";
    
                    try {
                        const response = await fetch(
                            "/labs/" + lab + "/run?file=" +
                            encodeURIComponent(file)
                        );
    
                        const data = await response.json();
    
                        if (data.url) {
                            output.textContent =
                                (data.output || "") +
                                String.fromCharCode(10, 10);
    
                            const link = document.createElement("a");
                            link.href = data.url;
                            link.target = "_blank";
                            link.rel = "noopener";
                            link.textContent = "Open Lab Server";
                            output.appendChild(link);
                        } else if (data.output) {
                            output.textContent = data.output;
                        } else if (data.error) {
                            output.textContent = data.error;
                        } else {
                            output.textContent =
                                "Program completed with no output.";
                        }
                    } catch (error) {
                        output.textContent = "Error: " + error.message;
                    }
                }
            })();
        </script>
      `;
}

module.exports = {
    runLabProgram,
    liveRunHTML
};



