const http = require("http");
const url = require("url");

const EventEmitter = require("events");
const fs = require("fs");
const { execFile } = require("child_process");

const students = [
    { id: 1, name: "Gauri", course: "BCA", marks: 72 },
    { id: 2, name: "Kanak", course: "BCA", marks: 85 },
    { id: 3, name: "Nisha", course: "BCA", marks: 64 },
    { id: 4, name: "Pragya", course: "BCA", marks: 91 },
    { id: 5, name: "Shreya Kashyap", course: "BCA", marks: 58 },
    { id: 6, name: "Shreya Singh", course: "BCA", marks: 76 },
    { id: 7, name: "Mikki", course: "BIT", marks: 68 },
    { id: 8, name: "Ayush", course: "BIT", marks: 88 },
    { id: 9, name: "Bhaskar", course: "BIT", marks: 55 },
    { id: 10, name: "Rishabh", course: "BIT", marks: 79 },
    { id: 11, name: "Aditya", course: "BIT", marks: 93 },
    { id: 12, name: "Yadev", course: "BIT", marks: 61 }
];


// ======================================================
// REQUEST LOGGER
// ======================================================

const logger = new EventEmitter();

logger.on("request", (method, path) => {

    const logMessage =
        `[${new Date().toLocaleString()}] ${method} ${path}\n`;

    console.log(logMessage.trim());

    fs.appendFile(
        "Lab-08/logs/server.log",
        logMessage,
        (error) => {

            if (error) {
                console.log("Log file error:", error.message);
            }

        }
    );

});

// ======================================================
// LAB DATA
// ======================================================

const labs = [

    {
        number: "01",
        title: "Node.js HTTP Server",
        task: "Creating a basic HTTP server using Node.js",
        description:
            "Created a basic HTTP server and worked with routes, requests and responses.",
        concepts: [
            "HTTP Server",
            "Routing",
            "Request & Response"
        ]
    },

    {
        number: "02",
        title: "Node.js Fundamentals",
        task: "Understanding Node.js fundamentals and core concepts",
        description:
            "Worked with Node.js basics, modules and core concepts.",
        concepts: [
            "Node.js",
            "Modules",
            "Core Concepts"
        ]
    },

    {
        number: "03",
        title: "Student Directory API",
        task: "Creating and working with student data and routes",
        description:
            "Created a Student Directory API with routes for students and items.",
        concepts: [
            "Routes",
            "Arrays",
            "Objects",
            "JSON"
        ]
    },

    {
        number: "04",
        title: "Advanced Student API",
        task: "Filtering, searching, sorting and query parameters",
        description:
            "Implemented advanced student filtering, searching, sorting and input validation.",
        concepts: [
            "Filtering",
            "Search",
            "Sorting",
            "Query Parameters"
        ]
    },

    {
        number: "05",
        title: "Food Delivery Tracker",
        task: "Working with asynchronous programming",
        description:
            "Used callbacks, Promises, Promise chaining, async/await and Promise.all().",
        concepts: [
            "Callbacks",
            "Promises",
            "Async/Await",
            "Promise.all"
        ]
    },

    {
        number: "06",
        title: "File System Module",
        task: "Working with the File System (fs) module",
        description:
            "Worked with reading, writing, appending, deleting files and notes.",
        concepts: [
            "fs Module",
            "Read",
            "Write",
            "Append",
            "Delete"
        ]
    },

    {
        number: "07",
        title: "EventEmitter & Event-Driven Programming",
        task: "Implementing EventEmitter and event-driven programming",
        description:
            "Created custom events, multiple listeners, once-only listeners, error handling and an event-driven order tracking system.",
        concepts: [
            "EventEmitter",
            "Custom Events",
            "Listeners",
            "once()",
            "Error Handling",
            "Event-Driven Programming"
        ]
    },

    {
        number: "08",
        title: "Integrated Node.js Lab Server",
        task: "Integrating Lab 01 to Lab 07 into one Node.js server",
        description:
            "Integrated all previous labs into a single server with routing, source code viewing, script execution, screenshots, logging and APIs.",
        concepts: [
            "Integration",
            "Routing",
            "Modules",
            "Logging",
            "APIs",
            "Security"
        ]
    }

];


// ======================================================
// HTML PAGE TEMPLATE
// ======================================================

function pageTemplate(title, content) {

    return `
<!DOCTYPE html>

<html>

<head>

<meta charset="UTF-8">

<meta name="viewport" content="width=device-width, initial-scale=1.0">

<title>${title}</title>

<style>

* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

body {
    font-family: Arial, sans-serif;
    background: #f3f5f4;
    color: #1f2937;
    min-height: 100vh;
}


/* ================= NAVBAR ================= */

nav {
    background: #1e1e1e;
    padding: 17px 30px;
    border-bottom: 3px solid #68a063;
}

nav a {
    color: #ffffff;
    text-decoration: none;
    margin-right: 25px;
    font-weight: bold;
    transition: 0.2s;
}

nav a:hover {
    color: #68a063;
}


/* ================= HERO ================= */

.hero {
    background: linear-gradient(135deg, #1e1e1e, #263238);
    color: white;
    padding: 70px 20px;
    text-align: center;
    border-bottom: 4px solid #68a063;
}

.hero h1 {
    font-size: 42px;
    margin-bottom: 12px;
}

.hero p {
    font-size: 17px;
    line-height: 1.6;
    color: #d7ded9;
}


/* ================= CONTAINER ================= */

.container {
    max-width: 1100px;
    margin: 40px auto;
    padding: 0 20px;
}


/* ================= CARDS ================= */

.cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 22px;
    margin-top: 30px;
}

.card {
    background: #ffffff;
    padding: 25px;
    border-radius: 15px;
    border-top: 4px solid #68a063;
    box-shadow: 0 7px 22px rgba(0, 0, 0, 0.08);
    transition: 0.2s;
}

.card:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 28px rgba(0, 0, 0, 0.13);
}

.lab-number {
    color: #68a063;
    font-weight: bold;
    margin-bottom: 10px;
    letter-spacing: 1px;
}

.card h2 {
    margin-bottom: 12px;
    color: #1e1e1e;
}

.card p {
    color: #5f6b65;
    line-height: 1.6;
    margin-bottom: 12px;
}


/* ================= TAGS ================= */

.tag {
    display: inline-block;
    background: #e8f3e9;
    color: #3f7041;
    padding: 6px 9px;
    border-radius: 7px;
    margin: 4px;
    font-size: 12px;
    font-weight: bold;
}


/* ================= BUTTONS ================= */

.button {
    display: inline-block;
    margin-top: 15px;
    margin-right: 6px;
    padding: 10px 17px;
    background: #68a063;
    color: white;
    text-decoration: none;
    border-radius: 8px;
    font-weight: bold;
    transition: 0.2s;
}

.button:hover {
    background: #4f854f;
    transform: translateY(-1px);
}

button {
    padding: 10px 17px;
    border: none;
    border-radius: 7px;
    background: #68a063;
    color: white;
    cursor: pointer;
    font-weight: bold;
    transition: 0.2s;
}

button:hover {
    background: #4f854f;
}


/* ================= BOX ================= */

.box {
    background: white;
    padding: 30px;
    border-radius: 15px;
    border-top: 4px solid #68a063;
    box-shadow: 0 7px 22px rgba(0, 0, 0, 0.08);
}

.box h1 {
    color: #1e1e1e;
}

.box h2 {
    color: #3f7041;
}

.box h3 {
    color: #3f7041;
    margin-top: 25px;
    margin-bottom: 10px;
}

.box p {
    line-height: 1.7;
}


/* ================= FORM ================= */

input,
select {
    padding: 10px;
    margin: 6px;
    border: 1px solid #cbd5ce;
    border-radius: 7px;
    background: white;
    color: #1f2937;
}

input:focus,
select:focus {
    outline: 2px solid #68a063;
    border-color: #68a063;
}


/* ================= TABLE ================= */

table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 25px;
}

th,
td {
    padding: 12px;
    border-bottom: 1px solid #e1e6e2;
    text-align: left;
}

th {
    background: #1e1e1e;
    color: white;
}

tr:hover {
    background: #f1f7f2;
}


/* ================= STAT ================= */

.stat {
    display: inline-block;
    background: #e8f3e9;
    color: #3f7041;
    padding: 15px 22px;
    border-radius: 10px;
    margin: 8px;
    font-weight: bold;
}


/* ================= CODE AREA ================= */

pre {
    background: #1e1e1e;
    color: #d7ded9;
    padding: 20px;
    border-radius: 10px;
    overflow-x: auto;
    margin-top: 20px;
    border-left: 4px solid #68a063;
    line-height: 1.7;
}


/* ================= FOOTER ================= */

footer {
    text-align: center;
    padding: 30px;
    color: #6b756f;
    margin-top: 30px;
}


/* ================= MOBILE ================= */

@media (max-width: 600px) {

    nav {
        padding: 15px;
    }

    nav a {
        margin-right: 12px;
        font-size: 14px;
    }

    .hero h1 {
        font-size: 30px;
    }

    .hero p {
        font-size: 15px;
    }

    .container {
        margin: 25px auto;
    }

    .card {
        padding: 20px;
    }

    .box {
        padding: 20px;
    }

    input,
    select {
        width: 100%;
        margin: 6px 0;
    }

    button {
        width: 100%;
        margin-top: 6px;
    }

}

/* ================= LAB 08 PROJECT ================= */

.project-header {
    background: linear-gradient(135deg, #1e1e1e, #263238);
    color: white;
    padding: 35px;
    border-radius: 15px;
    margin-top: 25px;
    border-left: 5px solid #68a063;
}

.project-badge {
    display: inline-block;
    background: #68a063;
    color: white;
    padding: 7px 12px;
    border-radius: 20px;
    font-size: 12px;
    font-weight: bold;
    letter-spacing: 1px;
    margin-bottom: 15px;
}

.project-header h2 {
    color: white;
    font-size: 30px;
    margin-bottom: 12px;
}

.project-intro {
    color: #d7ded9;
    line-height: 1.7;
    font-size: 16px;
}


/* ================= INFO CARDS ================= */

.info-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
    margin-top: 25px;
}

.info-card {
    background: #f8faf8;
    padding: 25px;
    border-radius: 12px;
    border-left: 4px solid #68a063;
}

.info-card h3 {
    color: #3f7041;
    margin-bottom: 15px;
}

.info-card p,
.info-card li {
    color: #5f6b65;
    line-height: 1.7;
}

.info-card ul {
    padding-left: 20px;
}


/* ================= SECTION CARDS ================= */

.section-card {
    background: #ffffff;
    margin-top: 25px;
    padding: 28px;
    border-radius: 14px;
    border: 1px solid #e1e6e2;
    box-shadow: 0 5px 18px rgba(0, 0, 0, 0.06);
}

.section-card h3 {
    color: #3f7041;
    margin-bottom: 15px;
}

.section-card p {
    color: #5f6b65;
    line-height: 1.7;
    margin-bottom: 12px;
}

.section-card ul {
    padding-left: 22px;
}

.section-card li {
    color: #5f6b65;
    line-height: 1.8;
}


/* ================= TECHNOLOGIES ================= */

.tech-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
}

.tech-grid span {
    background: #e8f3e9;
    color: #3f7041;
    padding: 9px 15px;
    border-radius: 20px;
    font-weight: bold;
    font-size: 14px;
}


/* ================= FEATURES ================= */

.feature-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 15px;
}

.feature-item {
    background: #f8faf8;
    padding: 20px;
    border-radius: 10px;
    border-top: 3px solid #68a063;
}

.feature-item strong {
    color: #3f7041;
}

.feature-item p {
    margin-top: 8px;
    font-size: 14px;
}


/* ================= ROUTES ================= */

.route-table {
    border: 1px solid #e1e6e2;
    border-radius: 10px;
    overflow: hidden;
}

.route-row {
    display: grid;
    grid-template-columns: 1fr 2fr;
    padding: 13px 16px;
    border-bottom: 1px solid #e1e6e2;
    gap: 15px;
}

.route-row:last-child {
    border-bottom: none;
}

.route-head {
    background: #1e1e1e;
    color: white;
    font-weight: bold;
}

.route-row code {
    color: #3f7041;
    font-weight: bold;
}


/* ================= PROJECT STATS ================= */

.stats-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 15px;
}

.stat-box {
    background: #e8f3e9;
    padding: 22px 10px;
    border-radius: 12px;
    text-align: center;
    border-bottom: 4px solid #68a063;
}

.stat-box strong {
    display: block;
    color: #3f7041;
    font-size: 30px;
    margin-bottom: 7px;
}

.stat-box span {
    color: #5f6b65;
    font-size: 14px;
    font-weight: bold;
}


/* ================= CONCLUSION ================= */

.conclusion {
    border-left: 5px solid #68a063;
    background: #f8faf8;
}


/* ================= LAB 08 MOBILE ================= */

@media (max-width: 700px) {

    .info-grid {
        grid-template-columns: 1fr;
    }

    .feature-grid {
        grid-template-columns: 1fr;
    }

    .stats-grid {
        grid-template-columns: repeat(2, 1fr);
    }

    .project-header {
        padding: 25px;
    }

    .project-header h2 {
        font-size: 24px;
    }

    .route-row {
        grid-template-columns: 1fr;
    }

}

</style>

</head>


<body>


<nav>

    <a href="/">Node.js Lab</a>

    <a href="/">Dashboard</a>

    <a href="/about">About</a>

    <a href="/college">College</a>

    <a href="/profile">Profile</a>

</nav>


${content}


<footer>

    BCA Semester VII • Node.js Laboratory • Kanak

</footer>


</body>

</html>
`;

}


// ======================================================
// CREATE SERVER
// ======================================================

const server = http.createServer((req, res) => {
    logger.emit("request", req.method, req.url);

    const parsedUrl = url.parse(req.url, true);

    const pathname = parsedUrl.pathname;

    const query = parsedUrl.query;


    res.setHeader("Content-Type", "text/html");


    // ==================================================
    // HOME DASHBOARD
    // ==================================================

    if (pathname === "/") {

        let cards = "";


        labs.forEach(lab => {

            let tags = lab.concepts
                .map(c => `<span class="tag">${c}</span>`)
                .join("");


            cards += `

                <div class="card">

                    <div class="lab-number">
                        LAB ${lab.number}
                    </div>

                    <h2>
                        ${lab.title}
                    </h2>

                    <p>
                        <strong>Task:</strong>
                        ${lab.task}
                    </p>

                    <p>
                        ${lab.description}
                    </p>

                    <div>
                        ${tags}
                    </div>

                    <a
                        class="button"
                        href="/lab/${lab.number}"
                    >
                        View Lab
                    </a>

                </div>

            `;
        });


        const html = pageTemplate(
            "Node.js Lab Portfolio",

            `

            <section class="hero">

                <h1>
                    Node.js Lab Portfolio
                </h1>

                <p>
                    Central dashboard for my Node.js laboratory work,
                    practical tasks and implementations.
                </p>

            </section>


            <main class="container">

                <div class="cards">

                    ${cards}

                </div>

            </main>

            `
        );


        res.writeHead(200);

        res.end(html);

        return;
    }


    // ==================================================
    // ABOUT
    // ==================================================

    if (pathname === "/about") {

        res.writeHead(200);

        res.end(

            pageTemplate(

                "About",

                `

                <main class="container">

                    <div class="box">

                        <h1>
                            About My Lab Work
                        </h1>

                        <br>

                        <p>
                            This portfolio contains my Node.js
                            laboratory assignments completed during
                            BCA Semester VII.
                        </p>

                        <br>

                        <p>
                            <strong>Name:</strong>
                            Kanak
                        </p>

                        <p>
                            <strong>Scholar Number:</strong>
                            23145009
                        </p>

                        <p>
                            <strong>Course:</strong>
                            BCA
                        </p>

                        <p>
                            <strong>Semester:</strong>
                            VII
                        </p>

                        <a class="button" href="/">
                            Back to Dashboard
                        </a>

                    </div>

                </main>

                `
            )

        );

        return;
    }


    // ==================================================
    // COLLEGE
    // ==================================================

    if (pathname === "/college") {

        res.writeHead(200);

        res.end(

            pageTemplate(

                "College",

                `

                <main class="container">

                    <div class="box">

                        <h1>
                            College Information
                        </h1>

                        <br>

                        <p>
                            <strong>University:</strong>
                            Dev Sanskriti Vishwavidyalaya
                        </p>

                        <p>
                            <strong>Course:</strong>
                            BCA
                        </p>

                        <p>
                            <strong>Semester:</strong>
                            VII
                        </p>

                        <a class="button" href="/">
                            Back to Dashboard
                        </a>

                    </div>

                </main>

                `
            )

        );

        return;
    }


   // ==================================================
// PROFILE
// ==================================================

if (pathname === "/profile") {

    res.writeHead(200);

    res.end(

        pageTemplate(

            "Profile",

            `

            <main class="container">

                <div class="box">

                    <h1>
                        Student Profile
                    </h1>

                    <br>

                    <p>
                        <strong>Name:</strong>
                        Kanak
                    </p>

                    <p>
                        <strong>Scholar Number:</strong>
                        23145009
                    </p>

                    <p>
                        <strong>Course:</strong>
                        BCA
                    </p>

                    <p>
                        <strong>Semester:</strong>
                        VII
                    </p>

                    <p>
                        <strong>University:</strong>
                        Dev Sanskriti Vishwavidyalaya
                    </p>

                    <a class="button" href="/">
                        Back to Dashboard
                    </a>

                </div>

            </main>

            `

        )

    );

    return;
}


    // ==================================================
    // LAB DETAILS
    // ==================================================

    if (pathname.startsWith("/lab/")) {

        const number =
            pathname.split("/")[2];


        const lab =
            labs.find(l => l.number === number);


        if (!lab) {

            res.writeHead(404);

            res.end(
                "<h1>Lab Not Found</h1>"
            );

            return;
        }


        let extra = "";


        // ==============================================
        // LAB 01
        // ==============================================

        if (number === "01") {

            extra = `

                <h2>
                    Node.js HTTP Server
                </h2>

                <br>

                <p>
                    This lab introduced the basics of creating
                    an HTTP server using Node.js.
                </p>

                <pre>
HTTP Server
Request
Response
Routing
Basic API Responses
                </pre>

            `;
        }


        // ==============================================
        // LAB 02
        // ==============================================

        if (number === "02") {

            extra = `

                <h2>
                    Node.js Fundamentals
                </h2>

                <br>

                <p>
                    This lab covered basic Node.js concepts,
                    modules and working with the Node.js runtime.
                </p>

                <pre>
Node.js
Modules
Core Concepts
JavaScript Runtime
                </pre>

            `;
        }


        // ==============================================
        // LAB 03
        // ==============================================

        if (number === "03") {

            extra = `

                <h2>
                    Student Directory
                </h2>

                <br>

                <p>
                    The Student Directory API provides routes
                    for viewing student information and
                    course-wise student data.
                </p>

                <a class="button" href="/students">
                    View All Students
                </a>

                <a
                    class="button"
                    href="/students/course/BCA"
                >
                    View BCA Students
                </a>

            `;
        }


        // ==============================================
        // LAB 04
        // ==============================================

        if (number === "04") {

            extra = `

                <h2>
                    Advanced Student API
                </h2>

                <br>

                <p>
                    This lab implements filtering, searching,
                    sorting and query parameters for student data.
                </p>


                <div>

                    <span class="stat">
                        Total Students:
                        <strong>${students.length}</strong>
                    </span>

                </div>


                <br>


                <form method="GET" action="/students">

                    <select name="course">

                        <option value="">
                            All Courses
                        </option>

                        <option value="BCA">
                            BCA
                        </option>

                        <option value="BIT">
                            BIT
                        </option>

                    </select>


                    <input
                        type="number"
                        name="minMarks"
                        placeholder="Minimum Marks"
                    >


                    <input
                        type="text"
                        name="search"
                        placeholder="Search Name"
                    >


                    <select name="sort">

                        <option value="">
                            No Sorting
                        </option>

                        <option value="marks">
                            Marks
                        </option>

                        <option value="name">
                            Name
                        </option>

                    </select>


                    <select name="order">

                        <option value="asc">
                            Ascending
                        </option>

                        <option value="desc">
                            Descending
                        </option>

                    </select>


                    <button type="submit">
                        Find Students
                    </button>

                </form>


                <br>


                <p>
                    You can combine course, marks, search and
                    sorting filters.
                </p>

            `;
        }


        // ==============================================
        // LAB 05
        // ==============================================

        if (number === "05") {

            extra = `

                <h2>
                    Food Delivery Tracker
                </h2>

                <br>

                <p>
                    This lab demonstrates asynchronous
                    programming in Node.js.
                </p>


                <h3>
                    Concepts Used
                </h3>


                <ul>

                    <li>
                        Callbacks
                    </li>

                    <li>
                        Promises
                    </li>

                    <li>
                        Promise Chaining
                    </li>

                    <li>
                        Async/Await
                    </li>

                    <li>
                        Promise.all()
                    </li>

                </ul>


                <pre>
Order Placed
      ↓
Restaurant Processing
      ↓
Food Preparation
      ↓
Delivery Partner
      ↓
Order Delivered
                </pre>

            `;
        }


        // ==============================================
        // LAB 06
        // ==============================================

        if (number === "06") {

            extra = `

                <h2>
                    File System Module
                </h2>

                <br>

                <p>
                    This lab demonstrates file operations
                    using the Node.js fs module.
                </p>


                <h3>
                    Operations Implemented
                </h3>


                <ul>

                    <li>
                        Read files
                    </li>

                    <li>
                        Write files
                    </li>

                    <li>
                        Append data
                    </li>

                    <li>
                        Delete files
                    </li>

                    <li>
                        Work with notes
                    </li>

                </ul>


                <pre>
read-async.js
read-sync.js
write-file.js
append-file.js
delete-file.js
async-await-version.js
add-note.js
read-notes.js
                </pre>

            `;
        }


        // ==============================================
        // LAB 07
        // ==============================================

        if (number === "07") {

            extra = `

                <h2>
                    EventEmitter & Event-Driven Programming
                </h2>

                <br>

                <p>
                    This lab demonstrates how EventEmitter
                    is used in Node.js for event-driven
                    programming.
                </p>


                <h3>
                    Concepts Covered
                </h3>


                <ul>

                    <li>
                        Creating custom events
                    </li>

                    <li>
                        Using emit()
                    </li>

                    <li>
                        Multiple listeners using on()
                    </li>

                    <li>
                        One-time listeners using once()
                    </li>

                    <li>
                        Error event handling
                    </li>

                    <li>
                        Extending EventEmitter
                    </li>

                    <li>
                        Event-driven Order Tracking System
                    </li>

                </ul>


                <h3>
                    Lab 07 Files
                </h3>


                <table>

                    <tr>

                        <th>
                            File
                        </th>

                        <th>
                            Purpose
                        </th>

                    </tr>


                    <tr>

                        <td>
                            events-basic.js
                        </td>

                        <td>
                            Basic custom event
                        </td>

                    </tr>


                    <tr>

                        <td>
                            multiple-listeners.js
                        </td>

                        <td>
                            Multiple listeners
                        </td>

                    </tr>


                    <tr>

                        <td>
                            once-only-listener.js
                        </td>

                        <td>
                            on() and once()
                        </td>

                    </tr>


                    <tr>

                        <td>
                            error-handling.js
                        </td>

                        <td>
                            Unhandled error event
                        </td>

                    </tr>


                    <tr>

                        <td>
                            error-handling-fixed.js
                        </td>

                        <td>
                            Safe error handling
                        </td>

                    </tr>


                    <tr>

                        <td>
                            notify-student.js
                        </td>

                        <td>
                            Custom NotificationCenter
                        </td>

                    </tr>


                    <tr>

                        <td>
                            order-tracker.js
                        </td>

                        <td>
                            Event-driven order tracking
                        </td>

                    </tr>


                    <tr>

                        <td>
                            reflection-notes.txt
                        </td>

                        <td>
                            Reflection notes
                        </td>

                    </tr>

                </table>


                <h3>
                    Order Tracking System
                </h3>


                <p>
                    The OrderTracker uses custom events to
                    represent different stages of an order.
                    Multiple listeners respond to the same
                    event for customer notifications and
                    internal logs.
                </p>


                <pre>
Bonus: First order bonus applied to Priya.
Customer Notification: Order ORD101 placed by Priya.
Internal Log: Order ORD101 has been placed.
Customer Notification: Order ORD101 is being prepared.
Kitchen Log: Order ORD101 is ready for delivery.
Customer Notification: Order ORD101 delivered to Priya.
Delivery Log: Order ORD101 delivery completed.
                </pre>

            `;
        }


        // ==============================================
        // LAB 08
        // =============================================

        if (number === "08") {

            extra = `

                <div class="project-header">

                    <div class="project-badge">
                        NODE.JS INTEGRATION PROJECT
                    </div>

                    <h2>
                        Integrated Node.js Lab Server
                    </h2>

                    <p class="project-intro">
                        A single Node.js server that brings together
                        the concepts, applications and outputs developed
                        throughout Lab 01 to Lab 07.
                    </p>

                </div>


                <div class="info-grid">

                    <div class="info-card">

                        <h3>📌 Problem Statement</h3>

                        <p>
                            The previous labs were developed separately,
                            making it difficult to access different
                            applications, source files and outputs
                            from one place.
                        </p>

                        <p>
                            A single integrated server was required
                            to organize and provide access to all
                            laboratory work.
                        </p>

                    </div>


                    <div class="info-card">

                        <h3>🎯 Objective</h3>

                        <ul>

                            <li>
                                Integrate Lab 01 to Lab 07 into one server.
                            </li>

                            <li>
                                Provide simple routes for accessing labs.
                            </li>

                            <li>
                                Execute selected Node.js scripts safely.
                            </li>

                            <li>
                                Provide APIs for server information.
                            </li>

                            <li>
                                Maintain request logs and handle errors.
                            </li>

                        </ul>

                    </div>

                </div>


                <div class="section-card">

                    <h3>💡 Proposed Solution</h3>

                    <p>
                        Lab 08 uses the Node.js HTTP Server,
                        routing, File System, EventEmitter and
                        Child Process modules to create one
                        integrated laboratory portal.
                    </p>

                    <p>
                        Users can navigate between labs, view lab
                        information, access screenshots, run selected
                        scripts and check server statistics through APIs.
                    </p>

                </div>


                <div class="section-card">

                    <h3>🛠 Technologies Used</h3>

                    <div class="tech-grid">

                        <span>Node.js</span>
                        <span>HTTP Module</span>
                        <span>File System</span>
                        <span>EventEmitter</span>
                        <span>Child Process</span>
                        <span>HTML</span>
                        <span>CSS</span>
                        <span>JSON</span>

                    </div>

                </div>


                <div class="section-card">

                    <h3>⭐ Key Features</h3>

                    <div class="feature-grid">

                        <div class="feature-item">
                            <strong>🔗 Lab Integration</strong>

                            <p>
                                Provides one portal for Lab 01 to Lab 07.
                            </p>
                        </div>


                        <div class="feature-item">
                            <strong>⚡ Script Execution</strong>

                            <p>
                                Runs selected Node.js scripts through routes.
                            </p>
                        </div>


                        <div class="feature-item">
                            <strong>📊 Dashboard API</strong>

                            <p>
                                Provides server and laboratory statistics.
                            </p>
                        </div>


                        <div class="feature-item">
                            <strong>📝 Request Logging</strong>

                            <p>
                                Records server requests using EventEmitter.
                            </p>
                        </div>


                        <div class="feature-item">
                            <strong>🖼 Screenshot Viewer</strong>

                            <p>
                                Provides access to laboratory screenshots.
                            </p>
                        </div>


                        <div class="feature-item">
                            <strong>🔒 Security</strong>

                            <p>
                                Only approved scripts can be executed.
                            </p>
                        </div>

                    </div>

                </div>


                <div class="section-card">

                    <h3>🔗 Important Routes & APIs</h3>

                    <div class="route-table">

                        <div class="route-row route-head">
                            <span>Route</span>
                            <span>Purpose</span>
                        </div>


                        <div class="route-row">
                            <code>/</code>
                            <span>Main Lab Portal</span>
                        </div>


                        <div class="route-row">
                            <code>/about</code>
                            <span>About the project</span>
                        </div>


                        <div class="route-row">
                            <code>/health</code>
                            <span>Server health check</span>
                        </div>


                        <div class="route-row">
                            <code>/labs</code>
                            <span>View all labs</span>
                        </div>


                        <div class="route-row">
                            <code>/labs/:id</code>
                            <span>View individual lab details</span>
                        </div>


                        <div class="route-row">
                            <code>/labs/:id/run</code>
                            <span>Execute an approved script</span>
                        </div>


                        <div class="route-row">
                            <code>/api/dashboard</code>
                            <span>Dashboard statistics</span>
                        </div>


                        <div class="route-row">
                            <code>/screenshots/:name</code>
                            <span>View lab screenshots</span>
                        </div>

                    </div>

                </div>


                <div class="section-card">

                    <h3>📈 Project Statistics</h3>

                    <div class="stats-grid">

                        <div class="stat-box">
                            <strong>8</strong>
                            <span>Total Labs</span>
                        </div>


                        <div class="stat-box">
                            <strong>4</strong>
                            <span>Server Labs</span>
                        </div>


                        <div class="stat-box">
                            <strong>3</strong>
                            <span>Script Labs</span>
                        </div>


                        <div class="stat-box">
                            <strong>23</strong>
                            <span>Screenshots</span>
                        </div>

                    </div>

                </div>


                <div class="section-card">

                    <h3>📚 What I Learned</h3>

                    <ul>

                        <li>
                            Creating and managing Node.js HTTP servers.
                        </li>

                        <li>
                            Building routes and REST-style APIs.
                        </li>

                        <li>
                            Working with files and directories.
                        </li>

                        <li>
                            Using EventEmitter for request logging.
                        </li>

                        <li>
                            Executing Node.js programs using Child Process.
                        </li>

                        <li>
                            Applying basic security and error handling.
                        </li>

                    </ul>

                </div>


                <div class="section-card conclusion">

                    <h3>✅ Conclusion</h3>

                    <p>
                        Lab 08 combines the major concepts learned
                        throughout the Node.js laboratory into one
                        integrated application. It provides a single
                        place to access labs, APIs, scripts, screenshots
                        and server information.
                    </p>

                </div>

            `;

        }


        // ==============================================
        // DISPLAY LAB PAGE
        // ==============================================

        res.writeHead(200);

        res.end(

            pageTemplate(

                `Lab ${lab.number} - ${lab.title}`,

                `

                <main class="container">

                    <div class="box">

                        <div class="lab-number">
                            LAB ${lab.number}
                        </div>

                        <h1>
                            ${lab.title}
                        </h1>

                        <p>
                            <strong>Task:</strong>
                            ${lab.task}
                        </p>

                        <p>
                            ${lab.description}
                        </p>

                        <br>

                        ${extra}

                        <br>

                        <a
                            class="button"
                            href="/"
                        >
                            Back to Dashboard
                        </a>

                    </div>

                </main>

                `

            )

        );

        return;

    }

    // ==================================================
// HEALTH CHECK
// ==================================================

if (pathname === "/health") {

    res.writeHead(200, {
        "Content-Type": "application/json"
    });

    res.end(
        JSON.stringify({
            status: "OK",
            message: "Node.js Lab Server is running",
            timestamp: new Date().toISOString()
        })
    );

    return;
}

// ==================================================
// ALL LABS API
// ==================================================

if (pathname === "/labs") {

    res.writeHead(200, {
        "Content-Type": "application/json"
    });

    res.end(
        JSON.stringify(labs, null, 2)
    );

    return;
}

// ==================================================
// SCRIPT EXECUTION
// ==================================================

if (pathname.startsWith("/labs/") && pathname.endsWith("/run")) {

    const parts = pathname.split("/");
    const labNumber = parts[2];
    const fileName = query.file;

    if (!fileName) {

        res.writeHead(400, {
            "Content-Type": "application/json"
        });

        res.end(JSON.stringify({
            error: "Please provide a file name"
        }));

        return;
    }

    const allowedFiles = {
        "05": [
            "callbacks.js",
            "promises.js",
            "async-await.js"
        ],
        "06": [
            "read-async.js",
            "read-sync.js",
            "write-file.js",
            "append-file.js",
            "delete-file.js"
        ],
        "07": [
            "events-basic.js",
            "once-only-listener.js",
            "error-handling.js",
            "multiple-listeners.js"
        ]
    };

    if (
        !allowedFiles[labNumber] ||
        !allowedFiles[labNumber].includes(fileName)
    ) {

        res.writeHead(403, {
            "Content-Type": "application/json"
        });

        res.end(JSON.stringify({
            error: "This file is not allowed to run"
        }));

        return;
    }

    const filePath = `Lab-${labNumber}/${fileName}`;

    execFile(
        "node",
        [fileName],
        {
            timeout: 5000,
            cwd: `Lab-${labNumber}`
        },
        (error, stdout, stderr) => {

            res.writeHead(
                error ? 500 : 200,
                {
                    "Content-Type": "application/json"
                }
            );

            res.end(JSON.stringify({
                file: fileName,
                output: stdout,
                error: stderr || null
            }, null, 2));

        }
    );

    return;
}

// ==================================================
// SINGLE LAB API
// ==================================================

if (pathname.startsWith("/labs/")) {

    const labNumber = pathname.split("/")[2];

    const lab = labs.find(
        l => l.number === labNumber
    );

    if (!lab) {

        res.writeHead(404, {
            "Content-Type": "application/json"
        });

        res.end(
            JSON.stringify({
                error: "Lab not found"
            })
        );

        return;
    }

    res.writeHead(200, {
        "Content-Type": "application/json"
    });

    res.end(
        JSON.stringify(lab, null, 2)
    );

    return;
}

// ==================================================
// DASHBOARD API
// ==================================================

if (pathname === "/api/dashboard") {

    const bcaStudents =
        students.filter(s => s.course === "BCA").length;

    const bitStudents =
        students.filter(s => s.course === "BIT").length;

    let screenshotCount = 0;

    try {
        screenshotCount =
            fs.readdirSync("Lab-08/public/screenshots").length;
    } catch (error) {
        screenshotCount = 0;
    }

    let logLines = 0;

    try {
        const logData =
            fs.readFileSync("Lab-08/logs/server.log", "utf8");

        logLines =
            logData.split("\n").filter(line => line.trim() !== "").length;
    } catch (error) {
        logLines = 0;
    }

    res.writeHead(200, {
        "Content-Type": "application/json"
    });

    res.end(
        JSON.stringify({
            server: "Node.js Lab Server",
            status: "Running",
            totalLabs: labs.length,
            serverLabs: 4,
            scriptLabs: 3,
            screenshots: screenshotCount,
            logLines: logLines,
            totalStudents: students.length,
            bcaStudents: bcaStudents,
            bitStudents: bitStudents
        }, null, 2)
    );

    return;
}

// ==================================================
// SCREENSHOT VIEWING
// ==================================================

if (pathname.startsWith("/screenshots/")) {

    const imageName = pathname.split("/")[2];

    const imagePath = `Lab-08/public/screenshots/${imageName}`;

    try {

        const image = fs.readFileSync(imagePath);

        res.writeHead(200, {
            "Content-Type": "image/png"
        });

        res.end(image);

    } catch (error) {

        res.writeHead(404, {
            "Content-Type": "text/plain"
        });

        res.end("Screenshot not found.");

    }

    return;
}


    // ==================================================
    // STUDENT API
    // ==================================================

    if (pathname === "/students") {

        let result = [...students];


        // COURSE FILTER

        if (query.course) {

            result = result.filter(

                student =>

                    student.course.toLowerCase() ===
                    query.course.toLowerCase()

            );

        }


        // MINIMUM MARKS

        if (
            query.minMarks !== undefined &&
            query.minMarks !== ""
        ) {

            const minMarks =
                Number(query.minMarks);


            if (isNaN(minMarks)) {

                res.writeHead(400);

                res.end(
                    "minMarks must be a number"
                );

                return;
            }


            result = result.filter(

                student =>
                    student.marks >= minMarks

            );

        }


        // SEARCH

        if (query.search) {

            result = result.filter(

                student =>

                    student.name
                        .toLowerCase()
                        .includes(
                            query.search.toLowerCase()
                        )

            );

        }


        // SORTING

        if (query.sort) {

            if (
                query.sort !== "name" &&
                query.sort !== "marks"
            ) {

                res.writeHead(400);

                res.end(
                    "Invalid sort field. Use name or marks"
                );

                return;
            }


            const order =
                query.order || "asc";


            if (
                order !== "asc" &&
                order !== "desc"
            ) {

                res.writeHead(400);

                res.end(
                    "Invalid order. Use asc or desc"
                );

                return;
            }


            result.sort((a, b) => {

                let comparison;


                if (query.sort === "name") {

                    comparison =
                        a.name.localeCompare(b.name);

                } else {

                    comparison =
                        a.marks - b.marks;

                }


                return order === "desc"
                    ? -comparison
                    : comparison;

            });

        }


        let rows = result.map(student => `

            <tr>

                <td>
                    ${student.id}
                </td>

                <td>
                    ${student.name}
                </td>

                <td>
                    ${student.course}
                </td>

                <td>
                    ${student.marks}
                </td>

            </tr>

        `).join("");


        res.writeHead(200);


        res.end(

            pageTemplate(

                "Student API Results",

                `

                <main class="container">

                    <div class="box">

                        <h1>
                            Student API Results
                        </h1>


                        <br>


                        <p>
                            <strong>
                                ${result.length}
                            </strong>
                            student(s) found.
                        </p>


                        <table>

                            <tr>

                                <th>
                                    ID
                                </th>

                                <th>
                                    Name
                                </th>

                                <th>
                                    Course
                                </th>

                                <th>
                                    Marks
                                </th>

                            </tr>

                            ${rows}

                        </table>


                        <a
                            class="button"
                            href="/lab/04"
                        >
                            Back to Student API
                        </a>

                    </div>

                </main>

                `
            )

        );

        return;
    }


    // ==================================================
    // STUDENTS BY COURSE
    // ==================================================

    if (pathname.startsWith("/students/course/")) {

        const course =
            pathname.split("/")[3];


        const result =
            students.filter(

                student =>

                    student.course.toLowerCase() ===
                    course.toLowerCase()

            );


        res.writeHead(200);


        res.end(

            pageTemplate(

                `${course} Students`,

                `

                <main class="container">

                    <div class="box">

                        <h1>
                            ${course} Students
                        </h1>


                        <br>


                        <p>
                            ${result.length}
                            student(s) found.
                        </p>


                        <table>

                            <tr>

                                <th>
                                    ID
                                </th>

                                <th>
                                    Name
                                </th>

                                <th>
                                    Course
                                </th>

                                <th>
                                    Marks
                                </th>

                            </tr>


                            ${result.map(s => `

                                <tr>

                                    <td>
                                        ${s.id}
                                    </td>

                                    <td>
                                        ${s.name}
                                    </td>

                                    <td>
                                        ${s.course}
                                    </td>

                                    <td>
                                        ${s.marks}
                                    </td>

                                </tr>

                            `).join("")}

                        </table>


                        <a
                            class="button"
                            href="/lab/03"
                        >
                            Back to Lab 03
                        </a>

                    </div>

                </main>

                `
            )

        );

        return;
    }


    // ==================================================
    // STUDENT BY ID
    // ==================================================

    if (pathname.startsWith("/students/")) {

        const id =
            Number(
                pathname.split("/")[2]
            );


        const student =
            students.find(
                s => s.id === id
            );


        if (!student) {

            res.writeHead(404);

            res.end(
                "Student not found"
            );

            return;
        }


        res.writeHead(200);


        res.end(

            pageTemplate(

                `Student ${student.id}`,

                `

                <main class="container">

                    <div class="box">

                        <h1>
                            Student Details
                        </h1>


                        <br>


                        <p>
                            <strong>ID:</strong>
                            ${student.id}
                        </p>


                        <p>
                            <strong>Name:</strong>
                            ${student.name}
                        </p>


                        <p>
                            <strong>Course:</strong>
                            ${student.course}
                        </p>


                        <p>
                            <strong>Marks:</strong>
                            ${student.marks}
                        </p>


                        <a
                            class="button"
                            href="/students"
                        >
                            Back to Students
                        </a>

                    </div>

                </main>

                `
            )

        );

        return;
    }


        // ==================================================
    // 404
    // ==================================================

    res.writeHead(404);

    res.end(

        pageTemplate(

            "404",

            `

            <main class="container">

                <div class="box">

                    <h1>
                        404 - Page Not Found
                    </h1>

                    <br>

                    <p>
                        The requested route does not exist.
                    </p>

                    <a
                        class="button"
                        href="/"
                    >
                        Back to Dashboard
                    </a>

                </div>

            </main>

            `
        )

    );

});



// ======================================================
// START SERVER
// ======================================================

server.listen(4000, () => {

    console.log(
        "Main Lab Dashboard running at http://localhost:4000"
    );

});