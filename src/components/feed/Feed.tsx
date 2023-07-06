'use client';

import { SafeRecipe } from '@/types';
import Post from './Post';

interface FeedProps {
  recipes: SafeRecipe[];
}

const Feed: React.FC<FeedProps> = ({ recipes }) => {
  return (
    <div className="flex flex-col items-center gap-4 w-full h-full">
      {recipes.map((recipe) => (
        <Post key={recipe.id} recipe={recipe} />
      ))}
    </div>
  );
};

export default Feed;
