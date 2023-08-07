'use client';

import MarkdownLite from './MarkdownLite';
import { Message } from 'ai';
interface MessageProps {
  message: Message;
}

const Message: React.FC<MessageProps> = ({ message }) => {
  return (
    <div
      className={`flex items-center justify-between w-auto px-4 py-2 dark:text-neutral-200 max-w-xl rounded-3xl
    ${
      message.role === 'user'
        ? 'dark:bg-amber-500 dark:text-white self-end'
        : 'dark:bg-neutral-900 text-neutral-300 self-start'
    }
    `}
    >
      <div>
        <MarkdownLite text={message.content} />
      </div>
    </div>
  );
};

export default Message;
