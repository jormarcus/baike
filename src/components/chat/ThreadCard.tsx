import { SafeChat } from '@/types';
import { Clock4, MessageSquare } from 'lucide-react';
import Link from 'next/link';
import { forwardRef, useMemo } from 'react';
import { timeAgo } from '@/helpers/date-time-helper';

interface ThreadCardProps {
  thread: SafeChat;
}
const ThreadCard = forwardRef(({ thread }: { thread: SafeChat }, ref) => {
  const time = useMemo(() => {
    return timeAgo(new Date(thread.createdAt));
  }, [thread.createdAt]);

  return (
    <div className="flex flex-col space-y-2 w-full border p-2 border-neutral-600 rounded-md cursor-pointer hover:border-500">
      <Link
        href={`/search/${thread.id}?prev=threads`}
        className="flex flex-col items w-full pr-4"
      >
        <div className="text-xl font-bold">{thread.title}</div>
        <p className="line-clamp-2 mt-1 break-all font-sans text-sm selection:text-white dark:selection:bg-opacity-50 selection:bg-opacity-70">
          {thread.firstAnswer ?? 'No preview available.'}
        </p>
      </Link>
      <div className="flex gap-4 text-sm font-semibold pt-2">
        <div className="flex items-center gap-1">
          <MessageSquare height={14} width={14} />
          <div>{thread.userMessagesCount}</div>
        </div>
        <div className="flex items-center gap-1">
          <Clock4 height={14} width={14} />
          <div>{time}</div>
        </div>
      </div>
    </div>
  );
});

ThreadCard.displayName = 'ThreadCard';

export default ThreadCard;
