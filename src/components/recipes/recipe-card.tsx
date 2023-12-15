'use client';

import { FaStar } from 'react-icons/fa';
import { Heart } from 'lucide-react';
import Link from 'next/link';

import { SafeRecipe } from '@/types';
import RecipeImage from './recipe-image';
import { Label } from '../ui/label';
import { useRecipeCompare } from '@/context/recipe-compare-context';
import { Card, CardContent, CardFooter } from '@/components/ui/card';

interface RecipeCardProps {
  recipe: SafeRecipe;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe }) => {
  const { id, name, imageSrc } = recipe;
  const { handleRecipeSelect } = useRecipeCompare();

  return (
    <Card className="border-none rounded-lg">
      <Link href={`/recipe/${id}`} className="flex flex-col">
        <CardContent className="p-0 rounded-lg">
          <div className="object-cover transition duration-300 group-hover:scale-110 ease-cubic-bezier rounded-lg">
            <RecipeImage image={imageSrc} alt={name} height={240} width={300} />
          </div>
          <div className="absolute right-4 top-4 bg-transparent">
            <Heart
              size={24}
              className="fill-[#00000080] hover:text-amber-500 hover:fill-amber-500 transition duration-300"
            />
          </div>
        </CardContent>
      </Link>
      <CardFooter className="flex flex-col items-start pt-1 pb-0 px-0">
        <div className="flex justify-between items-center w-full">
          <Link
            href={`/recipe/${id}`}
            className="text-sm font-semibold truncate basis-10/12"
          >
            {recipe.name}
          </Link>

          <div className="flex flex-row gap-2 items-center justify-end basis-2/12">
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
            className="h-5 w-5 rounded-lg border-2 border-gray-300 text-amber-500 transition-colors duration-300 focus:ring-0 focus:ring-offset-0 focus-visible:ring-2 focus-visible:ring-amber-500/50 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-100 group-active:border-amber-500 group-active:checked:text-amber-500/2 cursor-pointer"
          />
          <Label>Compare</Label>
        </div>
      </CardFooter>
    </Card>
  );
};

export default RecipeCard;
