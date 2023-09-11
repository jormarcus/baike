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
        <div className="px-0.5 w-full">
          <Button
            className={cn(
              'dark:bg-secondary dark:text-white dark:hover:bg-neutral-600 w-full flex gap-2',
              isCollapsed ? '' : 'justify-start'
            )}
            onClick={() => signOut()}
          >
            <Icons.logout className="w-5 h-5" />
            {!isCollapsed && 'Sign out'}
          </Button>
        </div>
      ) : (
        <div className="px-0.5 m-px flex flex-col gap-4">
          <Button
            className="dark:bg-secondary dark:text-white dark:hover:bg-neutral-600"
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
      )}
    </>
  );
};

export default AuthContent;
