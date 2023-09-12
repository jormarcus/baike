'use client';

import Link from 'next/link';
import Icon from '../ui/Icon';
import dynamicIconImports from 'lucide-react/dynamicIconImports';
import { cn } from '@/lib/utils';
import { Icons } from '../Icons';
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
      className="transition duration-300 overflow-hidden relative rounded-md hover:bg-secondary"
    >
      <li
        className={cn(
          'list-none flex m-px px-3 py-2 items-center gap-3',
          isActive ? 'bg-secondary' : '',
          isCollapsed ? 'justify-center mx-6' : ''
        )}
      >
        {Icon}
        {!isCollapsed && label}
      </li>
    </Link>
  );
};

export default SidebarItem;
