import QuestionsTable from "./QuestionTable";

import React, { useEffect, useState } from "react";

import { useQuestionHandler } from "@/actions/questions.actions";

const PAGE_SIZE = 10;

export default function QuestionHome() {
  const [searchString, setSearchString] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [difficultyFilter, setDifficultyFilter] = useState<string | null>(null);
  const [totalContent, setTotalContent] = useState(0);
  const [params, setParams] = useState({
    pageSize: PAGE_SIZE,
    pageNo: currentPage,
    title: searchString,
    difficulty: difficultyFilter || "",
  });

  const { fetchQuestions, data } = useQuestionHandler(params);

  // Update query parameters when dependencies change
  useEffect(() => {
    const updatedParams = {
      pageSize: PAGE_SIZE,
      pageNo: currentPage,
      title: searchString,
      difficulty: difficultyFilter || "",
    };
    setParams(updatedParams);
  }, [searchString, currentPage, difficultyFilter]);

  // Fetch questions when `params` change
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetchQuestions();
      if (response) {
        setTotalContent(response.total);
      }
    };

    fetchData();
  }, [params, fetchQuestions]);

  return (
    <div className="mx-auto max-w-[80%] p-4">
      <h1 className="mb-6 text-2xl font-bold">Challengable Questions</h1>
      <QuestionsTable
        currentPage={currentPage}
        searchString={searchString}
        difficultyFilter={difficultyFilter}
        setCurrentPage={setCurrentPage}
        setDifficultyFilter={setDifficultyFilter}
        setSearchString={setSearchString}
        data={data ? data.data : []}
        totalContent={totalContent}
        pageSize={PAGE_SIZE}
      />
    </div>
  );
}
