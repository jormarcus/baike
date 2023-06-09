'use client';

import { Dispatch, SetStateAction, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';

import { SafeUser } from '../../types';
import SidebarItem from './SidebarItem';
import { Icons } from '../Icons';
import { cn } from '@/lib/utils';
import AuthContent from './AuthContent';
import useWindowWidth from '@/hooks/useWindowWidth';

interface SidebarProps {
  currentUser?: SafeUser | null;
}

const NewThreadButton: React.FC = () => (
  <Link
    href="/"
    className="p-3 flex items-center gap-3 bg-neutral-950 border border-neutral-600 rounded-md cursor-pointer hover:border-amber-500 transition-all duration-200 h-11 flex-shrink-0 flex-grow"
  >
    <Icons.plus className="h-4 w-4" />
    <div className="text-sm font-semibold">New thread</div>
  </Link>
);

const SidebarToggle: React.FC<{
  toggleOpen: () => void;
  className?: string | undefined;
}> = ({ toggleOpen, className }) => (
  <div
    onClick={toggleOpen}
    className={cn(
      'p-3 flex items-center justify-center bg-neutral-950 border border-neutral-600 rounded-md cursor-pointer hover:border-amber-500 transition-all duration-200 h-11 w-11 flex-shrink-0 flex-grow-0',
      className
    )}
  >
    <Icons.sidebar className="h-4 w-4" />
  </div>
);

const Sidebar: React.FC<SidebarProps> = ({ currentUser }) => {
  const [activeItem, setActiveItem] = useState('Trending');
  const [isOpen, setIsOpen] = useState(true);

  const toggleOpen = () => {
    setIsOpen((prevState) => !prevState);
  };

  const width = useWindowWidth();
  useEffect(() => {
    if (width < 768 && isOpen) setIsOpen(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [width]);

  const sideBarItems = useMemo(() => {
    return [
      {
        label: 'Trending',
        href: '/',
      },
      {
        label: 'Recipes',
        href: '/recipes',
      },
      {
        label: 'Threads',
        href: '/threads',
      },
      {
        label: 'Collections',
        href: '/collections',
      },
      {
        label: 'Profile',
        href: '/profile',
      },
    ];
  }, []);

  return (
    <div>
      <aside
        className={cn(
          'px-2 w-64 flex-none border border-neutral-600 bg-transparent transition ease-in-out duration-300',
          isOpen ? '-translate-x-0 ml-0' : '-translate-x-full ml-[-250px]'
        )}
      >
        <div className="pt-2 sticky flex flex-col h-screen w-full">
          <div>
            <div className="mb-0.5 flex flex-row gap-2">
              <NewThreadButton />
              <SidebarToggle toggleOpen={toggleOpen} />
            </div>
          </div>
          <div className="my-4 flex flex-col">
            {sideBarItems.map((item) => (
              <div key={item.label} onClick={() => setActiveItem(item.label)}>
                <SidebarItem
                  label={item.label}
                  href={item.href}
                  isActive={activeItem === item.label}
                />
              </div>
            ))}
          </div>
          <AuthContent currentUser={currentUser} />
        </div>
      </aside>

      {!isOpen && (
        <SidebarToggle
          toggleOpen={toggleOpen}
          className={cn(
            'absolute top-2 left-2 transition-opacity duration-1000',
            isOpen ? 'opacity-0' : 'opacity-100'
          )}
        />
      )}
    </div>
  );
};

export default Sidebar;
