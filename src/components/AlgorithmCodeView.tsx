import React, { useState } from 'react';
import { Code, Copy, Check, Terminal, BookOpen } from 'lucide-react';

export const AlgorithmCodeView: React.FC = () => {
  const [lang, setLang] = useState<'javascript' | 'python' | 'cpp'>('javascript');
  const [copied, setCopied] = useState<boolean>(false);

  const codeSnippets = {
    javascript: `// Binary Search in JavaScript
// Requirement: The array must be sorted by rollNo ascending!
function binarySearchStudent(records, targetRollNo) {
  let low = 0;
  let high = records.length - 1;
  let comparisons = 0;

  while (low <= high) {
    comparisons++;
    // Use floor division to find middle index
    const mid = Math.floor((low + high) / 2);

    if (records[mid].rollNo === targetRollNo) {
      return { found: true, student: records[mid], comparisons, index: mid };
    } else if (records[mid].rollNo < targetRollNo) {
      // Target is in upper half: eliminate indices [low..mid]
      low = mid + 1;
    } else {
      // Target is in lower half: eliminate indices [mid..high]
      high = mid - 1;
    }
  }

  // Not found after exhausting intervals (low > high)
  return { found: false, student: null, comparisons, index: -1 };
}

// Linear Search for Comparison
function linearSearchStudent(records, targetRollNo) {
  let comparisons = 0;
  for (let i = 0; i < records.length; i++) {
    comparisons++;
    if (records[i].rollNo === targetRollNo) {
      return { found: true, student: records[i], comparisons, index: i };
    }
  }
  return { found: false, student: null, comparisons, index: -1 };
}`,
    python: `# Binary Search in Python
# Requirement: 'records' list must be sorted by roll_no
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

    return {'found': False, 'student': None, 'comparisons': comparisons}

# Linear Search in Python
def linear_search_student(records, target_roll_no):
    comparisons = 0
    for idx, student in enumerate(records):
        comparisons += 1
        if student['roll_no'] == target_roll_no:
            return {'found': True, 'student': student, 'comparisons': comparisons}
    return {'found': False, 'student': None, 'comparisons': comparisons}`,
    cpp: `// Binary Search in C++
// Requirement: vector<Student> must be sorted by rollNo
#include <iostream>
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
        int mid = low + (high - low) / 2; // Prevents integer overflow

        if (records[mid].rollNo == targetRollNo) {
            return mid; // Found at index mid
        } else if (records[mid].rollNo < targetRollNo) {
            low = mid + 1;
        } else {
            high = mid - 1;
        }
    }
    return -1; // Not found
}`
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(codeSnippets[lang]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
      {/* Code Header */}
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
          {/* Language selector tabs */}
          <div className="flex items-center bg-slate-100 p-1 rounded-lg border border-slate-200 text-xs">
            <button
              onClick={() => setLang('javascript')}
              className={`px-2.5 py-1 rounded font-medium transition ${
                lang === 'javascript' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'
              }`}
            >
              JavaScript
            </button>
            <button
              onClick={() => setLang('python')}
              className={`px-2.5 py-1 rounded font-medium transition ${
                lang === 'python' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'
              }`}
            >
              Python
            </button>
            <button
              onClick={() => setLang('cpp')}
              className={`px-2.5 py-1 rounded font-medium transition ${
                lang === 'cpp' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'
              }`}
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

      {/* Code Snippet Box */}
      <div className="bg-slate-950 p-4 sm:p-5 overflow-x-auto text-xs font-mono text-slate-200 leading-relaxed">
        <pre>{codeSnippets[lang]}</pre>
      </div>

      {/* Educational Walkthrough */}
      <div className="p-5 bg-slate-50 border-t border-slate-200 grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
        <div>
          <h4 className="font-semibold text-slate-900 mb-1">
            1. Why Sorting is Mandatory
          </h4>
          <p className="text-slate-600 leading-relaxed">
            Binary Search can only eliminate an entire half of the data if the elements are strictly monotonic (<span className="font-mono">A[i] &le; A[i+1]</span>). If the array is unsorted, there is no guarantee the target lies exclusively to the right or left.
          </p>
        </div>

        <div>
          <h4 className="font-semibold text-slate-900 mb-1">
            2. The Logarithmic Power
          </h4>
          <p className="text-slate-600 leading-relaxed">
            At each comparison, $N \to N/2 \to N/4 \dots \to 1$. After $k$ steps, $N / 2^k = 1 \implies k = \log_2(N)$. For 1,000,000 students, $\log_2(1,000,000) \approx 20$ comparisons.
          </p>
        </div>

        <div>
          <h4 className="font-semibold text-slate-900 mb-1">
            3. Linear vs Binary Trade-off
          </h4>
          <p className="text-slate-600 leading-relaxed">
            Linear Search requires no prior sorting and works on linked lists or unsorted streams in $O(N)$. Binary Search requires random access ($O(1)$ index lookup) and pre-sorted records.
          </p>
        </div>
      </div>
    </div>
  );
};
