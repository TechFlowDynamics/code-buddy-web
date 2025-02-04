interface MessageInputProps {
    message: string;
    setMessage: (message: string) => void;
    sendMessage: () => void;
  }
  
  export const MessageInput = ({ message, setMessage, sendMessage }: MessageInputProps) => (
    <div className="mt-auto border-t border-gray-800">
      <div className="flex items-center p-4">
        <button className="text-xl opacity-70 hover:opacity-100 mr-2">
          <span>😊</span>
        </button>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
          placeholder="Type a message..."
          className="flex-1 bg-[#2b2b2b] rounded-sm px-4 py-2 text-sm focus:outline-none placeholder-gray-500"
        />
        <button
          onClick={sendMessage}
          disabled={!message.trim()}
          className="ml-2 text-blue-400 opacity-70 hover:opacity-100 disabled:opacity-30"
        >
          <span>➤</span>
        </button>
      </div>
    </div>
  );