"use client";

import Editor from "@monaco-editor/react";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";

import { useCallback, useEffect, useState } from "react";

import { useParams, useRouter } from "next/navigation";

import { useRoomQueryHandler } from "@/actions/room.actions";

import { useQuestionQuery } from "@/api/questions/questionApiSlice";
import { usePollingVerifyRoomQuery } from "@/api/rooms/roomApiSlice";

import { codeTemplates } from "@/core/constants/editor";
import { Language, Problem } from "@/core/interface/question.interface";

import Chat from "@/components/atoms/chat/Chat";

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

  // Queries
  const { data: questionsData, isLoading: isQuestionsLoading } = useQuestionQuery({});
  const { data: roomData, isLoading: isRoomLoading } = usePollingVerifyRoomQuery(roomId);

  // Derived state
  const questions = questionsData?.data?.filter(question =>
    roomData?.room?.questionIds?.includes(question.title)
  ) || [];

  // Effects and callbacks
  const verifyAccess = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await handlerVerifyRoom(roomId);
      
      if (!res) {
        setAccessGranted(false);
        return false;
      }
      
      setAccessGranted(true);
      return true;
    } catch (error) {
      console.error("Error verifying room access:", error);
      setAccessGranted(false);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [roomId, handlerVerifyRoom]);

  // Modified retry logic with initial delay
  useEffect(() => {
    let retryCount = 0;
    const maxRetries = 3; // Increased retries
    const initialDelay = 1000; // 1 second delay before first attempt
    const retryDelay = 1500; // 1.5 seconds between retries

    const attemptVerification = async () => {
      // Initial delay only on first attempt
      if (retryCount === 0) {
        await new Promise(resolve => setTimeout(resolve, initialDelay));
      }

      const success = await verifyAccess();
      
      if (!success && retryCount < maxRetries) {
        retryCount++;
        setTimeout(attemptVerification, retryDelay);
      }
    };

    attemptVerification();
  }, [verifyAccess]);

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
  if (isLoading || isQuestionsLoading || isRoomLoading) {
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
                <div className="flex gap-2">
                  <button className="rounded bg-[#2d2d2d] px-4 py-1 text-sm hover:bg-[#3d3d3d]">
                    Run
                  </button>
                  <button className="rounded bg-[#2cba00] px-4 py-1 text-sm hover:bg-[#239900]">
                    Submit
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
