'use client';

import Link from 'next/link';

import { cn } from '@/lib/utils';

interface SidebarItemProps {
  label: string;
  href: string;
  isActive: boolean;
  isCollapsed: boolean;
  Icon: JSX.Element;
}

const SidebarItem: React.FC<SidebarItemProps> = ({
  label,
  href,
  Icon,
  isActive,
  isCollapsed,
}) => {
  return (
    <Link
      href={href}
      prefetch={false}
      className="transition duration-300 overflow-hidden relative rounded-md"
    >
      <li
        className={cn(
          'list-none flex m-px px-3 py-2 items-center gap-3 hover:bg-secondary dark:hover:bg-secondary',
          isActive ? 'bg-secondary' : '',
          isCollapsed ? 'justify-center mx-6' : ''
        )}
      >
        {Icon}
        {!isCollapsed ? label : null}
      </li>
    </Link>
  );
};

export default SidebarItem;
