'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';

import Logo from '../ui/Logo';
import { useRegisterModal } from '@/context/RegisterModalContext';
import { useLoginModal } from '@/context/LoginModalContext';
import { SafeUser } from '../../types';
import SidebarItem from './SidebarItem';
import { Icons } from '../Icons';
import { Button } from '../ui/Button';
import { set } from 'date-fns';

interface SidebarProps {
  currentUser?: SafeUser | null;
}

const Sidebar: React.FC<SidebarProps> = ({ currentUser }) => {
  const [activeItem, setActiveItem] = useState('Trending');

  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();

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
        label: 'Tags',
        href: '/tags',
      },
      {
        label: 'Ingredients',
        href: '/ingredients',
      },
      {
        label: 'Shopping List',
        href: '/shopping-list',
      },
      {
        label: 'Profile',
        href: '/profile',
      },
    ];
  }, []);

  const authContent = currentUser ? (
    <div className="pl-3">
      <Button>Sign out</Button>
    </div>
  ) : (
    <div className="mb-4 pl-4">
      <Button>Login</Button>
      <Button>Sign up</Button>
    </div>
  );

  return (
    <div className="px-2 hidden md:block flex-none w-64 border border-gray-600 bg-transparent">
      <div className="pt-4 sticky flex flex-col h-screen w-full">
        <div>
          <div className="pl-4 mb-6 block flex-shrink-0">
            <Logo />
          </div>
          <div className="mb-0.5 flex flex-row gap-2">
            <Link
              href="/"
              className="p-3 flex items-center gap-3 border border-gray-600 rounded-md cursor-pointer hover:border-white transition duration-200 h-11 flex-shrink-0 flex-grow"
            >
              <Icons.plus className="h-4 w-4" />
              <div className="text-sm font-semibold">New thread</div>
            </Link>
            <div className="p-3 flex items-center justify-center gap-3 border border-gray-600 rounded-md cursor-pointer hover:border-white transition duration-200 h-11 w-11 flex-shrink-0 flex-grow-0">
              <Icons.sidebar className="h-4 w-4" />
            </div>
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
        {authContent}
      </div>
    </div>
  );
};

export default Sidebar;