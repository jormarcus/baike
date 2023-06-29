'use client';

import { usePathname } from 'next/navigation';
import { useCallback, useContext, useEffect } from 'react';
import toast from 'react-hot-toast';

import ChatMessages from '@/components/chat/ChatMessages';
import { MessagesContext } from '@/context/MessagesContext';
import { sendMessage } from '@/services/message-services';
import ChatInput from '@/components/chat/ChatInput';
import { SafeMessage } from '@/types';
import {
  createEmptyMessage,
  createSafeMessage,
} from '@/helpers/messages-helper';

const SearchPage = ({}) => {
  const path = usePathname();
  const chatIdEncoded = path.split('/').pop();
  const chatId = chatIdEncoded ? decodeURIComponent(chatIdEncoded) : '';

  const {
    messages,
    addMessage,
    removeMessage,
    updateMessage,
    setIsMessageUpdating,
  } = useContext(MessagesContext);

  const decodeMessage = async (
    messageStream: ReadableStream<Uint8Array>,
    emptyMsg: SafeMessage
  ) => {
    try {
      setIsMessageUpdating(true);

      const reader = messageStream.getReader();
      const decoder = new TextDecoder();
      let done = false;

      while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;
        const chunkValue = decoder.decode(value);
        updateMessage(emptyMsg.id, (prev) => prev + chunkValue);
      }

      // clean up
      setIsMessageUpdating(false);
    } catch (error) {
      console.error(error);
      throw new Error('Error decoding message stream');
    }
  };

  const handleSendMessage = useCallback(async () => {
    const emptyResponseMsg = createEmptyMessage();
    console.log('messages', messages);
    const stream = await sendMessage(messages);
    if (!stream) throw new Error('Something went wrong.');
    addMessage(emptyResponseMsg);
    decodeMessage(stream, emptyResponseMsg);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages]);

  const handleSubmit = useCallback(
    async (inputValue: string) => {
      const msg = createSafeMessage(inputValue, chatId, true);
      addMessage(msg);
    },
    [addMessage, chatId]
  );

  useEffect(() => {
    if (messages.length > 0 && messages[messages.length - 1]?.isUserMessage) {
      handleSendMessage();
    }
  }, [messages, handleSendMessage]);

  return (
    <div className="flex flex-col justify-between h-[100vh] w-full items-center">
      <ChatMessages />
      <ChatInput handleSubmit={handleSubmit} />
    </div>
  );
};

export default SearchPage;
