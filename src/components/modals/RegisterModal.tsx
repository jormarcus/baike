'use client';

import { AiFillGithub } from 'react-icons/ai';
import { signIn } from 'next-auth/react';
import { FcGoogle } from 'react-icons/fc';
import { useCallback, useState } from 'react';

import { useRegisterModal } from '@/context/RegisterModalContext';
import { useLoginModal } from '@/context/LoginModalContext';
import Modal from './Modal';
import { Button } from '../ui/Button';

const RegisterModal = () => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const [isLoading, setIsLoading] = useState(false);

  const onToggle = useCallback(() => {
    registerModal.onClose();
    loginModal.onOpen();
  }, [registerModal, loginModal]);

  const bodyContent = (
    <div className="max-w-sm mx-auto flex flex-col gap-4">
      <Button
        className="dark:bg-secondary dark:text-white dark:hover:text-neutral-400"
        variant="outline"
        onClick={() => signIn('google')}
      >
        <FcGoogle className="mr-2 h-4 w-3" />
        Continue with Google
      </Button>
      <Button
        className="dark:bg-secondary dark:text-white dark:hover:text-neutral-400"
        variant="outline"
        onClick={() => signIn('github')}
      >
        <AiFillGithub className="mr-2 h-4 w-3" />
        Continue with Github
      </Button>
      <div
        className="
          mt-4 
          text-center 
          font-light 
          text-neutral-600
        "
      >
        <p className="flex flex-row justify-center gap-2">
          Already have an account?
          <span
            onClick={onToggle}
            className="cursor-pointer text-neutral-400 dark:text-white hover:underline"
          >
            Log in
          </span>
        </p>
      </div>
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={registerModal.isOpen}
      title="Register"
      onClose={registerModal.onClose}
      body={bodyContent}
    />
  );
};

export default RegisterModal;
