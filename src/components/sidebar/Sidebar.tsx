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
import { signOut } from 'next-auth/react';

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
    <div className="px-0.5 w-full">
      <Button
        className="dark:bg-neutral-700 dark:text-white dark:hover:bg-neutral-600 w-full"
        onClick={() => signOut()}
      >
        Sign out
      </Button>
    </div>
  ) : (
    <div className="px-0.5 m-px flex flex-col gap-4">
      <Button
        className="dark:bg-neutral-700 dark:text-white dark:hover:bg-neutral-600"
        onClick={() => loginModal.onOpen()}
      >
        Login
      </Button>
      <Button
        className="bg-amber-500 text-neutral-100 hover:bg-amber-600 hover:text-white"
        onClick={() => registerModal.onOpen()}
      >
        Sign up
      </Button>
    </div>
  );

  return (
    <div className="px-2 hidden md:block flex-none w-64 border border-neutral-600 bg-transparent">
      <div className="pt-4 sticky flex flex-col h-screen w-full">
        <div>
          <div className="pl-4 mb-6 block flex-shrink-0">
            <Logo />
          </div>
          <div className="mb-0.5 flex flex-row gap-2">
            <Link
              href="/"
              className="p-3 flex items-center gap-3 bg-neutral-950 border border-neutral-600 rounded-md cursor-pointer hover:border-amber-500 transition duration-200 h-11 flex-shrink-0 flex-grow"
            >
              <Icons.plus className="h-4 w-4" />
              <div className="text-sm font-semibold">New thread</div>
            </Link>
            <div className="p-3 flex items-center justify-center gap-3 bg-neutral-950 border border-neutral-600 rounded-md cursor-pointer hover:border-amber-500 transition duration-200 h-11 w-11 flex-shrink-0 flex-grow-0">
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
