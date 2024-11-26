import { Badge, Button, Pagination, Table } from "@mantine/core";

import React from "react";

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
  difficultyFilter: string | null;
  searchString: string;
  currentPage: number;
  pageSize: number;
  totalContent: number;
  setDifficultyFilter: (value: string | null) => void;
  setCurrentPage: (value: number) => void;
  setSearchString: (value: string) => void;
  data: Question[];
}

export default function QuestionsTable({
  data,
  searchString,
  pageSize,
  totalContent,
  difficultyFilter,
  currentPage,
  setCurrentPage,
  setDifficultyFilter,
  setSearchString,
}: Props) {
  const { theme } = useTheme();

  return (
    <div className="p-2">
      {/* Filters */}
      <div className="mb-4 flex items-center gap-4">
        <InputField
          placeholder="Search by title"
          value={searchString}
          onChange={e => {
            setCurrentPage(1);
            setSearchString(e.target.value);
          }}
          parentClassName="flex-1 w-full"
          inputClassName="focus-scale-0 dark:focus-scale-0"
        />
        <SelectDropdown
          placeholder="Filter by difficulty"
          data={["Easy", "Medium", "Hard"]}
          checkIconPosition="right"
          value={difficultyFilter}
          onChange={value => {
            setCurrentPage(1);
            setDifficultyFilter(value);
          }}
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
          {data.length ? (
            data.map((question, index) => (
              <Table.Tr
                key={index}
                className="text-base hover:bg-[#ebf9ff] dark:hover:bg-darkBgColor">
                <Table.Td className="w-[220px] text-wrap px-2 text-left">
                  {question.title}
                </Table.Td>
                <Table.Td className="text-left">
                  <Badge
                    variant="light"
                    color={getBadgeColor(question.difficulty)}>
                    {question.difficulty}
                  </Badge>
                </Table.Td>
                <Table.Td className="text-left">
                  {question.acRate.toFixed(2)}%
                </Table.Td>
                <Table.Td className="text-left">
                  {question.topicTags.map(tag => (
                    <Badge key={tag._id} variant="light" className="mr-2">
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
          total={Math.ceil(totalContent / pageSize)}
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
