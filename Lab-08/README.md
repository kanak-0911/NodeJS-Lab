# Lab 08 - Integrated Node.js Lab Server

This lab integrates Lab 01 to Lab 07 into one Node.js server.

## Objective

The main objective of Lab 08 is to create a single Node.js server that can access and demonstrate the work completed in previous labs.

The server provides:

* Lab information and source code
* Server-based lab routes
* Script execution for selected labs
* Screenshots of lab work
* Health and dashboard APIs
* Request logging
* Error handling and security

## Technologies Used

* Node.js
* HTTP Module
* File System Module
* EventEmitter
* Child Process
* `require()` and `module.exports`
* `slugify`
* HTML, CSS and JSON

## Lab Structure

The integrated server contains the following labs:

### Lab 01

**Node.js HTTP Server**

Basic HTTP server and routing using Node.js.

### Lab 02

**Node.js Fundamentals**

Node.js fundamentals, modules, routes and JSON responses.

### Lab 03

**Student Directory**

Student data, routes and HTTP responses.

### Lab 04

**Advanced Student Server**

Filtering, searching, sorting and query parameters.

### Lab 05

**Food Delivery Tracker**

Demonstrates callbacks, promises, promise chaining, async-await and concurrent operations.

### Lab 06

**File System Module**

Demonstrates reading, writing, appending and deleting files using the Node.js File System module.

### Lab 07

**EventEmitter and Event-Driven Programming**

Demonstrates EventEmitter, listeners, error handling and event-driven programming.

## Main Routes

| Route                         | Purpose                                   |
| ----------------------------- | ----------------------------------------- |
| `/`                           | Main Lab 08 portal                        |
| `/about`                      | About the portfolio                       |
| `/health`                     | Checks server health                      |
| `/labs`                       | Displays all labs                         |
| `/labs/:id`                   | Displays details and source code of a lab |
| `/labs/:id/run?file=filename` | Runs an allowed script file               |
| `/labs/:id/app/...`           | Runs routes of server-based labs          |
| `/screenshots/:name`          | Displays a lab screenshot                 |
| `/api/dashboard`              | Displays dashboard statistics             |

## Security

The server does not allow arbitrary files to be executed.

Only the files listed for a particular lab in `labs.js` can be executed. This prevents users from running other files through the URL.

Invalid routes return a JSON 404 response.

Unexpected server errors are handled so that the server does not crash.

## Request Logging

A custom logger is implemented using Node.js `EventEmitter` and the File System module.

Each request is logged with:

* Date and time
* Request method
* Requested URL

The logs are stored in:

`Lab-08/logs/server.log`

## Server Configuration

The server uses:

```text
PORT = process.env.PORT || 3000
```

The server listens on:

```text
0.0.0.0
```

This allows the application to run locally and also on a deployment platform such as Render.

## Screenshots

Screenshots of the labs are stored in:

`Lab-08/public/screenshots`

They are used to show the output and work completed in previous labs.

## Running the Project

From the main `NodeJS-Lab` folder, run:

```bash
node Lab-08/server.js
```

Then open:

```text
http://localhost:3000
```

## Dashboard API

The `/api/dashboard` route provides information such as:

* Total number of labs
* Number of server labs
* Number of script labs
* Number of screenshots
* Number of log lines

## Conclusion

Lab 08 combines the previous Node.js labs into one integrated application. It demonstrates modules, routing, file handling, EventEmitter, child processes, error handling, logging, security and API responses in a single project.
