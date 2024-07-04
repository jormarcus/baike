import { ChatGPTMessage } from '@/types';
import Box from '../ui/box';
import { Input } from '../ui/input';
import ChatMessage from './chat-message';

const RightSidebarChat = () => {
  const messages: ChatGPTMessage[] = [
    {
      id: '1',
      content: 'Chicken soup recipe',
      role: 'user',
    },
    {
      id: '2',
      content: 'Sure, heres a recipe for chicken soup',
      role: 'system',
    },
    {
      id: '3',
      content: 'Can you create a shopping list for this recipe?',
      role: 'user',
    },
    {
      id: '4',
      content: 'Sure, heres a shopping list for the chicken soup recipe',
      role: 'system',
    },
  ];

  return (
    <Box className="p-2 flex flex-col h-full justify-between">
      <div className="flex flex-col gap-4 overflow-y-scroll">
        {messages.map((message) => (
          <ChatMessage message={message} key={message.id} />
        ))}
      </div>
      <div className="my-3 p-2">
        <Input placeholder="Ask any cooking or recipe related questions" />
      </div>
    </Box>
  );
};

export default RightSidebarChat;
