import { getChatsWithCount } from '../_actions/chat-actions';
import ThreadList from './ThreadList';

interface ThreadsPageProps {}

export default async function ThreadsPage() {
  const { chats: threads, totalCount } = await getChatsWithCount('', 0, 10);

  return (
    <div className="mb-4 flex items-center justify-center">
      <ThreadList initalThreads={threads} totalCount={totalCount} />
    </div>
  );
}
