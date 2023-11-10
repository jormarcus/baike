'use client';

import Link from 'next/link';
import { motion, useAnimationControls } from 'framer-motion';

import { cn } from '@/lib/utils';
import { useEffect } from 'react';

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
  const controls = useAnimationControls();

  useEffect(() => {
    if (isCollapsed !== null) {
      const sequence = async () => {
        if (isCollapsed) {
          await controls.start({
            marginLeft: 12,
            marginRight: 12,
            justifyContent: 'center',
            transition: { duration: 0.5 },
          });
        } else {
          await controls.start({
            justifyContent: 'start',
            marginLeft: 0,
            marginRight: 0,
            x: 0,
            transition: { duration: 0.5 },
          });
        }
      };
      sequence();
    }
  }, [controls, isCollapsed]);

  const SidebarItemTextVariants = {
    visible: {
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const charVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <Link
      href={href}
      prefetch={false}
      className="overflow-hidden relative rounded-md"
    >
      <motion.li
        animate={controls}
        className={cn(
          'list-none flex m-px px-3 py-2 items-center gap-3 transition duration-300 hover:bg-secondary dark:hover:bg-secondary',
          isActive ? 'bg-secondary dark:bg-secondary' : ''
        )}
      >
        {Icon}
        <motion.span
          variants={SidebarItemTextVariants}
          initial={'visible'}
          animate={isCollapsed ? 'hidden' : 'visible'}
          className={cn(isCollapsed ? 'hidden' : 'block')}
        >
          {label.split('').map((char, index) => (
            <motion.span key={index} variants={charVariants}>
              {char}
            </motion.span>
          ))}
        </motion.span>
      </motion.li>
    </Link>
  );
};

export default SidebarItem;
