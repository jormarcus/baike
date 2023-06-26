'use client';

import { useContext, useRef, useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import toast from 'react-hot-toast';
import { HTMLAttributes } from 'react';

import { sendMessage } from '@/app/_actions/message-actions';
import { Button } from '../ui/Button';
import { Icons } from '../Icons';
import { createEmptyMessage } from '@/helpers/messages-helper';
import { MessagesContext } from '@/context/MessagesContext';
import { cn } from '@/lib/utils';

interface ChatInputProps extends HTMLAttributes<HTMLDivElement> {}

const ChatInput: React.FC<ChatInputProps> = ({ className }) => {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const {
    messages,
    addMessage,
    removeMessage,
    updateMessage,
    setIsMessageUpdating,
  } = useContext(MessagesContext);

  const isEmpty = input.length === 0;

  const emptyMsg = createEmptyMessage();

  const onMessage = async (messageInput: string) => {
    try {
      setIsLoading(true);
      const stream = await sendMessage(messageInput);

      if (!stream) throw new Error('Something went wrong.');

      // add new message to state
      addMessage(emptyMsg);

      setIsMessageUpdating(true);

      const reader = stream.getReader();
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
      setInput('');

      setTimeout(() => {
        textareaRef.current?.focus();
      }, 10);
    } catch (error) {
      console.error(error);
      toast.error('Something went wrong. Please try again.');
      removeMessage(emptyMsg.id);
      textareaRef.current?.focus();
      // display an error in the chat that the message was not set and there was an error
    } finally {
      setIsLoading(false);
      setInput('');
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onMessage(input);
  };

  return (
    <div className={cn('relative w-full max-w-2xl', className)}>
      <form className="relative" onSubmit={handleSubmit}>
        <TextareaAutosize
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();

              onMessage(input);
            }
          }}
          rows={2}
          maxRows={4}
          value={input}
          autoFocus
          disabled={isLoading}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Find your next recipe..."
          className="w-full
          min-w-0
          border-gray-600 rounded-md
          py-3 px-4 shadow-md hover:shadow-lg
          resize-none 
          bg-transparent placeholder:text-muted-foreground focus-visible:outline-none
          focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2
          disabled:cursor-not-allowed disabled:opacity-50"
        />
        <Button
          type="submit"
          onClick={(e) => {
            e.preventDefault();
            onMessage(input);
          }}
          className={`absolute bg-transparent hover:bg-transparent bottom-3 right-0 text-gray-600
          ${
            isEmpty
              ? 'cursor-default'
              : 'bg-green-400 text-white hover:bg-green-400'
          }
          `}
        >
          <Icons.arrowRightCircle className="h-1 w-1" />
        </Button>
      </form>
    </div>
  );
};

export default ChatInput;
