'use client';

import { useRouter } from 'next/navigation';
import { useContext, useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';

import { ChatContext } from '@/context/ChatContext';
import { Button } from '../ui/Button';
import { Icons } from '../Icons';
import Textarea from '../inputs/Textarea';
import { createChat } from '@/app/_actions/chat-actions';

const examples = [
  'What are some simple dinner recipes that can be cooked in under 30 minutes?',
  'I want to eat healthier. Can you suggest recipes that are low on carbs and high on protein?',
  "I'm planning to prepare a holiday dessert, but some of my guests have dietary restrictions. Can you suggest dairy and nut-free options? Include information about their cooking time and difficulty.",
];

const ChatInputHome: React.FC = () => {
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { setMessages, input, handleInputChange, setInput, handleSubmit } =
    useContext(ChatContext);

  const isEmpty = input.length === 0;

  useEffect(() => {
    setMessages([]);
    setInput('');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      // create chat instance and save to db
      const chat = await createChat();
      if (!chat) {
        toast.error('Failed to create chat');
        return;
      }

      // send message to openai api using vercel ai sdk
      handleSubmit(e, { options: { body: { chatId: chat.id } } });
      setInput('');

      router.push(`/search/${chat.id}`);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-screen-md sm:w-full flex flex-col items-center">
      <div className="max-w-screen-sm flex flex-col space-y-4 border border-neutral-600 dark:bg-secondary p-6 sm:p-10">
        {examples.map((example, i) => (
          <button
            key={i}
            className="rounded-md border border-neutral-600 bg-secondary px-5 py-3 text-left text-sm duration-75 hover:text-gray-800 transition dark:text-gray-500 dark:hover:text-gray-300"
            onClick={() => {
              setInput(example);
              inputRef.current?.focus();
            }}
          >
            {example}
          </button>
        ))}
      </div>

      <form className="relative flex w-full mt-16" onSubmit={onSubmit}>
        <Textarea
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              onSubmit(e);
            }
          }}
          ref={inputRef}
          rows={2}
          value={input}
          autoFocus
          disabled={isLoading}
          onChange={handleInputChange}
          placeholder="Paste a link or search for a recipe..."
          className="
        grow
        min-w-0
        border border-neutral-600
        dark:text-neutral-400 rounded-md
        py-3 px-4 shadow-md hover:shadow-lg
        resize-none 
        bg-secondary disabled:cursor-not-allowed disabled:opacity-50"
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

export default ChatInputHome;
