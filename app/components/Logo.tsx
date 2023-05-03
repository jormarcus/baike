'use client';

import { useRouter } from 'next/navigation';

const Logo = () => {
  const router = useRouter();
  return (
    <h2
      onClick={() => router.push('/')}
      className="text-lg text-rose-500 font-bold cursor-pointer"
    >
      BAIKE
    </h2>
  );
};

export default Logo;
