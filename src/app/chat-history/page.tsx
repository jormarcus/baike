import EmptyState from '@/components/ui/empty-state';
import { getChatsWithCount } from '../_actions/chat-actions';
import { getCurrentUser } from '../_actions/user-actions';
import ChatHistory from './_components/chat-history';

export default async function ChatHistoryPage() {
  const { chats, totalCount } = await getChatsWithCount('', 0, 10);
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return <EmptyState title="Unauthorized" subtitle="Please login" />;
  }

  return (
    <div className="mb-4 flex items-center justify-center">
      <ChatHistory initalChats={chats} totalCount={totalCount} />
    </div>
  );
}
