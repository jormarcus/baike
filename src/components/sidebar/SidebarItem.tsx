'use client';

import Link from 'next/link';
interface SidebarItemProps {
  label: string;
  href: string;
  isActive: boolean;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ label, href, isActive }) => {
  return (
    <Link href={href}>
      <li
        className={`list-none
    flex
    m-px
    px-3
    py-2
    items-center
    gap-3
    relative
    rounded-md
    hover:bg-neutral-700
    ${isActive ? 'bg-neutral-700' : ''}
    `}
      >
        {label}
      </li>
    </Link>
  );
};

export default SidebarItem;
