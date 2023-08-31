import EmptyState from '@/components/ui/EmptyState';
import { getCurrentUser } from '../_actions/user-actions';
import { getChatsByUserId } from '../_actions/chat-actions';
import ThreadList from './ThreadList';

interface ThreadsPageProps {}

export default async function ThreadsPage() {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return <EmptyState title="Unauthorized" subtitle="Please login" />;
  }

  const threads = await getChatsByUserId(currentUser.id);

  return (
    <div className="mb-4">
      <ThreadList initalThreads={threads} userId={currentUser.id} />
    </div>
  );
}
