'use client';

import { signOut } from 'next-auth/react';

import Logo from './ui/Logo';
import { Button } from './ui/Button';
import useLoginModal from '../hooks/useLoginModal';
import useRegisterModal from '../hooks/useRegisterModal';
import { SafeUser } from '../types';

interface SidebarProps {
  currentUser?: SafeUser | null;
}

const Sidebar: React.FC<SidebarProps> = ({ currentUser }) => {
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();

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
                  <div className="text-sm font-semibold">New thread</div>
                </div>
              </div>
            </div>
            {currentUser ? (
              <div className="mb-4 pl-4">
                <Button onClick={() => signOut()} variant="ghost">
                  Sign Out
                </Button>
              </div>
            ) : (
              <>
                <div className="m-4 pl-4">
                  <Button onClick={loginModal.onOpen} variant="ghost">
                    Login
                  </Button>
                </div>
                <div className="m-4 pl-4">
                  <Button onClick={registerModal.onOpen} variant="ghost">
                    Sign Up
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
