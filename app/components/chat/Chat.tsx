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
    <div className="flex flex-col">
      <div className="rounded-sm">
        <form>
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
          />
        </form>
      </div>
    </div>
  );
};

export default Chat;
