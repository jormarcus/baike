'use client';

import Link from 'next/link';
import { IconType } from 'react-icons';

import { cn } from '@/lib/utils';

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
  return (
    <Link
      href={href}
      className={cn(
        'flex  flex-row  h-auto  items-center  w-full  gap-x-4  text-md  font-medium cursor-pointer hover:text-foreground transition duration-300 text-muted-foreground py-1 px-1',
        active && 'text-foreground'
      )}
    >
      <Icon size={26} />
      <p className="truncate w-100">{label}</p>
    </Link>
  );
};

export default SidebarItem;
