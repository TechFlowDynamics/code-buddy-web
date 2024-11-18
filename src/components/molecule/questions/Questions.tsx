import QuestionsTable from "./QuestionTable";

import React, { useEffect, useState } from "react";

import { useQuestionHandler } from "@/actions/questions.actions";

import { QuestionResponseInterface } from "@/core/interface/question.interface";

export default function QuestionHome() {
  const { handlerAllQuestions } = useQuestionHandler();
  const [questionData, setQuestionData] = useState<QuestionResponseInterface>();
  useEffect(() => {
    handlerAllQuestions({ pageSize: 20, pageNo: 1 }).then(data => {
      if (data) {
        setQuestionData(data);
      }
    });
  }, []);

  return (
    <div className="mx-auto max-w-[80%] p-4">
      <h1 className="mb-6 text-2xl font-bold">Challengable Questions</h1>
      <QuestionsTable data={questionData ? questionData.data : []} />
    </div>
  );
}
