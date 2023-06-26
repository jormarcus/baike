'use client';

import { Message as MessageType } from '@/lib/validators/message';
import Message from './Message';
import { useContext } from 'react';
import { MessagesContext } from '@/context/MessagesContext';

const ChatMessages = () => {
  const { messages } = useContext(MessagesContext);
  return (
    <div className="flex flex-col flex-grow w-full gap-3 overflow-scroll p-0">
      {messages.map((message) => (
        <Message key={message.id} message={message} />
      ))}
    </div>
  );
};

export default ChatMessages;
