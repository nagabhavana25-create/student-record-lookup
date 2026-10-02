/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { StudentRecord, SearchResult } from './types/student';
import { INITIAL_STUDENTS, generateSortedStudents } from './data/sampleStudents';
import { runComparativeSearch } from './utils/searchAlgorithms';
import { downloadProjectZip } from './utils/exportProjectZip';
import { Header } from './components/Header';
import { SearchControl } from './components/SearchControl';
import { ComparisonCards } from './components/ComparisonCards';
import { BinarySearchVisualizer } from './components/BinarySearchVisualizer';
import { StudentDetailCard } from './components/StudentDetailCard';
import { StudentDirectory } from './components/StudentDirectory';
import { AddStudentModal } from './components/AddStudentModal';
import { AlgorithmCodeView } from './components/AlgorithmCodeView';
import {
  Search,
  Sparkles,
  BarChart2,
  ListOrdered,
  Code2,
  CheckCircle,
  HelpCircle,
  Database,
  ArrowRight,
  Download,
  Github
} from 'lucide-react';

export default function App() {
  // Database of sorted student records
  const [students, setStudents] = useState<StudentRecord[]>(() => {
    return [...INITIAL_STUDENTS].sort((a, b) => a.rollNo - b.rollNo);
  });

  const [datasetSize, setDatasetSize] = useState<number>(24);
  const [activeTab, setActiveTab] = useState<'search' | 'directory' | 'comparison' | 'code'>('search');
  const [searchResult, setSearchResult] = useState<SearchResult | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Initialize with a default search on mount so the user immediately sees the working application (Requirement 12 & 13)
  useEffect(() => {
    if (students.length > 0 && !searchResult) {
      // Pick student at index 10 (e.g. 10130) to show an interesting 4-step search
      const sampleRoll = students[Math.min(10, students.length - 1)].rollNo;
      const res = runComparativeSearch(students, sampleRoll);
      setSearchResult(res);
    }
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Search handler
  const handleSearch = (rollNo: number) => {
    const result = runComparativeSearch(students, rollNo);
    setSearchResult(result);
  };

  // Change dataset size (24, 100, 1000)
  const handleSetDatasetSize = (size: number) => {
    setDatasetSize(size);
    let newStudents: StudentRecord[];
    if (size === 24) {
      newStudents = [...INITIAL_STUDENTS].sort((a, b) => a.rollNo - b.rollNo);
    } else {
      newStudents = generateSortedStudents(size);
    }
    setStudents(newStudents);

    // Re-run search for current target or mid element
    const newTarget = searchResult && newStudents.some((s) => s.rollNo === searchResult.targetRollNo)
      ? searchResult.targetRollNo
      : newStudents[Math.floor(newStudents.length * 0.75)].rollNo;

    const res = runComparativeSearch(newStudents, newTarget);
    setSearchResult(res);
    showToast(`Loaded ${size} strictly sorted university student records!`);
  };

  // Add new student
  const handleAddStudent = (newStudent: StudentRecord) => {
    const updated = [...students, newStudent].sort((a, b) => a.rollNo - b.rollNo);
    setStudents(updated);
    setDatasetSize(updated.length);

    // Run search on the new student to demonstrate sorting & lookup
    const res = runComparativeSearch(updated, newStudent.rollNo);
    setSearchResult(res);
    setActiveTab('search');
    showToast(`Added ${newStudent.name} (Roll No: ${newStudent.rollNo}) in sorted position!`);
  };

  // Quick Demo Trigger
  const handleRunDemo = () => {
    if (students.length === 0) return;
    const targetIdx = Math.floor(students.length * 0.65);
    const demoRoll = students[targetIdx].rollNo;
    handleSearch(demoRoll);
    setActiveTab('search');
    showToast(`Demo: Searching for Roll No ${demoRoll} across ${students.length} students`);
  };

  // Download project ZIP for GitHub
  const [isExporting, setIsExporting] = useState<boolean>(false);
  const handleDownloadZip = async () => {
    try {
      setIsExporting(true);
      showToast('Generating project ZIP archive...');
      await downloadProjectZip();
      showToast('Download started! Complete project files ready for GitHub.');
    } catch (err) {
      console.error(err);
      showToast('Failed to create ZIP. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 bg-slate-900 text-white px-4 py-2.5 rounded-lg shadow-lg text-xs font-medium flex items-center gap-2 border border-slate-700 animate-in fade-in slide-in-from-bottom-2">
          <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header (3-Zone Contract) */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        datasetSize={datasetSize}
        onSetDatasetSize={handleSetDatasetSize}
        onOpenAddModal={() => setIsAddModalOpen(true)}
        onRunDemo={handleRunDemo}
        onDownloadZip={handleDownloadZip}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6">
        {/* GitHub Export Callout Banner */}
        <section className="bg-gradient-to-r from-indigo-900 via-slate-900 to-indigo-950 text-white rounded-xl p-4 sm:p-5 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border border-indigo-500/20">
          <div className="flex items-start sm:items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center shrink-0 border border-white/15">
              <Github className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-white tracking-tight">
                  Export Project to GitHub
                </span>
                <span className="text-[10px] font-semibold uppercase tracking-wider bg-indigo-500/30 text-indigo-300 px-2 py-0.5 rounded border border-indigo-400/30">
                  Ready to Push
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-0.5">
                Download the complete source package (.zip) including <code className="text-indigo-200 font-mono">src/</code>, <code className="text-indigo-200 font-mono">package.json</code>, and <code className="text-indigo-200 font-mono">README.md</code>.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <a
              href="/student-record-lookup-source.zip"
              download="student-record-lookup-source.zip"
              onClick={() => showToast('Downloading student-record-lookup-source.zip...')}
              className="w-full sm:w-auto px-5 py-2.5 bg-indigo-500 hover:bg-indigo-600 active:bg-indigo-700 text-white text-xs font-bold rounded-lg shadow-sm transition flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer shrink-0"
            >
              <Download className="w-4 h-4" />
              <span>Download Project ZIP</span>
            </a>
          </div>
        </section>

        {/* Intro / Problem Banner */}
        <section className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-indigo-600">
              <Database className="w-3.5 h-3.5" />
              <span>University Problem Statement</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              Fast Student Record Lookup System
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed">
              A university database maintains thousands of student records identified by unique roll numbers. By keeping records sorted, <strong>Binary Search</strong> achieves instantaneous lookup in <strong className="text-indigo-700 font-mono">O(log₂ N)</strong> comparisons, compared to <strong className="text-slate-800 font-mono">O(N)</strong> for Linear Search.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 bg-slate-50 border border-slate-200/80 rounded-lg p-3 self-stretch md:self-auto">
            <div>
              <span className="text-[11px] text-slate-400 font-medium block">Dataset Invariant</span>
              <span className="text-xs font-mono font-bold text-emerald-700 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                Strictly Ascending
              </span>
            </div>
            <div className="h-6 w-px bg-slate-200"></div>
            <div>
              <span className="text-[11px] text-slate-400 font-medium block">Records Loaded</span>
              <span className="text-xs font-mono font-bold text-slate-900">
                {students.length.toLocaleString()} Students
              </span>
            </div>
          </div>
        </section>

        {/* Tab 1: Search & Trace */}
        {activeTab === 'search' && (
          <div className="space-y-6">
            {/* Search Input Box */}
            <SearchControl
              onSearch={handleSearch}
              students={students}
              currentSearchedRollNo={searchResult ? searchResult.targetRollNo : null}
            />

            {/* Found / Not Found Result Details */}
            <StudentDetailCard
              searchResult={searchResult}
              allStudents={students}
              onSelectRollNo={handleSearch}
            />

            {/* Comparison Cards (Requirements 7, 8, 9) */}
            <ComparisonCards
              searchResult={searchResult}
              totalRecords={students.length}
            />

            {/* Binary Search Step-by-Step Visualizer */}
            {searchResult && (
              <BinarySearchVisualizer
                students={students}
                steps={searchResult.binarySteps}
                targetRollNo={searchResult.targetRollNo}
                found={searchResult.found}
              />
            )}
          </div>
        )}

        {/* Tab 2: Algorithm Comparison */}
        {activeTab === 'comparison' && (
          <div className="space-y-6">
            <SearchControl
              onSearch={handleSearch}
              students={students}
              currentSearchedRollNo={searchResult ? searchResult.targetRollNo : null}
            />

            <ComparisonCards
              searchResult={searchResult}
              totalRecords={students.length}
            />

            {/* Algorithmic Complexity Table */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-5">
              <h3 className="text-base font-bold text-slate-900 mb-2">
                Comparative Complexity Matrix (N = {students.length})
              </h3>
              <p className="text-xs text-slate-500 mb-4">
                Comparison of operations required to locate a student among {students.length} university records.
              </p>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 text-[11px] font-semibold text-slate-600 uppercase border-y border-slate-200">
                    <tr>
                      <th className="py-2.5 px-4">Metric / Case</th>
                      <th className="py-2.5 px-4 text-indigo-700">Binary Search O(log₂ N)</th>
                      <th className="py-2.5 px-4 text-slate-700">Linear Search O(N)</th>
                      <th className="py-2.5 px-4 text-emerald-700">Performance Benefit</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-mono">
                    <tr>
                      <td className="py-2.5 px-4 font-sans font-medium text-slate-700">
                        Current Search ({searchResult?.targetRollNo || 'N/A'})
                      </td>
                      <td className="py-2.5 px-4 font-bold text-indigo-600">
                        {searchResult ? `${searchResult.binaryComparisons} comparisons` : '-'}
                      </td>
                      <td className="py-2.5 px-4 font-bold text-slate-700">
                        {searchResult ? `${searchResult.linearComparisons} comparisons` : '-'}
                      </td>
                      <td className="py-2.5 px-4 font-bold text-emerald-600">
                        {searchResult && searchResult.binaryComparisons > 0
                          ? `${(searchResult.linearComparisons / searchResult.binaryComparisons).toFixed(1)}× faster`
                          : '-'}
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-4 font-sans font-medium text-slate-700">
                        Best Case (Target at Mid or First)
                      </td>
                      <td className="py-2.5 px-4 text-slate-700">1 comparison</td>
                      <td className="py-2.5 px-4 text-slate-700">1 comparison</td>
                      <td className="py-2.5 px-4 text-slate-500">Tied (1 operation)</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-4 font-sans font-medium text-slate-700">
                        Average Case (Random Student)
                      </td>
                      <td className="py-2.5 px-4 text-slate-700">
                        ≈ {(Math.log2(students.length) - 1).toFixed(1)} comparisons
                      </td>
                      <td className="py-2.5 px-4 text-slate-700">
                        ≈ {((students.length + 1) / 2).toFixed(0)} comparisons
                      </td>
                      <td className="py-2.5 px-4 text-emerald-600">
                        ≈ {(((students.length + 1) / 2) / Math.max(1, Math.log2(students.length) - 1)).toFixed(0)}× fewer checks
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-4 font-sans font-medium text-slate-700">
                        Worst Case / Not Found
                      </td>
                      <td className="py-2.5 px-4 font-bold text-indigo-700">
                        {Math.floor(Math.log2(students.length)) + 1} comparisons
                      </td>
                      <td className="py-2.5 px-4 font-bold text-amber-700">
                        {students.length} comparisons
                      </td>
                      <td className="py-2.5 px-4 text-emerald-600 font-bold">
                        {Math.round(students.length / (Math.floor(Math.log2(students.length)) + 1))}× faster
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-4 font-sans font-medium text-slate-700">
                        Prerequisite Condition
                      </td>
                      <td className="py-2.5 px-4 font-sans text-xs text-indigo-800">
                        Must be sorted by key (Roll No)
                      </td>
                      <td className="py-2.5 px-4 font-sans text-xs text-slate-600">
                        No sorting required
                      </td>
                      <td className="py-2.5 px-4 font-sans text-xs text-slate-500">
                        One-time sort pays off forever
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Student Directory */}
        {activeTab === 'directory' && (
          <StudentDirectory
            students={students}
            onSelectStudent={(rollNo) => {
              handleSearch(rollNo);
              setActiveTab('search');
            }}
            onOpenAddModal={() => setIsAddModalOpen(true)}
            activeSearchedRollNo={searchResult ? searchResult.targetRollNo : null}
          />
        )}

        {/* Tab 4: Algorithm Code Reference */}
        {activeTab === 'code' && <AlgorithmCodeView />}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-6 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <div>
            <span className="font-semibold text-slate-700">Student Record Lookup</span>
            <span className="mx-2">·</span>
            <span>College Hackathon University System</span>
          </div>
          <div className="flex items-center gap-4">
            <span>Binary Search: <strong className="font-mono text-indigo-600">O(log₂ N)</strong></span>
            <span className="text-slate-300">·</span>
            <span>Linear Search: <strong className="font-mono text-slate-700">O(N)</strong></span>
          </div>
        </div>
      </footer>

      {/* Add Student Modal */}
      <AddStudentModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddStudent={handleAddStudent}
        existingStudents={students}
      />

      {/* Floating Download Button (Always Visible) */}
      <a
        href="/student-record-lookup-source.zip"
        download="student-record-lookup-source.zip"
        onClick={() => showToast('Downloading student-record-lookup-source.zip...')}
        className="fixed bottom-6 right-6 z-40 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white px-4 py-3 rounded-full shadow-2xl flex items-center gap-2.5 text-xs font-bold transition-all hover:scale-105 border-2 border-white cursor-pointer group"
        title="Download complete project files as ZIP for GitHub"
      >
        <Download className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
        <span>Download Project ZIP</span>
      </a>
    </div>
  );
}
