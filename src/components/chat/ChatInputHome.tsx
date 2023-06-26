'use client';

import { useRouter } from 'next/navigation';
import { useContext, useMemo } from 'react';

import ChatInput from './ChatInput';
import { MessagesContext } from '@/context/MessagesContext';
import { createEmptyMessage } from '@/helpers/messages-helper';

const ChatInputHome: React.FC = () => {
  const router = useRouter();
  const { addMessage } = useContext(MessagesContext);

  const emptyMsg = useMemo(() => createEmptyMessage(), []);

  const handleSubmit = (e: any = null) => {
    e?.preventDefault();
    emptyMsg.text = e.target.value;
    emptyMsg.isUserMessage = true;
    addMessage(emptyMsg);
    router.push(`/search/${emptyMsg.id}`);
  };

  return <ChatInput handleSubmit={handleSubmit} />;
};

export default ChatInputHome;
