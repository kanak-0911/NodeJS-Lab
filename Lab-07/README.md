# Lab 07 – EventEmitter and Event-Driven Programming

**Lab Number:** 07
**Date:** 03 October 2026

## Files

* `events-basic.js` – Demonstrates creating and triggering a custom event using EventEmitter.
* `once-only-listener.js` – Demonstrates the difference between `on()` and `once()`.
* `error-handling.js` – Demonstrates what happens when an error event has no listener.
* `error-handling-fixed.js` – Demonstrates safe handling of the error event.
* `multiple-listeners.js` – Demonstrates multiple listeners responding to the same event.
* `notify-student.js` – Demonstrates extending EventEmitter with a custom NotificationCenter class.
* `order-tracker.js` – Demonstrates an order tracking system using events, listeners, `once()`, error handling and `setTimeout()`.

## Problems Faced

### Task 4

**Issue:** `once-only-listener.js` was initially missing.

**Solution:** Checked the Lab-07 folder, created the missing file and added the required code.

### Task 5

**Issue:** `error-handling.js` was initially missing.

**Solution:** Created the file and tested the error event without an error listener. Then created `error-handling-fixed.js` to handle the error safely.

## Learning Outcome

In this lab, I learned how EventEmitter works in Node.js. I learned how to create custom events, use multiple listeners, use `once()` and handle errors safely. I also learned how EventEmitter can be extended to create a small event-driven application.
