'use client';

import React, { ReactNode, useState, useRef, useEffect } from 'react';

import { motion, PanInfo, useMotionValue } from 'framer-motion';

import { useClickOutside } from '@/hooks/use-click-outside';
import { cn } from '@/lib/utils';

type BottomSheetChildProps = {
  isOpen: boolean;
  setOpen: (isOpen: boolean) => void;
};

type BottomSheetProps = {
  children?: ReactNode | ((props: BottomSheetChildProps) => ReactNode);
  rootClassName?: string;
  wrapperClassName?: string;
  lineClassName?: string;
  contentClassName?: string;
  compactHeight?: string;
  fullHeight?: string;
  onClickOutside?: () => void;
  closeOnClickOutside?: boolean;
};

const BottomSheet: React.FC<BottomSheetProps> = ({
  children,
  rootClassName,
  wrapperClassName,
  lineClassName,
  contentClassName,
  compactHeight = 'auto',
  fullHeight = '70vh',
  onClickOutside,
  closeOnClickOutside = true,
}) => {
  const componentRef = useRef<HTMLDivElement | null>(null);
  const [height, setHeight] = useState<string>(compactHeight);
  const [isOpen, setOpen] = useState<boolean>(false);
  const y = useMotionValue(0);

  useEffect(() => {
    if (!isOpen) setHeight(compactHeight);
  }, [isOpen, setHeight, compactHeight]);

  useClickOutside([componentRef], () => {
    onClickOutside?.();

    if (closeOnClickOutside) {
      setOpen(false);
    }
  });

  const handleDragEnd = (
    _: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    setHeight(info.offset.y < 0 ? fullHeight : compactHeight);
    setOpen(info.offset.y < 0);
  };

  const handleClick = () => {
    if (isOpen) return;
    setHeight(!isOpen ? fullHeight : compactHeight);
    setOpen(!isOpen);
  };

  if (!children) return null;

  const Children =
    typeof children === 'function'
      ? children({ isOpen, setOpen })
      : React.Children.only(children as React.ReactElement);

  return (
    <div className="relative left-1/2 transform -translate-x-1/2">
      <motion.div
        drag="y"
        className={cn(
          'fixed box-border bottom-0 z-[100] text-center w-full pt-2 pb-6 bg-secondary dark:bg-secondary rounded-tl-2xl rounded-tr-2xl rounded-bl-md rounded-br-md shadow-md after:box-content after:b-[-100] after:z-[99] after:p-0 after:m-auto',
          rootClassName
        )}
        style={{
          height: height,
          y,
        }}
        dragConstraints={{ top: 0, bottom: 0 }}
        onDragEnd={handleDragEnd}
        onClick={handleClick}
        ref={componentRef}
      >
        <div
          className={cn(
            'flex flex-col h-full box-border p-0',
            wrapperClassName
          )}
        >
          <div className={'flex justify-center items-center h-4 relative'}>
            <div
              className={cn(
                'z-[101] w-[46px] h-1 bg-[#d1d4db] dark:bg-[#d1d4db] rounded-[2] mt-0.5',
                lineClassName
              )}
            ></div>
          </div>
          <div className={cn('block overflow-y-scroll grow', contentClassName)}>
            {Children}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default BottomSheet;
