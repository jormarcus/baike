import EmptyState from '@/components/ui/EmptyState';
import { getCurrentUser } from '../_actions/user-actions';
import { getChatsByUserId } from '../_actions/chat-actions';
import ThreadCard from '@/components/chat/ThreadCard';

interface ThreadsPageProps {}

export default async function ThreadsPage() {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return <EmptyState title="Unauthorized" subtitle="Please login" />;
  }

  const threads = await getChatsByUserId(currentUser.id);

  return (
    <div className="mt-16 flex flex-col justify-center gap-2 px-12">
      {threads && threads.length > 0 ? (
        threads.map((thread) => <ThreadCard key={thread.id} thread={thread} />)
      ) : (
        <div className="flex flex-col items-center">
          <EmptyState title="No threads available" />
        </div>
      )}
    </div>
  );
}
