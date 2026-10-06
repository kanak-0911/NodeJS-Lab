const slugify = require("slugify");

const labs = [
    {
        id: "01",
        title: "Node.js HTTP Server",
        type: "server",
        folder: "Lab-01",
        entry: "server.js",
        description: "Basic HTTP server and routing using Node.js.",
        files: ["server.js"]
    },
    {
        id: "02",
        title: "Node.js Fundamentals",
        type: "server",
        folder: "Lab-02",
        entry: "server.js",
        description: "Node.js fundamentals, modules, routes and JSON responses.",
        files: ["server.js"]
    },
    {
        id: "03",
        title: "Student Directory",
        type: "server",
        folder: "Lab-03",
        entry: "students-server.js",
        description: "Student data, routes and HTTP responses.",
        files: ["students-server.js"]
    },
    {
        id: "04",
        title: "Advanced Student Server",
        type: "server",
        folder: "Lab-04",
        entry: "advanced-server.js",
        description: "Filtering, searching, sorting and query parameters.",
        files: ["advanced-server.js"]
    },
    {
        id: "05",
        title: "Food Delivery Tracker",
        type: "script",
        folder: "Lab-05",
        description: "Callbacks, promises, chaining, async-await and concurrency.",
        files: [
            "callback-version.js",
            "promise-version.js",
            "chaining-version.js",
            "async-await-version.js",
            "concurrent-orders.js"
        ]
    },
    {
        id: "06",
        title: "File System Module",
        type: "script",
        folder: "Lab-06",
        description: "Reading, writing, appending and deleting files using fs.",
        files: [
            "read-async.js",
            "read-sync.js",
            "write-file.js",
            "append-file.js",
            "delete-file.js",
            "async-await-version.js",
            "add-note.js",
            "read-notes.js"
        ]
    },
    {
        id: "07",
        title: "EventEmitter and Event-Driven Programming",
        type: "script",
        folder: "Lab-07",
        description: "EventEmitter, listeners, errors and event-driven programming.",
        files: [
            "events-basic.js",
            "once-only-listener.js",
            "error-handling.js",
            "error-handling-fixed.js",
            "multiple-listeners.js",
            "notify-student.js",
            "order-tracker.js"
        ]
    }
];

labs.forEach(lab => {
    lab.slug = slugify(lab.title, { lower: true, strict: true });
});

module.exports = labs;