# Student Record Lookup Using Binary Search

A web-based **Student Record Lookup System** that uses **Binary Search** to efficiently find student records using their roll numbers. The project also compares Binary Search with **Linear Search** based on the number of comparisons.

## Live Demo


[Open Student Record Lookup](https://student-record-lookup.ai.studio/)


## Problem Statement

A university may have thousands of student records identified by unique roll numbers. Searching for a particular student using Linear Search can require many comparisons.

This project uses **Binary Search** to make student record lookup more efficient when the records are sorted by roll number.

## Key Features

* Search student records using roll number
* Binary Search implementation
* Linear Search for performance comparison
* Student Found / Student Not Found result
* Display detailed student information
* Count comparisons for both algorithms
* Step-by-step Binary Search visualization
* Student Directory with complete student records
* Add new student records
* Filter students by name, roll number and branch
* View student marks, grades, semester, attendance and branch
* Support for different branches
* Compare Binary Search and Linear Search
* Demo search cases
* Test with different dataset sizes such as 24, 100 and 1000 student records
* View Binary Search and Linear Search algorithm code

## How It Works

1. Student records are arranged in sorted order by roll number.
2. The user enters a roll number to search.
3. Binary Search checks the middle record.
4. If the target is smaller, it searches the left half.
5. If the target is larger, it searches the right half.
6. The process continues until the student is found or the search range becomes empty.
7. The system displays the student details and comparison count.
8. Linear Search is also performed to compare the number of comparisons.

## Complexity Analysis

| Algorithm     | Best Case | Average Case | Worst Case | Space |
| ------------- | --------- | ------------ | ---------- | ----- |
| Binary Search | O(1)      | O(log n)     | O(log n)   | O(1)  |
| Linear Search | O(1)      | O(n)         | O(n)       | O(1)  |

**Binary Search uses the Divide and Conquer paradigm.**

## Technology Used

* React
* TypeScript
* Vite
* HTML
* CSS
* GitHub

## Project Structure

```text
student-record-lookup/
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
├── README.md
└── src/
    ├── components/
    ├── data/
    ├── types/
    ├── utils/
    ├── App.tsx
    ├── index.css
    └── main.tsx
```

## Project Modules

### Search

Allows the user to search for a student using the roll number and displays whether the student is found or not found.

### Comparison

Compares **Binary Search** and **Linear Search** by displaying the number of comparisons required by each algorithm.

### Student Directory

Displays complete student records including roll number, student name, branch, marks, grade, semester and attendance. Students can be filtered using available search and branch filters.

### Algorithm Code

Displays the implemented Binary Search and Linear Search code for reference.

### Dataset

The application supports different dataset sizes, including **24, 100 and 1000 student records**, to demonstrate how the algorithms perform as the number of records increases.

### Demo

Provides different predefined search cases to demonstrate the working of Binary Search and comparison with Linear Search.

### Add Student

Allows new student records to be added to the student directory.

## Project Purpose

This project demonstrates how **Binary Search** can reduce the number of comparisons required to search sorted student records compared with **Linear Search**. It also provides an interactive interface to visualize the search process and explore student records.

## Future Scope

* Connect the application to a database for storing larger amounts of student data.
* Add login and authentication features.
* Add more advanced filtering and search options.
* Support larger datasets and real-time student record management.
