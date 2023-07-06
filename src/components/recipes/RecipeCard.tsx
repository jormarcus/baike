'use client';

import Image from 'next/image';
import { FaHeart, FaStar } from 'react-icons/fa';
import { MdOutlineBakeryDining } from 'react-icons/md';
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';

import { SafeRecipe } from '@/types';

interface RecipeCardProps {
  recipe: SafeRecipe;
}

const CardContent: React.FC<{
  image: string | null;
  title: string;
  size: number;
}> = ({ image, title, size }) => (
  <div className="relative aspect-square w-full overflow-hidden rounded-xl">
    {image ? (
      <Image
        fill
        src={image}
        alt={title}
        width={300}
        height={300}
        decoding="async"
        className="h-full w-full object-cover transition group-hover:scale-110"
      />
    ) : (
      <div className="flex items-center justify-center h-4/5">
        <MdOutlineBakeryDining size={size} />
      </div>
    )}
    <div className="absolute right-3 top-3">
      <FaHeart
        size={20}
        className="hover:fill-red-500 transition duration-200"
      />
    </div>
  </div>
);

const CardFooter: React.FC<{
  title: string;
  averageRating: number;
}> = ({ title, averageRating }) => (
  <div className="flex flex-col">
    <div className="flex flex-row justify-between items-center gap-3">
      <div className="text-md font-semibold truncate">{title}</div>
      <div className="flex flex-row gap-2 items-center">
        <FaStar size={14} />
        <div className="text-md font-semibold">{averageRating}</div>
      </div>
    </div>
  </div>
);

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe }) => {
  const { id, title, image, averageRating } = recipe;
  // next js has an error on refresh window is not defined
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const iconSize = useMemo(() => {
    let size = 80;
    if (windowWidth < 768) {
      size = 150;
    } else if (windowWidth < 1024) {
      size = 80;
    }
    return size;
  }, [windowWidth]);

  useEffect(() => {
    console.log('useEffect');
    // TODO: this doesnt work reliably
    // there are issues with next js and window on refresh
    function handleResize() {
      setWindowWidth(windowWidth);
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [windowWidth]);

  return (
    <div className="flex flex-col gap-2 group col-span-1 dark:bg-neutral-950 rounded-lg p-3 shadow-lg shadow-neutral-950/50">
      <Link href={`/recipe/${id}`}>
        <CardContent image={image} title={title} size={iconSize} />
        <CardFooter title={title} averageRating={averageRating} />
      </Link>
    </div>
  );
};

export default RecipeCard;
