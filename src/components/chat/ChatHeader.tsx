'use client';

import { useEffect, useState } from 'react';
import { Input } from '../inputs/Input';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { SafeChat } from '@/types';
import { z } from 'zod';
import toast from 'react-hot-toast';
import { updateChatTitle } from '@/app/_actions/chat-actions';

interface ChatHeaderProps {
  chatId: number;
  chatTitle?: string;
}

const ChatHeaderSchema = z.object({
  title: z.string(),
});

const ChatHeader: React.FC<ChatHeaderProps> = ({ chatId, chatTitle = '' }) => {
  const [title, setTitle] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    setTitle(chatTitle);
  }, [chatTitle]);

  const form = useForm<SafeChat>({
    resolver: zodResolver(ChatHeaderSchema),
    defaultValues: {
      title: '',
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    if (data.title === title) return;

    console.log('data: ', data);
    try {
      await updateChatTitle(chatId, data.title);
    } catch (error) {
      toast.error('Something went wrong!');
    }
  };

  return (
    <div className="py-2 border-b border-neutral-500 w-full flex items-center justify-center bg-neutral-900 z-10">
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Input
          {...form.register('title')}
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Unititled"
          className="text-2xl bg-transparent border-none focus:outline-none cursor-pointer w-auto text-center text-white ring-0 focus:ring-0 focus-visible:ring-0 focus:border-none"
          onBlur={form.handleSubmit(onSubmit)}
        />
      </form>
    </div>
  );
};

export default ChatHeader;
