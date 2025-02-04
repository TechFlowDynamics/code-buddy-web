// import { Message } from '../types';

import { Message } from "@/core/interface/room.interface";

interface MessageListProps {
  messages: Message[];
  messagesEndRef: React.RefObject<HTMLDivElement>;
}

export const MessageList = ({ messages, messagesEndRef }: MessageListProps) => (
  <div className="flex-1 overflow-y-auto px-4">
    {messages.map((msg, index) => (
      <div key={`${msg.$id}-${index}`} className="mb-4">
        {msg.isSystem ? (
          <div className="text-center text-sm text-gray-500">
            {msg.body}
            <span className="ml-2 text-xs">
              {new Date(msg.$createdAt).toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
                hour12: true
              })}
            </span>
          </div>
        ) : (
          <div>
            <div className="flex items-baseline gap-2">
              <span className="font-medium">
                {msg.userName}
              </span>
              <span className="text-xs text-gray-500">
                {new Date(msg.$createdAt).toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                  hour12: true
                })}
              </span>
            </div>
            <div className="mt-1 text-gray-300">{msg.body}</div>
          </div>
        )}
      </div>
    ))}
    <div ref={messagesEndRef} />
  </div>
);