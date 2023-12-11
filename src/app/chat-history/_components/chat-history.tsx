'use client';

import { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';

import { SafeChat } from '@/types';
import {
  deleteChatAndMessages,
  getChatHistory,
} from '../../_actions/chat-actions';
import ChatHistoryCard from '@/components/chat/chat-history-card';
import useIntersectionObserver from '@/hooks/use-intersection-observer';
import Loading from '@/app/loading';

interface ChatHistoryProps {
  initalChats: SafeChat[];
  totalCount: number;
}

const ChatHistory: React.FC<ChatHistoryProps> = ({
  initalChats,
  totalCount,
}) => {
  const [chats, setChats] = useState<SafeChat[]>([]);
  const [count, setCount] = useState<number>(0);

  const container = useRef<HTMLDivElement>(null);
  const options = {};
  const isVisible = useIntersectionObserver(container, options);

  useEffect(() => {
    setChats(initalChats);
    setCount(totalCount);
  }, [initalChats, totalCount]);

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
      {chats.map((chat, i) =>
        i === chats.length - 1 && i < totalCount - 1 ? (
          <div ref={container} key={chat.id} className="w-full">
            <ChatHistoryCard
              key={chat.id}
              chat={chat}
              handleDelete={handleDelete}
            />
            <Loading />
          </div>
        ) : (
          <ChatHistoryCard
            key={chat.id}
            chat={chat}
            handleDelete={handleDelete}
          />
        )
      )}
    </div>
  );
};

export default ChatHistory;
