import React, { useState, useEffect, useRef } from 'react';
import { BinarySearchStep, StudentRecord } from '../types/student';
import { Play, Pause, RotateCcw, ChevronLeft, ChevronRight, Eye, FastForward, Info } from 'lucide-react';

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
  found
}) => {
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1000); // ms per step
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Reset to first step whenever steps change
  useEffect(() => {
    setCurrentStepIndex(steps.length > 0 ? 0 : 0);
    setIsPlaying(false);
    if (timerRef.current) clearInterval(timerRef.current);
  }, [steps]);

  // Autoplay handler
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

  // Decide display window for array:
  // If array is 24 items, show all 24!
  // If array is 100 or 1,000 items, show focused slice around [low ... high] or sampled window
  const isLargeDataset = students.length > 32;
  let visibleStudents: { student: StudentRecord; originalIndex: number }[] = [];

  if (!isLargeDataset) {
    visibleStudents = students.map((s, idx) => ({ student: s, originalIndex: idx }));
  } else {
    // Show slice bounded by low - 2 to high + 2, clamped
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
      {/* Header and Step Info */}
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

        {/* Stepper Controls */}
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

          {/* Speed Toggle */}
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

      {/* Step Explanation Callout */}
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

      {/* Array Elements Visualizer Strip */}
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
                  {/* Top Pointer Tags */}
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

                  {/* Array Card Cell */}
                  <div
                    className={`w-20 sm:w-22 p-2 rounded-lg border text-center transition-all duration-200 ${cardBg}`}
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

        {/* Legend */}
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
