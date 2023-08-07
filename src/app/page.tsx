import Feed from '@/components/feed/Feed';
import Categories from '@/components/categories/Categories';
import Logo from '@/components/ui/Logo';
import ChatInputHome from '@/components/chat/ChatInputHome';
import { getFeedPosts } from './_actions/post-actions';

export default async function Home() {
  const posts = await getFeedPosts();
  return (
    <div className="flex items-center flex-col justify-center">
      <Logo className="pb-6 md:pb-6 py-6 cursor-default" />
      <ChatInputHome />
      <Categories />
      <Feed initialPosts={posts} />
    </div>
  );
}
