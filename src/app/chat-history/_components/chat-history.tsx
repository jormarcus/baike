'use client';

import { useEffect, useRef, useState } from 'react';

import { SafeChat } from '@/types';
import {
  deleteChatAndMessages,
  getChatHistory,
} from '../../_actions/chat-actions';
import ChatHistoryCard from '@/components/chat/chat-history-card';
import Loading from '../loading';
import useIntersectionObserver from '@/hooks/use-intersection-observer';
import toast from 'react-hot-toast';

interface ChatHistoryProps {
  initalChats: SafeChat[];
  totalCount: number;
}

const ChatHistory: React.FC<ChatHistoryProps> = ({
  initalChats,
  totalCount,
}) => {
  const [chats, setChats] = useState<SafeChat[]>(initalChats);
  const [count, setCount] = useState<number>(totalCount);

  const container = useRef<HTMLDivElement>(null);
  const options = {};
  const isVisible = useIntersectionObserver(container, options);

  useEffect(() => {
    const getChats = async () => {
      try {
        const skip = chats.length;
        if (skip >= totalCount) return;

        const fetchedChats: SafeChat[] = await getChatHistory('', skip, 10);
        setChats((prevChats) => [...prevChats, ...fetchedChats]);
      } catch (error) {
        console.error(error);
      }
    };

    if (isVisible) {
      getChats();
    }
  }, [isVisible, chats.length, totalCount]);

  const handleDelete = async (id: number) => {
    try {
      const deletedChat = await deleteChatAndMessages(id);
      if (!deletedChat) {
        toast.error('Failed to delete chat');
        return;
      }
      setChats((prevChats) =>
        prevChats.filter((chat) => chat.id !== deletedChat.id)
      );
      setCount((prevCount) => prevCount - 1);
      toast.success('Chat deleted');
    } catch (error) {
      toast.error('Failed to delete chat');
    }
  };

  return (
    <div className="h-full flex flex-col justify-center gap-4 max-w-3xl">
      {chats.map((chat, i) => (
        <ChatHistoryCard
          key={chat.id}
          chat={chat}
          handleDelete={handleDelete}
        />
      ))}
      {totalCount > chats.length ? (
        <div ref={container} className="w-full">
          <Loading className="mt-0 px-0" />
        </div>
      ) : null}
    </div>
  );
};

export default ChatHistory;
