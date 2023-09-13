'use client';

import Link from 'next/link';

import { cn } from '@/lib/utils';
import { HTMLAttributes } from 'react';
import Image from 'next/image';

interface LogoProps extends HTMLAttributes<HTMLDivElement> {
  isCollapsed: boolean;
}

const Logo: React.FC<LogoProps> = ({ isCollapsed, className }) => {
  return (
    <Link href="/" className="flex items-center justify-center gap-2">
      <Image src="/images/bake.png" width={40} height={40} alt="Baike logo" />
      {!isCollapsed ? (
        <h2
          className={cn(
            'text-2xl font-bold hover:text-amber-500 transition duration-500',
            className
          )}
        >
          Baike
        </h2>
      ) : null}
    </Link>
  );
};

export default Logo;
