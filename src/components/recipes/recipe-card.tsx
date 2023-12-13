'use client';

import { FaStar } from 'react-icons/fa';
import { Heart } from 'lucide-react';
import Link from 'next/link';

import { SafeRecipe } from '@/types';
import FeatureCard from '../ui/feature-card';
import RecipeImage from './recipe-image';
import { Label } from '../ui/label';
import { useRecipeCompare } from '@/context/recipe-compare-context';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

interface RecipeCardProps {
  recipe: SafeRecipe;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe }) => {
  const { id, name, imageSrc } = recipe;
  const { handleRecipeSelect } = useRecipeCompare();

  return (
    <Card className="border-none">
      <Link href={`/recipe/${id}`} className="flex flex-col">
        <CardContent className="p-0">
          <div className="w-full object-cover transition duration-300 group-hover:scale-110 ease-cubic-bezier rounded-3xl flex items-center justify-center">
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
      <CardFooter className="p-0">
        <div>
          <div className="flex flex-row justify-between items-center gap-3">
            <Link
              href={`/recipe/${id}`}
              className="text-md font-semibold truncate"
            >
              {recipe.name}
            </Link>

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
      </CardFooter>
    </Card>
  );
};

export default RecipeCard;
