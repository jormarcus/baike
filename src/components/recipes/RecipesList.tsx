'use client';

import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'next/navigation';

import { SafeRecipe } from '@/types';
import RecipeCard from './RecipeCard';
import EmptyState from '../ui/EmptyState';
import useIntersectionObserver from '@/hooks/useIntersectionObserver';
import { searchRecipes } from '@/app/_actions/recipe-actions';
import Loading from '@/app/recipes/loading';

interface RecipesListProps {
  initialRecipes: SafeRecipe[];
}

const RecipesList: React.FC<RecipesListProps> = ({ initialRecipes }) => {
  const searchParams = useSearchParams();
  const [recipes, setRecipes] = useState<SafeRecipe[]>(initialRecipes);

  const container = useRef<HTMLDivElement>(null);
  const options = {};
  const isVisible = useIntersectionObserver(container, options);

  useEffect(() => {
    const getRecipes = async () => {
      try {
        const skip = recipes.length;
        console.log('searchParams - search', searchParams.get('search'));
        const fetchedRecipes: SafeRecipe[] = await searchRecipes(
          searchParams.get('search') || '',
          '',
          skip
        );
        setRecipes((prevRecipes) => [...prevRecipes, ...fetchedRecipes]);
        console.log('fetchedRecipes', fetchedRecipes);
      } catch (error) {
        console.error(error);
      }
    };

    if (isVisible) {
      getRecipes();
    }
  }, [isVisible, recipes.length, searchParams]);

  return (
    <div>
      <div className="grid grid-cols-1 gap-6 py-8 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 grid-auto-rows-auto">
        {recipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>
      <div ref={container} className="w-full">
        <Loading />
      </div>
    </div>
  );
};

export default RecipesList;
