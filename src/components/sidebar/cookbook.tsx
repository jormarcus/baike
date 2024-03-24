'use client';

import { SafeRecipe, SafeUser } from '@/types';
import { Book } from 'lucide-react';
import { AiOutlinePlus } from 'react-icons/ai';
import Box from '../ui/box';
import { Button } from '../ui/button';

type CookbookProps = {
  currentUser: SafeUser | null;
};

const Cookbook: React.FC<CookbookProps> = ({ currentUser }) => {
  const handleClick = () => {
    console.log('clicked');
  };
  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between px-5 pt-4">
        <div className="inline-flex items-center gap-x-2">
          <Book size={26} className="text-neutral-400" />
          <p className="text-neutral-400 font-medium text-md">Your Cookbook</p>
        </div>
        <AiOutlinePlus
          onClick={handleClick}
          size={20}
          className="text-neutral-400 cursor-pointer hover:text-white transition"
        />
      </div>

      {currentUser ? (
        <div className="flex flex-col gap-y-2 mt-4 px-3">List of Cookbook</div>
      ) : (
        <div className="flex flex-col gap-4 px-2">
          <Box className="bg-secondary py-4 px-5">
            <p className="pb-4">Let&apos;s find some recipes to cook</p>
            <Button className="bg-white text-background">Browse recipes</Button>
          </Box>
          <Box className="bg-secondary py-4 px-5">
            <p className="pb-4">Create your first collection</p>
            <Button className="bg-white text-background">
              Create Collection
            </Button>
          </Box>
        </div>
      )}
    </div>
  );
};

export default Cookbook;
