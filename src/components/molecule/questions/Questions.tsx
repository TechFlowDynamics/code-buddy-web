import QuestionsTable from "./QuestionTable";

import React, { useEffect, useState } from "react";

import { useQuestionHandler } from "@/actions/questions.actions";

import { QuestionResponseInterface } from "@/core/interface/question.interface";

const PAGE_SIZE = 15;

export default function QuestionHome() {
  const { handlerAllQuestions } = useQuestionHandler();
  const [searchString, setSearchString] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [difficultyFilter, setDifficultyFilter] = useState<string | null>(null);
  const [questionData, setQuestionData] = useState<QuestionResponseInterface>();
  useEffect(() => {
    handlerAllQuestions({
      pageSize: PAGE_SIZE,
      pageNo: currentPage,
      title: searchString,
    }).then(data => {
      if (data) {
        setQuestionData(data);
      }
    });
  }, [searchString, currentPage, difficultyFilter, questionData]);

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
        data={questionData ? questionData.data : []}
        totalContent={3428}
        pageSize={PAGE_SIZE}
      />
    </div>
  );
}
