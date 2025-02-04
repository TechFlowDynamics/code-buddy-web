// import { ChatProps, Scores } from '../types';

import { ChatProps, Scores } from "@/core/interface/room.interface";

interface ScoreboardProps {
  show: boolean;
  onClose: () => void;
  roomData: ChatProps['roomData'];
  scores: Scores;
  userDetails: Record<string, string>;
}

export const Scoreboard = ({ show, onClose, roomData, scores, userDetails }: ScoreboardProps) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-[#2b2b2b] rounded-lg w-[90%] max-w-5xl">
        <div className="flex justify-between items-center p-4 border-b border-gray-700">
          <h2 className="text-xl">Scoreboard</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            ✕
          </button>
        </div>
        <div className="p-4 overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left border-b border-gray-700">
                <th className="p-2">Rank</th>
                <th className="p-2">Players</th>
                {roomData.questionIds.map((id) => (
                  <th key={id} className="p-2 whitespace-nowrap">{id}</th>
                ))}
                <th className="p-2">Total Score</th>
                <th className="p-2">Total Bonus</th>
              </tr>
            </thead>
            <tbody>
              {roomData.users?.map((userId, index) => {
                const userScore = scores[userId] || {
                  questions: {},
                  totalScore: 0,
                  totalBonus: 0
                };
                return (
                  <tr key={userId} className="border-b border-gray-700">
                    <td className="p-2">
                      {index === 0 && <span>🥇</span>}
                      {index === 1 && <span>🥈</span>}
                      {index === 2 && <span>🥉</span>}
                      {index > 2 && `#${index + 1}`}
                    </td>
                    <td className="p-2 font-medium text-gray-300">
                      {userDetails[userId] || "Loading..."}
                    </td>
                    {roomData.questionIds.map((qId) => (
                      <td key={qId} className="p-2">
                        {userScore?.questions?.[qId]?.status === 'completed' ? (
                          <div>
                            <div>{userScore.questions[qId].score}</div>
                            {userScore.questions[qId].bonus > 0 && (
                              <div className="text-xs text-green-500">
                                +{userScore.questions[qId].bonus}
                              </div>
                            )}
                          </div>
                        ) : (
                          '-'
                        )}
                      </td>
                    ))}
                    <td className="p-2">{userScore?.totalScore || 0}</td>
                    <td className="p-2">{userScore?.totalBonus || 0}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};