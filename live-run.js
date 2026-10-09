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

function liveRunHTML() {
    return `
        <div class="live-run-box">
            <h2>Live Program Output</h2>

            <select id="liveLabSelect" onchange="loadLabFiles()">
                <option value="">Select Lab</option>
                <option value="01">Lab 01</option>
                <option value="02">Lab 02</option>
                <option value="03">Lab 03</option>
                <option value="04">Lab 04</option>
                <option value="05">Lab 05</option>
                <option value="06">Lab 06</option>
                <option value="07">Lab 07</option>
            </select>

            <div id="liveFiles"></div>
        </div>

        <script>
            const labFiles = ${JSON.stringify(labFiles)};

            function loadLabFiles() {
                const lab =
                    document.getElementById("liveLabSelect").value;

                const container =
                    document.getElementById("liveFiles");

                container.innerHTML = "";

                if (!lab) return;

                labFiles[lab].forEach(function(file) {

                    const button =
                        document.createElement("button");

                    button.className = "button";
                    button.textContent = "Run " + file;

                    button.onclick = function() {
                        runLab(lab, file);
                    };

                    container.appendChild(button);

                    const output =
                        document.createElement("pre");

                    output.id =
                        "output-" +
                        lab +
                        "-" +
                        file.replace(/[^a-zA-Z0-9]/g, "");

                    output.textContent =
                        "Click Run to execute " + file;

                    container.appendChild(output);
                });
            }

            async function runLab(lab, file) {

                const id =
                    "output-" +
                    lab +
                    "-" +
                    file.replace(/[^a-zA-Z0-9]/g, "");

                const output =
                    document.getElementById(id);

                output.textContent = "Running...";

                try {

                    const response =
                        await fetch(
                            "/labs/" +
                            lab +
                            "/run?file=" +
                            encodeURIComponent(file)
                        );

                    const data =
                        await response.json();

                    if (data.url) {
                        output.textContent = data.output + String.fromCharCode(10,10);
                        const link = document.createElement('a');
                        link.href = data.url;
                        link.target = '_blank';
                        link.rel = 'noopener';
                        link.textContent = 'Open Lab Server';
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

                    output.textContent =
                        "Error: " + error.message;
                }
            }
        </script>
    `;
}

module.exports = {
    runLabProgram,
    liveRunHTML
};



