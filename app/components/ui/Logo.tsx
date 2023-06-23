'use client';

import Link from 'next/link';

const Logo = () => {
  return (
    <Link href="/">
      <h2 className="text-lg text-rose-500 font-bold cursor-pointer">BAIKE</h2>
    </Link>
  );
};

export default Logo;
