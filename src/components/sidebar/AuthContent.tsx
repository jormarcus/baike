'use client';

import { useLoginModal } from '@/context/LoginModalContext';
import { useRegisterModal } from '@/context/RegisterModalContext';
import { SafeUser } from '@/types';
import { Button } from '../ui/Button';
import { signOut } from 'next-auth/react';
import { Icons } from '../Icons';
import { cn } from '@/lib/utils';

const AuthContent: React.FC<{
  currentUser: SafeUser | null | undefined;
  isCollapsed: boolean;
}> = ({ currentUser, isCollapsed }) => {
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();

  return (
    <>
      {currentUser ? (
        <div
          className={cn(
            'flex transition duration-300 overflow-hidden relative rounded-md',
            isCollapsed ? 'mx-0 px-6 justify-center' : ''
          )}
        >
          <Button
            className={cn(
              'dark:bg:transparent dark:text-white dark:border-neutral-600 dark:hover:bg-secondary flex flex-nowrap gap-3 m-px px-3 py-2 rounded-md hover:bg-secondary ml-1',
              isCollapsed ? 'justify-center mx-6' : ''
            )}
            variant="ghost"
            onClick={() => signOut()}
          >
            <Icons.logout className="w-5 h-5" />
            {!isCollapsed ? 'Sign out' : null}
          </Button>
        </div>
      ) : (
        <div className="transition duration-300 rounded-md w-full space-y-2 px-4 !mt-4">
          <Button
            className="dark:bg-neutral-950 dark:text-white border dark:border-neutral-600 dark:hover:bg-neutral-900 flex flex-nowrap items-center transition duration-500 w-full"
            onClick={() => loginModal.onOpen()}
          >
            Login
          </Button>
          <Button
            className="bg-amber-500 text-neutral-100 hover:bg-amber-600 hover:text-white transition duration-500 overflow-hidden relative rounded-md whitespace-nowrap w-full"
            onClick={() => registerModal.onOpen()}
          >
            Sign up
          </Button>
        </div>
      )}
    </>
  );
};

export default AuthContent;
