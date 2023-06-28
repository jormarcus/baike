'use client';

import { useRouter } from 'next/navigation';
import { useCallback, useContext } from 'react';

import ChatInput from './ChatInput';
import { MessagesContext } from '@/context/MessagesContext';
import { createSafeMessage } from '@/helpers/messages-helper';
import { createChat } from '@/services/chat-services';

const ChatInputHome: React.FC = () => {
  const router = useRouter();
  const { addMessage } = useContext(MessagesContext);

  const handleSubmit = useCallback(async (inputValue: string) => {
    const chat = await createChat();
    const message = createSafeMessage(inputValue, chat.id, true);

    addMessage(message);
    router.push(`/search/${encodeURIComponent(chat.id)}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <ChatInput handleSubmit={handleSubmit} />;
};

export default ChatInputHome;
