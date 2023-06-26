import { getNewFeedRecipes } from './_actions/recipe-actions';
import Feed from '@/components/feed/Feed';
import Categories from '@/components/categories/Categories';
import ChatInput from '@/components/chat/ChatInput';
import Logo from '@/components/ui/Logo';

export default async function Home() {
  const recipes = await getNewFeedRecipes();
  console.log('feed recipes', recipes);
  return (
    <div className="flex items-center flex-col justify-center">
      <Logo className="pb-6 md:pb-6 py-6" />
      <ChatInput />
      <Categories />
      <Feed />
    </div>
  );
}
