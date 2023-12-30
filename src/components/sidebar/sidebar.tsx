'use client';

import { usePathname } from 'next/navigation';
import { useMemo } from 'react';
import { HiHome } from 'react-icons/hi';
import { BiSearch } from 'react-icons/bi';
import Box from '../ui/box';

type SidebarProps = {
  children: React.ReactNode;
};

const Sidebar: React.FC<SidebarProps> = ({ children }) => {
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
      <div className="hidden md:flex flex-col gap-y-2 h-full w-[300px] p-2">
        <Box>Sidebar navigation</Box>
        <Box>Recipe library</Box>
        {children}
      </div>
    </div>
  );
};

export default Sidebar;
