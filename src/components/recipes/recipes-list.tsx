'use client';

import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'next/navigation';

import { SafeRecipe } from '@/types';
import RecipeCard from './recipe-card';
import useIntersectionObserver from '@/hooks/use-intersection-observer';
import { getPaginatedRecipes } from '@/app/_actions/recipe-actions';

interface RecipesListProps {
  initialRecipes: SafeRecipe[];
  totalCount: number;
}

const RecipesList: React.FC<RecipesListProps> = ({
  initialRecipes,
  totalCount,
}) => {
  const searchParams = useSearchParams();

  const [recipes, setRecipes] = useState<SafeRecipe[]>([]);

  const container = useRef<HTMLDivElement>(null);
  const options = {};
  const isVisible = useIntersectionObserver(container, options);

  useEffect(() => {
    setRecipes(initialRecipes);
  }, [initialRecipes]);

  useEffect(() => {
    const getRecipes = async () => {
      try {
        const skip = recipes.length;
        if (skip >= totalCount) {
          return;
        }

        const query: string = searchParams.get('search') || '';

        const fetchedRecipes: SafeRecipe[] = await getPaginatedRecipes(
          query,
          '',
          skip
        );
        setRecipes((prevRecipes) => [...prevRecipes, ...fetchedRecipes]);
      } catch (error) {
        console.error(error);
      }
    };

    if (isVisible) {
      getRecipes();
    }
  }, [isVisible, recipes.length, searchParams, totalCount]);

  return (
    <div className="h-full overflow-y-scroll no-scrollbar max-h-[82vh]">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-12 py-8">
        {recipes.map((recipe, index) => {
          return index === recipes.length - 1 && index < totalCount ? (
            <div ref={container} key={recipe.id} className="w-full">
              <RecipeCard recipe={recipe} />
            </div>
          ) : (
            <RecipeCard key={recipe.id} recipe={recipe} />
          );
        })}
      </div>
    </div>
  );
};

export default RecipesList;
