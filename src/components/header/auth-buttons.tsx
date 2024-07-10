'use client';

import { useRouter } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';
import { FaUserAlt } from 'react-icons/fa';
import { useLoginModal } from '@/context/login-modal-context';
import { useRegisterModal } from '@/context/register-modal-context';
import { Button } from '../ui/button';

const AuthButtons = () => {
  const { status } = useSession();
  const router = useRouter();
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();

  const isAuthenticatedUser = status === 'authenticated';

  const handleLogout = async () => {
    await signOut();
    router.refresh();
  };

  return (
    <>
      {isAuthenticatedUser ? (
        <div className="flex gap-x-4 items-center">
          <Button
            onClick={handleLogout}
            className="bg-foreground text-background px-6 py-2 font-bold"
          >
            Logout
          </Button>
          <Button
            onClick={() => router.push('/account')}
            className="bg-foreground text-background"
          >
            <FaUserAlt />
          </Button>
        </div>
      ) : (
        <>
          <Button
            onClick={registerModal.onOpen}
            className="bg-transparent text-foreground font-medium"
          >
            Sign up
          </Button>
          <Button
            onClick={loginModal.onOpen}
            className="bg-foreground px-6 py-2 text-background"
          >
            Log in
          </Button>
        </>
      )}
    </>
  );
};

export default AuthButtons;
