'use client';

import { useRef, useState, HTMLAttributes, useContext } from 'react';

import { Button } from '../ui/Button';
import { Icons } from '../Icons';
import { cn } from '@/lib/utils';
import Textarea from '../inputs/Textarea';
import { ChatContext } from '@/context/ChatContext';

interface ChatInputProps extends HTMLAttributes<HTMLDivElement> {
  handleSubmit: (e: any) => Promise<void>;
}

const ChatInput: React.FC<ChatInputProps> = ({ className, handleSubmit }) => {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { input, handleInputChange, setInput } = useContext(ChatContext);

  const isEmpty = input.length === 0;

  const onSubmit = async (e: any) => {
    e.preventDefault();
    try {
      await handleSubmit(e.target.value);
      setInput('');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={cn('relative w-full max-w-2xl', className)}>
      <form className="relative mx-4 flex" onSubmit={handleSubmit}>
        <Textarea
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              onSubmit(e);
            }
          }}
          rows={2}
          value={input}
          autoFocus
          disabled={isLoading}
          onChange={handleInputChange}
          placeholder="Find your next recipe..."
          className="
          grow
          min-w-0
          dark:bg-neutral-950
          dark:text-neutral-400
          border-neutral-600 rounded-md
          focus:border-amber-500
          py-3 px-4 shadow-md hover:shadow-lg
          resize-none 
          bg-transparent focus:ring-amber-500 focus-visible:ring-amber-500 focus-visible:ring-1 focus-visible:ring-offset-0
          disabled:cursor-not-allowed disabled:opacity-50"
        />
        <Button
          type="submit"
          onClick={(e) => onSubmit(e)}
          className={`absolute bottom-0 right-0 text-neutral-500 bg-transparent hover:bg-transparent m-2 h-8 px-2
          ${
            isEmpty
              ? 'cursor-default'
              : 'bg-amber-500 text-neutral-200 hover:bg-amber-500'
          }
          `}
        >
          <Icons.arrowRightCircle className="h-5 w-5" />
        </Button>
      </form>
    </div>
  );
};

export default ChatInput;
