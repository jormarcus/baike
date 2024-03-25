'use client';

import Link from 'next/link';
import Image from 'next/image';

import { cn } from '@/lib/utils';

const Logo: React.FC = () => {
  return (
    <>
      <Link href="/" className="flex items-center pl-4 mb-2">
        <Image
          src="/images/baike_cat_icon_ai.webp"
          width={50}
          height={50}
          alt="Baike logo"
        />
        <p className="text-3xl">Baike</p>
      </Link>
    </>
  );
};

export default Logo;
