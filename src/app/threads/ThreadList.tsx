'use client';

import { useEffect, useRef, useState } from 'react';

import { SafeChat } from '@/types';
import { getChats } from '../_actions/chat-actions';
import ThreadCard from '@/components/chat/ThreadCard';
import Loading from './loading';
import useIntersectionObserver from '@/hooks/useIntersectionObserver';

interface ThreadListProps {
  initalThreads: SafeChat[];
  totalCount: number;
}

const ThreadList: React.FC<ThreadListProps> = ({
  initalThreads,
  totalCount,
}) => {
  const [threads, setThreads] = useState<SafeChat[]>(initalThreads);

  const container = useRef<HTMLDivElement>(null);
  const options = {};
  const isVisible = useIntersectionObserver(container, options);

  useEffect(() => {
    const getThreads = async () => {
      try {
        const skip = threads.length;
        if (skip >= totalCount) return;

        const chats: SafeChat[] = await getChats('', skip, 10);
        setThreads((prevThreads) => [...prevThreads, ...chats]);
      } catch (error) {
        console.error(error);
      }
    };

    if (isVisible) {
      getThreads();
    }
  }, [isVisible, threads.length, totalCount]);

  return (
    <div className="h-full flex flex-col justify-center gap-4 max-w-3xl">
      {threads.map((thread, i) => (
        <ThreadCard key={thread.id} thread={thread} />
      ))}
      {totalCount > threads.length ? (
        <div ref={container} className="w-full">
          <Loading className="mt-0 px-0" />
        </div>
      ) : null}
    </div>
  );
};

export default ThreadList;
