import React, { useState, useMemo } from 'react';
import { StudentRecord } from '../types/student';
import { Search, Filter, CheckCircle2, ChevronDown, Plus, ChevronLeft, ChevronRight } from 'lucide-react';

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

  // Extract unique branches
  const branches = useMemo(() => {
    const set = new Set<string>();
    students.forEach((s) => set.add(s.branch));
    return ['All', ...Array.from(set).sort()];
  }, [students]);

  // Filtered students
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

  // Pagination
  const totalPages = Math.ceil(filteredStudents.length / pageSize) || 1;
  const paginatedStudents = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredStudents.slice(start, start + pageSize);
  }, [filteredStudents, currentPage, pageSize]);

  // Verify sorted invariant
  const isSorted = useMemo(() => {
    for (let i = 1; i < students.length; i++) {
      if (students[i].rollNo <= students[i - 1].rollNo) return false;
    }
    return true;
  }, [students]);

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
      {/* Table Toolbar */}
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

        {/* Filter controls */}
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

      {/* Table */}
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
            {paginatedStudents.map((student, idx) => {
              const globalIndex = students.findIndex((s) => s.rollNo === student.rollNo);
              const isActive = activeSearchedRollNo === student.rollNo;

              return (
                <tr
                  key={student.rollNo}
                  onClick={() => onSelectStudent(student.rollNo)}
                  className={`cursor-pointer transition-colors ${
                    isActive
                      ? 'bg-indigo-50/80 font-medium'
                      : 'hover:bg-slate-50/80'
                  }`}
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

      {/* Pagination Footer */}
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
