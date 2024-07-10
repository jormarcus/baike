'use client';

import { usePanelSizes } from '@/context/panel-sizes-context';
import AuthButtons from './auth-buttons';
import MobileButtons from './mobile-buttons';
import NavArrows from './nav-arrows';
import { Button } from '../ui/button';
import { PanelRightOpen } from 'lucide-react';
import Box from '../ui/box';
import { cn } from '@/lib/utils';

const Header = () => {
  const { handleUnCollapse, panelSizes } = usePanelSizes();

  const isRightPanelMinimized = panelSizes[2] === 0;

  return (
    <div className="h-16 top-0 sticky flex items-center gap-2">
      <Box
        className={
          (cn('flex items-center'),
          isRightPanelMinimized ? 'basis-[95%]' : 'basis-full')
        }
      >
        <header className="h-16 p-4 flex items-center justify-between gap-2 w-full">
          <div className="hidden md:flex gap-x-2 items-center">
            <NavArrows />
          </div>
          <div className="flex md:hidden gap-x-2 items-center">
            <MobileButtons />
          </div>
          <div className="flex justify-between items-center gap-x-4 pr-4">
            <AuthButtons />
          </div>
        </header>
      </Box>
      {isRightPanelMinimized && (
        <Box className="h-16 p-4 basis-[5%] flex justify-center items-center">
          <Button
            className="p-0 bg-transparent text-foreground"
            onClick={() => handleUnCollapse('right')}
          >
            <PanelRightOpen size={25} />
          </Button>
        </Box>
      )}
    </div>
  );
};

export default Header;
