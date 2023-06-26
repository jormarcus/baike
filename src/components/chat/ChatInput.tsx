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
      <form className="relative" onSubmit={onSubmit}>
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
          onClick={(e) => onSubmit(e)}
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
