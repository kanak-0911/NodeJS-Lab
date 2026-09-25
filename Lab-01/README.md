# Node.js Lab 04

## Student Details

- Student Name: Kanak
- Scholar Number: 23145009
- Course: BCA
- Semester: VII
- Lab Number: 04

## Advanced Student API

This lab demonstrates filtering, searching, sorting, query parameters, input validation, and combining route parameters with query parameters.

## Supported Routes and Query Parameters

| Route / Parameter | Description |
|---|---|
| `/students` | Returns all students |
| `?course=BCA` | Filters students by course |
| `?minMarks=60` | Returns students with marks greater than or equal to 60 |
| `?search=a` | Searches student names partially and case-insensitively |
| `?sort=marks&order=desc` | Sorts students by marks from highest to lowest |
| `?sort=name&order=asc` | Sorts students alphabetically |
| `/students/course/BCA` | Filters students by course using a route parameter |

## Example URLs

- `/students?course=BCA`
- `/students?minMarks=60`
- `/students?search=a`
- `/students?sort=marks&order=desc`
- `/students?sort=name&order=asc`
- `/students/course/BCA?minMarks=60&sort=marks&order=desc`

## Combined Example

`/students?course=BCA&minMarks=60&search=a&sort=marks&order=desc`

This combines course filtering, minimum marks filtering, name searching, and sorting.

## Input Validation

The server checks query input before processing it. If `minMarks` is not a number or an invalid sort field is provided, the server returns a 400 error with a clear JSON message instead of crashing.

## Sorting

The API supports sorting by `name` or `marks`. If the order is not provided, ascending order is used by default.

## Bonus Challenge

The route `/students/course/BCA` reads the course from the URL path and can also use query parameters such as `minMarks`, `sort`, and `order`.