'use client';

import { SquareMinus, Maximize, PanelLeftOpen, Minimize2 } from 'lucide-react';
import Box from '../ui/box';
import { Button } from '../ui/button';
import { usePanelSizes } from '@/context/panel-sizes-context';

const ChatHeading = () => {
  const { handleMinimize, handleMaximize, panelSizes } = usePanelSizes();

  const isMaximized = panelSizes[2] === 95;

  return (
    <Box className="flex h-16 p-4 justify-between items-center mb-2 gap-3">
      <Button
        className="p-0 bg-transparent text-foreground"
        onClick={() => handleMinimize('right')}
      >
        <PanelLeftOpen size={25} />
      </Button>
      {isMaximized ? (
        <Button
          className="p-0 bg-transparent text-foreground"
          onClick={() => handleMinimize('right')}
        >
          <Minimize2 size={25} />
        </Button>
      ) : (
        <Button
          className="p-0 bg-transparent text-foreground"
          onClick={() => handleMaximize('right')}
        >
          <Maximize size={25} />
        </Button>
      )}
    </Box>
  );
};

export default ChatHeading;
