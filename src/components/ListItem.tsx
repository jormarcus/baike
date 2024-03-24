'use client';

import { Button } from './ui/button';
import { FaPlay } from 'react-icons/fa';
import RecipeImage from './recipes/recipe-image';

type ListItemProps = {
  image?: string;
  name: string;
};

const ListItem = ({ image, name }: ListItemProps) => {
  return (
    <Button className="relative group flex items-center rounded-md overflow-hidden gap-x-4 bg-neutral-100/10 hover:bg-neutral-100/20 transistion pr-4">
      <div className="relative min-h-[64px] min-w-[64px]">
        <RecipeImage image={image} alt={name} />
      </div>
      <p className="font-medium truncate py-5">{name}</p>
      <div className="absolute transition opacity-0 rounded-full flex items-center justify-center bg-green-500 p-4 drop-shadow-md right-5group-hover:opacity-100 hover:scale-110">
        <FaPlay className="text-black" />
      </div>
    </Button>
  );
};

export default ListItem;
