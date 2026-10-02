export interface StudentRecord {
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
