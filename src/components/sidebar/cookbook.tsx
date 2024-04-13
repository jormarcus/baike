'use client';

import { Book } from 'lucide-react';
import { AiOutlinePlus } from 'react-icons/ai';
import { SafeUser } from '@/types';
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
        <div className="text-muted-foreground inline-flex items-center gap-x-2 cursor-pointer hover:text-foreground transition duration-300">
          <Book size={26} />
          <p className="font-medium">Your Cookbook</p>
        </div>
        <Button className="text-muted-foreground bg-transparent hover:bg-secondary active:bg-primary p-[2px] w-8 h-8">
          <AiOutlinePlus onClick={handleClick} size={20} />
        </Button>
      </div>

      {currentUser ? (
        <div className="flex flex-col gap-y-2 mt-4 px-3">List of Cookbook</div>
      ) : (
        <div className="flex flex-col gap-4 px-2">
          <Box className="bg-secondary py-4 px-5">
            <p className="pb-6">Let&apos;s find some recipes to cook</p>
            <Button className="bg-foreground text-background">
              Browse recipes
            </Button>
          </Box>
          <Box className="bg-secondary py-4 px-5">
            <p className="pb-6">Create your first collection</p>
            <Button className="bg-foreground text-background">
              Create Collection
            </Button>
          </Box>
        </div>
      )}
    </div>
  );
};

export default Cookbook;
