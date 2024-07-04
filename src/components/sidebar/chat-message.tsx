import { ChatGPTMessage } from '@/types';

type ChatMessageProps = {
  message: ChatGPTMessage;
};

const ChatMessage = ({ message }: ChatMessageProps) => {
  return (
    <div
      className={`${
        message.role === 'user'
          ? 'bg-primary self-end'
          : 'bg-secondary self-start'
      } p-4 rounded-full max-w-[75%] text-sm`}
    >
      <div>{message.content}</div>
    </div>
  );
};

export default ChatMessage;
