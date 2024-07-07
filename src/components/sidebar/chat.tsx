'use client';

import Box from '../ui/box';
import { Input } from '../ui/input';
import ChatMessage from './chat-message';
import { ChangeEvent, FormEvent, useState } from 'react';
import { ChatGPTMessage } from '@/types';

type Message = {
  role: 'user' | 'system';
  content: string;
};

const Chat = () => {
  const [input, setInput] = useState<string>('');
  const [chat, setChat] = useState<ChatGPTMessage[]>([]);

  const sendMessage = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!input) return;

    // Add user's message to the chat
    setChat((prev) => [...prev, { role: 'user', content: input, id: null }]);
    setInput('');

    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message: input }),
    });

    const reader = response.body?.getReader();
    const decoder = new TextDecoder();
    let done = false;
    let systemMessage = '';

    while (!done) {
      const { value, done: doneReading } = await reader!.read();
      done = doneReading;
      const chunk = decoder.decode(value, { stream: true });
      systemMessage += chunk;

      // Update system message in the chat
      setChat((prev) => {
        const updatedChat = [...prev];
        const lastMessage = updatedChat[updatedChat.length - 1];
        if (lastMessage && lastMessage.role === 'system') {
          lastMessage.content = systemMessage;
        } else {
          updatedChat.push({
            role: 'system',
            content: systemMessage,
            id: null,
          });
        }
        return updatedChat;
      });
    }
  };

  return (
    <Box className="p-2 h-full">
      <form
        className="p-2 flex flex-col h-full justify-between"
        onSubmit={sendMessage}
      >
        <div className="flex flex-col gap-4 overflow-y-scroll relative">
          {chat.map((message, index) => (
            <ChatMessage message={message} key={index} />
          ))}
        </div>
        <div className="my-3 p-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            type="text"
            placeholder="Ask any cooking or recipe related questions"
          />
        </div>
      </form>
    </Box>
  );
};

export default Chat;
