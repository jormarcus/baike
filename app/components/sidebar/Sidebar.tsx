'use client';

import { useRouter } from 'next/navigation';

import Logo from '../ui/Logo';
import { useRegisterModal } from '@/app/context/RegisterModalContext';
import { useLoginModal } from '@/app/context/LoginModalContext';
import { SafeUser } from '../../types';
import SidebarItem from './SidebarItem';
import { Icons } from '../Icons';
interface SidebarProps {
  currentUser?: SafeUser | null;
}

const Sidebar: React.FC<SidebarProps> = ({ currentUser }) => {
  const router = useRouter();
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();

  const sideBarItems = [
    {
      label: 'Trending',
      onClick: () => router.push('/'),
    },
    {
      label: 'Recipes',
      onClick: () => router.push('/recipes'),
    },
    {
      label: 'Threads',
      onClick: () => router.push('/threads'),
    },
    {
      label: 'Tags',
      onClick: () => router.push('/tags'),
    },
    {
      label: 'Ingredients',
      onClick: () => router.push('/ingredients'),
    },
    {
      label: 'Shopping List',
      onClick: () => router.push('/shopping-list'),
    },
    {
      label: 'Profile',
      onClick: () => router.push('/profile'),
    },
    {
      label: 'Settings',
      onClick: () => router.push('/settings'),
    },
  ];

  const authContent = currentUser ? (
    <div className="mb-4 pl-4">
      <SidebarItem label="Sign out" />
    </div>
  ) : (
    <div className="mb-4 pl-4">
      <SidebarItem label="Login" onClick={loginModal.onOpen} />
      <SidebarItem label="Sign up" onClick={registerModal.onOpen} />
    </div>
  );

  return (
    <div className="hidden md:block flex-none w-[250px] border border-gray-400 bg-transparent">
      <div className="pt-6 pb-2 sticky top-0 flex justify-between flex-col h-screen">
        <div className="grow">
          <div className="pl-4 mb-6 block flex-shrink-0">
            <Logo />
          </div>
          <div className="mb-4">
            <div>
              <div
                onClick={() => router.push('/')}
                className="border rounded pl-4 pr-2 py-2 flex items-center ml-4 mr-4 mt-4 cursor-pointer hover:border-gray-400 transition duration-300"
              >
                <Icons.plus className="mr-2 h-4 w-4" />
                <div className="text-sm font-semibold">New thread</div>
              </div>
            </div>
          </div>
          {sideBarItems.map((item) => (
            <div key={item.label} className="mb-4 pl-4">
              <SidebarItem label={item.label} onClick={item.onClick} />
            </div>
          ))}
          {authContent}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
