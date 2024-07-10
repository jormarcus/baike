'use client';

import Link from 'next/link';
import { IconType } from 'react-icons';

import { cn } from '@/lib/utils';
import { usePanelSizes } from '@/context/panel-sizes-context';

interface SidebarItemProps {
  icon: IconType;
  label: string;
  active?: boolean;
  href: string;
}

const SidebarItem: React.FC<SidebarItemProps> = ({
  icon: Icon,
  label,
  active,
  href,
}) => {
  const { panelSizes } = usePanelSizes();
  const isLeftPanelMinimized = panelSizes[0] === 5;

  return (
    <Link
      href={href}
      className={cn(
        'flex items-center w-full gap-x-4 text-md font-medium cursor-pointer hover:text-foreground transition duration-300 text-muted-foreground',
        active && 'text-foreground',
        isLeftPanelMinimized ? 'justify-center ' : ''
      )}
    >
      <Icon size={26} />
      {!isLeftPanelMinimized && <p className="truncate w-100">{label}</p>}
    </Link>
  );
};

export default SidebarItem;
