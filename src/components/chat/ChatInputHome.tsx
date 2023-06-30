'use client';

import { useRouter } from 'next/navigation';
import { useCallback, useContext } from 'react';
import { nanoid } from 'nanoid';

import ChatInput from './ChatInput';
import { MessagesContext } from '@/context/MessagesContext';
import { createSafeMessage } from '@/helpers/messages-helper';

const ChatInputHome: React.FC = () => {
  const router = useRouter();
  const { addMessage } = useContext(MessagesContext);

  const handleSubmit = useCallback(async (inputValue: string) => {
    const chatId: string = nanoid();
    const message = createSafeMessage(inputValue, chatId, true);
    // add message to state
    addMessage(message);
    router.push(`/search/${encodeURIComponent(chatId)}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <ChatInput handleSubmit={handleSubmit} />;
};

export default ChatInputHome;
