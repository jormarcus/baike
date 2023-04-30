'use client';

import Container from '../ui/Container';
import Logo from './Logo';

interface NavbarProps {}

const Navbar: React.FC<NavbarProps> = () => {
  return (
    <div className="fixed z-10 w-full bg-white shadow-sm">
      <div className="border-b-[1px] py-4">
        <Container>
          <div className="flex flex-row items-center justify-between gap-3 md:gap-0">
            <Logo />
            Nav
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Navbar;
