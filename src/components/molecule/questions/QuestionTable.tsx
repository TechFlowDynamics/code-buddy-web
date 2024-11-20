import { Badge, Button, Pagination, Select, Table } from "@mantine/core";

import React, { useState } from "react";

import { useTheme } from "@/hooks/ThemeContext";

import SelectDropdown from "@/components/atoms/dropdown/SelectDropdown";
import InputField from "@/components/atoms/inputs/InputFields";

interface Question {
  acRate: number;
  content: string;
  difficulty: string;
  title: string;
  topicTags: { _id: string; name: string }[];
  categoryTitle: string;
}

interface Props {
  data: Question[];
}

export default function QuestionsTable({ data }: Props) {
  const { theme } = useTheme();
  const [search, setSearch] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const PAGE_SIZE = 15;

  // Filtered data based on search and difficulty filter
  const filteredData = data.filter(question => {
    const matchesSearch = question.title
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesDifficulty =
      difficultyFilter === null ||
      question.difficulty.toLowerCase() === difficultyFilter?.toLowerCase();
    return matchesSearch && matchesDifficulty;
  });

  // Paginated data
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const paginatedData = filteredData.slice(startIndex, startIndex + PAGE_SIZE);

  return (
    <div className="p-2">
      {/* Filters */}
      <div className="mb-4 flex items-center gap-4">
        <InputField
          placeholder="Search by title"
          value={search}
          onChange={e => setSearch(e.target.value)}
          parentClassName="flex-1 w-full"
          inputClassName="focus-scale-0 dark:focus-scale-0"
        />
        <SelectDropdown
          placeholder="Filter by difficulty"
          data={["Easy", "Medium", "Hard"]}
          checkIconPosition="right"
          value={difficultyFilter}
          // comboboxProps={{
          //   transitionProps: { transition: "pop", duration: 200 },
          // }}
          onChange={value => setDifficultyFilter(value)}
        />
      </div>

      {/* Table */}
      <Table
        highlightOnHover
        striped
        stripedColor={theme === "dark" ? "#111827" : "#f5fcff"}>
        <Table.Thead className="rounded-lg py-2 text-base font-semibold dark:border-gray-600 dark:bg-gray-700">
          <Table.Tr className="rounded-lg border-gray-600 bg-[#c8dce5] dark:bg-gray-700">
            <Table.Th>Title</Table.Th>
            <Table.Th>Difficulty</Table.Th>
            <Table.Th>Acceptance Rate</Table.Th>
            <Table.Th>Tags</Table.Th>
            <Table.Th>Category</Table.Th>
            <Table.Th>Actions</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {paginatedData.length ? (
            paginatedData.map((question, index) => (
              <Table.Tr
                key={index}
                className="text-base hover:bg-[#ebf9ff] dark:hover:bg-darkBgColor">
                <Table.Td className="w-[220px] text-wrap px-2 text-left">
                  {question.title}
                </Table.Td>
                <Table.Td className="text-left">
                  <Badge color={getBadgeColor(question.difficulty)}>
                    {question.difficulty}
                  </Badge>
                </Table.Td>
                <Table.Td className="text-left">
                  {question.acRate.toFixed(2)}%
                </Table.Td>
                <Table.Td className="text-left">
                  {question.topicTags.map(tag => (
                    <Badge key={tag._id} className="mr-2">
                      {tag.name}
                    </Badge>
                  ))}
                </Table.Td>
                <Table.Td className="text-left">
                  {question.categoryTitle}
                </Table.Td>
                <Table.Td className="text-left">
                  <Button variant="outline">Solve</Button>
                </Table.Td>
              </Table.Tr>
            ))
          ) : (
            <Table.Tr className="hover:bg-[#ebf9ff] dark:hover:bg-darkBgColor">
              <Table.Td colSpan={5} className="text-center">
                No questions found
              </Table.Td>
            </Table.Tr>
          )}
        </Table.Tbody>
      </Table>

      {/* Pagination */}
      <div className="mt-4 flex w-full justify-end px-4 py-2">
        <Pagination
          total={Math.ceil(filteredData.length / PAGE_SIZE)}
          value={currentPage}
          siblings={3}
          boundaries={3}
          onChange={setCurrentPage}
        />
      </div>
    </div>
  );
}

// Utility function to get badge color
function getBadgeColor(difficulty: string) {
  switch (difficulty.toLowerCase()) {
    case "easy":
      return "green";
    case "medium":
      return "yellow";
    case "hard":
      return "red";
    default:
      return "gray";
  }
}
