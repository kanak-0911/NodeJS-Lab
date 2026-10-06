const EventEmitter = require("events");
const fs = require("fs");
const path = require("path");

class Logger extends EventEmitter {
    constructor() {
        super();

        this.logDir = path.join(__dirname, "..", "logs");
        this.logFile = path.join(this.logDir, "server.log");

        fs.mkdirSync(this.logDir, { recursive: true });

        this.on("request", (message) => {
            const line = `${new Date().toISOString()} - ${message}\n`;

            console.log(line.trim());

            fs.appendFile(this.logFile, line, (error) => {
                if (error) {
                    this.emit("error", error);
                }
            });
        });

        this.on("error", (error) => {
            console.error("Logger error:", error.message);
        });
    }

    logRequest(message) {
        this.emit("request", message);
    }
}

module.exports = new Logger();