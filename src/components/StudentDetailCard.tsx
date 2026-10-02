import React from 'react';
import { StudentRecord, SearchResult } from '../types/student';
import { User, Award, BookOpen, Mail, Percent, GraduationCap, XCircle, CheckCircle2, ArrowRight } from 'lucide-react';

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
  if (!searchResult) {
    return null;
  }

  const { found, student, targetRollNo, index, binaryComparisons } = searchResult;

  // If student is found (Requirement 5)
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

        {/* Detailed Grid */}
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
                style={{ width: `${Math.min(100, student.marks)}%` }}
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
                style={{ width: `${student.attendance}%` }}
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

  // If student is NOT found (Requirement 6)
  // Find closest lower and higher records in sorted array
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

          {/* Educational insight: nearest roll numbers */}
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
