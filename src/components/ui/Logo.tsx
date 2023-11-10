'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

import { cn } from '@/lib/utils';

interface LogoProps {
  isCollapsed: boolean;
}

const Logo: React.FC<LogoProps> = ({ isCollapsed }) => {
  const LogoVariants = {
    expanded: { x: 0, y: 0 },
    collapsed: { x: 12, y: 14 },
  };

  const LogoTextVariants = {
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const charVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <>
      <Link href="/" className="flex items-center pl-4 mb-2">
        <motion.div
          variants={LogoVariants}
          transition={{ duration: 0.7 }}
          className={cn(isCollapsed ? 'pr-0' : 'pr-2')}
          whileHover={{ rotate: [0, 10, -10, 0] }}
        >
          <Image
            src="/images/bake.png"
            width={40}
            height={40}
            alt="Baike logo"
          />
        </motion.div>

        <motion.span
          variants={LogoTextVariants}
          className={cn(
            'text-2xl font-bold hover:text-amber-500 transition duration-500',
            isCollapsed ? 'hidden' : 'block'
          )}
          initial={'visible'}
          animate={isCollapsed ? 'hidden' : 'visible'}
        >
          {'Baike'.split('').map((char, index) => (
            <motion.span key={index} variants={charVariants}>
              {char}
            </motion.span>
          ))}
        </motion.span>
      </Link>
    </>
  );
};

export default Logo;
