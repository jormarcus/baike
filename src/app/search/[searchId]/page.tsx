'use client';

import { MessagesContext } from '@/context/MessagesContext';
import { ChatGPTMessage, Role } from '@/types';
import { useChat } from 'ai/react';
import {
  FormEvent,
  useContext,
  useEffect,
  useMemo,
  useTransition,
} from 'react';

interface ChatPageProps {
  params: {
    searchId: string;
  };
}

const ChatPage: React.FC<ChatPageProps> = ({ params }) => {
  const chatIdEncoded = params.searchId;
  const chatId = chatIdEncoded ? decodeURIComponent(chatIdEncoded) : '';
  const [isPending, startTransition] = useTransition();
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
    setMessages(chatGPTMessages);
    reload({ options: { body: { chatId } } });
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
        <input
          className="fixed bottom-0 w-full max-w-md p-2 mb-8 border border-neutral-600 rounded shadow-xl"
          value={input}
          placeholder="Say something..."
          onChange={handleInputChange}
        />
      </form>
    </div>
  );
};

export default ChatPage;
