'use client';

import { Book } from 'lucide-react';
import { AiOutlinePlus } from 'react-icons/ai';
import { SafeUser } from '@/types';
import Box from '../ui/box';
import { Button } from '../ui/button';
import { useSession } from 'next-auth/react';
import { usePanelSizes } from '@/context/panel-sizes-context';
import { cn } from '@/lib/utils';

const Cookbook = () => {
  const { status } = useSession();
  const { panelSizes } = usePanelSizes();

  const isLeftPanelMinimized = panelSizes[0] === 5;

  const isAuthenticatedUser = status === 'authenticated';

  const handleClick = () => {
    console.log('clicked');
  };
  return (
    <div className="flex flex-col gap-8">
      <div
        className={cn(
          'flex items-center justify-between px-5 pt-4',
          isLeftPanelMinimized ? 'flex-col justify-center gap-2' : ''
        )}
      >
        <div className="text-muted-foreground flex items-center gap-x-2 cursor-pointer hover:text-foreground transition duration-300">
          <Book size={26} />
          {!isLeftPanelMinimized && (
            <p className="font-medium">Your Cookbook</p>
          )}
        </div>
        <Button className="text-muted-foreground bg-transparent hover:bg-secondary active:bg-primary p-[2px] w-8 h-8">
          <AiOutlinePlus onClick={handleClick} size={20} />
        </Button>
      </div>

      {isAuthenticatedUser ? (
        <div className="flex flex-col gap-y-2 mt-4 px-3">List of Cookbook</div>
      ) : (
        !isLeftPanelMinimized && (
          <div className="flex flex-col gap-4 px-2">
            <Box className="bg-secondary py-4 px-5">
              <p className="pb-6">Create your first collection</p>
              <Button className="bg-foreground text-background">
                Create Collection
              </Button>
            </Box>
          </div>
        )
      )}
    </div>
  );
};

export default Cookbook;
