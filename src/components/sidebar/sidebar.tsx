'use client';

import { usePathname } from 'next/navigation';
import { useMemo } from 'react';
import { HiHome } from 'react-icons/hi';
import { BiSearch } from 'react-icons/bi';
import Box from '../ui/box';
import Cookbook from './cookbook';
import SidebarItem from './sidebar-item';

const Sidebar: React.FC = () => {
  const pathname = usePathname();

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
    <div className="flex h-full">
      <div className="flex flex-col gap-y-2 h-full w-[300px] p-2">
        <Box>
          <div className="flex flex-col gap-y-4 px-5 py-4">
            {routes.map((item) => (
              <SidebarItem key={item.label} {...item} />
            ))}
          </div>
        </Box>
        <Box className="overflow-y-auto h-full min-h-screen">
          <Cookbook />
        </Box>
      </div>
    </div>
  );
};

export default Sidebar;
