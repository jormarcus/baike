'use client';

import { useRouter } from 'next/navigation';
import { signOut } from 'next-auth/react';
import { RxCaretLeft, RxCaretRight } from 'react-icons/rx';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';
import { HiHome } from 'react-icons/hi';
import { BiSearch } from 'react-icons/bi';
import { FaUserAlt } from 'react-icons/fa';
import { useRegisterModal } from '@/context/register-modal-context';
import { useLoginModal } from '@/context/login-modal-context';
import { SafeUser } from '@/types';
import Box from './ui/box';

type HeaderProps = {
  currentUser: SafeUser | null | undefined;
  className?: string;
};

const Header = ({ currentUser, className }: HeaderProps) => {
  const router = useRouter();
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();

  const handleLogout = async () => {
    await signOut();
    router.refresh();
  };

  return (
    <Box>
      <header className={cn('h-fit p-6 rounded-md', className)}>
        <div className="w-full mb-4 flex items-center justify-between gap-2">
          <div className="hidden md:flex gap-x-2 items-center">
            <Button
              onClick={() => router.back()}
              className="rounded-full bg-black flex items-center justify-center cursor-pointer hover:opacity-75 transition"
            >
              <RxCaretLeft className="text-white" size={35} />
            </Button>
            <Button
              onClick={() => router.forward()}
              className="rounded-full bg-black flex items-center justify-center cursor-pointer hover:opacity-75 transition"
            >
              <RxCaretRight className="text-white" size={35} />
            </Button>
          </div>
          <div className="flex md:hidden gap-x-2 items-center">
            <Button
              onClick={() => router.push('/')}
              className="rounded-full p-3 bg-white text-foreground flex items-center justify-center cursor-pointer hover:opacity-75 transition"
            >
              <HiHome className="text-black" size={20} />
            </Button>
            <Button
              onClick={() => router.push('/search')}
              className="rounded-full p-3 bg-white flex items-center justify-center cursor-pointer hover:opacity-75 transition"
            >
              <BiSearch className="text-black" size={20} />
            </Button>
          </div>
          <div className="flex justify-between items-center gap-x-4">
            {currentUser ? (
              <div className="flex gap-x-4 items-center">
                <Button
                  onClick={handleLogout}
                  className="bg-foreground text-background px-6 py-2 font-bold"
                >
                  Logout
                </Button>
                <Button
                  onClick={() => router.push('/account')}
                  className="bg-white text-background"
                >
                  <FaUserAlt />
                </Button>
              </div>
            ) : (
              <>
                <div>
                  <Button
                    onClick={registerModal.onOpen}
                    className="bg-transparent text-neutral-300 font-medium"
                  >
                    Sign up
                  </Button>
                </div>
                <div>
                  <Button
                    onClick={loginModal.onOpen}
                    className="bg-white px-6 py-2 text-background"
                  >
                    Log in
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
      </header>
    </Box>
  );
};

export default Header;
