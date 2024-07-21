'use client';

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable';

import Sidebar from '@/components/sidebar/sidebar';
import Header from '@/components/header/header';
import RightSidebar from '@/components/sidebar/right-sidebar';
import { ReactNode, useEffect, useRef } from 'react';
import { usePanelSizes } from '@/context/panel-sizes-context';
import RecipeTabs from './recipe-tabs';

type ResizableLayoutProps = {
  children: ReactNode;
};

export default function ResizableLayout({ children }: ResizableLayoutProps) {
  const { panelSizes, setPanelSizes } = usePanelSizes();
  console.log('panelSizes', panelSizes);

  const leftPanelRef = useRef<any>(null);
  const mainPanelRef = useRef<any>(null);
  const rightPanelRef = useRef<any>(null);

  useEffect(() => {
    if (leftPanelRef.current) {
      leftPanelRef.current.resize(Math.round(panelSizes[0]));
    }
    if (mainPanelRef.current) {
      mainPanelRef.current.resize(Math.round(panelSizes[1]));
    }
    if (rightPanelRef.current) {
      rightPanelRef.current.resize(Math.round(panelSizes[2]));
    }
  }, [panelSizes]);

  const handleResize = (index: number, size: number) => {
    const roundedSize = Math.round(size);
    const newSizes = [...panelSizes] as [number, number, number];

    // Update only if the size has actually changed to prevent continuous updates
    if (newSizes[index] !== roundedSize) {
      newSizes[index] = roundedSize;
      setPanelSizes(newSizes);
    }
  };

  return (
    <ResizablePanelGroup
      direction="horizontal"
      className="flex gap-1 py-2 px-2 h-screen max-h-screen overflow-hidden"
    >
      <ResizablePanel
        ref={leftPanelRef}
        order={1}
        defaultSize={panelSizes[0]}
        collapsible
        collapsedSize={5}
        onResize={(size) => handleResize(0, size)}
      >
        <Sidebar />
      </ResizablePanel>
      <ResizableHandle
        withHandle
        className="bg-primary hover:bg-border hover:border-[0.1px]"
      />
      <ResizablePanel
        ref={mainPanelRef}
        order={2}
        defaultSize={panelSizes[1]}
        collapsible
        collapsedSize={0}
        onResize={(size) => handleResize(1, size)}
      >
        <div className="mb-2 flex flex-col w-full h-full overflow-y-scroll">
          <Header />
          <RecipeTabs>
            <main className="flex-1 pb-4">{children}</main>
          </RecipeTabs>
          <main className="flex-1 pb-4">{children}</main>
        </div>
      </ResizablePanel>
      <ResizableHandle
        withHandle
        className="bg-primary hover:bg-border hover:border-[0.1px]"
      />
      <ResizablePanel
        ref={rightPanelRef}
        order={3}
        defaultSize={panelSizes[2]}
        collapsible
        collapsedSize={5}
        onResize={(size) => handleResize(2, size)}
      >
        <RightSidebar />
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
