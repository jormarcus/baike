'use client';

import { createMessage, getMessages } from '@/app/_actions/message-actions';
import { MessagesContext } from '@/context/MessagesContext';
import { ChatGPTMessage, Role, SafeMessage } from '@/types';
import { useChat } from 'ai/react';
import { useContext, useEffect, useMemo, useState, useTransition } from 'react';

interface ChatPageProps {
  params: {
    searchId: string;
  };
}

const ChatPage: React.FC<ChatPageProps> = ({ params }) => {
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
  const { messages: safeMessages, setMessages: setSafeMessages } =
    useContext(MessagesContext);
  const [chatGPTMessages, setChatGPTMessages] = useState<ChatGPTMessage[]>([]);
  const [isPending, startTransition] = useTransition();

  useMemo(() => {
    const msgs = safeMessages.map((m) => ({
      id: m.id,
      content: m.text,
      role: m.isUserMessage ? ('user' as Role) : ('system' as Role),
    }));
    setChatGPTMessages(msgs);
  }, [safeMessages]);

  const formatMessage = (message: ChatGPTMessage) => {
    const { id, content, role } = message;
    return {
      id,
      text: content,
      isUserMessage: role === 'user',
      createdAt: new Date(),
      updatedAt: new Date(),
      chatId,
    };
  };

  const saveMessageToDatabase = async (messages: ChatGPTMessage[]) => {
    console.log('messages: ', messages);
    const msg =
      messages.length > 0 ? formatMessage(messages[messages.length - 1]) : null;
    if (!msg) return;

    const savedMsg = await createMessage(msg);
    console.log('savedMsg: ', savedMsg);
  };

  const fetchMessages = async () => {
    const fetchedMessages: SafeMessage[] = await getMessages(chatId, 0);
    console.log('fetchedMessages: ', fetchedMessages);
    setSafeMessages(fetchedMessages);
    const msgs = fetchedMessages.map((m) => {
      return {
        id: m.id,
        content: m.text,
        role: m.isUserMessage ? ('user' as Role) : ('system' as Role),
      };
    });
    setMessages(msgs);
  };

  useEffect(() => {
    // if navigating from home page, there will be messages in context state
    if (safeMessages.length > 0) {
      setMessages(chatGPTMessages);
      reload();
      startTransition(() => {
        console.log('in transition');
        saveMessageToDatabase(chatGPTMessages);
      });
    } else {
      // if reloading page, fetch messages from database
      startTransition(() => {
        fetchMessages();
      });
    }
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
