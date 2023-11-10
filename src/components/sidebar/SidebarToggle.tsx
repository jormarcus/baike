import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { ArrowLeftToLine, ArrowRightFromLine } from 'lucide-react';

interface SidebarToggleProps {
  isCollapsed: boolean;
  toggleCollapsed: () => void;
}

const SidebarToggle: React.FC<SidebarToggleProps> = ({
  isCollapsed,
  toggleCollapsed,
}) => {
  const sideBarToggleVariants = {
    expanded: { x: 0 },
    collapsed: { x: -25 },
  };

  return (
    <motion.div
      variants={sideBarToggleVariants}
      onClick={toggleCollapsed}
      transition={{ duration: 0.5 }}
      className="p-3 flex items-center justify-center dark:bg-neutral-950 border border-neutral-600 rounded-md cursor-pointer hover:border-amber-500 h-11 w-11 flex-shrink-0 flex-grow-0"
    >
      {isCollapsed ? <ArrowRightFromLine /> : <ArrowLeftToLine />}
    </motion.div>
  );
};

export default SidebarToggle;
