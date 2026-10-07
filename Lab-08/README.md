# Lab 08 - Integrated Node.js Lab Server

This lab integrates Lab 01 to Lab 07 into one Node.js server. It provides a single place to access lab information, APIs, screenshots, logs and selected script outputs.

## Problem Statement

The previous Node.js labs were developed separately. It was difficult to access different lab work, source files, outputs and screenshots from one place.

Therefore, an integrated Node.js server was created to organize and connect the previous laboratory work through one application.

## Objective

The main objectives of Lab 08 are:

* Integrate Lab 01 to Lab 07 into one server.
* Provide routes to access laboratory information.
* Provide APIs for server and dashboard information.
* Execute selected Node.js scripts safely.
* Display laboratory screenshots.
* Maintain request logs.
* Apply basic security and error handling.

## Proposed Solution

The solution is an integrated Node.js server that uses HTTP routing, File System, EventEmitter and Child Process modules.

The server provides a dashboard where users can access the laboratory work and also provides APIs for health checking, lab information and project statistics.

## Technologies Used

* Node.js
* HTTP Module
* File System Module
* EventEmitter
* Child Process
* `require()` and modules
* HTML
* CSS
* JSON

## Lab Structure

The integrated server contains the following labs:

### Lab 01 - Node.js HTTP Server

Created a basic HTTP server and worked with routes, requests and responses.

### Lab 02 - Node.js Fundamentals

Worked with Node.js basics, modules and core concepts.

### Lab 03 - Student Directory API

Created a Student Directory API using student data, routes, arrays, objects and JSON.

### Lab 04 - Advanced Student API

Implemented filtering, searching, sorting and query parameters.

### Lab 05 - Food Delivery Tracker

Demonstrated callbacks, Promises, Promise chaining, async/await and Promise.all().

### Lab 06 - File System Module

Worked with reading, writing, appending and deleting files using the Node.js File System module.

### Lab 07 - EventEmitter and Event-Driven Programming

Implemented custom events, multiple listeners, once-only listeners and error handling using EventEmitter.

### Lab 08 - Integrated Node.js Lab Server

Combined the previous laboratory concepts into one integrated Node.js server with routing, APIs, logging, screenshots, script execution and security.

## Key Features

### 1. Lab Integration

Provides one central server for accessing Lab 01 to Lab 07.

### 2. Lab Information

The server provides information about each laboratory through routes and APIs.

### 3. Script Execution

Selected Node.js scripts from Lab 05, Lab 06 and Lab 07 can be executed through the server.

### 4. Screenshot Viewer

Laboratory screenshots are stored and can be accessed through the screenshot route.

### 5. Health API

The `/health` route checks whether the Node.js Lab Server is running.

### 6. Dashboard API

The `/api/dashboard` route provides statistics about the integrated project.

### 7. Request Logging

Each request is logged using EventEmitter and the File System module.

### 8. Security

Only approved script files can be executed. Other files are rejected by the server.

## Main Routes and APIs

| Route                         | Purpose                             |
| ----------------------------- | ----------------------------------- |
| `/`                           | Main Node.js Lab dashboard          |
| `/about`                      | About the portfolio                 |
| `/health`                     | Checks server health                |
| `/labs`                       | Displays all labs                   |
| `/labs/:id`                   | Displays individual lab information |
| `/labs/:id/run?file=filename` | Executes an approved script         |
| `/screenshots/:name`          | Displays a laboratory screenshot    |
| `/api/dashboard`              | Displays project statistics         |

## Security

The server does not allow arbitrary files to be executed.

A list of approved files is maintained for each script-based lab. If a requested file is not present in the allowed list, the server returns:

```json
{
  "error": "This file is not allowed to run"
}
```

This prevents unauthorized files from being executed through the URL.

Invalid lab routes are also handled with appropriate error responses.

## Request Logging

A custom request logger is implemented using Node.js `EventEmitter`.

For each request, the following information is recorded:

* Date and time
* HTTP request method
* Requested URL

The logs are stored in:

```text
Lab-08/logs/server.log
```

This makes it possible to monitor requests received by the server.

## Dashboard Statistics

The dashboard API provides information such as:

* Total labs
* Server labs
* Script labs
* Number of screenshots
* Number of log lines
* Total students
* BCA students
* BIT students

Example project statistics during testing:

```text
Total Labs       : 8
Server Labs      : 4
Script Labs      : 3
Screenshots      : 23+
Total Students   : 12
BCA Students     : 6
BIT Students     : 6
```

The number of log lines increases whenever new requests are made to the server.

## Screenshots

All laboratory screenshots are stored in:

```text
Lab-08/public/screenshots
```

Final Lab 08 screenshots include:

* `lab08-dashboard.png`
* `lab08-health.png`
* `lab08-labs-api.png`
* `lab08-lab-details.png`
* `lab08-dashboard-api.png`
* `lab08-script-execution.png`
* `lab08-security.png`

These screenshots provide evidence of the working dashboard, APIs, script execution and security feature.

## Server Configuration

The integrated server is currently run locally on:

```text
http://localhost:4000
```

The server is started using:

```bash
node server.js
```

from the main `NodeJS-Lab` folder.

## Testing Performed

The following features were tested successfully:

* `/health` API
* `/labs` API
* `/labs/08` API
* `/api/dashboard` API
* Screenshot route
* Script execution route
* Security check for unauthorized files
* Request logging
* Lab 08 dashboard UI

## What I Learned

Through Lab 08, I learned:

* How to integrate different Node.js concepts into one project.
* How to create and manage HTTP routes.
* How APIs can provide server and project information.
* How EventEmitter can be used for request logging.
* How Child Process can execute selected Node.js programs.
* How File System can be used for logs and screenshots.
* How to apply basic security checks.
* How to handle errors and invalid requests.
* How different Node.js modules can work together in one application.

## Conclusion

Lab 08 combines the major concepts learned throughout the Node.js laboratory into one integrated application.

The project provides a single place to access laboratory information, APIs, screenshots and selected script outputs. It also demonstrates request logging, error handling and basic security.

This lab helped me understand how individual Node.js concepts can be combined to build a complete server-based application.
