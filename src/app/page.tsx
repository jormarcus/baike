import { getNewFeedRecipes } from './_actions/recipe-actions';
import Chat from '@/components/chat/Chat';
import Feed from '@/components/feed/Feed';
import Categories from '@/components/categories/Categories';

export default async function Home() {
  const recipes = await getNewFeedRecipes();
  console.log('feed recipes', recipes);
  return (
    <div className="relative flex min-h-[100vh] max-w-full overflow-hidden flex-1 flex-col">
      <div className="flex items-center flex-col justify-center">
        <Chat />
        <Categories />
        <Feed />
      </div>
    </div>
  );
}
