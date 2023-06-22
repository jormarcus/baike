import Chat from './components/chat/Chat';
import Feed from './components/feed/Feed';

export default async function Home() {
  return (
    <div className="relative flex min-h-[100vh] max-w-full overflow-hidden flex-1 flex-col">
      <div className="flex items-center flex-col justify-center">
        <Feed />
        <Chat />
      </div>
    </div>
  );
}
