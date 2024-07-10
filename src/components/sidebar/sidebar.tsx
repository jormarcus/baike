'use client';

import { usePathname } from 'next/navigation';
import { useMemo } from 'react';
import { BiSearch } from 'react-icons/bi';
import { HiHome } from 'react-icons/hi';
import Box from '../ui/box';
import Logo from '../ui/logo';
import Cookbook from './cookbook';
import SidebarItem from './sidebar-item';
import { Button } from '../ui/button';
import { usePanelSizes } from '@/context/panel-sizes-context';
import { PanelLeftOpen, PanelRightOpen } from 'lucide-react';
import { cn } from '@/lib/utils';

export type SidebarProps = {};

const Sidebar: React.FC<SidebarProps> = () => {
  const pathname = usePathname();
  const { handleUnCollapse, handleMinimize, panelSizes } = usePanelSizes();

  const isLeftPanelMinimized = panelSizes[0] === 5;

  const routes = useMemo(() => {
    return [
      {
        label: 'Home',
        active: pathname !== '/search',
        href: '/',
        icon: HiHome,
      },
      {
        label: 'Search',
        active: pathname === '/search',
        href: '/search',
        icon: BiSearch,
      },
    ];
  }, [pathname]);

  return (
    <nav className="flex flex-col gap-y-2 h-full">
      <Box>
        <div
          className={cn(
            'p-4 flex justify-between items-center',
            isLeftPanelMinimized ? 'flex-col' : ''
          )}
        >
          <Logo />

          {isLeftPanelMinimized ? (
            <Button
              className="pt-0 px-0 pb-1 bg-transparent text-foreground"
              onClick={() => handleUnCollapse('left')}
            >
              <PanelLeftOpen size={25} />
            </Button>
          ) : (
            <Button
              className="py-0 pl-0 pr-4 bg-transparent text-foreground"
              onClick={() => handleMinimize('left')}
            >
              <PanelRightOpen size={25} />
            </Button>
          )}
        </div>
        <div className="flex flex-col gap-y-4 px-4 pb-4 justify-center items-center">
          {routes.map((item) => (
            <SidebarItem key={item.label} {...item} />
          ))}
        </div>
      </Box>
      <Box className="overflow-y-auto h-full min-h-screen">
        <Cookbook />
      </Box>
    </nav>
  );
};

export default Sidebar;
