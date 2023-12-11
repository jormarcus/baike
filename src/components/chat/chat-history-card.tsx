'use client';

import { Clock4, MessageSquare, MoreVertical } from 'lucide-react';
import Link from 'next/link';
import { forwardRef, useMemo } from 'react';

import { SafeChat } from '@/types';
import { timeAgo } from '@/helpers/date-time-helper';
import DeleteModal from '../ui/delete-modal';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';

type ChatHistoryCardProps = {
  chat: SafeChat;
  handleDelete: (id: number) => void;
};

const ChatHistoryCard = forwardRef(
  ({ chat, handleDelete }: ChatHistoryCardProps, ref) => {
    const time = useMemo(() => {
      return timeAgo(new Date(chat.createdAt));
    }, [chat.createdAt]);

    return (
      <div className="flex flex-col space-y-2 w-full border p-4 border-neutral-600 rounded-md hover:border-500">
        <div className="flex justify-between">
          <Link href={`/search/${chat.id}`} className="text-xl font-bold">
            {chat.title}
          </Link>
          <Popover>
            <PopoverTrigger>
              <MoreVertical />
            </PopoverTrigger>
            <PopoverContent className="max-w-fit">
              <DeleteModal
                deleteFieldName="chat"
                deleteFieldItemName={chat.title}
                deleteFieldId={chat.id}
                handleDelete={handleDelete}
              />
            </PopoverContent>
          </Popover>
        </div>
        <Link
          href={`/search/${chat.id}`}
          className="flex flex-col items w-full pr-4"
        >
          <p className="line-clamp-2 mt-1 break-all font-sans text-sm selection:text-white dark:selection:bg-opacity-50 selection:bg-opacity-70">
            {chat.firstAnswer ?? 'No preview available.'}
          </p>
        </Link>
        <div className="flex gap-4 text-sm font-semibold pt-2">
          <div className="flex items-center gap-1">
            <MessageSquare height={14} width={14} />
            <div>{chat.userMessagesCount}</div>
          </div>
          <div className="flex items-center gap-1">
            <Clock4 height={14} width={14} />
            <div>{time}</div>
          </div>
        </div>
      </div>
    );
  }
);

ChatHistoryCard.displayName = 'ChatHistoryCard';

export default ChatHistoryCard;
