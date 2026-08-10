# Node.js Lab 02 & Lab 03

## Student Details

* Student Name: Kanak
* Scholar Number: 23145009
* Course: BCA
* Semester: VII

---

# Lab 02

## Lab Details

* Lab Number: 02
* Date: 07-08-2026

## Server Routes

| Route           | Returns                                               |
| --------------- | ----------------------------------------------------- |
| `/`             | Welcome message with Name, Scholar Number, and Course |
| `/about`        | A short introduction about me                         |
| `/college`      | College name and semester                             |
| `/profile`      | Student details in JSON format                        |
| Any other route | 404 - Page Not Found                                  |

## Practical Description

This lab demonstrates how to create a basic HTTP server using Node.js. It includes multiple routes, a JSON response, 404 error handling, and the use of an environment variable for the server port.

---

# Lab 03 – Student Directory API

## Lab Details

* Lab Number: 03
* Date: 10-08-2026

## Student Directory Routes

| Route                  | Returns                                                 |
| ---------------------- | ------------------------------------------------------- |
| `/students`            | Returns the complete list of 12 students                |
| `/students/1`          | Returns the student with ID 1                           |
| `/students/2`          | Returns the student with ID 2                           |
| `/students/99`         | Returns "Student not found"                             |
| `/students/course/BCA` | Returns only students enrolled in BCA                   |
| `/students/abc`        | Returns an error because the student ID must be numeric |

## Items Directory Routes

| Route       | Returns                              |
| ----------- | ------------------------------------ |
| `/items`    | Returns the complete list of 5 books |
| `/items/1`  | Returns the book with ID 1           |
| `/items/99` | Returns "Item not found"             |

## Use of `req.url.split()`

The `req.url.split('/')` method splits the URL into parts using `/` as the separator. It is used to extract the ID from dynamic routes such as `/students/1` and `/items/1`.

## Array Methods Used

* `find()` is used to find a student or item with a specific ID.
* `filter()` is used to return only students belonging to the BCA course.

## Practical Description

This lab demonstrates how to build dynamic routes in a Node.js HTTP server. The server reads values from the URL, returns specific data based on the requested ID, uses `find()` and `filter()` with real request data, and handles invalid or missing records with appropriate error messages.

## Lab 03 Files

* `students-server.js` – Node.js server containing student and item routes
* `students-output.png` – Screenshot of student API outputs
* `items-output.png` – Screenshot of item API outputs
