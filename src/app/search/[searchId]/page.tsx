'use client';

import { usePathname } from 'next/navigation';
import { useContext, useEffect } from 'react';
import toast from 'react-hot-toast';

import ChatMessages from '@/components/chat/ChatMessages';
import { MessagesContext } from '@/context/MessagesContext';
import { createEmptyMessage } from '@/helpers/messages-helper';
import { sendMessage } from '@/app/_actions/message-actions';
import { Message } from '@/lib/validators/message';
import ChatInput from '@/components/chat/ChatInput';

const SearchPage = ({}) => {
  const params = usePathname();
  console.log('params', params);

  const {
    messages,
    addMessage,
    removeMessage,
    updateMessage,
    setIsMessageUpdating,
  } = useContext(MessagesContext);

  const decodeMessage = async (
    messageStream: ReadableStream<Uint8Array>,
    emptyMsg: Message
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

      console.log('updated message', messages);

      // clean up
      setIsMessageUpdating(false);
    } catch (error) {
      console.error(error);
      throw new Error('Error decoding message stream');
    }
  };

  const streamMessage = async (inputValue: string) => {
    const emptyResponseMsg = createEmptyMessage();
    try {
      const stream = await sendMessage(inputValue);
      if (!stream) throw new Error('Something went wrong.');
      addMessage(emptyResponseMsg);
      decodeMessage(stream, emptyResponseMsg);
    } catch (error) {
      toast.error('Something went wrong. Please try again.');
      removeMessage(emptyResponseMsg.id);
      // textareaRef.current?.focus();
    }
  };

  useEffect(() => {
    console.log('messages', messages);
    streamMessage(messages[messages.length - 1]['text']);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = (e: any = null) => {
    e?.preventDefault();
    const inputValue = e.target.value;
    const emptyMsg = createEmptyMessage();
    emptyMsg.text = inputValue;
    emptyMsg.isUserMessage = true;
    addMessage(emptyMsg);
    try {
      streamMessage(inputValue);
    } catch (error) {
      toast.error('Something went wrong. Please try again.');
      removeMessage(emptyMsg.id);
      // textareaRef.current?.focus();
    }
  };

  return (
    <div className="flex flex-col justify-between h-[100vh] w-full items-center">
      <ChatMessages />
      <ChatInput handleSubmit={handleSubmit} />
    </div>
  );
};

export default SearchPage;
