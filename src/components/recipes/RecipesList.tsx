'use client';

import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'next/navigation';

import { SafeRecipe } from '@/types';
import RecipeCard from './RecipeCard';
import EmptyState from '../ui/EmptyState';
import useIntersectionObserver from '@/hooks/useIntersectionObserver';
import { getPaginatedRecipes } from '@/app/_actions/recipe-actions';
import Loading from '@/app/recipes/loading';

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
    <div>
      <div className="grid grid-cols-1 gap-6 py-8 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 grid-auto-rows-auto">
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
