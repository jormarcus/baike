'use client';

import { FormEvent, useContext, useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import { Bot, Loader2, User } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useSearchParams } from 'next/navigation';

import { Icons } from '@/components/Icons';
import { ChatContext } from '@/context/ChatContext';
import { getMessages } from '@/app/_actions/message-actions';
import { SafeMessage } from '@/types';
import { formatChatGPTMessage } from '@/helpers/format-dto';
import Textarea from '@/components/inputs/Textarea';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';

interface ChatPageProps {
  params: {
    searchId: string;
  };
}

const ChatPage: React.FC<ChatPageProps> = ({ params }) => {
  const formRef = useRef<HTMLFormElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const searchParams = useSearchParams();

  const chatIdEncoded = params.searchId;
  const chatId = chatIdEncoded ? decodeURIComponent(chatIdEncoded) : '';

  const { messages, input, handleInputChange, handleSubmit, setMessages } =
    useContext(ChatContext);

  useEffect(() => {
    setIsLoading(true);

    async function getChatHistory() {
      const messageHistory: SafeMessage[] = await getMessages(
        parseInt(chatId),
        0
      );
      const safeMessages = messageHistory.map(formatChatGPTMessage);
      console.log(safeMessages);
      setMessages(safeMessages);
    }

    // if navigating from threads page, get chat history
    if (searchParams.get('prev') === 'threads') {
      getChatHistory();
    }

    setIsLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const disabled = isLoading || input.length === 0;

  const isEmpty = input.length === 0;

  return (
    <div className="flex flex-col items-center justify-between pb-40 h-full">
      {messages.length > 0
        ? messages.map((message, i) => (
            <div
              key={i}
              className={clsx(
                'flex w-full items-center justify-center border-b border-gray-200 py-8',
                message.role === 'user'
                  ? 'dark:bg-neutral-950'
                  : 'dark:bg-neutral-800'
              )}
            >
              <div className="flex w-full max-w-screen-md items-start space-x-4 px-5 sm:px-0">
                <div
                  className={clsx(
                    'p-1.5 text-black',
                    message.role === 'assistant' ? 'bg-amber-500' : 'bg-white'
                  )}
                >
                  {message.role === 'user' ? (
                    <User width={20} />
                  ) : (
                    <Bot width={20} />
                  )}
                </div>
                <ReactMarkdown
                  className="prose dark:prose-invert mt-1 w-full break-words prose-p:leading-relaxed dark:text-neutral-300"
                  remarkPlugins={[remarkGfm]}
                  components={{
                    // open links in new tab
                    a: (props) => (
                      <a {...props} target="_blank" rel="noopener noreferrer" />
                    ),
                  }}
                >
                  {message.content}
                </ReactMarkdown>
              </div>
            </div>
          ))
        : null}
      <div className="fixed bottom-0 flex w-full flex-col items-center space-y-3 p-5 pb-12 sm:px-0 animate-in slide-in-from-bottom-4 duration-300 ease-out">
        <form
          ref={formRef}
          onSubmit={(e: FormEvent<HTMLFormElement>) =>
            handleSubmit(e, { options: { body: { chatId } } })
          }
          className="relative w-full max-w-screen-md px-4 pb-8 pt-3 shadow-lg sm:pb-3 sm:pt-4"
        >
          <Textarea
            ref={inputRef}
            tabIndex={0}
            required
            rows={1}
            autoFocus
            placeholder="Send a message"
            value={input}
            onChange={handleInputChange}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                formRef.current?.requestSubmit();
                e.preventDefault();
              }
            }}
            spellCheck={false}
            className="w-full pr-10 focus:outline-none p-4 mb-8 dark:bg-neutral-950 dark:text-neutral-400 rounded-3xl shadow-xl h-[64px] resize-none"
          />
          <Button
            type="submit"
            disabled={disabled}
            className={cn(
              'absolute inset-y-0 right-3 my-auto flex h-8 w-8 items-center justify-center rounded-md text-neutral-500 bg-transparent hover:bg-transparent m-2 px-2 transition-all',

              isEmpty
                ? 'cursor-default'
                : 'bg-amber-500 text-neutral-200 hover:bg-amber-500'
            )}
          >
            {isLoading ? (
              <Loader2 />
            ) : (
              <Icons.arrowRightCircle className="h-5 w-5" />
            )}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ChatPage;
