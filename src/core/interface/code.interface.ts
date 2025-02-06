export interface TestResult {
    input: string;
    expectedOutput: string;
    actualOutput: string;
    passed: boolean;
    executionTime: number;
    memoryUsed: number;
  }
  
  export interface CodeExecutionResult {
    success: boolean;
    testCases: TestResult[];
    executionTime: number;
    memoryUsed: number;
    status: string;
  }