'use client';

import { SafeMessage } from '@/types';
import MarkdownLite from './MarkdownLite';
interface MessageProps {
  message: SafeMessage;
}

const Message: React.FC<MessageProps> = ({ message }) => {
  console.log('message', message);
  return (
    <div
      className={`flex items-center justify-between w-full px-4 py-2 dark:text-neutral-200
    ${
      message.isUserMessage
        ? 'flex-row-reverse dark:bg-neutral-600'
        : 'flex-row dark:bg-neutral-800'
    }
    `}
    >
      <div>
        <p>
          <MarkdownLite text={message.text} />
        </p>
      </div>
    </div>
  );
};

export default Message;
