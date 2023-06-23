'use client';

import { useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';

import { sendMessage } from '@/app/actions/message-actions';
import { ca } from 'date-fns/locale';

const Chat = () => {
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const onMessage = async (messageInput: string) => {
    try {
      setIsLoading(true);
      await sendMessage(messageInput);
    } catch (error) {
      console.error(error);
      // display an error in the chat that the message was not set and there was an error
    } finally {
      setIsLoading(false);
      setInput('');
    }
  };

  return (
    <div className="flex flex-col">
      <div className="rounded-sm">
        <form>
          <TextareaAutosize
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();

                onMessage(input);
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
