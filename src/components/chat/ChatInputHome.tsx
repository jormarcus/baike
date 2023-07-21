'use client';

import { useRouter } from 'next/navigation';
import { useContext, useEffect } from 'react';
import { useChat } from 'ai/react';
import toast from 'react-hot-toast';

import ChatInput from './ChatInput';
import { MessagesContext } from '@/context/MessagesContext';
import { createTempMessage } from '@/helpers/messages-helper';
import { createThread } from '@/services/thread-services';

const ChatInputHome: React.FC = () => {
  const router = useRouter();
  const { addMessage, setMessages: setSafeMessages } =
    useContext(MessagesContext);
  const { setMessages } = useChat();

  useEffect(() => {
    setMessages([]);
    setSafeMessages([]);
  }, [setMessages, setSafeMessages]);

  const handleSubmit = async (inputValue: string) => {
    // create thread instance and save to db
    const { data } = await createThread();
    if (!data) {
      toast.error('Something went wrong!');
      return;
    }
    const message = createTempMessage(inputValue, data.id, true);
    // add message to chat context
    // using the setMessages function from the useChat hook isnt working from here...
    addMessage(message);

    router.push(`/search/${data.id}`);
  };

  return <ChatInput handleSubmit={handleSubmit} />;
};

export default ChatInputHome;
