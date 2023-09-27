'use client';

import { useRouter } from 'next/navigation';
import { useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';

import { createTempMessage } from '@/helpers/messages-helper';
import { createThread } from '@/services/thread-services';
import { formatChatGPTMessage } from '@/helpers/format-dto';
import { ChatContext } from '@/context/ChatContext';
import Textarea from '../inputs/Textarea';
import { Button } from '../ui/Button';
import { Icons } from '../Icons';

const ChatInputHome: React.FC = () => {
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
    <div className="relative w-full max-w-2xl">
      <form className="relative mx-4 flex" onSubmit={handleSubmit}>
        <Textarea
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              handleSubmit(e);
            }
          }}
          rows={2}
          value={input}
          autoFocus
          disabled={isLoading}
          onChange={handleInputChange}
          placeholder="Paste a link or search for a recipe..."
          className="
        grow
        min-w-0
        dark:bg-neutral-950
        dark:text-neutral-400 rounded-md
        py-3 px-4 shadow-md hover:shadow-lg
        resize-none 
        bg-transparent disabled:cursor-not-allowed disabled:opacity-50"
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
