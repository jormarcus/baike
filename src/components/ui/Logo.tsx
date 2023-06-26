'use client';

import Link from 'next/link';

import { cn } from '@/lib/utils';
import { HTMLAttributes } from 'react';

interface LogoProps extends HTMLAttributes<HTMLDivElement> {}

const Logo: React.FC<LogoProps> = ({ className }) => {
  return (
    <Link href="/">
      <h2
        className={cn(
          'text-lg text-rose-500 font-bold cursor-pointer',
          className
        )}
      >
        BAIKE
      </h2>
    </Link>
  );
};

export default Logo;
