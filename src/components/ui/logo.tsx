'use client';

import Image from 'next/image';
import Link from 'next/link';

const Logo: React.FC = () => {
  return (
    <Link href="/" className="flex items-center pl-4 mb-2">
      <Image
        src="/images/baike_logo.png"
        width={36}
        height={36}
        alt="Baike logo"
      />
      <p className="text-2xl">Baike</p>
    </Link>
  );
};

export default Logo;
