'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import dynamicIconImports from 'lucide-react/dynamicIconImports';

import { SafeUser } from '../../types';
import SidebarItem from './SidebarItem';
import { Icons } from '../Icons';
import { cn } from '@/lib/utils';
import AuthContent from './AuthContent';
import { usePathname } from 'next/navigation';
import { ArrowLeftToLine, ArrowRightFromLine } from 'lucide-react';
import Logo from '../ui/Logo';

interface SidebarProps {
  currentUser?: SafeUser | null;
}

const NewThreadButton: React.FC<{ isCollapsed: boolean }> = ({
  isCollapsed,
}) => (
  <Link
    href="/"
    className={cn(
      'mx-4 flex items-center gap-3 bg-neutral-950 border-2 border-neutral-600 rounded-md cursor-pointer hover:border-amber-500 transition-all duration-300 h-10 flex-shrink-0 flex-grow',
      isCollapsed ? 'justify-center mx-6' : 'p-3'
    )}
  >
    <Icons.plus className="h-6 w-6 hover:scale-105 transition-all duration-300 ease-in-out" />
    {!isCollapsed ? (
      <div className="text-sm font-semibold">New thread</div>
    ) : null}
  </Link>
);

const SidebarToggle: React.FC<{
  isCollapsed: boolean;
  toggleCollapsed: () => void;
  className?: string | undefined;
}> = ({ isCollapsed, toggleCollapsed, className }) => (
  <div
    onClick={toggleCollapsed}
    className={cn(
      'p-3 flex items-center justify-center bg-neutral-950 border border-neutral-600 rounded-md cursor-pointer hover:border-amber-500 transition-all duration-200 h-11 w-11 flex-shrink-0 flex-grow-0',
      className
    )}
  >
    {isCollapsed ? <ArrowRightFromLine /> : <ArrowLeftToLine />}
  </div>
);

const Sidebar: React.FC<SidebarProps> = ({ currentUser }) => {
  const pathname = usePathname();

  const [isCollapsed, setIsCollapsed] = useState(false);

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
    <div
      className={cn(
        'hidden md:block flex-none bg-transparent h-full z-20 transition-all ease-in-out duration-500 overflow-hidden',
        isCollapsed ? 'w-24' : 'w-60'
      )}
    >
      <aside
        className={cn(
          'fixed flex flex-col transition-all ease-in-out duration-500',
          isCollapsed ? 'w-24' : 'w-60 px-2'
        )}
      >
        <div className="pt-6 pb-2 sticky flex flex-col h-full">
          <div
            className={cn(
              'mb-2 flex items-center justify-between',
              isCollapsed ? 'flex-col-reverse gap-4' : 'px-4'
            )}
          >
            <Logo isCollapsed={isCollapsed} />
            <div className={cn(isCollapsed ? '' : 'self-end')}>
              <SidebarToggle
                isCollapsed={isCollapsed}
                toggleCollapsed={toggleCollapsed}
              />
            </div>
          </div>
          <div className="mt-4 relative items-center">
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
          </div>
          <AuthContent currentUser={currentUser} isCollapsed={isCollapsed} />
        </div>
      </aside>
    </div>
  );
};

export default Sidebar;
