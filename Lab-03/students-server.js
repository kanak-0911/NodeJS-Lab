const http = require('http');

const students = [
    { id: 1, name: "Gauri", course: "BCA" },
    { id: 2, name: "Kanak", course: "BCA" },
    { id: 3, name: "Nisha", course: "BCA" },
    { id: 4, name: "Pragya", course: "BCA" },
    { id: 5, name: "Shreya Kashyap", course: "BCA" },
    { id: 6, name: "Shreya Singh", course: "BCA" },
    { id: 7, name: "Mikki", course: "BCA" },
    { id: 8, name: "Ayush", course: "BCA" },
    { id: 9, name: "Bhaskar", course: "BIT" },
    { id: 10, name: "Rishabh", course: "BIT" },
    { id: 11, name: "Aditya", course: "BIT" },
    { id: 12, name: "Yadev", course: "BIT" }
];

const items = [
    { id: 1, name: "Harry Potter", type: "Book" },
    { id: 2, name: "The Alchemist", type: "Book" },
    { id: 3, name: "Atomic Habits", type: "Book" },
    { id: 4, name: "The Hobbit", type: "Book" },
    { id: 5, name: "Ikigai", type: "Book" }
];

const server = http.createServer((req, res) => {

    res.setHeader('Content-Type', 'application/json');

    // Get all students
    if (req.url === '/students') {
        res.end(JSON.stringify(students));
    }

    // Get students from BCA course
    else if (req.url === '/students/course/BCA') {
        const bcaStudents = students.filter(s => s.course === 'BCA');
        res.end(JSON.stringify(bcaStudents));
    }

    // Get student by ID
    else if (req.url.startsWith('/students/')) {
        const idValue = req.url.split('/')[2];
        const id = Number(idValue);

        if (isNaN(id)) {
            res.writeHead(400);
            res.end(JSON.stringify({ error: "Student ID must be a number" }));
            return;
        }

        const student = students.find(s => s.id === id);

        if (student) {
            res.end(JSON.stringify(student));
        } else {
            res.writeHead(404);
            res.end(JSON.stringify({ error: "Student not found" }));
        }
    }

    // Get all items
    else if (req.url === '/items') {
        res.end(JSON.stringify(items));
    }

    // Get item by ID
    else if (req.url.startsWith('/items/')) {
        const idValue = req.url.split('/')[2];
        const id = Number(idValue);

        if (isNaN(id)) {
            res.writeHead(400);
            res.end(JSON.stringify({ error: "Item ID must be a number" }));
            return;
        }

        const item = items.find(i => i.id === id);

        if (item) {
            res.end(JSON.stringify(item));
        } else {
            res.writeHead(404);
            res.end(JSON.stringify({ error: "Item not found" }));
        }
    }

    // Handle invalid routes
    else {
        res.writeHead(404);
        res.end(JSON.stringify({ error: "Route not found" }));
    }
});

server.listen(3000, () => {
    console.log("Server running on port 3000");
});