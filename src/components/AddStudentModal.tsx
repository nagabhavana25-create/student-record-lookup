import React, { useState } from 'react';
import { StudentRecord } from '../types/student';
import { calculateGrade } from '../data/sampleStudents';
import { X, Plus, AlertCircle, CheckCircle2 } from 'lucide-react';

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
      setError(`Roll number ${roll} already exists in the system. Roll numbers must be unique.`);
      return;
    }

    if (!name.trim()) {
      setError('Please enter the student\'s full name.');
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
      email: `${name.trim().toLowerCase().replace(/\s+/g, '.')}${roll % 100}@univ.edu`,
      attendance: Math.min(100, Math.max(0, attendanceNum)),
      grade: calculateGrade(marksNum)
    };

    onAddStudent(newStudent);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
      <div className="bg-white rounded-xl border border-slate-200 shadow-xl w-full max-w-md overflow-hidden">
        {/* Modal Header */}
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

        {/* Modal Form */}
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
