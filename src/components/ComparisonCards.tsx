import React from 'react';
import { SearchResult } from '../types/student';
import { getTheoreticalBounds } from '../utils/searchAlgorithms';
import { ArrowRight, CheckCircle2, TrendingUp, Zap, HelpCircle } from 'lucide-react';

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

  // Normalize bar widths (relative to totalRecords or linearComparisons)
  const maxRef = Math.max(linearComparisons, bounds.linear.worst, 1);
  const binaryBarPercent = Math.min(100, Math.max(4, (binaryComparisons / maxRef) * 100));
  const linearBarPercent = Math.min(100, Math.max(4, (linearComparisons / maxRef) * 100));

  return (
    <div className="space-y-4">
      {/* Top Summary Banner */}
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

      {/* Side-by-Side Comparison Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Binary Search Card (Requirement 7 & 9) */}
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

          {/* Metric Box */}
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

            {/* Visual Bar */}
            <div className="w-full bg-indigo-200/60 rounded-full h-2 mt-2.5 overflow-hidden">
              <div
                className="bg-indigo-600 h-full rounded-full transition-all duration-500"
                style={{ width: `${binaryBarPercent}%` }}
              ></div>
            </div>
          </div>

          {/* Theoretical Breakdown */}
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

        {/* Linear Search Card (Requirement 8 & 9) */}
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

          {/* Metric Box */}
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

            {/* Visual Bar */}
            <div className="w-full bg-slate-200 rounded-full h-2 mt-2.5 overflow-hidden">
              <div
                className="bg-amber-500 h-full rounded-full transition-all duration-500"
                style={{ width: `${linearBarPercent}%` }}
              ></div>
            </div>
          </div>

          {/* Theoretical Breakdown */}
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

      {/* Comparison Insight Callout */}
      <div className="bg-indigo-50/50 border border-indigo-100 rounded-xl p-4 flex items-start gap-3 text-xs text-slate-700">
        <TrendingUp className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
        <div className="leading-relaxed">
          <span className="font-semibold text-indigo-950">University Scale Insight: </span>
          For <strong>{totalRecords.toLocaleString()}</strong> students, Binary Search guarantees finding any student in at most{' '}
          <strong className="text-indigo-700">{bounds.binary.worst} comparisons</strong>, whereas Linear Search may take up to{' '}
          <strong className="text-amber-700">{bounds.linear.worst} comparisons</strong>. When scaled to a university system with 100,000 students, Binary Search still takes only <strong>17 comparisons</strong>!
        </div>
      </div>
    </div>
  );
};
