import ThreadsHeader from '@/components/chat/ThreadsHeader';
import CollectionsHeader from '@/components/collections/CollectionsHeader';

interface ThreadsLayoutProps {
  children: React.ReactNode;
}

const ThreadsLayout: React.FC<ThreadsLayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col">
      <ThreadsHeader />
      <div className="h-full m-16">{children}</div>
    </div>
  );
};

export default ThreadsLayout;
