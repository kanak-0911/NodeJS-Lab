const http = require('http');
const url = require('url');

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

function handler(req, res) {
    res.setHeader('Content-Type', 'application/json');

    const parsedUrl = url.parse(req.url, true);
    const pathName = parsedUrl.pathname;
    const query = parsedUrl.query;

    if (pathName === '/students' || pathName.startsWith('/students/course/')) {

        let result = students;

        // Bonus route: /students/course/BCA
        if (pathName.startsWith('/students/course/')) {
            const courseFromPath = pathName.split('/')[3];

            if (!courseFromPath) {
                res.writeHead(400);
                return res.end(JSON.stringify({
                    error: "Course is required"
                }));
            }

            result = result.filter(
                student => student.course.toLowerCase() === courseFromPath.toLowerCase()
            );
        }

        // Course query filter
        if (query.course) {
            result = result.filter(
                student => student.course.toLowerCase() === query.course.toLowerCase()
            );
        }

        // Minimum marks filter
        if (query.minMarks !== undefined) {
            const minMarks = Number(query.minMarks);

            if (isNaN(minMarks)) {
                res.writeHead(400);
                return res.end(JSON.stringify({
                    error: "minMarks must be a number"
                }));
            }

            result = result.filter(student => student.marks >= minMarks);
        }

        // Partial name search
        if (query.search) {
            const searchText = query.search.toLowerCase();

            result = result.filter(
                student => student.name.toLowerCase().includes(searchText)
            );
        }

        // Sorting
        if (query.sort) {

            if (query.sort !== 'name' && query.sort !== 'marks') {
                res.writeHead(400);
                return res.end(JSON.stringify({
                    error: "Invalid sort field. Use name or marks"
                }));
            }

            const order = query.order || 'asc';

            if (order !== 'asc' && order !== 'desc') {
                res.writeHead(400);
                return res.end(JSON.stringify({
                    error: "Invalid order. Use asc or desc"
                }));
            }

            result.sort((a, b) => {

                let comparison;

                if (query.sort === 'name') {
                    comparison = a.name.localeCompare(b.name);
                } else {
                    comparison = a.marks - b.marks;
                }

                return order === 'desc' ? -comparison : comparison;
            });
        }

        res.end(JSON.stringify(result));
    }

    else {
        res.writeHead(404);
        res.end(JSON.stringify({
            error: "Route not found"
        }));
    }
}

module.exports = handler;

if (require.main === module) {
    http.createServer(handler).listen(Number(process.env.PORT) || 3000, () => {
        console.log("Server running on port 3000");
    });
}
