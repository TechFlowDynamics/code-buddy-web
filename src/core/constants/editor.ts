export type Language = "javascript" | "python" | "java";

export const codeTemplates: Record<Language, string> = {
  javascript: `/**
 * @param {number[]} nums
 * @return {number}
 */
function solution(nums) {
    
};`,
  python: `class Solution:
    def solution(self, nums: List[int]) -> int:
        `,
  java: `class Solution {
    public int solution(int[] nums) {
        
    }
}`,
};

export const languageOptions = [
  { value: "javascript", label: "JavaScript" },
  { value: "python", label: "Python" },
  { value: "java", label: "Java" },
];

// Optional: Editor default settings
export const defaultEditorOptions = {
  minimap: { enabled: false },
  fontSize: 14,
  lineNumbers: "on",
  automaticLayout: true,
  scrollBeyondLastLine: false,
  theme: "vs-dark",
  padding: { top: 16 },
};