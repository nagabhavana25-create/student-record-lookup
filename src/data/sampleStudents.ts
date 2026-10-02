import { StudentRecord } from '../types/student';

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

// Helper to generate N sorted students for scalability benchmarks (e.g. 100 or 1,000 records)
export function generateSortedStudents(count: number): StudentRecord[] {
  const firstNames = ['Aarav', 'Aditi', 'Advait', 'Ananya', 'Aryan', 'Bhavana', 'Chirag', 'Devansh', 'Diya', 'Eshaan', 'Fatima', 'Gauri', 'Harsh', 'Ishaan', 'Janhavi', 'Kabir', 'Kavya', 'Lavanya', 'Manish', 'Neha', 'Omkar', 'Pooja', 'Pranav', 'Rhea', 'Rohan', 'Sakshi', 'Siddharth', 'Tanvi', 'Utkarsh', 'Varun', 'Vedant', 'Yash', 'Zoya'];
  const lastNames = ['Sharma', 'Verma', 'Patel', 'Reddy', 'Nair', 'Iyer', 'Deshmukh', 'Kulkarni', 'Mehra', 'Sengupta', 'Chawla', 'Gupta', 'Bhatt', 'Rao', 'Singhania', 'Joshi', 'Chakraborty', 'Hegde', 'Nambiar', 'Patil'];
  const branches = ['Computer Science', 'Information Technology', 'Artificial Intelligence', 'Data Science', 'Electronics & Comm.', 'Electrical Engineering', 'Mechanical Engineering', 'Civil Engineering', 'Biotechnology'];

  const results: StudentRecord[] = [];
  let currentRoll = 10001;

  for (let i = 0; i < count; i++) {
    // Increment roll number by 1, 2, or 3 to keep strictly ascending but realistic gaps
    currentRoll += Math.floor(Math.random() * 3) + 1;
    const fName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lName = lastNames[Math.floor(Math.random() * lastNames.length)];
    const branch = branches[Math.floor(Math.random() * branches.length)];
    const marks = +(65 + Math.random() * 33).toFixed(1);
    const semester = [2, 4, 6, 8][Math.floor(Math.random() * 4)];
    const attendance = Math.floor(75 + Math.random() * 25);

    results.push({
      rollNo: currentRoll,
      name: `${fName} ${lName}`,
      branch,
      marks,
      semester,
      email: `${fName.toLowerCase()}.${lName.toLowerCase()}${currentRoll % 100}@univ.edu`,
      attendance,
      grade: calculateGrade(marks)
    });
  }

  // Ensure strictly sorted
  return results.sort((a, b) => a.rollNo - b.rollNo);
}
