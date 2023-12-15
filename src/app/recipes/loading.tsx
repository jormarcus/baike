import Skeleton from '@/components/ui/skeleton';
import { Croissant } from 'lucide-react';
import { HTMLAttributes } from 'react';

interface LoadingProps extends HTMLAttributes<HTMLDivElement> {}

const Loading: React.FC<LoadingProps> = ({ className }) => {
  return (
    <div className="flex flex-col h-full w-full justify-between px-16">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-12 py-8">
        {Array.from({ length: 9 }).map((_, index) => (
          <div key={index} className="border-none rounded-lg flex flex-col">
            <div className="flex items-center justify-center min-h-[254px]">
              <Croissant size={60} />
            </div>

            <div className="flex flex-col items-start gap-2 px-4">
              <div className="w-full flex justify-between">
                <Skeleton className="h-6 w-[160px]" />
                <Skeleton className="h-6 w-[30px]" />
              </div>

              <div className="w-full flex gap-2">
                <Skeleton className="h-6 w-[20px]" />
                <Skeleton className="h-6 w-[100px]" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Loading;
