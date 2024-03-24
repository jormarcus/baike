'use client';

import { useRouter } from 'next/navigation';
import Heading from './feading';
import { cn } from '@/lib/utils';

interface EmptyStateProps {
  title?: string;
  subtitle?: string;
  className?: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  title = 'No exact matches',
  subtitle = '',
  className,
}) => {
  const router = useRouter();

  return (
    <div
      className={
        (cn('flex flex-col items-center justify-center gap-2'), className)
      }
    >
      <Heading center title={title} subtitle={subtitle} />
    </div>
  );
};

export default EmptyState;
