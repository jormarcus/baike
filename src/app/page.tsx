import ChatInputHome from '@/components/chat/ChatInputHome';

export default async function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <h1 className="text-4xl mb-8">Find your next recipe</h1>
      <ChatInputHome />
    </div>
  );
}
