'use client';

import { SafeUser } from '@/types';
import AuthButtons from './auth-buttons';
import MobileButtons from './mobile-buttons';
import NavArrows from './nav-arrows';

type HeaderProps = {
  currentUser: SafeUser | null | undefined;
};

const Header = ({ currentUser }: HeaderProps) => {
  return (
    <header className="h-16 p-4 rounded-md flex items-center justify-between gap-2 top-0 z-10 sticky bg-card">
      <div className="hidden md:flex gap-x-2 items-center">
        <NavArrows />
      </div>
      <div className="flex md:hidden gap-x-2 items-center">
        <MobileButtons />
      </div>
      <div className="flex justify-between items-center gap-x-4 pr-4">
        <AuthButtons currentUser={currentUser} />
      </div>
    </header>
  );
};

export default Header;
