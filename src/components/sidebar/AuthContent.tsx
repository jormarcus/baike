import { useLoginModal } from '@/context/LoginModalContext';
import { useRegisterModal } from '@/context/RegisterModalContext';
import { SafeUser } from '@/types';
import { Button } from '../ui/Button';
import { signOut } from 'next-auth/react';

const AuthContent: React.FC<{
  currentUser: SafeUser | null | undefined;
}> = ({ currentUser }) => {
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();
  return (
    <>
      {currentUser ? (
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
      )}
    </>
  );
};

export default AuthContent;
