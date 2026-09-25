const http = require("http");
const fs = require("fs");
const path = require("path");
const url = require("url");

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

const books = [
    { id: 1, title: "Node.js Basics" },
    { id: 2, title: "Learning Express" },
    { id: 3, title: "JavaScript Guide" }
];

const server = http.createServer((req, res) => {

    const parsedUrl = url.parse(req.url, true);
    const pathname = parsedUrl.pathname;
    const query = parsedUrl.query;

    if (pathname === "/") {
        const filePath = path.join(__dirname, "index.html");

        fs.readFile(filePath, (err, content) => {
            if (err) {
                res.writeHead(500, { "Content-Type": "text/plain" });
                res.end("Error loading index.html");
                return;
            }

            res.writeHead(200, { "Content-Type": "text/html" });
            res.end(content);
        });

        return;
    }

    if (pathname === "/about") {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(`
            <h1>About</h1>
            <p>This Node.js Lab portfolio is created by Kanak.</p>
            <p>BCA Semester VII</p>
        `);
        return;
    }

    if (pathname === "/college") {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(`
            <h1>College Information</h1>
            <p><b>University:</b> Dev Sanskriti Vishwavidyalaya</p>
            <p><b>Course:</b> BCA</p>
            <p><b>Semester:</b> VII</p>
        `);
        return;
    }

    if (pathname === "/profile") {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({
            name: "Kanak",
            scholarNumber: "23145009",
            course: "BCA",
            semester: "VII",
            university: "Dev Sanskriti Vishwavidyalaya"
        }, null, 2));
        return;
    }

    if (pathname === "/students") {
        let result = [...students];

        if (query.course) {
            result = result.filter(
                student =>
                    student.course.toLowerCase() ===
                    query.course.toLowerCase()
            );
        }

        if (query.minMarks) {
            const minMarks = Number(query.minMarks);

            if (isNaN(minMarks)) {
                res.writeHead(400, { "Content-Type": "application/json" });
                res.end(JSON.stringify({
                    error: "minMarks must be a number"
                }));
                return;
            }

            result = result.filter(
                student => student.marks >= minMarks
            );
        }

        if (query.search) {
            result = result.filter(
                student =>
                    student.name
                        .toLowerCase()
                        .includes(query.search.toLowerCase())
            );
        }

        if (query.sort === "marks") {
            result.sort((a, b) =>
                query.order === "desc"
                    ? b.marks - a.marks
                    : a.marks - b.marks
            );
        }

        if (query.sort === "name") {
            result.sort((a, b) =>
                query.order === "desc"
                    ? b.name.localeCompare(a.name)
                    : a.name.localeCompare(b.name)
            );
        }

        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(result, null, 2));
        return;
    }

    if (pathname.startsWith("/students/")) {
        const parts = pathname.split("/");

        if (parts[2] === "course") {
            const course = parts[3];

            let result = students.filter(
                student =>
                    student.course.toLowerCase() ===
                    course.toLowerCase()
            );

            if (query.minMarks) {
                result = result.filter(
                    student => student.marks >= Number(query.minMarks)
                );
            }

            if (query.sort === "marks") {
                result.sort((a, b) =>
                    query.order === "desc"
                        ? b.marks - a.marks
                        : a.marks - b.marks
                );
            }

            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify(result, null, 2));
            return;
        }

        const id = Number(parts[2]);

        const student = students.find(
            student => student.id === id
        );

        if (!student) {
            res.writeHead(404, { "Content-Type": "application/json" });
            res.end(JSON.stringify({
                error: "Student not found"
            }));
            return;
        }

        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(student, null, 2));
        return;
    }

    if (pathname === "/items") {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(books, null, 2));
        return;
    }

    if (pathname.startsWith("/items/")) {
        const id = Number(pathname.split("/")[2]);

        const book = books.find(
            book => book.id === id
        );

        if (!book) {
            res.writeHead(404, { "Content-Type": "application/json" });
            res.end(JSON.stringify({
                error: "Book not found"
            }));
            return;
        }

        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(book, null, 2));
        return;
    }

    res.writeHead(404, { "Content-Type": "text/html" });
    res.end(`
        <h1>404 - Page Not Found</h1>
        <p>The requested route does not exist.</p>
    `);
});

server.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});