import { Message as Messagetype } from '@/lib/validators/message';
interface MessageProps {
  message: Messagetype;
}

const Message: React.FC<MessageProps> = ({ message }) => {
  return (
    <div
      className={`flex items-center justify-between w-full px-4 py-2
    ${
      message.isUserMessage
        ? 'flex-row-reverse dark:bg-gray-600'
        : 'flex-row dark:bg-gray-800'
    }
    `}
    >
      <div>
        <p>{message.text}</p>
      </div>
    </div>
  );
};

export default Message;
