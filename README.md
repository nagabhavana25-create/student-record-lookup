# Student Record Lookup — University Search System

A high-performance student record lookup and algorithm benchmarking web application built for university scale and college hackathons. Demonstrates how **Binary Search ($O(\log_2 N)$)** outperforms **Linear Search ($O(N)$)** when searching sorted student roll numbers.

---

## 🌟 Key Features

- **Binary Search ($O(\log_2 N)$)**: Searches sorted student records using iterative divide-and-conquer, tracking exact comparisons.
- **Linear Search ($O(N)$)**: Runs simultaneous sequential search to provide a live baseline comparison.
- **Side-by-Side Comparison Scoreboard**: Displays comparisons made by both algorithms, efficiency multiplier (e.g. 14.5× faster), and saved operations.
- **Interactive Step-by-Step Visualizer**: Visual array strip with `Low (L)`, `Mid (M)`, and `High (H)` pointer tags, eliminated interval dimming, and playback controls (Play, Pause, Step Next/Prev, Speed).
- **Student Details Display**: Full academic profiles including marks, percentage progress bar, letter grade, attendance, semester, and official university email.
- **Student Not Found Handling**: Clear explanation when a roll number does not exist, explaining the `low > high` termination condition and showing the nearest existing records.
- **Hackathon Demo Presets**: Instant 1-click test cases for **Best Case** (middle element, 1 step), **Worst Case** (last element), **First Element**, **Random Student**, and **Not Found Test** (`99999`).
- **Scalability Dataset Switcher**: Test across **24 Records**, **100 Campus Records**, and **1,000 University Records** to show real-world logarithmic scaling.
- **Student Directory Table**: Searchable and filterable by engineering branch with click-to-lookup functionality.
- **Add Student Modal**: Add new student records with roll-number uniqueness verification and automatic sorted insertion.
- **Algorithm Code Reference**: Clean implementations in JavaScript, Python, and C++ with complexity analysis.

---

## 🚀 Quick Start & Local Setup

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or pnpm or bun

### Installation

1. Clone or extract the project files:
```bash
git clone https://github.com/nagabhavana25-create/student-record-lookup.git
cd student-record-lookup
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

5. To create a production build:
```bash
npm run build
```

---

## 📊 Time & Space Complexity

| Algorithm | Best Case | Average Case | Worst Case (Not Found) | Space Complexity | Prerequisite |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Binary Search** | $O(1)$ | $O(\log_2 N)$ | $O(\log_2 N)$ | $O(1)$ | Array must be strictly sorted by Roll No |
| **Linear Search** | $O(1)$ | $O(N/2)$ | $O(N)$ | $O(1)$ | Works on unsorted data |

For a university of **1,000 students**, Binary Search finds any student in at most **10 comparisons**, while Linear Search can take up to **1,000 comparisons**.

---

## 🛠️ Tech Stack

- **Framework**: React 19 + TypeScript
- **Styling**: Tailwind CSS v4
- **Icons**: Lucide React
- **Animations**: Motion
- **Bundler**: Vite

---

## 📝 License

Distributed under the Apache-2.0 License.
