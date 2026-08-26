# Lab 05 – Simulating a Food Delivery Tracker

**Lab Number:** 05  
**Date:** 26 August 2026

## Objective

This lab demonstrates asynchronous JavaScript using callbacks, Promises, async/await, Promise chaining, and Promise.all().

## Files and Their Purpose

1. **callback-version.js** – Demonstrates nested callbacks for placing, tracking, and confirming a food delivery order.
2. **promise-version.js** – Demonstrates Promises with fulfilled and rejected states using `.then()` and `.catch()`.
3. **chaining-version.js** – Demonstrates sequential Promise chaining for the complete order lifecycle.
4. **async-await-version.js** – Demonstrates the same order lifecycle using async/await with try/catch.
5. **concurrent-orders.js** – Demonstrates running multiple orders concurrently using Promise.all().

## Reflection

The lab also explains how the Event Loop handles asynchronous operations and why Promise.all() can complete concurrent tasks faster than sequential await calls.