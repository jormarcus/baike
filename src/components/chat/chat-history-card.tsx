'use client';

import { Clock4, MessageSquare } from 'lucide-react';
import Link from 'next/link';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-hot-toast';

import { SafeChat } from '@/types';
import { timeAgo } from '@/helpers/date-time-helper';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { updateChatTitle } from '@/app/_actions/chat-actions';
import ChatHistoryCardPopover from './chat-history-card-popover';
import {
  ChatTitleSchema,
  ChatTitleSchemaType,
} from '@/lib/validators/chat-title-validator';

type ChatHistoryCardProps = {
  chat: SafeChat;
  handleDelete: (id: number) => void;
};

const ChatHistoryCard = ({ chat, handleDelete }: ChatHistoryCardProps) => {
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [title, setTitle] = useState<string>(chat.title);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setFocus,
  } = useForm<ChatTitleSchemaType>({ resolver: zodResolver(ChatTitleSchema) });

  const time = useMemo(() => {
    return timeAgo(new Date(chat.createdAt));
  }, [chat.createdAt]);

  const onSubmit: SubmitHandler<ChatTitleSchemaType> = useCallback(
    async (data: ChatTitleSchemaType) => {
      try {
        const updatedChat = await updateChatTitle(chat.id, data.title);
        if (updatedChat) {
          setTitle(updatedChat.title);
          toast.success('Chat title updated.');
          setIsEditMode(false);
        }
      } catch (error) {
        toast.error('Failed to update chat title.');
      }
    },
    [chat.id]
  );

  useEffect(() => {
    if (isEditMode) {
      setFocus('title');
    }
  }, [isEditMode, setFocus]);

  return (
    <div className="flex flex-col w-full border px-4 pb-4 pt-2 border-neutral-600 rounded-md hover:border-500">
      <div className="flex justify-end">
        <ChatHistoryCardPopover
          chat={chat}
          handleClickEdit={() => setIsEditMode(true)}
          handleDelete={handleDelete}
        />
      </div>

      {isEditMode ? (
        <>
          <form onSubmit={handleSubmit(onSubmit)}>
            {errors.title && (
              <span className="text-rose-500">{errors.title.message}</span>
            )}
            <div className="flex items-center gap-4">
              <Input
                type="text"
                className="bg-transparent border-none outline-none text-xl font-bold max-w-sm"
                {...register('title')}
                defaultValue={chat.title}
              />
              <Button
                onClick={() => setIsEditMode(false)}
                className="bg-primary"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-amber-500 hover:bg-amber-600 transition duration-300"
              >
                Save
              </Button>
            </div>
          </form>
          <p className="line-clamp-2 mt-1 break-all font-sans text-sm selection:text-white dark:selection:bg-opacity-50 selection:bg-opacity-70">
            {chat.firstAnswer ?? 'No preview available.'}
          </p>
        </>
      ) : (
        <Link href={`/search/${chat.id}`} className="group block space-y-2">
          <h2 className="text-xl font-bold group-hover:text-amber-500 transition duration-500">
            {title}
          </h2>
          <p className="line-clamp-2 mt-1 break-all font-sans text-sm selection:text-white dark:selection:bg-opacity-50 selection:bg-opacity-70">
            {chat.firstAnswer ?? 'No preview available.'}
          </p>
        </Link>
      )}

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
};

export default ChatHistoryCard;
