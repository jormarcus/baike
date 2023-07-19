'use client';

import { useRouter } from 'next/navigation';
import Heading from './Heading';
import { Button } from './Button';

interface EmptyStateProps {
  title?: string;
  subtitle?: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  title = 'No exact matches',
  subtitle = '',
}) => {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <Heading center title={title} subtitle={subtitle} />
    </div>
  );
};

export default EmptyState;
