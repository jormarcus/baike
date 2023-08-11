'use client';

import ChatHeader from '@/components/chat/ChatHeader';
import Message from '@/components/chat/Message';
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

    // if navigating from threads page, get chat history
    if (searchParams.get('prev') === 'threads') {
      getChatHistory();
    }

    setIsLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex flex-col w-full justify-center items-center gap-4 pb-28 stretch">
      {/* <ChatHeader chatId={parseInt(chatId)} /> */}
      <div className="flex flex-col w-full stretch px-8">
        <div className="pt-4 flex flex-col gap-6">
          {messages.length > 0
            ? messages.map((message) => (
                <Message key={message.id} message={message} />
              ))
            : null}
        </div>
        <form
          onSubmit={(e: FormEvent<HTMLFormElement>) =>
            handleSubmit(e, { options: { body: { chatId } } })
          }
          className="fixed bottom-0 max-w-md sm:max-w-lg lg:max-w-xl px-4 self-center"
        >
          <Input
            className="p-4 mb-8 dark:bg-neutral-950
        dark:text-neutral-400 rounded-3xl shadow-xl h-[64px] text-center"
            id="chat-input"
            value={input}
            placeholder="Ask follow-up..."
            onChange={handleInputChange}
            disabled={isLoading}
          />
        </form>
      </div>
    </div>
  );
};

export default ChatPage;
