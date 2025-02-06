"use client";

import Editor from "@monaco-editor/react";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";

import { useCallback, useEffect, useState } from "react";

import { useParams, useRouter } from "next/navigation";

import { useRoomQueryHandler } from "@/actions/room.actions";

import { useQuestionQuery } from "@/api/questions/questionApiSlice";
import { usePollingVerifyRoomQuery, useVerifyRoomQuery } from "@/api/rooms/roomApiSlice";

import { codeTemplates } from "@/core/constants/editor";
import { Language, Problem } from "@/core/interface/question.interface";

import Chat from "@/components/atoms/chat/Chat";
import { useRunCodeMutation, useSubmitCodeMutation } from "@/api/codeEditor/codeApiSlice";
import TestResults from "@/components/molecule/codeEditor/TestResults";

const ResizeHandle = () => (
  <PanelResizeHandle className="group w-2 transition-colors hover:bg-gray-700">
    <div className="mx-auto h-full w-0.5 bg-gray-800 group-hover:bg-gray-600" />
  </PanelResizeHandle>
);

const Page = () => {
  const router = useRouter();
  const { roomId } = useParams() as { roomId: string };
  const { handlerVerifyRoom, handlerExitRoom } = useRoomQueryHandler(roomId);
  
  // All state declarations at the top
  const [selectedQuestion, setSelectedQuestion] = useState<Problem | null>(null);
  const [selectedQuestionIndex, setSelectedQuestionIndex] = useState(0);
  const [language, setLanguage] = useState<Language>("javascript");
  const [code, setCode] = useState(codeTemplates.javascript);
  const [accessGranted, setAccessGranted] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  // Queries
  const { data: questionsData, isLoading: isQuestionsLoading } = useQuestionQuery({});
  // const { data: roomData, isLoading: isRoomLoading } = usePollingVerifyRoomQuery(roomId);
  const { data: roomData, isLoading: isRoomLoading } = useVerifyRoomQuery(roomId);
  
  const [runCode, { isLoading: isRunning }] = useRunCodeMutation();
  const [submitCode, { isLoading: isSubmitting }] = useSubmitCodeMutation();
  const [testResults, setTestResults] = useState<ExecutionResult | null>(null);
  const [submissionResult, setSubmissionResult] = useState<ExecutionResult | null>(null);
  // Derived state
  const questions = questionsData?.data?.filter(question =>
    roomData?.room?.questionIds?.includes(question.title)
  ) || [];

 
  useEffect(() => {
    if (roomData) {
      setAccessGranted(true);
    } else if (roomData === null) {
      setAccessGranted(false);
      router.push('/dashboard/lobby');
    }
  }, [roomData, router]);
  useEffect(() => {
    if (questions.length > 0 && !selectedQuestion) {
      setSelectedQuestion(questions[0]);
      setSelectedQuestionIndex(0);
    }
  }, [questions, selectedQuestion]);

  const handleExit = async () => {
    const response = await handlerExitRoom(roomId);
    if (response) router.push("/dashboard/lobby");
  };

  // Loading and error states
  if ( isQuestionsLoading || isRoomLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        Loading...
      </div>
    );
  }

  if (accessGranted === false) {
    return (
      <div className="flex h-screen items-center justify-center">
        Access Denied
      </div>
    );
  }
  // Add new mutations

  // Add state for test results
  interface TestCase {
    input: string;
    expectedOutput: string;
    actualOutput: string;
    passed: boolean;
    executionTime: number;
    memoryUsed: number;
  }
  
  
  interface ExecutionResult {
    success: boolean;
    testCases: TestCase[];
    status: string;
  }
  

  // Handle run code
  const handleRunCode = async () => {
    try {
      if (!selectedQuestion?.title) {
        console.error('No question selected');
        return;
      }
  
      const result = await runCode({
        code,
        language,
        questionId: selectedQuestion.title, // Use title instead of _id
      }).unwrap();
  
      setTestResults(result);
    } catch (error) {
      console.error('Run code error:', error);
    }
  };
  
  const handleSubmitCode = async () => {
    try {
      if (!selectedQuestion?.title) {
        console.error('No question selected');
        return;
      }
  
      const result = await submitCode({
        code,
        language,
        questionId: selectedQuestion.title, // Use title instead of _id
        roomId,
      }).unwrap();
  
      setSubmissionResult(result);
    } catch (error) {
      console.error('Submit code error:', error);
    }
  };


  {error && (
    <div className="text-red-500 text-sm mt-2 px-4">
      {error}
    </div>
  )}

  return (
    <div className="flex h-screen bg-[#1e1e1e] text-gray-100">
      {/* Top Navigation */}
      <div className="fixed left-0 right-0 top-0 z-10 flex h-12 items-center border-b border-gray-800 bg-[#1e1e1e] px-4">
        <div className="flex gap-6">
          <span className="font-medium text-white">Problems</span>
          <span className="cursor-pointer text-gray-500 hover:text-gray-300">
            Submissions
          </span>
          <span className="cursor-pointer text-gray-500 hover:text-gray-300">
            Solutions
          </span>
        </div>
      </div>

      {/* Main Content */}
      <div className="mt-12 w-full">
        <PanelGroup direction="horizontal">
          {/* Left Panel - Problem Description */}
          <Panel defaultSize={25} minSize={20}>
            <div className="h-full border-r border-gray-800">
              <div className="flex items-center justify-between border-b border-gray-800 p-4">
                <div>
                  <h1 className="text-xl">
                    {selectedQuestionIndex + 1}.{" "}
                    {selectedQuestion?.title || "Select Problem"}
                  </h1>
                  {selectedQuestion && (
                    <span
                      className={`mt-1 inline-block rounded px-2 py-0.5 text-xs ${
                        selectedQuestion.difficulty === "Easy"
                          ? "bg-[#2cba00] text-black"
                          : selectedQuestion.difficulty === "Medium"
                            ? "bg-[#ffa116] text-black"
                            : "bg-[#ef4743] text-black"
                      }`}>
                      {selectedQuestion.difficulty}
                    </span>
                  )}
                </div>
                <div className="flex gap-2">
                  <button
                    className="p-2 text-gray-400 hover:text-white"
                    onClick={() => {
                      if (selectedQuestionIndex > 0) {
                        setSelectedQuestionIndex(selectedQuestionIndex - 1);
                        setSelectedQuestion(
                          questions[selectedQuestionIndex - 1],
                        );
                      }
                    }}>
                    ←
                  </button>
                  <button
                    className="p-2 text-gray-400 hover:text-white"
                    onClick={() => {
                      if (selectedQuestionIndex < questions.length - 1) {
                        setSelectedQuestionIndex(selectedQuestionIndex + 1);
                        setSelectedQuestion(
                          questions[selectedQuestionIndex + 1],
                        );
                      }
                    }}>
                    →
                  </button>
                </div>
              </div>

              <div className="h-[calc(100vh-144px)] overflow-y-auto p-4">
                {selectedQuestion && (
                  <div className="prose prose-invert prose-sm max-w-none">
                    <div
                      className="[&_code]:rounded [&_code]:bg-[#2d2d2d] [&_code]:px-1 [&_code]:py-0.5 [&_pre]:bg-[#2d2d2d]"
                      dangerouslySetInnerHTML={{
                        __html: selectedQuestion.content,
                      }}
                    />
                  </div>
                )}
              </div>
            </div>
          </Panel>

          <ResizeHandle />

          {/* Middle Panel - Code Editor */}
          <Panel defaultSize={50} minSize={30}>
            <div className="flex h-full flex-col">
              <div className="flex items-center justify-between border-b border-gray-800 px-4 py-2">
                <select
                  className="rounded bg-[#2d2d2d] px-3 py-1 text-sm text-gray-300"
                  value={language}
                  onChange={e => {
                    const newLang = e.target.value as Language;
                    setLanguage(newLang);
                    setCode(codeTemplates[newLang]);
                  }}>
                  <option value="javascript">JavaScript</option>
                  <option value="python">Python</option>
                  <option value="java">Java</option>
                </select>
                {/* <div className="flex gap-2">
                  <button className="rounded bg-[#2d2d2d] px-4 py-1 text-sm hover:bg-[#3d3d3d]">
                    Run
                  </button>
                  <button className="rounded bg-[#2cba00] px-4 py-1 text-sm hover:bg-[#239900]">
                    Submit
                  </button>
                </div> */}

<div className="flex gap-2">
      <button 
        className={`rounded ${isRunning ? 'bg-gray-500' : 'bg-[#2d2d2d]'} px-4 py-1 text-sm hover:bg-[#3d3d3d]`}
        onClick={handleRunCode}
        disabled={isRunning || !selectedQuestion}
      >
        {isRunning ? 'Running...' : 'Run'}
      </button>
      <button 
        className={`rounded ${isSubmitting ? 'bg-gray-500' : 'bg-[#2cba00]'} px-4 py-1 text-sm hover:bg-[#239900]`}
        onClick={handleSubmitCode}
        disabled={isSubmitting || !selectedQuestion}
      >
        {isSubmitting ? 'Submitting...' : 'Submit'}
      </button>
    </div>
              </div>
              <div className="flex-1">
                <Editor
                  height="100%"
                  language={language}
                  value={code}
                  theme="vs-dark"
                  onChange={value => setCode(value || "")}
                  options={{
                    minimap: { enabled: false },
                    fontSize: 14,
                    lineNumbers: "on",
                    automaticLayout: true,
                    scrollBeyondLastLine: false,
                  }}
                />
              </div>

              {(testResults || submissionResult) && (
            <div className="h-1/3 border-t border-gray-800 overflow-y-auto">
              <TestResults 
                results={submissionResult?.testCases || testResults?.testCases || []}
                isSubmission={!!submissionResult}
              />
            </div>
          )}

            </div>
          </Panel>

          <ResizeHandle />

          {/* Right Panel - Chat */}
          <Panel defaultSize={25} minSize={15}>
            <Chat 
              roomId={roomId} 
              onExit={handleExit} 
              roomData={roomData?.room!}
            />
          </Panel>
        </PanelGroup>
      </div>
    </div>
  );
};

export default Page;
