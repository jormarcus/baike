'use client';

import axios from 'axios';
import { AiFillGithub } from 'react-icons/ai';
import { signIn } from 'next-auth/react';
import { FcGoogle } from 'react-icons/fc';
import { useCallback, useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';

import { useRegisterModal } from '@/context/RegisterModalContext';
import { useLoginModal } from '@/context/LoginModalContext';
import Modal from './Modal';
import Heading from '../ui/Heading';
import Input from '../inputs/Input';
import { Button } from '../ui/Button';
import toast from 'react-hot-toast';

const RegisterModal = () => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);
    try {
      await axios.post('/api/register', data);
      registerModal.onClose();
      loginModal.onOpen();
    } catch (error) {
      toast.error('Something went wrong!');
    } finally {
      setIsLoading(false);
    }
  };

  const onToggle = useCallback(() => {
    registerModal.onClose();
    loginModal.onOpen();
  }, [registerModal, loginModal]);

  const bodyContent = (
    <div className="mt-2 flex flex-col gap-4">
      <hr />
      <Button
        className="bg-white text-black hover:bg-neutral-300"
        variant="outline"
        onClick={() => signIn('google')}
      >
        <FcGoogle className="mr-2 h-4 w-4" />
        Continue with Google
      </Button>
      <Button
        className="bg-white text-black hover:bg-neutral-300"
        variant="outline"
        onClick={() => signIn('github')}
      >
        <AiFillGithub className="mr-2 h-4 w-4" />
        Continue with Github
      </Button>
      <div
        className="
          mt-4 
          text-center 
          font-light 
          text-muted-foreground
        "
      >
        <p className="flex flex-row justify-center gap-2">
          Already have an account?
          <span
            onClick={onToggle}
            className="
              cursor-pointer
              text-white
              hover:underline
            "
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
