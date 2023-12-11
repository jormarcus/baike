import ChatHistoryHeader from '@/components/chat/chat-history-header';

interface ChatHistoryLayoutProps {
  children: React.ReactNode;
}

const ChatHistoryLayout: React.FC<ChatHistoryLayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col">
      <ChatHistoryHeader />
      <div className="h-full m-16">{children}</div>
    </div>
  );
};

export default ChatHistoryLayout;
