import EmptyState from '@/components/ui/empty-state';
import { getChatsWithCount } from '../_actions/chat-actions';
import { getCurrentUser } from '../_actions/user-actions';
import ChatHistory from './_components/chat-history';

type ChatHistoryPageProps = {
  searchParams: {
    search: string;
  };
};

export default async function ChatHistoryPage({
  searchParams,
}: ChatHistoryPageProps) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return <EmptyState title="Unauthorized" subtitle="Please login" />;
  }

  const query: string = searchParams.search || '';

  const { chats, totalCount } = await getChatsWithCount(query, 0, 10);

  return (
    <div className="mb-4 flex items-center justify-center">
      <ChatHistory initalChats={chats} totalCount={totalCount} />
    </div>
  );
}
