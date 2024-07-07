import { cn } from '@/lib/utils';
import { ChatGPTMessage } from '@/types';

type ChatMessageProps = {
  message: ChatGPTMessage;
};

const ChatMessage = ({ message }: ChatMessageProps) => {
  return (
    <div
      className={cn(
        'rounded-3xl text-sm p-4',
        message.role === 'user'
          ? 'bg-primary self-end max-w-[75%]'
          : 'bg-secondary text-center md:text-left w-full'
      )}
    >
      {message.content}
    </div>
  );
};

export default ChatMessage;
