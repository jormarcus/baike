'use client';

import { useRouter } from 'next/navigation';
import { startTransition, useCallback, useContext } from 'react';
import { nanoid } from 'nanoid';
import { useChat } from 'ai/react';
import toast from 'react-hot-toast';

import ChatInput from './ChatInput';
import { MessagesContext } from '@/context/MessagesContext';
import { createSafeMessage } from '@/helpers/messages-helper';
import { createThread } from '@/services/thread-services';

const ChatInputHome: React.FC = () => {
  const router = useRouter();
  const { addMessage } = useContext(MessagesContext);
  const { append, setMessages } = useChat();

  const handleSubmit = async (inputValue: string) => {
    // create thread instance and save to db
    const { data } = await createThread();
    if (!data) {
      toast.error('Something went wrong!');
      return;
    }
    const message = createSafeMessage(inputValue, data.id, true);
    // add message to chat context
    addMessage(message);

    router.push(`/search/${data.id}`);
  };

  return <ChatInput handleSubmit={handleSubmit} />;
};

export default ChatInputHome;
