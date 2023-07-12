'use client';

import Image from 'next/image';
import { FaRegHeart, FaStar } from 'react-icons/fa';
import { MdOutlineBakeryDining } from 'react-icons/md';
import Link from 'next/link';
import { useMemo } from 'react';

import { SafeRecipe } from '@/types';
import useWindowWidth from '@/hooks/useWindowWidth';

interface RecipeCardProps {
  recipe: SafeRecipe;
}

const CardContent: React.FC<{
  image: string | null;
  name: string;
  size: number;
}> = ({ image, name, size }) => (
  <div className="relative aspect-square w-full overflow-hidden rounded-xl">
    {image ? (
      <Image
        fill
        sizes="(max-width: 768px) 33vw, (max-width: 1200px) 50vw, 33vw"
        src={image}
        alt={name}
        decoding="async"
        className="h-full w-full object-cover transition group-hover:scale-110"
      />
    ) : (
      <div className="flex items-center justify-center h-4/5">
        <MdOutlineBakeryDining size={size} />
      </div>
    )}
    <div className="absolute right-3 top-3">
      <FaRegHeart
        size={20}
        className="hover:fill-red-500 transition duration-200"
      />
    </div>
  </div>
);

const CardFooter: React.FC<{
  name: string;
  averageRating: number;
}> = ({ name, averageRating }) => (
  <div className="flex flex-col">
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
  // next js has an error on refresh window is not defined
  const width = useWindowWidth();

  const iconSize = useMemo(() => {
    let size = 80;
    if (width < 768) {
      size = 150;
    } else if (width < 1024) {
      size = 80;
    }
    return size;
  }, [width]);

  return (
    <div className="flex flex-col gap-2 group col-span-1 dark:bg-neutral-950 rounded-lg p-3 shadow-lg shadow-neutral-950/50">
      <Link href={`/recipe/${id}`}>
        <CardContent image={imageSrc} name={name} size={iconSize} />
        <CardFooter name={name} averageRating={5} />
      </Link>
    </div>
  );
};

export default RecipeCard;
