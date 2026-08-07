const http = require("http");

const server = http.createServer((req, res) => {

    if (req.url === "/") {
        res.writeHead(200, { "Content-Type": "text/plain" });
        res.end("Welcome!\n\nName: Kanak\nScholar Number: 23145009\nCourse: BCA");
    }

    else if (req.url === "/about") {
        res.writeHead(200, { "Content-Type": "text/plain" });
        res.end("Hello! My name is Kanak. I am a BCA student and I am learning Node.js.");
    }

    else if (req.url === "/college") {
        res.writeHead(200, { "Content-Type": "text/plain" });
        res.end("College: Dev Sanskriti Vishwavidyalaya\nSemester: BCA 7th Semester");
    }

    else if (req.url === "/profile") {
        res.writeHead(200, { "Content-Type": "application/json" });

        const profile = {
            name: "Kanak",
            scholarNumber: "23145009",
            course: "BCA",
            semester: "7th Semester",
            college: "Dev Sanskriti Vishwavidyalaya"
        };

        res.end(JSON.stringify(profile));
    }

    else {
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end("Page Not Found");
    }

});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});