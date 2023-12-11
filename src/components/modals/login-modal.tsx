'use client';

import { useCallback, useState } from 'react';
import { signIn } from 'next-auth/react';
import { FcGoogle } from 'react-icons/fc';
import { AiFillGithub } from 'react-icons/ai';

import { useRegisterModal } from '@/context/register-modal-context';
import { useLoginModal } from '@/context/login-modal-context';
import Modal from './modal';
import { Button } from '../ui/button';

const LoginModal = () => {
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();
  const [isLoading, setIsLoading] = useState(false);

  const onToggle = useCallback(() => {
    loginModal.onClose();
    registerModal.onOpen();
  }, [loginModal, registerModal]);

  const bodyContent = (
    <div className="max-w-sm mx-auto flex flex-col gap-4">
      <Button
        className="dark:bg-secondary dark:text-white dark:hover:text-neutral-400"
        variant="outline"
        onClick={() => signIn('google')}
      >
        <FcGoogle className="mr-2 h-4 w-4" />
        Continue with Google
      </Button>
      <Button
        className="dark:bg-secondary dark:text-white dark:hover:text-neutral-400"
        variant="outline"
        onClick={() => signIn('github')}
      >
        <AiFillGithub className="mr-2 h-4 w-4" />
        Continue with Github
      </Button>
      <div className="mt-4 text-center font-light">
        <p className="flex gap-2 justify-center dark:text-neutral-400">
          First time using Baike?
          <span
            onClick={onToggle}
            className="
            cursor-pointer
            hover:underline
            text-neutral-400
            dark:text-white
          "
          >
            Create an account
          </span>
        </p>
      </div>
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={loginModal.isOpen}
      title="Login"
      onClose={loginModal.onClose}
      body={bodyContent}
    />
  );
};

export default LoginModal;
