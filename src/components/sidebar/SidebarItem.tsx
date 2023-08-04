'use client';

import Link from 'next/link';
import Icon from '../ui/Icon';
import dynamicIconImports from 'lucide-react/dynamicIconImports';
interface SidebarItemProps {
  label: string;
  href: string;
  name: keyof typeof dynamicIconImports;
  isActive: boolean;
}

const SidebarItem: React.FC<SidebarItemProps> = ({
  label,
  href,
  name,
  isActive,
}) => {
  return (
    <Link href={href} prefetch={false}>
      <li
        className={`list-none flex m-px px-3 py-2 items-center gap-3 relative rounded-md hover:bg-neutral-700 ${
          isActive ? 'bg-neutral-700' : ''
        }`}
      >
        <Icon name={name} className="h-5 w-5" />
        {label}
      </li>
    </Link>
  );
};

export default SidebarItem;
