'use client';

import { Input } from '@/components/inputs/Input';
import { ChatContext } from '@/context/ChatContext';
import { formatChatGPTMessage } from '@/helpers/format-dto';
import { getMessages } from '@/services/message-services';
import { SafeMessage } from '@/types';
import { useSearchParams } from 'next/navigation';
import { FormEvent, useContext, useEffect, useMemo, useState } from 'react';

interface ChatPageProps {
  params: {
    searchId: string;
  };
}

const ChatPage: React.FC<ChatPageProps> = ({ params }) => {
  const [isLoading, setIsLoading] = useState(false);
  const searchParams = useSearchParams();

  const chatIdEncoded = params.searchId;
  const chatId = chatIdEncoded ? decodeURIComponent(chatIdEncoded) : '';

  const { messages, input, handleInputChange, handleSubmit, setMessages } =
    useContext(ChatContext);

  useEffect(() => {
    setIsLoading(true);

    async function getChatHistory() {
      const messageHistory: SafeMessage[] = await getMessages(parseInt(chatId));
      const safeMessages = messageHistory.map(formatChatGPTMessage);
      setMessages(safeMessages);
    }

    if (searchParams.get('prev') === 'threads') {
      getChatHistory();
    }

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
          placeholder="Ask follow-up..."
          onChange={handleInputChange}
          disabled={isLoading}
        />
      </form>
    </div>
  );
};

export default ChatPage;
