'use client';

import { ChatGPTMessage } from '@/types';
import Box from '../ui/box';
import { Input } from '../ui/input';
import { ChefHat, CircleMinus, Expand } from 'lucide-react';
import RightSidebarHeading from './right-sidebar-heading';
import RightSidebarChat from './right-sidebar-chat';

export type SidebarProps = {};

const RightSidebar: React.FC<SidebarProps> = () => {
  return (
    <div className="h-full pr-4 flex flex-col">
      <RightSidebarHeading />
      <RightSidebarChat />
    </div>
  );
};

export default RightSidebar;
