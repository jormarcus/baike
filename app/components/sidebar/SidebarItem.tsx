'use client';

import Link from 'next/link';
import { useState } from 'react';
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
    hover:bg-gray-600
    ${isActive ? 'bg-gray-700' : ''}
    `}
      >
        {label}
      </li>
    </Link>
  );
};

export default SidebarItem;
