'use client';

import { useRouter } from 'next/navigation';
import { useContext, useEffect } from 'react';
import toast from 'react-hot-toast';

import ChatInput from './ChatInput';
import { createTempMessage } from '@/helpers/messages-helper';
import { createThread } from '@/services/thread-services';
import { formatChatGPTMessage } from '@/helpers/format-dto';
import { ChatContext } from '@/context/ChatContext';

const ChatInputHome: React.FC = () => {
  const router = useRouter();
  const { setMessages, reload } = useContext(ChatContext);

  useEffect(() => {
    setMessages([]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = async (inputValue: string) => {
    // create thread instance and save to db
    const { data } = await createThread();
    if (!data) {
      toast.error('Something went wrong!');
      return;
    }

    // TODO the id for the message is not good
    // should i save the message and then call
    const message = createTempMessage(inputValue, data.id, true);

    const chatGPTMessage = formatChatGPTMessage(message);
    setMessages([chatGPTMessage]);

    reload({ options: { body: { chatId: data.id } } });

    router.push(`/search/${data.id}`);
  };

  return <ChatInput handleSubmit={handleSubmit} />;
};

export default ChatInputHome;
