import QuestionsTable from "./QuestionTable";

import React from "react";

const data = [
  {
    acRate: 54.16302731243583,
    content:
      '<p>Given an array of integers <code>nums</code>&nbsp;and an integer <code>target</code>, return <em>indices of the two numbers such that they add up to <code>target</code></em>.</p>\n\n<p>You may assume that each input would have <strong><em>exactly</em> one solution</strong>, and you may not use the <em>same</em> element twice.</p>\n\n<p>You can return the answer in any order.</p>\n\n<p>&nbsp;</p>\n<p><strong class="example">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> nums = [2,7,11,15], target = 9\n<strong>Output:</strong> [0,1]\n<strong>Explanation:</strong> Because nums[0] + nums[1] == 9, we return [0, 1].\n</pre>\n\n<p><strong class="example">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> nums = [3,2,4], target = 6\n<strong>Output:</strong> [1,2]\n</pre>\n\n<p><strong class="example">Example 3:</strong></p>\n\n<pre>\n<strong>Input:</strong> nums = [3,3], target = 6\n<strong>Output:</strong> [0,1]\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>2 &lt;= nums.length &lt;= 10<sup>4</sup></code></li>\n\t<li><code>-10<sup>9</sup> &lt;= nums[i] &lt;= 10<sup>9</sup></code></li>\n\t<li><code>-10<sup>9</sup> &lt;= target &lt;= 10<sup>9</sup></code></li>\n\t<li><strong>Only one valid answer exists.</strong></li>\n</ul>\n\n<p>&nbsp;</p>\n<strong>Follow-up:&nbsp;</strong>Can you come up with an algorithm that is less than <code>O(n<sup>2</sup>)</code><font face="monospace">&nbsp;</font>time complexity?',
    difficulty: "Easy",
    title: "Two Sum",
    topicTags: [
      {
        _id: "6742aa7e0965ce2dc177da7a",
        name: "Array",
      },
      {
        _id: "6742aa7e0965ce2dc177da7b",
        name: "Hash Table",
      },
    ],
    categoryTitle: "Algorithms",
  },
  {
    acRate: 35.6832492690177,
    content:
      '<p>Given an integer array nums, return all the triplets <code>[nums[i], nums[j], nums[k]]</code> such that <code>i != j</code>, <code>i != k</code>, and <code>j != k</code>, and <code>nums[i] + nums[j] + nums[k] == 0</code>.</p>\n\n<p>Notice that the solution set must not contain duplicate triplets.</p>\n\n<p>&nbsp;</p>\n<p><strong class="example">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> nums = [-1,0,1,2,-1,-4]\n<strong>Output:</strong> [[-1,-1,2],[-1,0,1]]\n<strong>Explanation:</strong> \nnums[0] + nums[1] + nums[2] = (-1) + 0 + 1 = 0.\nnums[1] + nums[2] + nums[4] = 0 + 1 + (-1) = 0.\nnums[0] + nums[3] + nums[4] = (-1) + 2 + (-1) = 0.\nThe distinct triplets are [-1,0,1] and [-1,-1,2].\nNotice that the order of the output and the order of the triplets does not matter.\n</pre>\n\n<p><strong class="example">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> nums = [0,1,1]\n<strong>Output:</strong> []\n<strong>Explanation:</strong> The only possible triplet does not sum up to 0.\n</pre>\n\n<p><strong class="example">Example 3:</strong></p>\n\n<pre>\n<strong>Input:</strong> nums = [0,0,0]\n<strong>Output:</strong> [[0,0,0]]\n<strong>Explanation:</strong> The only possible triplet sums up to 0.\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>3 &lt;= nums.length &lt;= 3000</code></li>\n\t<li><code>-10<sup>5</sup> &lt;= nums[i] &lt;= 10<sup>5</sup></code></li>\n</ul>\n',
    difficulty: "Medium",
    title: "3Sum",
    topicTags: [
      {
        _id: "6742aa7e0965ce2dc177da7c",
        name: "Array",
      },
      {
        _id: "6742aa7e0965ce2dc177da7d",
        name: "Two Pointers",
      },
      {
        _id: "6742aa7e0965ce2dc177da7e",
        name: "Sorting",
      },
    ],
    categoryTitle: "Algorithms",
  },
  {
    acRate: 46.222640248335075,
    content:
      '<p>Given an integer array <code>nums</code> of length <code>n</code> and an integer <code>target</code>, find three integers in <code>nums</code> such that the sum is closest to <code>target</code>.</p>\n\n<p>Return <em>the sum of the three integers</em>.</p>\n\n<p>You may assume that each input would have exactly one solution.</p>\n\n<p>&nbsp;</p>\n<p><strong class="example">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> nums = [-1,2,1,-4], target = 1\n<strong>Output:</strong> 2\n<strong>Explanation:</strong> The sum that is closest to the target is 2. (-1 + 2 + 1 = 2).\n</pre>\n\n<p><strong class="example">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> nums = [0,0,0], target = 1\n<strong>Output:</strong> 0\n<strong>Explanation:</strong> The sum that is closest to the target is 0. (0 + 0 + 0 = 0).\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>3 &lt;= nums.length &lt;= 500</code></li>\n\t<li><code>-1000 &lt;= nums[i] &lt;= 1000</code></li>\n\t<li><code>-10<sup>4</sup> &lt;= target &lt;= 10<sup>4</sup></code></li>\n</ul>\n',
    difficulty: "Medium",
    title: "3Sum Closest",
    topicTags: [
      {
        _id: "6742aa7e0965ce2dc177da7f",
        name: "Array",
      },
      {
        _id: "6742aa7e0965ce2dc177da80",
        name: "Two Pointers",
      },
      {
        _id: "6742aa7e0965ce2dc177da81",
        name: "Sorting",
      },
    ],
    categoryTitle: "Algorithms",
  },
  {
    acRate: 36.9569831314246,
    content:
      '<p>Given an array <code>nums</code> of <code>n</code> integers, return <em>an array of all the <strong>unique</strong> quadruplets</em> <code>[nums[a], nums[b], nums[c], nums[d]]</code> such that:</p>\n\n<ul>\n\t<li><code>0 &lt;= a, b, c, d&nbsp;&lt; n</code></li>\n\t<li><code>a</code>, <code>b</code>, <code>c</code>, and <code>d</code> are <strong>distinct</strong>.</li>\n\t<li><code>nums[a] + nums[b] + nums[c] + nums[d] == target</code></li>\n</ul>\n\n<p>You may return the answer in <strong>any order</strong>.</p>\n\n<p>&nbsp;</p>\n<p><strong class="example">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> nums = [1,0,-1,0,-2,2], target = 0\n<strong>Output:</strong> [[-2,-1,1,2],[-2,0,0,2],[-1,0,0,1]]\n</pre>\n\n<p><strong class="example">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> nums = [2,2,2,2,2], target = 8\n<strong>Output:</strong> [[2,2,2,2]]\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= nums.length &lt;= 200</code></li>\n\t<li><code>-10<sup>9</sup> &lt;= nums[i] &lt;= 10<sup>9</sup></code></li>\n\t<li><code>-10<sup>9</sup> &lt;= target &lt;= 10<sup>9</sup></code></li>\n</ul>\n',
    difficulty: "Medium",
    title: "4Sum",
    topicTags: [
      {
        _id: "6742aa7e0965ce2dc177da82",
        name: "Array",
      },
      {
        _id: "6742aa7e0965ce2dc177da83",
        name: "Two Pointers",
      },
      {
        _id: "6742aa7e0965ce2dc177da84",
        name: "Sorting",
      },
    ],
    categoryTitle: "Algorithms",
  },
  {
    acRate: 73.10505197553836,
    categoryTitle: "Algorithms",
    content:
      '<p>Given an array of <strong>distinct</strong> integers <code>candidates</code> and a target integer <code>target</code>, return <em>a list of all <strong>unique combinations</strong> of </em><code>candidates</code><em> where the chosen numbers sum to </em><code>target</code><em>.</em> You may return the combinations in <strong>any order</strong>.</p>\n\n<p>The <strong>same</strong> number may be chosen from <code>candidates</code> an <strong>unlimited number of times</strong>. Two combinations are unique if the <span data-keyword="frequency-array">frequency</span> of at least one of the chosen numbers is different.</p>\n\n<p>The test cases are generated such that the number of unique combinations that sum up to <code>target</code> is less than <code>150</code> combinations for the given input.</p>\n\n<p>&nbsp;</p>\n<p><strong class="example">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> candidates = [2,3,6,7], target = 7\n<strong>Output:</strong> [[2,2,3],[7]]\n<strong>Explanation:</strong>\n2 and 3 are candidates, and 2 + 2 + 3 = 7. Note that 2 can be used multiple times.\n7 is a candidate, and 7 = 7.\nThese are the only two combinations.\n</pre>\n\n<p><strong class="example">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> candidates = [2,3,5], target = 8\n<strong>Output:</strong> [[2,2,2,2],[2,3,3],[3,5]]\n</pre>\n\n<p><strong class="example">Example 3:</strong></p>\n\n<pre>\n<strong>Input:</strong> candidates = [2], target = 1\n<strong>Output:</strong> []\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= candidates.length &lt;= 30</code></li>\n\t<li><code>2 &lt;= candidates[i] &lt;= 40</code></li>\n\t<li>All elements of <code>candidates</code> are <strong>distinct</strong>.</li>\n\t<li><code>1 &lt;= target &lt;= 40</code></li>\n</ul>\n',
    difficulty: "Medium",
    title: "Combination Sum",
    topicTags: [
      {
        _id: "6742aa7e0965ce2dc177da85",
        name: "Array",
      },
      {
        _id: "6742aa7e0965ce2dc177da86",
        name: "Backtracking",
      },
    ],
  },
  {
    acRate: 56.654339462800785,
    categoryTitle: "Algorithms",
    content:
      '<p>Given a collection of candidate numbers (<code>candidates</code>) and a target number (<code>target</code>), find all unique combinations in <code>candidates</code>&nbsp;where the candidate numbers sum to <code>target</code>.</p>\n\n<p>Each number in <code>candidates</code>&nbsp;may only be used <strong>once</strong> in the combination.</p>\n\n<p><strong>Note:</strong>&nbsp;The solution set must not contain duplicate combinations.</p>\n\n<p>&nbsp;</p>\n<p><strong class="example">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> candidates = [10,1,2,7,6,1,5], target = 8\n<strong>Output:</strong> \n[\n[1,1,6],\n[1,2,5],\n[1,7],\n[2,6]\n]\n</pre>\n\n<p><strong class="example">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> candidates = [2,5,2,1,2], target = 5\n<strong>Output:</strong> \n[\n[1,2,2],\n[5]\n]\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;=&nbsp;candidates.length &lt;= 100</code></li>\n\t<li><code>1 &lt;=&nbsp;candidates[i] &lt;= 50</code></li>\n\t<li><code>1 &lt;= target &lt;= 30</code></li>\n</ul>\n',
    difficulty: "Medium",
    title: "Combination Sum II",
    topicTags: [
      {
        _id: "6742aa7e0965ce2dc177da87",
        name: "Array",
      },
      {
        _id: "6742aa7e0965ce2dc177da88",
        name: "Backtracking",
      },
    ],
  },
  {
    acRate: 65.23695156844178,
    categoryTitle: "Algorithms",
    content:
      '<p>Given a <code>m x n</code> <code>grid</code> filled with non-negative numbers, find a path from top left to bottom right, which minimizes the sum of all numbers along its path.</p>\n\n<p><strong>Note:</strong> You can only move either down or right at any point in time.</p>\n\n<p>&nbsp;</p>\n<p><strong class="example">Example 1:</strong></p>\n<img alt="" src="https://assets.leetcode.com/uploads/2020/11/05/minpath.jpg" style="width: 242px; height: 242px;" />\n<pre>\n<strong>Input:</strong> grid = [[1,3,1],[1,5,1],[4,2,1]]\n<strong>Output:</strong> 7\n<strong>Explanation:</strong> Because the path 1 &rarr; 3 &rarr; 1 &rarr; 1 &rarr; 1 minimizes the sum.\n</pre>\n\n<p><strong class="example">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> grid = [[1,2,3],[4,5,6]]\n<strong>Output:</strong> 12\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>m == grid.length</code></li>\n\t<li><code>n == grid[i].length</code></li>\n\t<li><code>1 &lt;= m, n &lt;= 200</code></li>\n\t<li><code>0 &lt;= grid[i][j] &lt;= 200</code></li>\n</ul>\n',
    difficulty: "Medium",
    title: "Minimum Path Sum",
    topicTags: [
      {
        _id: "6742aa7e0965ce2dc177da89",
        name: "Array",
      },
      {
        _id: "6742aa7e0965ce2dc177da8a",
        name: "Dynamic Programming",
      },
      {
        _id: "6742aa7e0965ce2dc177da8b",
        name: "Matrix",
      },
    ],
  },
  {
    acRate: 51.691675099039244,
    categoryTitle: "Algorithms",
    content:
      '<p>Given the <code>root</code> of a binary tree and an integer <code>targetSum</code>, return <code>true</code> if the tree has a <strong>root-to-leaf</strong> path such that adding up all the values along the path equals <code>targetSum</code>.</p>\n\n<p>A <strong>leaf</strong> is a node with no children.</p>\n\n<p>&nbsp;</p>\n<p><strong class="example">Example 1:</strong></p>\n<img alt="" src="https://assets.leetcode.com/uploads/2021/01/18/pathsum1.jpg" style="width: 500px; height: 356px;" />\n<pre>\n<strong>Input:</strong> root = [5,4,8,11,null,13,4,7,2,null,null,null,1], targetSum = 22\n<strong>Output:</strong> true\n<strong>Explanation:</strong> The root-to-leaf path with the target sum is shown.\n</pre>\n\n<p><strong class="example">Example 2:</strong></p>\n<img alt="" src="https://assets.leetcode.com/uploads/2021/01/18/pathsum2.jpg" />\n<pre>\n<strong>Input:</strong> root = [1,2,3], targetSum = 5\n<strong>Output:</strong> false\n<strong>Explanation:</strong> There are two root-to-leaf paths in the tree:\n(1 --&gt; 2): The sum is 3.\n(1 --&gt; 3): The sum is 4.\nThere is no root-to-leaf path with sum = 5.\n</pre>\n\n<p><strong class="example">Example 3:</strong></p>\n\n<pre>\n<strong>Input:</strong> root = [], targetSum = 0\n<strong>Output:</strong> false\n<strong>Explanation:</strong> Since the tree is empty, there are no root-to-leaf paths.\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li>The number of nodes in the tree is in the range <code>[0, 5000]</code>.</li>\n\t<li><code>-1000 &lt;= Node.val &lt;= 1000</code></li>\n\t<li><code>-1000 &lt;= targetSum &lt;= 1000</code></li>\n</ul>\n',
    difficulty: "Easy",
    title: "Path Sum",
    topicTags: [
      {
        _id: "6742aa7e0965ce2dc177da8c",
        name: "Tree",
      },
      {
        _id: "6742aa7e0965ce2dc177da8d",
        name: "Depth-First Search",
      },
      {
        _id: "6742aa7e0965ce2dc177da8e",
        name: "Breadth-First Search",
      },
      {
        _id: "6742aa7e0965ce2dc177da8f",
        name: "Binary Tree",
      },
    ],
  },
  {
    acRate: 59.474064296044546,
    categoryTitle: "Algorithms",
    content:
      '<p>Given the <code>root</code> of a binary tree and an integer <code>targetSum</code>, return <em>all <strong>root-to-leaf</strong> paths where the sum of the node values in the path equals </em><code>targetSum</code><em>. Each path should be returned as a list of the node <strong>values</strong>, not node references</em>.</p>\n\n<p>A <strong>root-to-leaf</strong> path is a path starting from the root and ending at any leaf node. A <strong>leaf</strong> is a node with no children.</p>\n\n<p>&nbsp;</p>\n<p><strong class="example">Example 1:</strong></p>\n<img alt="" src="https://assets.leetcode.com/uploads/2021/01/18/pathsumii1.jpg" style="width: 500px; height: 356px;" />\n<pre>\n<strong>Input:</strong> root = [5,4,8,11,null,13,4,7,2,null,null,5,1], targetSum = 22\n<strong>Output:</strong> [[5,4,11,2],[5,8,4,5]]\n<strong>Explanation:</strong> There are two paths whose sum equals targetSum:\n5 + 4 + 11 + 2 = 22\n5 + 8 + 4 + 5 = 22\n</pre>\n\n<p><strong class="example">Example 2:</strong></p>\n<img alt="" src="https://assets.leetcode.com/uploads/2021/01/18/pathsum2.jpg" style="width: 212px; height: 181px;" />\n<pre>\n<strong>Input:</strong> root = [1,2,3], targetSum = 5\n<strong>Output:</strong> []\n</pre>\n\n<p><strong class="example">Example 3:</strong></p>\n\n<pre>\n<strong>Input:</strong> root = [1,2], targetSum = 0\n<strong>Output:</strong> []\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li>The number of nodes in the tree is in the range <code>[0, 5000]</code>.</li>\n\t<li><code>-1000 &lt;= Node.val &lt;= 1000</code></li>\n\t<li><code>-1000 &lt;= targetSum &lt;= 1000</code></li>\n</ul>\n',
    difficulty: "Medium",
    title: "Path Sum II",
    topicTags: [
      {
        _id: "6742aa7e0965ce2dc177da90",
        name: "Backtracking",
      },
      {
        _id: "6742aa7e0965ce2dc177da91",
        name: "Tree",
      },
      {
        _id: "6742aa7e0965ce2dc177da92",
        name: "Depth-First Search",
      },
      {
        _id: "6742aa7e0965ce2dc177da93",
        name: "Binary Tree",
      },
    ],
  },
  {
    acRate: 40.558482699136135,
    categoryTitle: "Algorithms",
    content:
      '<p>A <strong>path</strong> in a binary tree is a sequence of nodes where each pair of adjacent nodes in the sequence has an edge connecting them. A node can only appear in the sequence <strong>at most once</strong>. Note that the path does not need to pass through the root.</p>\n\n<p>The <strong>path sum</strong> of a path is the sum of the node&#39;s values in the path.</p>\n\n<p>Given the <code>root</code> of a binary tree, return <em>the maximum <strong>path sum</strong> of any <strong>non-empty</strong> path</em>.</p>\n\n<p>&nbsp;</p>\n<p><strong class="example">Example 1:</strong></p>\n<img alt="" src="https://assets.leetcode.com/uploads/2020/10/13/exx1.jpg" style="width: 322px; height: 182px;" />\n<pre>\n<strong>Input:</strong> root = [1,2,3]\n<strong>Output:</strong> 6\n<strong>Explanation:</strong> The optimal path is 2 -&gt; 1 -&gt; 3 with a path sum of 2 + 1 + 3 = 6.\n</pre>\n\n<p><strong class="example">Example 2:</strong></p>\n<img alt="" src="https://assets.leetcode.com/uploads/2020/10/13/exx2.jpg" />\n<pre>\n<strong>Input:</strong> root = [-10,9,20,null,null,15,7]\n<strong>Output:</strong> 42\n<strong>Explanation:</strong> The optimal path is 15 -&gt; 20 -&gt; 7 with a path sum of 15 + 20 + 7 = 42.\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li>The number of nodes in the tree is in the range <code>[1, 3 * 10<sup>4</sup>]</code>.</li>\n\t<li><code>-1000 &lt;= Node.val &lt;= 1000</code></li>\n</ul>\n',
    difficulty: "Hard",
    title: "Binary Tree Maximum Path Sum",
    topicTags: [
      {
        _id: "6742aa7e0965ce2dc177da94",
        name: "Dynamic Programming",
      },
      {
        _id: "6742aa7e0965ce2dc177da95",
        name: "Tree",
      },
      {
        _id: "6742aa7e0965ce2dc177da96",
        name: "Depth-First Search",
      },
      {
        _id: "6742aa7e0965ce2dc177da97",
        name: "Binary Tree",
      },
    ],
  },
];

export default function QuestionHome() {
  return (
    <div className="mx-auto max-w-[80%] p-4 ">
      <h1 className="mb-6 text-2xl font-bold">Challengable Questions</h1>
      <QuestionsTable data={data} />
    </div>
  );
}
