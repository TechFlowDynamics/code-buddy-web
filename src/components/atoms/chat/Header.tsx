// import { ChatProps } from '../types';

interface HeaderProps {
  roomName: string;
}

export const Header = ({ roomName }: HeaderProps) => (
  <div className="p-3 flex items-center justify-between border-b border-gray-800">
    <div className="flex items-center gap-2">
      <h2 className="text-lg">{roomName}</h2>
    </div>
    <div className="flex items-center gap-3">
      <button className="hover:bg-gray-800 p-1.5 rounded">
        <span>🔗</span>
      </button>
      <button className="hover:bg-gray-800 p-1.5 rounded">
        <span>👥</span>
      </button>
      <button className="hover:bg-gray-800 p-1.5 rounded">
        <span>⚙️</span>
      </button>
    </div>
  </div>
);