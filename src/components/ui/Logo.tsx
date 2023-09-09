'use client';

import Link from 'next/link';

import { cn } from '@/lib/utils';
import { HTMLAttributes } from 'react';
import Image from 'next/image';

interface LogoProps extends HTMLAttributes<HTMLDivElement> {}

const Logo: React.FC<LogoProps> = ({ className }) => {
  return (
    <Link href="/" className="flex items-center justify-center gap-2">
      <Image src="/images/bake.png" width={40} height={40} alt="Baike logo" />
      <h2 className={cn('text-2xl font-bold cursor-pointer', className)}>
        Baike
      </h2>
    </Link>
  );
};

export default Logo;
