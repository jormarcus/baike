'use client';

import { MessagesContext } from '@/context/MessagesContext';
import { ChatGPTMessage, Role } from '@/types';
import { useChat } from 'ai/react';
import { useContext, useEffect } from 'react';

interface ChatPageProps {
  params: {
    searchId: string;
  };
}

const ChatPage: React.FC<ChatPageProps> = ({ params }) => {
  // const chatIdEncoded = params.searchId;
  // const chatId = chatIdEncoded ? decodeURIComponent(chatIdEncoded) : '';

  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    setMessages,
    reload,
  } = useChat();
  const { messages: safeMessages } = useContext(MessagesContext);

  const chatGPTMessages: ChatGPTMessage[] = safeMessages.map((m) => ({
    id: m.id,
    content: m.text,
    role: m.isUserMessage ? ('user' as Role) : ('system' as Role),
  }));

  useEffect(() => {
    setMessages(chatGPTMessages);
    reload();
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

      <form onSubmit={handleSubmit}>
        <input
          className="fixed bottom-0 w-full max-w-md p-2 mb-8 border border-gray-300 rounded shadow-xl"
          value={input}
          placeholder="Say something..."
          onChange={handleInputChange}
        />
      </form>
    </div>
  );
};

export default ChatPage;
