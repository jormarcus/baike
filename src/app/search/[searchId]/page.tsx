'use client';

import { Input } from '@/components/inputs/Input';
import { MessagesContext } from '@/context/MessagesContext';
import { ChatGPTMessage, Role } from '@/types';
import { useChat } from 'ai/react';
import {
  FormEvent,
  useContext,
  useEffect,
  useMemo,
  useState,
  useTransition,
} from 'react';

interface ChatPageProps {
  params: {
    searchId: string;
  };
}

const ChatPage: React.FC<ChatPageProps> = ({ params }) => {
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
  } = useChat();
  const { messages: safeMessages } = useContext(MessagesContext);

  const chatGPTMessages: ChatGPTMessage[] = useMemo(() => {
    return safeMessages.map((m) => ({
      id: m.id,
      content: m.text,
      role: m.isUserMessage ? ('user' as Role) : ('system' as Role),
    }));
  }, [safeMessages]);

  useEffect(() => {
    setIsLoading(true);
    setMessages(chatGPTMessages);
    reload({ options: { body: { chatId } } });
    setIsLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex flex-col w-full max-w-md py-24 mx-auto stretch">
      {messages.length > 0
        ? messages.map((m) => (
            <div key={m.id} className="whitespace-pre-wrap">
              {m.role === 'user' ? 'User: ' : 'AI: '}
              {m.content}
            </div>
          ))
        : null}

      <form
        onSubmit={(e: FormEvent<HTMLFormElement>) =>
          handleSubmit(e, { options: { body: { chatId } } })
        }
      >
        <Input
          id="chat-input"
          className="fixed bottom-0 w-full max-w-md p-2 mb-8 border border-neutral-600 dark:bg-neutral-950
          dark:text-neutral-400 rounded shadow-xl focus:border-amber-500"
          value={input}
          placeholder="Say something..."
          onChange={handleInputChange}
          disabled={isLoading}
        />
      </form>
    </div>
  );
};

export default ChatPage;
