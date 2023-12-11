import FeatureCard from '@/components/ui/feature-card';
import Skeleton from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import { Croissant } from 'lucide-react';
import { HTMLAttributes } from 'react';

interface LoadingProps extends HTMLAttributes<HTMLDivElement> {}

const Loading: React.FC<LoadingProps> = ({ className }) => {
  return (
    <div className="flex flex-col h-full w-full justify-between">
      <div
        className={cn(
          'grid grid-cols-1 gap-6 px-16 py-8 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 grid-auto-rows-auto',
          className
        )}
      >
        {Array.from({ length: 10 }).map((_, index) => (
          <FeatureCard key={index}>
            <div className="flex flex-col flex-grow-3 flex-shrink items-center justify-center border border-neutral-600 rounded-3xl min-h-[310px]">
              <div className="flex items-center justify-center min-h-[254px]">
                <Croissant size={60} />
              </div>

              <div className="w-full flex justify-between px-4 flex-grow-1 flex-shrink min-h-[56px]">
                <Skeleton className="h-6 w-[120px]" />
                <Skeleton className="h-6 w-[30px]" />
              </div>
            </div>
          </FeatureCard>
        ))}
      </div>
    </div>
  );
};

export default Loading;
