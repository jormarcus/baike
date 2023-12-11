'use client';

import { FaStar } from 'react-icons/fa';
import { Heart } from 'lucide-react';
import Link from 'next/link';

import { SafeRecipe } from '@/types';
import FeatureCard from '../FeatureCard';
import RecipeImage from './RecipeImage';
import { Label } from '../ui/Label';
import { useRecipeCompare } from '@/context/RecipeCompareContext';

interface RecipeCardProps {
  recipe: SafeRecipe;
}

const CardContent: React.FC<{
  image: string | null;
  name: string;
}> = ({ image, name }) => (
  <div className="flex-grow-3 flex-shrink relative aspect-square overflow-hidden rounded-3xl">
    <div className="h-full w-full object-cover transition duration-300 group-hover:scale-110 ease-cubic-bezier rounded-3xl flex items-center justify-center">
      <RecipeImage image={image} alt={name} height={80} width={80} />
    </div>
    <div className="absolute right-4 top-4 bg-transparent">
      <Heart
        size={24}
        className="fill-[#00000080] hover:text-amber-500 hover:fill-amber-500 transition duration-300"
      />
    </div>
  </div>
);

const CardFooter: React.FC<{
  recipe: SafeRecipe;
}> = ({ recipe }) => {
  const { handleRecipeSelect } = useRecipeCompare();

  return (
    <div className="flex-grow-1 flex-shrink flex flex-col p-4">
      <div className="flex flex-row justify-between items-center gap-3">
        <div className="text-md font-semibold truncate">{recipe.name}</div>
        <div className="flex flex-row gap-2 items-center">
          <FaStar size={14} />
          <div className="text-md font-semibold">
            {recipe.averageRating || 0}
          </div>
        </div>
      </div>
      <div className="flex items-center space-x-2 mt-2 leading-7">
        <input
          onChange={() => handleRecipeSelect(recipe)}
          type="checkbox"
          className="h-5 w-5 rounded-md border-2 border-gray-300 text-amber-500 transition-colors duration-300 focus:ring-0 focus:ring-offset-0 focus-visible:ring-2 focus-visible:ring-amber-500/50 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-100 group-active:border-amber-500 group-active:checked:text-amber-500/2 cursor-pointer"
        />
        <Label>Compare</Label>
      </div>
    </div>
  );
};

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe }) => {
  const { id, name, imageSrc } = recipe;

  return (
    <FeatureCard>
      <Link href={`/recipe/${id}`} className="flex flex-col">
        <CardContent image={imageSrc} name={name} />
      </Link>
      <CardFooter recipe={recipe} />
    </FeatureCard>
  );
};

export default RecipeCard;
