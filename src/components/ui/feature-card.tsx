'use client';

import { useEffect, useState } from 'react';
import {
  MotionStyle,
  MotionValue,
  motion,
  useMotionTemplate,
  useMotionValue,
} from 'framer-motion';

import { useIsMobile } from '@/hooks/use-is-mobile';
import { cn } from '@/lib/utils';

type WrapperStyle = MotionStyle & {
  '--x': MotionValue<string>;
  '--y': MotionValue<string>;
};

function FeatureCard({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const isMobile = useIsMobile();

  function handleMouseMove({
    currentTarget,
    clientX,
    clientY,
  }: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    if (isMobile) return;

    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <motion.div
      className="lg:bg-gradient-to-bl animated-feature-cards relative w-full drop-shadow-[0_0_15px_rgba(49,49,49,0.2)] dark:drop-shadow-[0_0_15px_rgba(49,49,49,0.2)]"
      onMouseMove={handleMouseMove}
      style={
        {
          '--x': useMotionTemplate`${mouseX}px`,
          '--y': useMotionTemplate`${mouseY}px`,
        } as WrapperStyle
      }
    >
      <div
        className={cn(
          'group relative w-full overflow-hidden rounded-3xl border bg-gradient-to-b from-neutral-50/90 to-neutral-100/90 transition duration-300 dark:from-neutral-950/90 dark:to-neutral-800/90',
          !isMobile ? 'hover:border-transparent' : ''
        )}
      >
        <div>{mounted ? children : null}</div>
      </div>
    </motion.div>
  );
}

export default FeatureCard;
