'use client';

import { useRouter } from 'next/navigation';

import Logo from '../ui/Logo';
import { useRegisterModal } from '@/app/context/RegisterModalContext';
import { useLoginModal } from '@/app/context/LoginModalContext';
import { SafeUser } from '../../types';
import SidebarItem from './SidebarItem';

interface SidebarProps {
  currentUser?: SafeUser | null;
}

const Sidebar: React.FC<SidebarProps> = ({ currentUser }) => {
  const router = useRouter();
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();

  const sideBarItems = [
    {
      label: 'My recipes',
      onClick: () => router.push('/recipes'),
      // icon: <AiFillHome />,
    },
    {
      label: 'Tags',
      onClick: () => router.push('/tags'),
    },
    {
      label: 'My ingredients',
      onClick: () => router.push('/ingredients'),
    },
    {
      label: 'My shopping list',
      onClick: () => router.push('/shopping-list'),
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
      <div className="h-full fixed w-[250px] border-r z-20">
        <div className="pt-6 pb-2 sticky top-0 flex justify-between flex-col h-full">
          <div className="grow">
            <div className="pl-4 mb-6 block ">
              <Logo />
            </div>
            <div className="mb-4">
              <div>
                <div className="border rounded-full pl-4 pr-2 py-2 flex justify-between items-center ml-4 mr-4 mt-5 cursor-pointer ring-2 ring-transparent hover:border-gray-400 transition duration-300">
                  <div
                    onClick={() => router.push('/')}
                    className="text-sm font-semibold"
                  >
                    New thread
                  </div>
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
    </div>
  );
};

export default Sidebar;
