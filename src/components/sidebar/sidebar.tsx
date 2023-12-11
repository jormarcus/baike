'use client';

import { useMemo, useState } from 'react';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';

import { SafeUser } from '../../types';
import SidebarItem from './sidebar-item';
import { Icons } from '../icons';
import { cn } from '@/lib/utils';
import Logo from '../ui/logo';
import SidebarToggle from './sidebar-toggle';
import AuthContent from './auth-content';

interface SidebarProps {
  currentUser?: SafeUser | null;
}

const Sidebar: React.FC<SidebarProps> = ({ currentUser }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();

  const sidebarVariants = {
    expanded: { width: 240, y: 0 },
    collapsed: { width: 96, y: 50 },
  };

  const toggleCollapsed = () => {
    setIsCollapsed((prevState) => !prevState);
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
        label: 'Chat history',
        href: '/chat-history',
        icon: <Icons.messageSquare />,
      },
      {
        label: 'Profile',
        href: `/profile/${currentUser?.id || ''}`,
        icon: <Icons.userCircle />,
        hide: !currentUser,
      },
      {
        label: 'Add recipe',
        href: '/recipe/add',
        icon: <Icons.plusCircle />,
      },
    ];
  }, [currentUser]);

  return (
    <>
      <motion.div
        animate={isCollapsed ? 'collapsed' : 'expanded'}
        variants={sidebarVariants}
        initial={{ width: 240 }}
        transition={{ duration: 0.5 }}
        className={cn('flex-none bg-transparent h-full z-20 w-full')}
      >
        <aside>
          <div className="pt-6 fixed flex flex-col h-full">
            <Logo isCollapsed={isCollapsed} />
            <motion.div
              animate={isCollapsed ? 'collapsed' : 'expanded'}
              transition={{ duration: 0.5 }}
              className="mt-4 relative items-center space-y-1 h-full"
              initial={{ width: 240 }}
              variants={{
                expanded: { width: 240 },
                collapsed: { width: 96 },
              }}
            >
              {sideBarItems.map((item) => {
                const isActive = pathname === item.href;
                if (item.hide) {
                  return null;
                } else {
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
                }
              })}
              <AuthContent
                currentUser={currentUser}
                isCollapsed={isCollapsed}
              />
            </motion.div>
          </div>
        </aside>
      </motion.div>
      <SidebarToggle
        isCollapsed={isCollapsed}
        toggleCollapsed={toggleCollapsed}
      />
    </>
  );
};

export default Sidebar;
