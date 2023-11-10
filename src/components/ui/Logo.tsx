'use client';

import Link from 'next/link';

import { cn } from '@/lib/utils';
import { HTMLAttributes, useEffect } from 'react';
import Image from 'next/image';
import { motion, useAnimationControls } from 'framer-motion';

interface LogoProps extends HTMLAttributes<HTMLDivElement> {
  isCollapsed: boolean;
}

const Logo: React.FC<LogoProps> = ({ isCollapsed, className }) => {
  const controls = useAnimationControls();

  useEffect(() => {
    if (isCollapsed !== null) {
      const sequence = async () => {
        if (isCollapsed) {
          await controls.start({
            x: isCollapsed ? 30 : 0,
            y: isCollapsed ? 60 : 0,
            transition: { duration: 0.5 },
          });
          await controls.start({
            scale: isCollapsed ? 1.4 : 1,
            transition: { duration: 0.5 },
          });
        } else {
          await controls.start({
            scale: isCollapsed ? 1.4 : 1,
            x: isCollapsed ? 30 : 0,
            y: isCollapsed ? 60 : 0,
            transition: { duration: 0.5 },
          });
        }
      };
      sequence();
    }
  }, [controls, isCollapsed]);

  const titleVariants = {
    expanded: { opacity: 1 },
    collapsed: { opacity: 0 },
  };

  return (
    <div>
      <Link href="/" className="flex items-center justify-center gap-2">
        <motion.div animate={controls}>
          <Image
            src="/images/bake.png"
            width={40}
            height={40}
            alt="Baike logo"
          />
        </motion.div>
        {!isCollapsed ? (
          <motion.h2
            variants={titleVariants}
            transition={{ ease: 'easeInOut', duration: 0.5 }}
            className={cn('text-2xl font-bold hover:text-amber-500', className)}
          >
            Baike
          </motion.h2>
        ) : null}
      </Link>
    </div>
  );
};

export default Logo;
