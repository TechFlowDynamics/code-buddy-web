import { TestResult } from "@/core/interface/code.interface";

interface TestResultsProps {
  results: TestResult[];
  isSubmission?: boolean;
}

const TestResults = ({ results, isSubmission }: TestResultsProps) => {
  if (!results || results.length === 0) return null;

  return (
    <div className="border-t border-gray-800 p-4">
      <h3 className="mb-2 text-lg font-medium">
        {isSubmission ? 'Submission Results' : 'Test Results'}
      </h3>
      <div className="space-y-2">
        {results.map((testCase, index) => (
          <div key={index} className="rounded bg-[#2d2d2d] p-2">
            <div className="flex items-center justify-between">
              <span>Test Case {index + 1}</span>
              <span className={testCase.passed ? 'text-green-500' : 'text-red-500'}>
                {testCase.passed ? 'Passed' : 'Failed'}
              </span>
            </div>
            {!testCase.passed && (
              <div className="mt-2 text-sm">
                <div>Input: {testCase.input}</div>
                <div>Expected: {testCase.expectedOutput}</div>
                <div>Got: {testCase.actualOutput}</div>
              </div>
            )}
          </div>
        ))}
        <div className="mt-4 text-sm text-gray-400">
          Execution Time: {results[0].executionTime}ms
          <br />
          Memory Used: {results[0].memoryUsed}KB
        </div>
      </div>
    </div>
  );
};

export default TestResults;