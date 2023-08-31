'use client';

import { SafeChat } from '@/types';
import { useEffect, useRef, useState } from 'react';
import { getChatsByUserId } from '../_actions/chat-actions';
import ThreadCard from '@/components/chat/ThreadCard';
import useIntersectionObserver from '@/hooks/useIntersectionObserver';

import Loading from './loading';

interface ThreadListProps {
  initalThreads: SafeChat[];
  userId: number;
}

const ThreadList: React.FC<ThreadListProps> = ({ initalThreads, userId }) => {
  const [threads, setThreads] = useState<SafeChat[]>(initalThreads);

  const container = useRef<HTMLDivElement>(null);
  const options = {};
  const isVisible = useIntersectionObserver(container, options);

  useEffect(() => {
    const getThreads = async () => {
      try {
        const skip = threads.length;
        const chats: SafeChat[] = await getChatsByUserId(userId, skip);
        setThreads((prevThreads) => [...prevThreads, ...chats]);
      } catch (error) {
        console.error(error);
      }
    };

    if (isVisible) {
      getThreads();
    }
  }, [isVisible, threads.length, userId]);

  return (
    <div className="mt-16 h-full flex flex-col justify-center gap-2 max-w-3xl px-12">
      {threads.map((thread, i) => (
        <ThreadCard key={thread.id} thread={thread} />
      ))}
      <div ref={container} className="w-full">
        <Loading />
      </div>
    </div>
  );
};

export default ThreadList;
