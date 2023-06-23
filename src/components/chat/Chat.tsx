'use client';

import { useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import { ca } from 'date-fns/locale';

import { sendMessage } from '@/app/_actions/message-actions';
import ChatMessages from './ChatMessages';
import ChatInput from './ChatInput';

const Chat = () => {
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const onMessage = async (messageInput: string) => {
    try {
      setIsLoading(true);
      await sendMessage(messageInput);
    } catch (error) {
      console.error(error);
      // display an error in the chat that the message was not set and there was an error
    } finally {
      setIsLoading(false);
      setInput('');
    }
  };

  return (
    <div className="flex flex-col">
      <ChatMessages />
      <ChatInput />
    </div>
  );
};

export default Chat;