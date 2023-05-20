'use client';

import { useState } from 'react';
import { nanoid } from 'nanoid';
import TextareaAutosize from 'react-textarea-autosize';

import { Message } from '@/lib/validators/message';
import { useMessage } from '@/app/hooks/useMessage';

const Chat = () => {
  const [input, setInput] = useState('');

  const { sendMessage, isLoading } = useMessage();

  const onMessage = async (message: Message) => {
    await sendMessage(message);
  };

  return (
    <div>
      <div className="grow">
        <div className="rounded-full">
          <div className="relative flex items-center">
            <TextareaAutosize
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();

                  const message: Message = {
                    id: nanoid(),
                    isUserMessage: true,
                    text: input,
                  };

                  onMessage(message);
                }
              }}
              rows={2}
              maxRows={4}
              value={input}
              autoFocus
              disabled={isLoading}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Find your next recipe..."
              className="h-14 outline-none focus:outline-none w-full font-medium duration-200 transition-all focus:ring-1 resize-none overflow-hidden border-gray-400 shadow-sm rounded-t-[32px] rounded-b-[32px] py-4 px-6 pr-[128px] md:pr-[138px]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
