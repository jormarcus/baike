'use client';

import { FormEvent, useContext, useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import { Bot, Loader2, User } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import toast from 'react-hot-toast';

import { Icons } from '@/components/icons';
import { ChatContext } from '@/context/chat-context';
import { getMessages } from '@/app/_actions/message-actions';
import { SafeMessage } from '@/types';
import { formatChatGPTMessage } from '@/helpers/format-dto';
import Textarea from '@/components/inputs/textarea';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { importRecipe } from '@/app/_actions/recipe-actions';

interface ChatPageProps {
  params: {
    searchId: string;
  };
}

const ChatPage: React.FC<ChatPageProps> = ({ params }) => {
  const formRef = useRef<HTMLFormElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [isLoading, setIsLoading] = useState(false);

  const chatIdEncoded = params.searchId;
  const chatId = chatIdEncoded ? decodeURIComponent(chatIdEncoded) : '';

  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    setMessages,
    reload,
  } = useContext(ChatContext);

  useEffect(() => {
    async function getChatHistory() {
      try {
        setIsLoading(true);
        const messageHistory: SafeMessage[] = await getMessages(
          parseInt(chatId),
          0
        );
        const safeMessages = messageHistory.map(formatChatGPTMessage);
        setMessages(safeMessages);

        // if the last message is from the user, reload the chat
        // this can happen if the user refreshes the page while ai is responding
        if (
          safeMessages.length > 0 &&
          safeMessages[safeMessages.length - 1].role === 'user'
        ) {
          reload({ options: { body: { chatId } } });
        }
      } catch (error) {
        toast.error('Something went wrong!');
      } finally {
        setIsLoading(false);
      }
    }

    if (messages.length === 0) {
      getChatHistory();
    }
  }, [chatId, messages.length, reload, setMessages]);

  const disabled = isLoading || input.length === 0;

  const isEmpty = input.length === 0;

  const handleImport = async (url: string) => {
    const newRecipe = await importRecipe(url);

    if (newRecipe) {
      toast.success('Recipe imported successfully!');
    }
  };

  return (
    <div className="flex flex-col items-center justify-between h-full">
      {messages.length > 0 ? (
        <>
          {messages.map((message, i) => {
            return message.role === 'function' &&
              message.name === 'importRecipe' ? (
              <div
                key={i}
                className="dark:bg-neutral-700 flex w-full items-center justify-center border-t border-neutral-400 pt-8"
              >
                <Button
                  className="dark:bg-amber-500 dark:text-white dark:hover:bg-amber-400"
                  type="submit"
                  onClick={() =>
                    handleImport(JSON.parse(message.content)['url'])
                  }
                >
                  Import
                </Button>
              </div>
            ) : (
              <div
                key={i}
                className={clsx(
                  'flex w-full items-center justify-center border-b border-neutral-400 py-8',
                  message.role === 'user'
                    ? 'bg-neutral-100 dark:bg-neutral-900'
                    : 'dark:bg-neutral-700 bg-neutral-300'
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
                        <a
                          {...props}
                          target="_blank"
                          rel="noopener noreferrer"
                        />
                      ),
                    }}
                  >
                    {message.content}
                  </ReactMarkdown>
                </div>
              </div>
            );
          })}
        </>
      ) : null}
      <div className="fixed bottom-0 flex w-full flex-col items-center space-y-3 p-5 sm:px-0 md:sticky animate-in slide-in-from-bottom-4 duration-300 ease-out bg:transparent">
        <form
          ref={formRef}
          onSubmit={(e: FormEvent<HTMLFormElement>) =>
            handleSubmit(e, { options: { body: { chatId } } })
          }
          className="relative w-full max-w-screen-md px-4 pt-3 sm:pb-3 sm:pt-4"
        >
          <Textarea
            ref={inputRef}
            tabIndex={0}
            required
            rows={1}
            autoFocus
            placeholder="Ask follow up..."
            value={input}
            onChange={handleInputChange}
            autoComplete="off"
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                formRef.current?.requestSubmit();
                e.preventDefault();
              }
            }}
            spellCheck={false}
            className="overflow-auto w-full pr-10 outline-none focus:outline-none p-4 mb-8 dark:bg-neutral-950 dark:text-neutral-400 rounded-3xl shadow-xl h-[55px] resize-none dark:caret-white"
          />
          <Button
            type="submit"
            disabled={disabled}
            className={cn(
              'absolute inset-y-4 sm:inset-y-5 right-6 my-auto flex h-8 w-8 items-center justify-center rounded-md text-neutral-500 bg-transparent hover:bg-transparent m-2 px-2 transition-all',
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
