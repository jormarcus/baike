'use client';

import { useEffect, useRef, useState } from 'react';

import { SafeChat } from '@/types';
import { getChatHistory } from '../../_actions/chat-actions';
import ChatHistoryCard from '@/components/chat/chat-history-card';
import Loading from '../loading';
import useIntersectionObserver from '@/hooks/use-intersection-observer';

interface ChatHistoryProps {
  initalChats: SafeChat[];
  totalCount: number;
}

const ChatHistory: React.FC<ChatHistoryProps> = ({
  initalChats,
  totalCount,
}) => {
  const [chats, setChats] = useState<SafeChat[]>(initalChats);

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

  return (
    <div className="h-full flex flex-col justify-center gap-4 max-w-3xl">
      {chats.map((chat, i) => (
        <ChatHistoryCard key={chat.id} chat={chat} />
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
