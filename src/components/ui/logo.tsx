'use client';

import { usePanelSizes } from '@/context/panel-sizes-context';
import Image from 'next/image';
import Link from 'next/link';

const Logo: React.FC = () => {
  const { panelSizes } = usePanelSizes();
  const isLeftPanelMinimized = panelSizes[0] === 5;

  return (
    <Link href="/" className="flex items-center mb-2">
      <Image
        src="/images/baike_logo.png"
        width={36}
        height={36}
        alt="Baike logo"
      />
      {!isLeftPanelMinimized && <p className="text-2xl">Baike</p>}
    </Link>
  );
};

export default Logo;
