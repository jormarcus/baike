import { SafeChat } from '@/types';
import { Clock4, MessageSquare } from 'lucide-react';
import Link from 'next/link';
<MessageSquare />;

interface ThreadCardProps {
  thread: SafeChat;
}

const ThreadCard: React.FC<ThreadCardProps> = ({ thread }) => {
  return (
    <div className="flex flex-col space-y-2 w-full border p-2 border-neutral-600 rounded-md cursor-pointer hover:border-500">
      <Link
        href={`/search/${thread.id}}`}
        className="flex flex-col items w-full pr-4"
      >
        <div className="text-xl font-bold">{thread.title}</div>
        <p className="line-clamp-2 mt-1 break-all font-sans text-sm selection:text-white dark:selection:bg-opacity-50 selection:bg-opacity-70">
          {thread.firstAnswer ?? 'No preview available.'}
        </p>
      </Link>
      <div className="flex gap-6 text-sm font-semibold pt-2">
        <div className="flex items-center gap-1">
          <MessageSquare height={14} width={14} />
          <div>{thread.userMessageCount} messages</div>
        </div>
        <div className="flex items-center gap-1">
          <Clock4 height={14} width={14} />
          <div>{thread.createdAt} ago</div>
        </div>
      </div>
    </div>
  );
};

export default ThreadCard;
