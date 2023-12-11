'use client';

import { FolderPlus, PlusCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';

import Searchbox from '../ui/Searchbox';
import { Button } from '../ui/Button';

interface ChatHistoryHeaderProps {}

const ChatHistoryHeader: React.FC<ChatHistoryHeaderProps> = () => {
  const router = useRouter();

  return (
    <div className="sticky top-0 z-[15] border border-border/60 dark:border-border/80 divide-border/60 dark:divide-border/80 ring-border dark:ring-border bg-background dark:bg-background">
      <div className="py-4 md:py-8 mx-auto max-w-screen-xl px-4 md:px-12 flex flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-4">
          <FolderPlus size={30} />
          <h2 className="text-3xl">Chat History</h2>
        </div>

        <div className="flex items-center justify-center max-w-md w-full">
          <Searchbox placeholder="Search your chats..." />
        </div>

        <Button
          className="bg-amber-500 text-white hover:bg-amber-400 flex gap-2"
          variant="default"
          onClick={() => router.push('/recipes/add')}
        >
          <PlusCircle />
          Add thread
        </Button>
      </div>
    </div>
  );
};

export default ChatHistoryHeader;
