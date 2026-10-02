import JSZip from 'jszip';

export async function downloadProjectZip() {
  const zip = new JSZip();

  // Root config files
  zip.file('.gitignore', `node_modules/
build/
dist/
coverage/
.DS_Store
*.log
.env*
!.env.example
`);

  zip.file('.env.example', `# GEMINI_API_KEY: Optional if AI features are added
GEMINI_API_KEY="MY_GEMINI_API_KEY"

# APP_URL: The URL where this applet is hosted.
APP_URL="http://localhost:3000"
`);

  zip.file('metadata.json', JSON.stringify({
    name: "Student Record Lookup",
    description: "Fast university student record lookup using Binary Search with comparison metrics against Linear Search, step-by-step visual trace, and hackathon dashboard.",
    requestFramePermissions: [],
    majorCapabilities: ["MAJOR_CAPABILITY_SERVER_SIDE_GEMINI_API"]
  }, null, 2));

  zip.file('package.json', JSON.stringify({
    name: "student-record-lookup",
    private: true,
    version: "1.0.0",
    type: "module",
    scripts: {
      dev: "vite --port=3000 --host=0.0.0.0",
      build: "vite build",
      preview: "vite preview",
      lint: "tsc --noEmit"
    },
    dependencies: {
      "@tailwindcss/vite": "^4.3.3",
      "@vitejs/plugin-react": "^6.1.1",
      "jszip": "^3.10.2",
      "lucide-react": "^0.546.0",
      "motion": "^12.23.24",
      "react": "^19.0.1",
      "react-dom": "^19.0.1",
      "vite": "^8.3.0"
    },
    devDependencies: {
      "@types/node": "^22.14.0",
      "@types/react": "^19.3.0",
      "@types/react-dom": "^19.3.0",
      "tailwindcss": "^4.3.3",
      "typescript": "^7.0.2"
    }
  }, null, 2));

  zip.file('tsconfig.json', JSON.stringify({
    compilerOptions: {
      target: "ES2022",
      experimentalDecorators: true,
      useDefineForClassFields: false,
      module: "ESNext",
      types: ["vite/client"],
      lib: ["ES2022", "DOM", "DOM.Iterable"],
      skipLibCheck: true,
      moduleResolution: "bundler",
      isolatedModules: true,
      moduleDetection: "force",
      allowJs: true,
      jsx: "react-jsx",
      paths: {
        "@/*": ["./*"]
      },
      allowImportingTsExtensions: true,
      noEmit: true
    }
  }, null, 2));

  zip.file('vite.config.ts', `import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      port: 3000,
      host: '0.0.0.0',
    },
  };
});
`);

  zip.file('index.html', `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Student Record Lookup — University Search System</title>
    <meta name="description" content="Fast university student record lookup using Binary Search with comparison metrics against Linear Search, step-by-step visual trace, and hackathon dashboard." />
    <meta property="og:title" content="Student Record Lookup — University Search System" />
    <meta property="og:description" content="Fast university student record lookup using Binary Search with comparison metrics against Linear Search, step-by-step visual trace, and hackathon dashboard." />
    <meta property="og:type" content="website" />
    <meta name="twitter:card" content="summary_large_image" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet" />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
`);

  zip.file('README.md', `# Student Record Lookup — University Search System

A high-performance student record lookup and algorithm benchmarking web application built for university scale and college hackathons. Demonstrates how **Binary Search (O(log₂ N))** outperforms **Linear Search (O(N))** when searching sorted student roll numbers.

---

## 🌟 Key Features

- **Binary Search (O(log₂ N))**: Searches sorted student records using iterative divide-and-conquer, tracking exact comparisons.
- **Linear Search (O(N))**: Runs simultaneous sequential search to provide a live baseline comparison.
- **Side-by-Side Comparison Scoreboard**: Displays comparisons made by both algorithms, efficiency multiplier (e.g. 14.5× faster), and saved operations.
- **Interactive Step-by-Step Visualizer**: Visual array strip with Low (L), Mid (M), and High (H) pointer tags, eliminated interval dimming, and playback controls (Play, Pause, Step Next/Prev, Speed).
- **Student Details Display**: Full academic profiles including marks, percentage progress bar, letter grade, attendance, semester, and official university email.
- **Student Not Found Handling**: Clear explanation when a roll number does not exist, explaining the low > high termination condition and showing nearest existing records.
- **Hackathon Demo Presets**: Instant 1-click test cases for Best Case (middle element, 1 step), Worst Case (last element), First Element, Random Student, and Not Found Test (99999).
- **Scalability Dataset Switcher**: Test across 24 Records, 100 Campus Records, and 1,000 University Records to show real-world logarithmic scaling.
- **Student Directory Table**: Searchable and filterable by engineering branch with click-to-lookup functionality.
- **Add Student Modal**: Add new student records with roll-number uniqueness verification and automatic sorted insertion.
- **Algorithm Code Reference**: Clean implementations in JavaScript, Python, and C++ with complexity analysis.

---

## 🚀 Quick Start & Local Setup

### Prerequisites
- Node.js (v18 or higher recommended)
- npm, pnpm, or bun

### Installation

1. Clone or extract the project files:
\`\`\`bash
git clone https://github.com/nagabhavana25-create/student-record-lookup.git
cd student-record-lookup
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
\`\`\`

3. Run the development server:
\`\`\`bash
npm run dev
\`\`\`

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

5. To create a production build:
\`\`\`bash
npm run build
\`\`\`

---

## 📊 Time & Space Complexity

| Algorithm | Best Case | Average Case | Worst Case (Not Found) | Space Complexity | Prerequisite |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Binary Search** | O(1) | O(log₂ N) | O(log₂ N) | O(1) | Array must be strictly sorted by Roll No |
| **Linear Search** | O(1) | O(N/2) | O(N) | O(1) | Works on unsorted data |

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
`);

  // src/ files
  const src = zip.folder('src')!;

  src.file('main.tsx', `import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(<App />);
`);

  src.file('index.css', `@import "tailwindcss";

@layer base {
  body {
    font-family: 'Plus Jakarta Sans', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    color: #0f172a;
    background-color: #f8fafc;
    -webkit-font-smoothing: antialiased;
  }

  code, pre, .font-mono {
    font-family: 'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  }
}
`);

  src.file('types/student.ts', `export interface StudentRecord {
  rollNo: number;
  name: string;
  branch: string;
  marks: number;
  semester: number;
  email: string;
  attendance: number;
  grade: string;
}

export interface BinarySearchStep {
  step: number;
  low: number;
  high: number;
  mid: number;
  midRollNo: number;
  targetRollNo: number;
  comparison: 'less' | 'greater' | 'equal';
  action: string;
}

export interface SearchResult {
  targetRollNo: number;
  found: boolean;
  student: StudentRecord | null;
  index: number;
  binaryComparisons: number;
  linearComparisons: number;
  binarySteps: BinarySearchStep[];
  timestamp: number;
}
`);

  src.file('data/sampleStudents.ts', `import { StudentRecord } from '../types/student';

export function calculateGrade(marks: number): string {
  if (marks >= 90) return 'A+';
  if (marks >= 80) return 'A';
  if (marks >= 70) return 'B+';
  if (marks >= 60) return 'B';
  if (marks >= 50) return 'C';
  return 'F';
}

export const INITIAL_STUDENTS: StudentRecord[] = [
  {
    rollNo: 10101,
    name: 'Aarav Sharma',
    branch: 'Computer Science',
    marks: 94.5,
    semester: 6,
    email: 'aarav.sharma@univ.edu',
    attendance: 96,
    grade: 'A+'
  },
  {
    rollNo: 10103,
    name: 'Ananya Deshmukh',
    branch: 'Data Science',
    marks: 88.0,
    semester: 4,
    email: 'ananya.d@univ.edu',
    attendance: 91,
    grade: 'A'
  },
  {
    rollNo: 10106,
    name: 'Bhavana Naga',
    branch: 'Computer Science',
    marks: 96.2,
    semester: 6,
    email: 'bhavana.n@univ.edu',
    attendance: 98,
    grade: 'A+'
  },
  {
    rollNo: 10109,
    name: 'Chirag Mehra',
    branch: 'Information Technology',
    marks: 79.5,
    semester: 6,
    email: 'chirag.m@univ.edu',
    attendance: 84,
    grade: 'B+'
  },
  {
    rollNo: 10112,
    name: 'Devansh Kulkarni',
    branch: 'Electronics & Comm.',
    marks: 82.4,
    semester: 4,
    email: 'devansh.k@univ.edu',
    attendance: 89,
    grade: 'A'
  },
  {
    rollNo: 10115,
    name: 'Diya Sengupta',
    branch: 'Artificial Intelligence',
    marks: 91.0,
    semester: 4,
    email: 'diya.s@univ.edu',
    attendance: 95,
    grade: 'A+'
  },
  {
    rollNo: 10118,
    name: 'Eshaan Verma',
    branch: 'Mechanical Engineering',
    marks: 73.5,
    semester: 6,
    email: 'eshaan.v@univ.edu',
    attendance: 82,
    grade: 'B+'
  },
  {
    rollNo: 10121,
    name: 'Farhan Akhtar',
    branch: 'Electrical Engineering',
    marks: 85.0,
    semester: 6,
    email: 'farhan.a@univ.edu',
    attendance: 88,
    grade: 'A'
  },
  {
    rollNo: 10124,
    name: 'Gauri Nambiar',
    branch: 'Biotechnology',
    marks: 89.5,
    semester: 4,
    email: 'gauri.n@univ.edu',
    attendance: 93,
    grade: 'A'
  },
  {
    rollNo: 10127,
    name: 'Harsh Vardhan',
    branch: 'Computer Science',
    marks: 68.0,
    semester: 6,
    email: 'harsh.v@univ.edu',
    attendance: 76,
    grade: 'B'
  },
  {
    rollNo: 10130,
    name: 'Ishita Roy',
    branch: 'Data Science',
    marks: 92.8,
    semester: 4,
    email: 'ishita.r@univ.edu',
    attendance: 97,
    grade: 'A+'
  },
  {
    rollNo: 10133,
    name: 'Kabir Singhania',
    branch: 'Information Technology',
    marks: 84.2,
    semester: 6,
    email: 'kabir.s@univ.edu',
    attendance: 87,
    grade: 'A'
  },
  {
    rollNo: 10136,
    name: 'Lavanya Iyer',
    branch: 'Electronics & Comm.',
    marks: 77.5,
    semester: 4,
    email: 'lavanya.i@univ.edu',
    attendance: 83,
    grade: 'B+'
  },
  {
    rollNo: 10139,
    name: 'Manish Pandey',
    branch: 'Mechanical Engineering',
    marks: 71.0,
    semester: 6,
    email: 'manish.p@univ.edu',
    attendance: 80,
    grade: 'B'
  },
  {
    rollNo: 10142,
    name: 'Neha Chawla',
    branch: 'Artificial Intelligence',
    marks: 95.0,
    semester: 4,
    email: 'neha.c@univ.edu',
    attendance: 99,
    grade: 'A+'
  },
  {
    rollNo: 10145,
    name: 'Omkar Patil',
    branch: 'Computer Science',
    marks: 81.5,
    semester: 6,
    email: 'omkar.p@univ.edu',
    attendance: 85,
    grade: 'A'
  },
  {
    rollNo: 10148,
    name: 'Pooja Hegde',
    branch: 'Civil Engineering',
    marks: 76.0,
    semester: 6,
    email: 'pooja.h@univ.edu',
    attendance: 86,
    grade: 'B+'
  },
  {
    rollNo: 10151,
    name: 'Pranav Joshi',
    branch: 'Electrical Engineering',
    marks: 83.8,
    semester: 4,
    email: 'pranav.j@univ.edu',
    attendance: 89,
    grade: 'A'
  },
  {
    rollNo: 10154,
    name: 'Rhea Chakraborty',
    branch: 'Biotechnology',
    marks: 90.5,
    semester: 4,
    email: 'rhea.c@univ.edu',
    attendance: 94,
    grade: 'A+'
  },
  {
    rollNo: 10157,
    name: 'Rohan Gupta',
    branch: 'Computer Science',
    marks: 87.2,
    semester: 6,
    email: 'rohan.g@univ.edu',
    attendance: 90,
    grade: 'A'
  },
  {
    rollNo: 10160,
    name: 'Sanya Mirza',
    branch: 'Information Technology',
    marks: 86.4,
    semester: 6,
    email: 'sanya.m@univ.edu',
    attendance: 92,
    grade: 'A'
  },
  {
    rollNo: 10163,
    name: 'Tanmay Bhatt',
    branch: 'Artificial Intelligence',
    marks: 78.0,
    semester: 4,
    email: 'tanmay.b@univ.edu',
    attendance: 81,
    grade: 'B+'
  },
  {
    rollNo: 10166,
    name: 'Varun Dhawan',
    branch: 'Mechanical Engineering',
    marks: 74.8,
    semester: 6,
    email: 'varun.d@univ.edu',
    attendance: 84,
    grade: 'B+'
  },
  {
    rollNo: 10170,
    name: 'Zoya Akhtar',
    branch: 'Data Science',
    marks: 97.5,
    semester: 4,
    email: 'zoya.a@univ.edu',
    attendance: 99,
    grade: 'A+'
  }
];

export function generateSortedStudents(count: number): StudentRecord[] {
  const firstNames = ['Aarav', 'Aditi', 'Advait', 'Ananya', 'Aryan', 'Bhavana', 'Chirag', 'Devansh', 'Diya', 'Eshaan', 'Fatima', 'Gauri', 'Harsh', 'Ishaan', 'Janhavi', 'Kabir', 'Kavya', 'Lavanya', 'Manish', 'Neha', 'Omkar', 'Pooja', 'Pranav', 'Rhea', 'Rohan', 'Sakshi', 'Siddharth', 'Tanvi', 'Utkarsh', 'Varun', 'Vedant', 'Yash', 'Zoya'];
  const lastNames = ['Sharma', 'Verma', 'Patel', 'Reddy', 'Nair', 'Iyer', 'Deshmukh', 'Kulkarni', 'Mehra', 'Sengupta', 'Chawla', 'Gupta', 'Bhatt', 'Rao', 'Singhania', 'Joshi', 'Chakraborty', 'Hegde', 'Nambiar', 'Patil'];
  const branches = ['Computer Science', 'Information Technology', 'Artificial Intelligence', 'Data Science', 'Electronics & Comm.', 'Electrical Engineering', 'Mechanical Engineering', 'Civil Engineering', 'Biotechnology'];

  const results: StudentRecord[] = [];
  let currentRoll = 10001;

  for (let i = 0; i < count; i++) {
    currentRoll += Math.floor(Math.random() * 3) + 1;
    const fName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lName = lastNames[Math.floor(Math.random() * lastNames.length)];
    const branch = branches[Math.floor(Math.random() * branches.length)];
    const marks = +(65 + Math.random() * 33).toFixed(1);
    const semester = [2, 4, 6, 8][Math.floor(Math.random() * 4)];
    const attendance = Math.floor(75 + Math.random() * 25);

    results.push({
      rollNo: currentRoll,
      name: \`\${fName} \${lName}\`,
      branch,
      marks,
      semester,
      email: \`\${fName.toLowerCase()}.\${lName.toLowerCase()}\${currentRoll % 100}@univ.edu\`,
      attendance,
      grade: calculateGrade(marks)
    });
  }

  return results.sort((a, b) => a.rollNo - b.rollNo);
}
`);

  src.file('utils/searchAlgorithms.ts', `import { StudentRecord, BinarySearchStep, SearchResult } from '../types/student';

export interface BinarySearchResult {
  found: boolean;
  student: StudentRecord | null;
  index: number;
  comparisons: number;
  steps: BinarySearchStep[];
}

export interface LinearSearchResult {
  found: boolean;
  student: StudentRecord | null;
  index: number;
  comparisons: number;
}

export function executeBinarySearch(
  records: StudentRecord[],
  targetRollNo: number
): BinarySearchResult {
  let low = 0;
  let high = records.length - 1;
  let comparisons = 0;
  const steps: BinarySearchStep[] = [];

  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    const midRecord = records[mid];
    comparisons++;

    if (midRecord.rollNo === targetRollNo) {
      steps.push({
        step: steps.length + 1,
        low,
        high,
        mid,
        midRollNo: midRecord.rollNo,
        targetRollNo,
        comparison: 'equal',
        action: \`Target \${targetRollNo} equals record at index \${mid} (\${midRecord.name}). Match found!\`
      });
      return {
        found: true,
        student: midRecord,
        index: mid,
        comparisons,
        steps
      };
    } else if (midRecord.rollNo < targetRollNo) {
      steps.push({
        step: steps.length + 1,
        low,
        high,
        mid,
        midRollNo: midRecord.rollNo,
        targetRollNo,
        comparison: 'less',
        action: \`Target \${targetRollNo} is greater than \${midRecord.rollNo} at mid index \${mid}. Eliminating left half [\${low}...\${mid}]. Shifting low pointer to \${mid + 1}.\`
      });
      low = mid + 1;
    } else {
      steps.push({
        step: steps.length + 1,
        low,
        high,
        mid,
        midRollNo: midRecord.rollNo,
        targetRollNo,
        comparison: 'greater',
        action: \`Target \${targetRollNo} is less than \${midRecord.rollNo} at mid index \${mid}. Eliminating right half [\${mid}...\${high}]. Shifting high pointer to \${mid - 1}.\`
      });
      high = mid - 1;
    }
  }

  return {
    found: false,
    student: null,
    index: -1,
    comparisons,
    steps
  };
}

export function executeLinearSearch(
  records: StudentRecord[],
  targetRollNo: number
): LinearSearchResult {
  let comparisons = 0;

  for (let i = 0; i < records.length; i++) {
    comparisons++;
    if (records[i].rollNo === targetRollNo) {
      return {
        found: true,
        student: records[i],
        index: i,
        comparisons
      };
    }
  }

  return {
    found: false,
    student: null,
    index: -1,
    comparisons
  };
}

export function runComparativeSearch(
  records: StudentRecord[],
  targetRollNo: number
): SearchResult {
  const binaryRes = executeBinarySearch(records, targetRollNo);
  const linearRes = executeLinearSearch(records, targetRollNo);

  return {
    targetRollNo,
    found: binaryRes.found,
    student: binaryRes.student,
    index: binaryRes.index,
    binaryComparisons: binaryRes.comparisons,
    linearComparisons: linearRes.comparisons,
    binarySteps: binaryRes.steps,
    timestamp: Date.now()
  };
}

export function getTheoreticalBounds(n: number) {
  const binaryWorst = Math.floor(Math.log2(n)) + 1;
  const binaryBest = 1;
  const binaryAvg = +(Math.log2(n) - 1).toFixed(1);

  const linearWorst = n;
  const linearBest = 1;
  const linearAvg = +((n + 1) / 2).toFixed(1);

  return {
    n,
    binary: { best: binaryBest, avg: binaryAvg, worst: binaryWorst, formula: 'O(log₂ N)' },
    linear: { best: linearBest, avg: linearAvg, worst: linearWorst, formula: 'O(N)' }
  };
}
`);

  src.file('components/Header.tsx', `import React from 'react';
import { Database, Plus, Sparkles, Download } from 'lucide-react';

interface HeaderProps {
  activeTab: 'search' | 'directory' | 'comparison' | 'code';
  setActiveTab: (tab: 'search' | 'directory' | 'comparison' | 'code') => void;
  datasetSize: number;
  onSetDatasetSize: (size: number) => void;
  onOpenAddModal: () => void;
  onRunDemo: () => void;
  onDownloadZip: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  datasetSize,
  onSetDatasetSize,
  onOpenAddModal,
  onRunDemo,
  onDownloadZip
}) => {
  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Zone 1: Single text element wordmark */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-indigo-600 text-white flex items-center justify-center shadow-xs font-semibold text-lg">
            S
          </div>
          <div>
            <span className="text-base font-bold text-slate-900 tracking-tight block leading-tight">
              Student Record Lookup
            </span>
            <span className="text-xs text-slate-500 font-medium">
              University Search System
            </span>
          </div>
        </div>

        {/* Zone 2: Navigation Tabs */}
        <nav className="hidden md:flex items-center gap-1 p-1 bg-slate-100 rounded-lg border border-slate-200/80">
          <button
            onClick={() => setActiveTab('search')}
            className={\`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap \${
              activeTab === 'search'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }\`}
          >
            Search & Trace
          </button>
          <button
            onClick={() => setActiveTab('comparison')}
            className={\`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap \${
              activeTab === 'comparison'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }\`}
          >
            Algorithm Comparison
          </button>
          <button
            onClick={() => setActiveTab('directory')}
            className={\`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap \${
              activeTab === 'directory'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }\`}
          >
            Student Directory
          </button>
          <button
            onClick={() => setActiveTab('code')}
            className={\`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap \${
              activeTab === 'code'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }\`}
          >
            Algorithm Code
          </button>
        </nav>

        {/* Zone 3: Actions */}
        <div className="flex items-center gap-2">
          {/* Dataset scale selector */}
          <div className="hidden sm:flex items-center gap-1 text-xs text-slate-600 border border-slate-200 rounded-lg p-1 bg-white">
            <span className="px-1.5 text-slate-400 font-medium">Dataset:</span>
            {[24, 100, 1000].map((size) => (
              <button
                key={size}
                onClick={() => onSetDatasetSize(size)}
                className={\`px-2 py-0.5 rounded text-xs font-semibold tabular-nums transition-colors \${
                  datasetSize === size
                    ? 'bg-indigo-50 text-indigo-700 font-bold border border-indigo-200'
                    : 'text-slate-600 hover:bg-slate-100'
                }\`}
                title={\`Load \${size} sorted records\`}
              >
                {size}
              </button>
            ))}
          </div>

          <button
            onClick={onDownloadZip}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 rounded-lg shadow-xs transition-colors whitespace-nowrap cursor-pointer"
            title="Download complete project files as ZIP for GitHub"
          >
            <Download className="w-3.5 h-3.5 text-indigo-600" />
            <span className="hidden sm:inline">Export ZIP</span>
            <span className="sm:hidden">ZIP</span>
          </button>

          <button
            onClick={onRunDemo}
            className="hidden md:flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors whitespace-nowrap"
            title="Run interactive visual demo"
          >
            <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
            <span>Quick Demo</span>
          </button>

          <button
            onClick={onOpenAddModal}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-xs transition-colors whitespace-nowrap"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Student</span>
          </button>
        </div>
      </div>
    </header>
  );
};
`);

  src.file('components/SearchControl.tsx', `import React, { useState } from 'react';
import { Search, X, Zap, Shuffle, AlertCircle, CornerDownRight } from 'lucide-react';
import { StudentRecord } from '../types/student';

interface SearchControlProps {
  onSearch: (rollNo: number) => void;
  students: StudentRecord[];
  currentSearchedRollNo: number | null;
}

export const SearchControl: React.FC<SearchControlProps> = ({
  onSearch,
  students,
  currentSearchedRollNo
}) => {
  const [inputValue, setInputValue] = useState<string>(
    currentSearchedRollNo ? String(currentSearchedRollNo) : ''
  );
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setErrorMsg(null);
    const trimmed = inputValue.trim();
    if (!trimmed) {
      setErrorMsg('Please enter a roll number to search.');
      return;
    }
    const rollNo = parseInt(trimmed, 10);
    if (isNaN(rollNo) || rollNo <= 0) {
      setErrorMsg('Please enter a valid positive numeric roll number.');
      return;
    }
    onSearch(rollNo);
  };

  const handleClear = () => {
    setInputValue('');
    setErrorMsg(null);
  };

  const handleBestCase = () => {
    if (students.length === 0) return;
    const midIndex = Math.floor((students.length - 1) / 2);
    const midRoll = students[midIndex].rollNo;
    setInputValue(String(midRoll));
    setErrorMsg(null);
    onSearch(midRoll);
  };

  const handleWorstCase = () => {
    if (students.length === 0) return;
    const lastRoll = students[students.length - 1].rollNo;
    setInputValue(String(lastRoll));
    setErrorMsg(null);
    onSearch(lastRoll);
  };

  const handleFirstElement = () => {
    if (students.length === 0) return;
    const firstRoll = students[0].rollNo;
    setInputValue(String(firstRoll));
    setErrorMsg(null);
    onSearch(firstRoll);
  };

  const handleRandom = () => {
    if (students.length === 0) return;
    const randomIndex = Math.floor(Math.random() * students.length);
    const randRoll = students[randomIndex].rollNo;
    setInputValue(String(randRoll));
    setErrorMsg(null);
    onSearch(randRoll);
  };

  const handleNotFound = () => {
    const maxRoll = students.length > 0 ? students[students.length - 1].rollNo : 10000;
    const absentRoll = maxRoll + 999;
    setInputValue(String(absentRoll));
    setErrorMsg(null);
    onSearch(absentRoll);
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
        <div>
          <h2 className="text-base font-semibold text-slate-900">
            Student Roll Number Search
          </h2>
          <p className="text-xs text-slate-500">
            Enter roll number to run Binary Search & Linear Search simultaneously.
          </p>
        </div>
        <div className="text-xs text-slate-500 font-mono flex items-center gap-1.5 self-start sm:self-auto">
          <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block"></span>
          <span>{students.length} Sorted Records</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2.5">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="number"
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
              if (errorMsg) setErrorMsg(null);
            }}
            placeholder="Enter Student Roll No (e.g. 10115, 10130)..."
            className="w-full pl-10 pr-9 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 font-mono transition"
          />
          {inputValue && (
            <button
              type="button"
              onClick={handleClear}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 transition"
              aria-label="Clear input"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        <button
          type="submit"
          className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white text-xs font-semibold rounded-lg shadow-xs transition-colors flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer"
        >
          <Search className="w-3.5 h-3.5" />
          <span>Search Record</span>
        </button>
      </form>

      {errorMsg && (
        <div className="mt-2.5 flex items-center gap-1.5 text-xs text-rose-600 font-medium">
          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      <div className="mt-4 pt-3.5 border-t border-slate-100">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium text-slate-500 flex items-center gap-1">
            <CornerDownRight className="w-3 h-3 text-slate-400" />
            Hackathon Demo Presets:
          </span>
          <span className="text-[11px] text-slate-400 hidden sm:inline">
            Click to test edge cases instantly
          </span>
        </div>

        <div className="flex flex-wrap gap-1.5">
          <button
            type="button"
            onClick={handleBestCase}
            className="px-2.5 py-1 text-xs font-medium bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 rounded-md transition-colors whitespace-nowrap flex items-center gap-1"
            title="Searches the exact middle element (Binary Search hits in 1 step)"
          >
            <Zap className="w-3 h-3 text-emerald-600" />
            <span>Best Case (Mid: 1 Step)</span>
          </button>

          <button
            type="button"
            onClick={handleWorstCase}
            className="px-2.5 py-1 text-xs font-medium bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 rounded-md transition-colors whitespace-nowrap"
            title="Searches the last element (Maximum binary and linear comparisons)"
          >
            Worst Case (Last item)
          </button>

          <button
            type="button"
            onClick={handleFirstElement}
            className="px-2.5 py-1 text-xs font-medium bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 rounded-md transition-colors whitespace-nowrap"
            title="First element: Linear search takes 1 step, Binary search takes log2(N) steps"
          >
            First Item (Idx 0)
          </button>

          <button
            type="button"
            onClick={handleRandom}
            className="px-2.5 py-1 text-xs font-medium bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 rounded-md transition-colors whitespace-nowrap flex items-center gap-1"
          >
            <Shuffle className="w-3 h-3 text-indigo-600" />
            <span>Random Student</span>
          </button>

          <button
            type="button"
            onClick={handleNotFound}
            className="px-2.5 py-1 text-xs font-medium bg-rose-50 hover:bg-rose-100 text-rose-800 border border-rose-200 rounded-md transition-colors whitespace-nowrap"
            title="Searches a non-existent roll number to test not-found state"
          >
            Not Found Test (99999)
          </button>
        </div>
      </div>
    </div>
  );
};
`);

  src.file('components/ComparisonCards.tsx', `import React from 'react';
import { SearchResult } from '../types/student';
import { getTheoreticalBounds } from '../utils/searchAlgorithms';
import { Zap, TrendingUp } from 'lucide-react';

interface ComparisonCardsProps {
  searchResult: SearchResult | null;
  totalRecords: number;
}

export const ComparisonCards: React.FC<ComparisonCardsProps> = ({
  searchResult,
  totalRecords
}) => {
  const bounds = getTheoreticalBounds(totalRecords);

  if (!searchResult) {
    return (
      <div className="bg-white rounded-xl border border-slate-200 p-6 text-center text-slate-500">
        <p className="text-sm font-medium text-slate-700 mb-1">
          No Search Executed Yet
        </p>
        <p className="text-xs text-slate-500 max-w-md mx-auto">
          Enter a student roll number above or click one of the Hackathon Demo Presets to run both search algorithms and compare their comparisons.
        </p>
      </div>
    );
  }

  const { binaryComparisons, linearComparisons, found, targetRollNo } = searchResult;
  const comparisonsSaved = Math.max(0, linearComparisons - binaryComparisons);
  const efficiencyRatio = binaryComparisons > 0
    ? (linearComparisons / binaryComparisons).toFixed(1)
    : '1.0';

  const maxRef = Math.max(linearComparisons, bounds.linear.worst, 1);
  const binaryBarPercent = Math.min(100, Math.max(4, (binaryComparisons / maxRef) * 100));
  const linearBarPercent = Math.min(100, Math.max(4, (linearComparisons / maxRef) * 100));

  return (
    <div className="space-y-4">
      <div className="bg-slate-900 text-white rounded-xl p-4 sm:p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs uppercase tracking-wider text-indigo-400 font-semibold">
              Live Search Benchmark Result
            </span>
            <span className="text-slate-500">·</span>
            <span className="text-xs text-slate-300 font-mono">
              Roll No: {targetRollNo}
            </span>
          </div>
          <p className="text-sm sm:text-base font-medium text-slate-200">
            {found ? (
              <span className="text-emerald-400 font-semibold">Record Found</span>
            ) : (
              <span className="text-rose-400 font-semibold">Record Not Found</span>
            )}{' '}
            in database of {totalRecords.toLocaleString()} records.
          </p>
        </div>

        <div className="flex items-center gap-3 bg-slate-800/80 border border-slate-700 rounded-lg px-4 py-2 self-stretch md:self-auto justify-between md:justify-start">
          <div>
            <div className="text-[11px] text-slate-400 font-medium">Efficiency Advantage</div>
            <div className="text-base font-bold text-white font-mono flex items-center gap-1">
              <Zap className="w-4 h-4 text-amber-400" />
              <span>{efficiencyRatio}× Faster</span>
            </div>
          </div>
          <div className="h-8 w-px bg-slate-700 hidden sm:block"></div>
          <div>
            <div className="text-[11px] text-slate-400 font-medium">Operations Saved</div>
            <div className="text-base font-bold text-emerald-400 font-mono">
              +{comparisonsSaved}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white rounded-xl border-2 border-indigo-500/40 p-5 shadow-xs relative overflow-hidden">
          <div className="absolute top-0 right-0 px-3 py-1 bg-indigo-50 border-b border-l border-indigo-200 text-indigo-700 text-[11px] font-semibold rounded-bl-lg font-mono">
            O(log₂ N)
          </div>

          <div className="mb-4">
            <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600 block">
              Optimized Algorithm
            </span>
            <h3 className="text-lg font-bold text-slate-900 mt-0.5">
              Binary Search
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Requires sorted roll numbers. Halves the search space on each comparison.
            </p>
          </div>

          <div className="bg-indigo-50/70 border border-indigo-100 rounded-lg p-3.5 mb-4">
            <div className="text-xs text-indigo-800 font-medium mb-1">
              Comparisons Made:
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-indigo-700 font-mono tabular-nums">
                {binaryComparisons}
              </span>
              <span className="text-xs text-indigo-900 font-medium">
                {binaryComparisons === 1 ? 'comparison' : 'comparisons'}
              </span>
            </div>

            <div className="w-full bg-indigo-200/60 rounded-full h-2 mt-2.5 overflow-hidden">
              <div
                className="bg-indigo-600 h-full rounded-full transition-all duration-500"
                style={{ width: \`\${binaryBarPercent}%\` }}
              ></div>
            </div>
          </div>

          <div className="space-y-1.5 text-xs text-slate-600 border-t border-slate-100 pt-3">
            <div className="flex justify-between">
              <span className="text-slate-500">Best Case:</span>
              <span className="font-mono font-semibold text-slate-800">1 comparison (Mid)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Theoretical Max (Worst Case):</span>
              <span className="font-mono font-semibold text-slate-800">
                ≤ ⌊log₂ {totalRecords}⌋ + 1 = {bounds.binary.worst}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Search Space Reduction:</span>
              <span className="font-mono font-semibold text-emerald-600">50% per step</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs relative overflow-hidden">
          <div className="absolute top-0 right-0 px-3 py-1 bg-slate-100 border-b border-l border-slate-200 text-slate-600 text-[11px] font-semibold rounded-bl-lg font-mono">
            O(N)
          </div>

          <div className="mb-4">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 block">
              Sequential Baseline
            </span>
            <h3 className="text-lg font-bold text-slate-900 mt-0.5">
              Linear Search
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Checks records one-by-one from index 0 until a match is found.
            </p>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-lg p-3.5 mb-4">
            <div className="text-xs text-slate-700 font-medium mb-1">
              Comparisons Made:
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-slate-800 font-mono tabular-nums">
                {linearComparisons}
              </span>
              <span className="text-xs text-slate-600 font-medium">
                {linearComparisons === 1 ? 'comparison' : 'comparisons'}
              </span>
            </div>

            <div className="w-full bg-slate-200 rounded-full h-2 mt-2.5 overflow-hidden">
              <div
                className="bg-amber-500 h-full rounded-full transition-all duration-500"
                style={{ width: \`\${linearBarPercent}%\` }}
              ></div>
            </div>
          </div>

          <div className="space-y-1.5 text-xs text-slate-600 border-t border-slate-100 pt-3">
            <div className="flex justify-between">
              <span className="text-slate-500">Best Case:</span>
              <span className="font-mono font-semibold text-slate-800">1 comparison (First item)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Theoretical Max (Worst Case):</span>
              <span className="font-mono font-semibold text-slate-800">
                N = {bounds.linear.worst} comparisons
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Average Comparisons:</span>
              <span className="font-mono font-semibold text-slate-800">
                (N+1)/2 ≈ {bounds.linear.avg}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-indigo-50/50 border border-indigo-100 rounded-xl p-4 flex items-start gap-3 text-xs text-slate-700">
        <TrendingUp className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
        <div className="leading-relaxed">
          <span className="font-semibold text-indigo-950">University Scale Insight: </span>
          For <strong>{totalRecords.toLocaleString()}</strong> students, Binary Search guarantees finding any student in at most{' '}
          <strong className="text-indigo-700">{bounds.binary.worst} comparisons</strong>, whereas Linear Search may take up to{' '}
          <strong className="text-amber-700">{bounds.linear.worst} comparisons</strong>.
        </div>
      </div>
    </div>
  );
};
`);

  src.file('components/StudentDetailCard.tsx', `import React from 'react';
import { StudentRecord, SearchResult } from '../types/student';
import { Award, BookOpen, Mail, Percent, XCircle } from 'lucide-react';

interface StudentDetailCardProps {
  searchResult: SearchResult | null;
  allStudents: StudentRecord[];
  onSelectRollNo: (rollNo: number) => void;
}

export const StudentDetailCard: React.FC<StudentDetailCardProps> = ({
  searchResult,
  allStudents,
  onSelectRollNo
}) => {
  if (!searchResult) return null;

  const { found, student, targetRollNo, index, binaryComparisons } = searchResult;

  if (found && student) {
    return (
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-100">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-700 font-bold text-lg">
              {student.name.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-slate-900 leading-tight">
                  {student.name}
                </h3>
                <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  Found at Index #{index}
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-500 mt-1">
                <span>Roll No: <strong className="text-slate-800 font-mono">{student.rollNo}</strong></span>
                <span aria-hidden="true">·</span>
                <span>{student.branch}</span>
                <span aria-hidden="true">·</span>
                <span>Semester {student.semester}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 self-start sm:self-auto">
            <div className="text-right">
              <div className="text-[11px] text-slate-400 font-medium">Academic Grade</div>
              <div className="text-xl font-extrabold text-indigo-600 font-mono">
                {student.grade}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-5">
          <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
            <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-1">
              <Award className="w-3.5 h-3.5 text-indigo-500" />
              <span>Marks Secured</span>
            </div>
            <div className="text-lg font-bold text-slate-900 font-mono">
              {student.marks}%
            </div>
            <div className="w-full bg-slate-200 h-1.5 rounded-full mt-2 overflow-hidden">
              <div
                className="bg-indigo-600 h-full rounded-full"
                style={{ width: \`\${Math.min(100, student.marks)}%\` }}
              ></div>
            </div>
          </div>

          <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
            <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-1">
              <Percent className="w-3.5 h-3.5 text-emerald-500" />
              <span>Attendance</span>
            </div>
            <div className="text-lg font-bold text-slate-900 font-mono">
              {student.attendance}%
            </div>
            <div className="w-full bg-slate-200 h-1.5 rounded-full mt-2 overflow-hidden">
              <div
                className="bg-emerald-500 h-full rounded-full"
                style={{ width: \`\${student.attendance}%\` }}
              ></div>
            </div>
          </div>

          <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
            <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-1">
              <BookOpen className="w-3.5 h-3.5 text-slate-400" />
              <span>Branch</span>
            </div>
            <div className="text-sm font-semibold text-slate-800 truncate" title={student.branch}>
              {student.branch}
            </div>
            <div className="text-[11px] text-slate-400 mt-1">
              Engineering Dept
            </div>
          </div>

          <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
            <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-1">
              <Mail className="w-3.5 h-3.5 text-slate-400" />
              <span>Official Email</span>
            </div>
            <div className="text-xs font-mono text-slate-700 truncate" title={student.email}>
              {student.email}
            </div>
            <div className="text-[11px] text-emerald-600 font-medium mt-1">
              Active Record
            </div>
          </div>
        </div>
      </div>
    );
  }

  let closestLower: StudentRecord | null = null;
  let closestHigher: StudentRecord | null = null;

  for (let i = 0; i < allStudents.length; i++) {
    if (allStudents[i].rollNo < targetRollNo) {
      closestLower = allStudents[i];
    } else if (allStudents[i].rollNo > targetRollNo) {
      closestHigher = allStudents[i];
      break;
    }
  }

  return (
    <div className="bg-white rounded-xl border-2 border-rose-200 p-6 shadow-xs">
      <div className="flex items-start gap-3.5">
        <div className="w-10 h-10 rounded-xl bg-rose-50 border border-rose-200 flex items-center justify-center text-rose-600 shrink-0">
          <XCircle className="w-5 h-5" />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h3 className="text-base font-bold text-rose-900">
              Student not found
            </h3>
            <span className="text-xs font-mono bg-rose-50 text-rose-700 px-2 py-0.5 rounded border border-rose-200">
              Roll No: {targetRollNo}
            </span>
          </div>

          <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
            The requested roll number <strong>{targetRollNo}</strong> does not exist in the university records.
            Binary Search eliminated all search intervals and concluded after <strong>{binaryComparisons} comparisons</strong> when the low index exceeded the high index (<span className="font-mono">low &gt; high</span>).
          </p>

          {(closestLower || closestHigher) && (
            <div className="mt-4 pt-3 border-t border-slate-100">
              <span className="text-xs font-medium text-slate-500 block mb-2">
                Nearest Existing Student Records:
              </span>
              <div className="flex flex-wrap items-center gap-2">
                {closestLower && (
                  <button
                    onClick={() => onSelectRollNo(closestLower!.rollNo)}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg text-slate-700 transition"
                  >
                    <span>Previous:</span>
                    <strong className="font-mono">{closestLower.rollNo}</strong>
                    <span className="text-slate-500">({closestLower.name})</span>
                  </button>
                )}
                {closestHigher && (
                  <button
                    onClick={() => onSelectRollNo(closestHigher!.rollNo)}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg text-slate-700 transition"
                  >
                    <span>Next:</span>
                    <strong className="font-mono">{closestHigher.rollNo}</strong>
                    <span className="text-slate-500">({closestHigher.name})</span>
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
`);

  src.file('components/BinarySearchVisualizer.tsx', `import React, { useState, useEffect, useRef } from 'react';
import { BinarySearchStep, StudentRecord } from '../types/student';
import { Play, Pause, RotateCcw, ChevronLeft, ChevronRight, Info } from 'lucide-react';

interface BinarySearchVisualizerProps {
  students: StudentRecord[];
  steps: BinarySearchStep[];
  targetRollNo: number | null;
  found: boolean;
}

export const BinarySearchVisualizer: React.FC<BinarySearchVisualizerProps> = ({
  students,
  steps,
  targetRollNo,
}) => {
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1000);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setCurrentStepIndex(0);
    setIsPlaying(false);
    if (timerRef.current) clearInterval(timerRef.current);
  }, [steps]);

  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        setCurrentStepIndex((prev) => {
          if (prev < steps.length - 1) {
            return prev + 1;
          } else {
            setIsPlaying(false);
            return prev;
          }
        });
      }, playbackSpeed);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, steps.length, playbackSpeed]);

  if (!steps || steps.length === 0 || targetRollNo === null) {
    return (
      <div className="bg-white rounded-xl border border-slate-200 p-6 text-center text-slate-500">
        <p className="text-sm font-medium text-slate-700">Visual Trace Inactive</p>
        <p className="text-xs text-slate-500 mt-1">
          Perform a roll number search above to visualize each step of the Binary Search algorithm.
        </p>
      </div>
    );
  }

  const currentStep = steps[currentStepIndex] || steps[0];
  const { low, mid, high, midRollNo, comparison, action } = currentStep;

  const isLargeDataset = students.length > 32;
  let visibleStudents: { student: StudentRecord; originalIndex: number }[] = [];

  if (!isLargeDataset) {
    visibleStudents = students.map((s, idx) => ({ student: s, originalIndex: idx }));
  } else {
    const sliceStart = Math.max(0, low - 3);
    const sliceEnd = Math.min(students.length, high + 4);
    visibleStudents = students
      .slice(sliceStart, sliceEnd)
      .map((s, i) => ({ student: s, originalIndex: sliceStart + i }));
  }

  const handlePrev = () => {
    setIsPlaying(false);
    setCurrentStepIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setIsPlaying(false);
    setCurrentStepIndex((prev) => Math.min(steps.length - 1, prev + 1));
  };

  const handleReset = () => {
    setIsPlaying(false);
    setCurrentStepIndex(0);
  };

  const handleTogglePlay = () => {
    if (currentStepIndex >= steps.length - 1) {
      setCurrentStepIndex(0);
      setIsPlaying(true);
    } else {
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-base font-semibold text-slate-900">
              Binary Search Execution Trace
            </h3>
            <span className="text-xs font-semibold px-2 py-0.5 bg-indigo-50 text-indigo-700 rounded border border-indigo-200 font-mono">
              Step {currentStepIndex + 1} of {steps.length}
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Observing pointers <span className="font-mono font-medium text-slate-700">Low = {low}</span>,{' '}
            <span className="font-mono font-medium text-amber-700">Mid = {mid}</span>,{' '}
            <span className="font-mono font-medium text-slate-700">High = {high}</span>.
          </p>
        </div>

        <div className="flex items-center gap-1.5 self-start sm:self-auto bg-slate-50 border border-slate-200 p-1 rounded-lg">
          <button
            onClick={handleReset}
            className="p-1.5 text-slate-600 hover:text-slate-900 hover:bg-slate-200 rounded transition"
            title="Reset to step 1"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={handlePrev}
            disabled={currentStepIndex === 0}
            className="p-1.5 text-slate-600 hover:text-slate-900 hover:bg-slate-200 rounded disabled:opacity-30 disabled:pointer-events-none transition"
            title="Previous step"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={handleTogglePlay}
            className="px-2.5 py-1 bg-indigo-600 hover:bg-indigo-700 text-white rounded text-xs font-medium flex items-center gap-1 transition"
          >
            {isPlaying ? (
              <>
                <Pause className="w-3 h-3" />
                <span>Pause</span>
              </>
            ) : (
              <>
                <Play className="w-3 h-3" />
                <span>{currentStepIndex >= steps.length - 1 ? 'Replay' : 'Play'}</span>
              </>
            )}
          </button>
          <button
            onClick={handleNext}
            disabled={currentStepIndex >= steps.length - 1}
            className="p-1.5 text-slate-600 hover:text-slate-900 hover:bg-slate-200 rounded disabled:opacity-30 disabled:pointer-events-none transition"
            title="Next step"
          >
            <ChevronRight className="w-4 h-4" />
          </button>

          <div className="h-4 w-px bg-slate-200 mx-1"></div>
          <button
            onClick={() => setPlaybackSpeed(playbackSpeed === 1000 ? 500 : playbackSpeed === 500 ? 1800 : 1000)}
            className="px-1.5 py-0.5 text-[10px] font-mono font-medium text-slate-600 hover:text-slate-900 rounded"
            title="Toggle playback speed"
          >
            {playbackSpeed === 1000 ? '1x' : playbackSpeed === 500 ? '2x' : '0.5x'}
          </button>
        </div>
      </div>

      <div className="my-4 p-3.5 bg-slate-50 border border-slate-200 rounded-lg flex items-start gap-2.5">
        <Info className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
        <div className="text-xs text-slate-700 leading-relaxed">
          <strong className="text-slate-900">Step {currentStepIndex + 1}: </strong>
          {action}
          <div className="mt-1 font-mono text-[11px] text-slate-500">
            Formula: mid = ⌊({low} + {high}) / 2⌋ = <strong>{mid}</strong> → Value at index {mid} is{' '}
            <strong className="text-slate-800">{midRollNo}</strong> vs Target <strong className="text-indigo-700">{targetRollNo}</strong>
          </div>
        </div>
      </div>

      <div className="mt-4">
        <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
          <span>Array Representation (Sorted by Roll No)</span>
          {isLargeDataset && (
            <span className="text-[11px] text-slate-400">
              Showing active window (Total: {students.length} records)
            </span>
          )}
        </div>

        <div className="overflow-x-auto pb-4 pt-8">
          <div className="flex gap-2 min-w-max px-2">
            {visibleStudents.map(({ student, originalIndex }) => {
              const isLow = originalIndex === low;
              const isHigh = originalIndex === high;
              const isMid = originalIndex === mid;
              const isInWindow = originalIndex >= low && originalIndex <= high;
              const isMatch = student.rollNo === targetRollNo && comparison === 'equal';

              let cardBg = 'bg-white border-slate-200 text-slate-700';
              if (isMatch) {
                cardBg = 'bg-emerald-50 border-emerald-500 text-emerald-900 ring-2 ring-emerald-500/30';
              } else if (isMid) {
                cardBg = 'bg-amber-50 border-amber-400 text-amber-900 shadow-xs';
              } else if (isInWindow) {
                cardBg = 'bg-indigo-50/40 border-indigo-200 text-slate-800';
              } else {
                cardBg = 'bg-slate-100/70 border-slate-200 text-slate-400 opacity-40';
              }

              return (
                <div key={student.rollNo} className="relative flex flex-col items-center">
                  <div className="absolute -top-7 flex gap-1 items-center justify-center font-mono text-[10px] font-bold">
                    {isLow && (
                      <span className="px-1.5 py-0.2 bg-blue-600 text-white rounded text-[10px] shadow-xs">
                        L={low}
                      </span>
                    )}
                    {isMid && (
                      <span className="px-1.5 py-0.2 bg-amber-500 text-white rounded text-[10px] shadow-xs">
                        M={mid}
                      </span>
                    )}
                    {isHigh && (
                      <span className="px-1.5 py-0.2 bg-purple-600 text-white rounded text-[10px] shadow-xs">
                        H={high}
                      </span>
                    )}
                  </div>

                  <div
                    className={\`w-20 sm:w-22 p-2 rounded-lg border text-center transition-all duration-200 \${cardBg}\`}
                  >
                    <div className="text-[10px] font-mono text-slate-400 mb-0.5">
                      [{originalIndex}]
                    </div>
                    <div className="text-xs font-bold font-mono tracking-tight truncate">
                      {student.rollNo}
                    </div>
                    <div className="text-[10px] truncate text-slate-500 mt-0.5">
                      {student.name.split(' ')[0]}
                    </div>
                    <div className="text-[9px] font-mono text-slate-400">
                      {student.marks}%
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 pt-2 border-t border-slate-100">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded bg-blue-600"></span>
            <span>Low Pointer (L)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded bg-amber-500"></span>
            <span>Mid Element (M)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded bg-purple-600"></span>
            <span>High Pointer (H)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded bg-emerald-500"></span>
            <span>Target Match</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded bg-slate-300"></span>
            <span>Eliminated Half</span>
          </div>
        </div>
      </div>
    </div>
  );
};
`);

  src.file('components/StudentDirectory.tsx', `import React, { useState, useMemo } from 'react';
import { StudentRecord } from '../types/student';
import { Search, CheckCircle2, Plus, ChevronLeft, ChevronRight } from 'lucide-react';

interface StudentDirectoryProps {
  students: StudentRecord[];
  onSelectStudent: (rollNo: number) => void;
  onOpenAddModal: () => void;
  activeSearchedRollNo: number | null;
}

export const StudentDirectory: React.FC<StudentDirectoryProps> = ({
  students,
  onSelectStudent,
  onOpenAddModal,
  activeSearchedRollNo
}) => {
  const [filterText, setFilterText] = useState<string>('');
  const [selectedBranch, setSelectedBranch] = useState<string>('All');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const pageSize = 15;

  const branches = useMemo(() => {
    const set = new Set<string>();
    students.forEach((s) => set.add(s.branch));
    return ['All', ...Array.from(set).sort()];
  }, [students]);

  const filteredStudents = useMemo(() => {
    return students.filter((s) => {
      const matchesBranch = selectedBranch === 'All' || s.branch === selectedBranch;
      const q = filterText.toLowerCase().trim();
      const matchesQuery =
        !q ||
        s.name.toLowerCase().includes(q) ||
        String(s.rollNo).includes(q) ||
        s.email.toLowerCase().includes(q);
      return matchesBranch && matchesQuery;
    });
  }, [students, selectedBranch, filterText]);

  const totalPages = Math.ceil(filteredStudents.length / pageSize) || 1;
  const paginatedStudents = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredStudents.slice(start, start + pageSize);
  }, [filteredStudents, currentPage, pageSize]);

  const isSorted = useMemo(() => {
    for (let i = 1; i < students.length; i++) {
      if (students[i].rollNo <= students[i - 1].rollNo) return false;
    }
    return true;
  }, [students]);

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
      <div className="p-4 sm:p-5 border-b border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-base font-semibold text-slate-900">
              University Student Directory
            </h3>
            <span className="text-xs font-mono font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
              {filteredStudents.length} of {students.length} Records
            </span>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-500 mt-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>
              {isSorted
                ? 'Strictly Sorted by Roll No (Binary Search Ready)'
                : 'Warning: Array not strictly sorted!'}
            </span>
          </div>
        </div>

        <div className="flex flex-wrap sm:flex-nowrap items-center gap-2.5">
          <div className="relative flex-1 sm:w-60">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3 pointer-events-none" />
            <input
              type="text"
              placeholder="Filter by name or roll..."
              value={filterText}
              onChange={(e) => {
                setFilterText(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>

          <select
            value={selectedBranch}
            onChange={(e) => {
              setSelectedBranch(e.target.value);
              setCurrentPage(1);
            }}
            className="text-xs py-1.5 px-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-700 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          >
            {branches.map((b) => (
              <option key={b} value={b}>
                {b === 'All' ? 'All Branches' : b}
              </option>
            ))}
          </select>

          <button
            onClick={onOpenAddModal}
            className="px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 rounded-lg text-xs font-semibold flex items-center gap-1 transition whitespace-nowrap"
          >
            <Plus className="w-3 h-3" />
            <span>Add</span>
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs text-slate-600">
          <thead className="bg-slate-50 border-b border-slate-200 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
            <tr>
              <th className="py-3 px-4">Index</th>
              <th className="py-3 px-4">Roll Number</th>
              <th className="py-3 px-4">Student Name</th>
              <th className="py-3 px-4">Branch</th>
              <th className="py-3 px-4">Semester</th>
              <th className="py-3 px-4">Marks & Grade</th>
              <th className="py-3 px-4">Attendance</th>
              <th className="py-3 px-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {paginatedStudents.map((student) => {
              const globalIndex = students.findIndex((s) => s.rollNo === student.rollNo);
              const isActive = activeSearchedRollNo === student.rollNo;

              return (
                <tr
                  key={student.rollNo}
                  onClick={() => onSelectStudent(student.rollNo)}
                  className={\`cursor-pointer transition-colors \${
                    isActive
                      ? 'bg-indigo-50/80 font-medium'
                      : 'hover:bg-slate-50/80'
                  }\`}
                >
                  <td className="py-3 px-4 font-mono text-slate-400">
                    #{globalIndex}
                  </td>
                  <td className="py-3 px-4 font-mono font-bold text-slate-900">
                    {student.rollNo}
                  </td>
                  <td className="py-3 px-4 font-medium text-slate-900">
                    {student.name}
                  </td>
                  <td className="py-3 px-4 text-slate-600">
                    {student.branch}
                  </td>
                  <td className="py-3 px-4 text-slate-500">
                    Sem {student.semester}
                  </td>
                  <td className="py-3 px-4 font-mono">
                    <span className="font-bold text-slate-800">{student.marks}%</span>{' '}
                    <span className="text-[11px] text-indigo-600 font-semibold ml-1">({student.grade})</span>
                  </td>
                  <td className="py-3 px-4 font-mono text-slate-700">
                    {student.attendance}%
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectStudent(student.rollNo);
                      }}
                      className="px-2.5 py-1 text-[11px] font-medium text-indigo-600 hover:text-indigo-800 bg-white hover:bg-indigo-50 border border-indigo-200 rounded transition"
                    >
                      Lookup &rarr;
                    </button>
                  </td>
                </tr>
              );
            })}

            {paginatedStudents.length === 0 && (
              <tr>
                <td colSpan={8} className="py-8 text-center text-slate-400">
                  No student records match the filter criteria.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="p-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
          <div>
            Showing {(currentPage - 1) * pageSize + 1} to{' '}
            {Math.min(currentPage * pageSize, filteredStudents.length)} of{' '}
            {filteredStudents.length} entries
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-1 rounded border border-slate-200 bg-white disabled:opacity-40 disabled:pointer-events-none hover:bg-slate-100"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            <span className="px-2 font-mono">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-1 rounded border border-slate-200 bg-white disabled:opacity-40 disabled:pointer-events-none hover:bg-slate-100"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
`);

  src.file('components/AddStudentModal.tsx', `import React, { useState } from 'react';
import { StudentRecord } from '../types/student';
import { calculateGrade } from '../data/sampleStudents';
import { X, Plus, AlertCircle } from 'lucide-react';

interface AddStudentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddStudent: (student: StudentRecord) => void;
  existingStudents: StudentRecord[];
}

export const AddStudentModal: React.FC<AddStudentModalProps> = ({
  isOpen,
  onClose,
  onAddStudent,
  existingStudents
}) => {
  const [rollNo, setRollNo] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [branch, setBranch] = useState<string>('Computer Science');
  const [marks, setMarks] = useState<string>('85');
  const [semester, setSemester] = useState<number>(4);
  const [attendance, setAttendance] = useState<string>('90');
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const roll = parseInt(rollNo.trim(), 10);
    if (isNaN(roll) || roll <= 0) {
      setError('Please provide a valid positive roll number.');
      return;
    }

    if (existingStudents.some((s) => s.rollNo === roll)) {
      setError(\`Roll number \${roll} already exists in the system. Roll numbers must be unique.\`);
      return;
    }

    if (!name.trim()) {
      setError('Please enter the student\\'s full name.');
      return;
    }

    const marksNum = parseFloat(marks.trim());
    if (isNaN(marksNum) || marksNum < 0 || marksNum > 100) {
      setError('Marks must be between 0 and 100.');
      return;
    }

    const attendanceNum = parseInt(attendance.trim(), 10) || 85;

    const newStudent: StudentRecord = {
      rollNo: roll,
      name: name.trim(),
      branch,
      marks: +marksNum.toFixed(1),
      semester,
      email: \`\${name.trim().toLowerCase().replace(/\\s+/g, '.')}\${roll % 100}@univ.edu\`,
      attendance: Math.min(100, Math.max(0, attendanceNum)),
      grade: calculateGrade(marksNum)
    };

    onAddStudent(newStudent);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
      <div className="bg-white rounded-xl border border-slate-200 shadow-xl w-full max-w-md overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
          <div>
            <h3 className="text-base font-bold text-slate-900">
              Add New Student Record
            </h3>
            <p className="text-xs text-slate-500">
              Record will automatically be placed in sorted order for Binary Search.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4 text-xs">
          {error && (
            <div className="p-2.5 bg-rose-50 border border-rose-200 rounded-lg text-rose-700 flex items-start gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              Roll Number (Unique Identifier) *
            </label>
            <input
              type="number"
              value={rollNo}
              onChange={(e) => setRollNo(e.target.value)}
              placeholder="e.g. 10125"
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg font-mono text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500"
              required
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              Student Full Name *
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Tanvi Kulkarni"
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Branch / Major *
              </label>
              <select
                value={branch}
                onChange={(e) => setBranch(e.target.value)}
                className="w-full px-2.5 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500"
              >
                <option value="Computer Science">Computer Science</option>
                <option value="Information Technology">Information Technology</option>
                <option value="Artificial Intelligence">Artificial Intelligence</option>
                <option value="Data Science">Data Science</option>
                <option value="Electronics & Comm.">Electronics & Comm.</option>
                <option value="Electrical Engineering">Electrical Engineering</option>
                <option value="Mechanical Engineering">Mechanical Engineering</option>
                <option value="Biotechnology">Biotechnology</option>
                <option value="Civil Engineering">Civil Engineering</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Semester
              </label>
              <select
                value={semester}
                onChange={(e) => setSemester(Number(e.target.value))}
                className="w-full px-2.5 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8].map((s) => (
                  <option key={s} value={s}>Semester {s}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Marks Secured (0 - 100) *
              </label>
              <input
                type="number"
                step="0.1"
                min="0"
                max="100"
                value={marks}
                onChange={(e) => setMarks(e.target.value)}
                placeholder="85.5"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg font-mono text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500"
                required
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Attendance %
              </label>
              <input
                type="number"
                min="0"
                max="100"
                value={attendance}
                onChange={(e) => setAttendance(e.target.value)}
                placeholder="90"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg font-mono text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-2 text-slate-600 hover:text-slate-800 text-xs font-medium rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-lg shadow-xs flex items-center gap-1.5 transition"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Save & Sort</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
`);

  src.file('components/AlgorithmCodeView.tsx', `import React, { useState } from 'react';
import { Copy, Check, Terminal } from 'lucide-react';

export const AlgorithmCodeView: React.FC = () => {
  const [lang, setLang] = useState<'javascript' | 'python' | 'cpp'>('javascript');
  const [copied, setCopied] = useState<boolean>(false);

  const codeSnippets = {
    javascript: \`// Binary Search in JavaScript
function binarySearchStudent(records, targetRollNo) {
  let low = 0;
  let high = records.length - 1;
  let comparisons = 0;

  while (low <= high) {
    comparisons++;
    const mid = Math.floor((low + high) / 2);

    if (records[mid].rollNo === targetRollNo) {
      return { found: true, student: records[mid], comparisons, index: mid };
    } else if (records[mid].rollNo < targetRollNo) {
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }

  return { found: false, student: null, comparisons, index: -1 };
}\`,
    python: \`# Binary Search in Python
def binary_search_student(records, target_roll_no):
    low = 0
    high = len(records) - 1
    comparisons = 0

    while low <= high:
        comparisons += 1
        mid = (low + high) // 2

        if records[mid]['roll_no'] == target_roll_no:
            return {'found': True, 'student': records[mid], 'comparisons': comparisons}
        elif records[mid]['roll_no'] < target_roll_no:
            low = mid + 1
        else:
            high = mid - 1

    return {'found': False, 'student': None, 'comparisons': comparisons}\`,
    cpp: \`// Binary Search in C++
#include <vector>
using namespace std;

struct Student {
    int rollNo;
    string name;
    string branch;
    double marks;
};

int binarySearch(const vector<Student>& records, int targetRollNo, int& comparisons) {
    int low = 0;
    int high = records.size() - 1;
    comparisons = 0;

    while (low <= high) {
        comparisons++;
        int mid = low + (high - low) / 2;

        if (records[mid].rollNo == targetRollNo) {
            return mid;
        } else if (records[mid].rollNo < targetRollNo) {
            low = mid + 1;
        } else {
            high = mid - 1;
        }
    }
    return -1;
}\`
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(codeSnippets[lang]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
      <div className="p-4 sm:p-5 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h3 className="text-base font-semibold text-slate-900 flex items-center gap-2">
            <Terminal className="w-4 h-4 text-indigo-600" />
            <span>Algorithm Implementation Reference</span>
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Core divide-and-conquer logic compared against sequential iteration.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center bg-slate-100 p-1 rounded-lg border border-slate-200 text-xs">
            <button
              onClick={() => setLang('javascript')}
              className={\`px-2.5 py-1 rounded font-medium transition \${
                lang === 'javascript' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'
              }\`}
            >
              JavaScript
            </button>
            <button
              onClick={() => setLang('python')}
              className={\`px-2.5 py-1 rounded font-medium transition \${
                lang === 'python' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'
              }\`}
            >
              Python
            </button>
            <button
              onClick={() => setLang('cpp')}
              className={\`px-2.5 py-1 rounded font-medium transition \${
                lang === 'cpp' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'
              }\`}
            >
              C++
            </button>
          </div>

          <button
            onClick={handleCopy}
            className="flex items-center gap-1 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-medium transition"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span>Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>
      </div>

      <div className="bg-slate-950 p-4 sm:p-5 overflow-x-auto text-xs font-mono text-slate-200 leading-relaxed">
        <pre>{codeSnippets[lang]}</pre>
      </div>
    </div>
  );
};
`);

  // Generate binary zip blob
  const content = await zip.generateAsync({ type: 'blob' });

  // Trigger browser download
  const url = URL.createObjectURL(content);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'student-record-lookup-source.zip';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
