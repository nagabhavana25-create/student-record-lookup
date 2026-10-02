import { StudentRecord, BinarySearchStep, SearchResult } from '../types/student';

export interface BinarySearchResult {
  found: boolean;
  student: StudentRecord | null;
  index: number;
  comparisons: number;
  steps: BinarySearchStep[];
}

export interface LinearSearchResult {
  found: boolean;
  student: StudentRecord | null;
  index: number;
  comparisons: number;
}

/**
 * Performs iterative Binary Search on a sorted array of student records.
 * Returns detailed step-by-step trace and exact comparison count.
 */
export function executeBinarySearch(
  records: StudentRecord[],
  targetRollNo: number
): BinarySearchResult {
  let low = 0;
  let high = records.length - 1;
  let comparisons = 0;
  const steps: BinarySearchStep[] = [];

  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    const midRecord = records[mid];
    comparisons++;

    if (midRecord.rollNo === targetRollNo) {
      steps.push({
        step: steps.length + 1,
        low,
        high,
        mid,
        midRollNo: midRecord.rollNo,
        targetRollNo,
        comparison: 'equal',
        action: `Target ${targetRollNo} equals record at index ${mid} (${midRecord.name}). Match found!`
      });
      return {
        found: true,
        student: midRecord,
        index: mid,
        comparisons,
        steps
      };
    } else if (midRecord.rollNo < targetRollNo) {
      steps.push({
        step: steps.length + 1,
        low,
        high,
        mid,
        midRollNo: midRecord.rollNo,
        targetRollNo,
        comparison: 'less',
        action: `Target ${targetRollNo} is greater than ${midRecord.rollNo} at mid index ${mid}. Eliminating left half [${low}...${mid}]. Shifting low pointer to ${mid + 1}.`
      });
      low = mid + 1;
    } else {
      steps.push({
        step: steps.length + 1,
        low,
        high,
        mid,
        midRollNo: midRecord.rollNo,
        targetRollNo,
        comparison: 'greater',
        action: `Target ${targetRollNo} is less than ${midRecord.rollNo} at mid index ${mid}. Eliminating right half [${mid}...${high}]. Shifting high pointer to ${mid - 1}.`
      });
      high = mid - 1;
    }
  }

  // Not found
  return {
    found: false,
    student: null,
    index: -1,
    comparisons,
    steps
  };
}

/**
 * Performs standard Linear Search on student records.
 * Compares each record sequentially until match is found or end of list.
 */
export function executeLinearSearch(
  records: StudentRecord[],
  targetRollNo: number
): LinearSearchResult {
  let comparisons = 0;

  for (let i = 0; i < records.length; i++) {
    comparisons++;
    if (records[i].rollNo === targetRollNo) {
      return {
        found: true,
        student: records[i],
        index: i,
        comparisons
      };
    }
  }

  return {
    found: false,
    student: null,
    index: -1,
    comparisons
  };
}

/**
 * Combines both search algorithms to satisfy comparison requirements.
 */
export function runComparativeSearch(
  records: StudentRecord[],
  targetRollNo: number
): SearchResult {
  const binaryRes = executeBinarySearch(records, targetRollNo);
  const linearRes = executeLinearSearch(records, targetRollNo);

  return {
    targetRollNo,
    found: binaryRes.found,
    student: binaryRes.student,
    index: binaryRes.index,
    binaryComparisons: binaryRes.comparisons,
    linearComparisons: linearRes.comparisons,
    binarySteps: binaryRes.steps,
    timestamp: Date.now()
  };
}

/**
 * Calculates theoretical comparison bounds for the current dataset size.
 */
export function getTheoreticalBounds(n: number) {
  const binaryWorst = Math.floor(Math.log2(n)) + 1;
  const binaryBest = 1;
  const binaryAvg = +(Math.log2(n) - 1).toFixed(1);

  const linearWorst = n;
  const linearBest = 1;
  const linearAvg = +((n + 1) / 2).toFixed(1);

  return {
    n,
    binary: { best: binaryBest, avg: binaryAvg, worst: binaryWorst, formula: 'O(log₂ N)' },
    linear: { best: linearBest, avg: linearAvg, worst: linearWorst, formula: 'O(N)' }
  };
}
