'use client';

import Image from 'next/image';
import { FaStar } from 'react-icons/fa';
import { Croissant, Heart } from 'lucide-react';
import Link from 'next/link';

import { SafeRecipe } from '@/types';
import FeatureCard from '../FeatureCard';

interface RecipeCardProps {
  recipe: SafeRecipe;
}

const CardContent: React.FC<{
  image: string | null;
  name: string;
}> = ({ image, name }) => (
  <div className="flex-grow-3 flex-shrink relative aspect-square overflow-hidden rounded-3xl">
    <div className="h-full w-full object-cover transition duration-300 group-hover:scale-110 ease-cubic-bezier rounded-3xl flex items-center justify-center">
      {image ? (
        <Image
          priority
          height={300}
          width={300}
          sizes="(max-width: 768px) 33vw, (max-width: 1200px) 50vw, 33vw"
          src={image}
          alt={name}
          decoding="async"
          className="object-cover aspect-square"
        />
      ) : (
        <Croissant size={60} />
      )}
    </div>
    <div className="absolute right-4 top-4">
      <Heart
        size={20}
        className="hover:text-amber-500 hover:fill-amber-500 transition duration-300"
      />
    </div>
  </div>
);

const CardFooter: React.FC<{
  name: string;
  averageRating: number;
}> = ({ name, averageRating }) => (
  <div className="flex-grow-1 flex-shrink flex flex-col p-4">
    <div className="flex flex-row justify-between items-center gap-3">
      <div className="text-md font-semibold truncate">{name}</div>
      <div className="flex flex-row gap-2 items-center">
        <FaStar size={14} />
        <div className="text-md font-semibold">{averageRating}</div>
      </div>
    </div>
  </div>
);

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe }) => {
  const { id, name, imageSrc } = recipe;

  return (
    <FeatureCard>
      <Link href={`/recipe/${id}`} className="flex flex-col">
        <CardContent image={imageSrc} name={name} />
        <CardFooter name={name} averageRating={5} />
      </Link>
    </FeatureCard>
  );
};

export default RecipeCard;
