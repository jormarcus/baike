'use client';

import { useMemo, useState } from 'react';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';

import { SafeUser } from '../../types';
import SidebarItem from './SidebarItem';
import { Icons } from '../Icons';
import { cn } from '@/lib/utils';
import Logo from '../ui/Logo';
// import { useRecipeCompare } from '@/context/RecipeCompareContext';
import SidebarToggle from './SidebarToggle';
import AuthContent from './AuthContent';

interface SidebarProps {
  currentUser?: SafeUser | null;
}

const Sidebar: React.FC<SidebarProps> = ({ currentUser }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();
  // const { setIsRecipeCompareExpanded } = useRecipeCompare();

  const sidebarVariants = {
    expanded: { width: 240 },
    collapsed: { width: 96 },
  };

  const sideBarItemsVariants = {
    expanded: { y: 0 },
    collapsed: { y: 50 },
  };

  const toggleCollapsed = () => {
    setIsCollapsed((prevState) => !prevState);
    // setIsRecipeCompareExpanded((prevState) => !prevState);
  };

  const sideBarItems = useMemo(() => {
    return [
      {
        label: 'Discover',
        href: '/',
        icon: <Icons.compass />,
      },
      {
        label: 'Recipes',
        href: '/recipes',
        icon: <Icons.croissant />,
      },
      {
        label: 'Collections',
        href: '/collections',
        icon: <Icons.folderPlus />,
      },
      {
        label: 'Threads',
        href: '/threads',
        icon: <Icons.messageSquare />,
      },
      {
        label: 'Profile',
        href: `/profile/${currentUser?.id || ''}`,
        icon: <Icons.userCircle />,
      },
      {
        label: 'Add recipe',
        href: '/recipes/add',
        icon: <Icons.plusCircle />,
      },
    ];
  }, [currentUser?.id]);

  return (
    <motion.div
      animate={isCollapsed ? 'collapsed' : 'expanded'}
      variants={sidebarVariants}
      initial={{ width: 240 }}
      transition={{ duration: 0.3 }}
      className={cn('hidden md:block flex-none bg-transparent h-full z-20')}
    >
      <aside className={cn('flex flex-col h-full', isCollapsed ? '' : 'px-2')}>
        <div className="pt-6 sticky flex flex-col h-full">
          <div
            className={cn(
              'mb-2 flex items-center justify-between',
              isCollapsed ? 'gap-4' : 'px-4'
            )}
          >
            <Logo isCollapsed={isCollapsed} />
            <SidebarToggle
              isCollapsed={isCollapsed}
              toggleCollapsed={toggleCollapsed}
            />
          </div>
          <motion.div
            animate={isCollapsed ? 'collapsed' : 'expanded'}
            variants={sideBarItemsVariants}
            transition={{ duration: 0.7 }}
            className="mt-4 relative items-center space-y-1 h-full"
          >
            {sideBarItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <div key={item.label}>
                  <SidebarItem
                    label={item.label}
                    href={item.href}
                    Icon={item.icon}
                    isActive={isActive}
                    isCollapsed={isCollapsed}
                  />
                </div>
              );
            })}
            <AuthContent currentUser={currentUser} isCollapsed={isCollapsed} />
          </motion.div>
        </div>
      </aside>
    </motion.div>
  );
};

export default Sidebar;
