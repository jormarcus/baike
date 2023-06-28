'use client';

import { useRef, useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import { HTMLAttributes } from 'react';

import { Button } from '../ui/Button';
import { Icons } from '../Icons';
import { cn } from '@/lib/utils';

interface ChatInputProps extends HTMLAttributes<HTMLDivElement> {
  handleSubmit: (e: any) => void;
}

const ChatInput: React.FC<ChatInputProps> = ({ className, handleSubmit }) => {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const isEmpty = input.length === 0;

  const onSubmit = async (e: any) => {
    e.preventDefault();
    try {
      handleSubmit(e);
    } catch (error) {
      console.log(error);
    } finally {
      setInput('');
    }
  };

  return (
    <div className={cn('relative w-full max-w-2xl', className)}>
      <form className="relative mx-4 flex" onSubmit={onSubmit}>
        <TextareaAutosize
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              onSubmit(e);
            }
          }}
          rows={2}
          maxRows={4}
          value={input}
          autoFocus
          disabled={isLoading}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Find your next recipe..."
          className="
          grow
          min-w-0
          border-neutral-600 rounded-md
          py-3 px-4 shadow-md hover:shadow-lg
          resize-none 
          bg-transparent placeholder:text-muted-foreground focus-visible:outline-none
          focus-visible:ring-2 focus-visible:ring-ring 
          disabled:cursor-not-allowed disabled:opacity-50
          focus:ring-neutral-500 focus:border-neutral-500"
        />
        <Button
          type="submit"
          onClick={(e) => onSubmit(e)}
          className={`absolute bottom-0 right-0 text-neutral-500 bg-transparent hover:bg-transparent m-2 h-8 px-2
          ${
            isEmpty
              ? 'cursor-default'
              : 'bg-amber-500 text-white hover:bg-amber-500'
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
