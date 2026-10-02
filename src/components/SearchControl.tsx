import React, { useState } from 'react';
import { Search, X, Zap, Shuffle, AlertCircle, CheckCircle2, CornerDownRight } from 'lucide-react';
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

  // Preset triggers
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
    // Last element or leaf in binary search tree
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
    // Pick a number clearly outside current records
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

      {/* Main Search Input Form */}
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

      {/* Quick Test Presets for College Hackathon Demonstrations */}
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
