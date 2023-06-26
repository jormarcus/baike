'use client';

import ChatMessages from './ChatMessages';
import ChatInput from './ChatInput';

const Chat = () => {
  return (
    <div className="flex flex-col items-center w-full">
      <ChatMessages />
      <ChatInput />
    </div>
  );
};

export default Chat;
