'use client';

import { useRouter } from 'next/navigation';
import { useContext, useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';

import { createTempMessage } from '@/helpers/messages-helper';
import { createThread } from '@/services/thread-services';
import { formatChatGPTMessage } from '@/helpers/format-dto';
import { ChatContext } from '@/context/ChatContext';

import { Button } from '../ui/Button';
import { Icons } from '../Icons';
import Textarea from '../inputs/Textarea';

const examples = [
  'Get me the top 5 trending recipes from New York Times Recipes.',
  'Simple dinner recipes that can be cooked in under 30 minutes.',
  'What is the most favorited recipe on instagram this week?',
];

const ChatInputHome: React.FC = () => {
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { setMessages, reload, input, handleInputChange, setInput } =
    useContext(ChatContext);

  const isEmpty = input.length === 0;

  useEffect(() => {
    setMessages([]);
    setInput('');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      // create thread instance and save to db
      const { data } = await createThread();
      if (!data) {
        toast.error('Something went wrong!');
        return;
      }

      // TODO the id for the message is not good
      // should i save the message and then call
      const message = createTempMessage(e.target.value, data.id, true);

      const chatGPTMessage = formatChatGPTMessage(message);
      setMessages([chatGPTMessage]);

      reload({ options: { body: { chatId: data.id } } });

      router.push(`/search/${data.id}`);
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
            className="rounded-md border border-neutral-600 bg-secondary px-5 py-3 text-left text-sm text-neutral-400 transition-all duration-75 hover:border-white hover:text-neutral-100 active:bg-neutral-100 active:text-neutral-700"
            onClick={() => {
              setInput(example);
              inputRef.current?.focus();
            }}
          >
            {example}
          </button>
        ))}
      </div>

      <form className="relative flex w-full mt-16" onSubmit={handleSubmit}>
        <Textarea
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              handleSubmit(e);
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
          onClick={(e) => handleSubmit(e)}
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
