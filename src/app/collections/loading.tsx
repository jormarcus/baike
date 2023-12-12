import Skeleton from '@/components/ui/skeleton';
import { Folder } from 'lucide-react';

const Loading = () => {
  return (
    <div className="w-full flex flex-col gap-4 pb-2 justify-center items-center">
      {Array.from({ length: 10 }).map((_, index) => (
        <div
          key={index}
          className="max-w-3xl w-full flex rounded-md items-center justify-between gap-4 overflow-hidden bg-gradient-to-r from-neutral-500/10 from-75% to-100% p-4 py-2 text-black/90 duration-300 group-active/challenge:bg-neutral-500/40 group-active/challenge:duration-75 dark:text-white/90 sm:py-4"
        >
          <div className="flex justify-center items-center">
            <Folder />
          </div>
          <div className="w-full pr-4">
            <div className="flex justify-between items-center pb-2">
              <Skeleton className="h-8 w-[120px]" />
              <Skeleton className="h-6 w-[68px]" />
            </div>
            <hr className="mb-1 pt-1 w-full" />
            <Skeleton className="h-6 w-[500px]" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Loading;
