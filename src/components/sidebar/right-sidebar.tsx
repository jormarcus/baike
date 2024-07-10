'use client';

import Chat from './chat';
import ChatHeading from './chat-heading';

export type SidebarProps = {};

const RightSidebar: React.FC<SidebarProps> = () => {
  return (
    <div className="h-full flex flex-col">
      <ChatHeading />
      <Chat />
    </div>
  );
};

export default RightSidebar;
