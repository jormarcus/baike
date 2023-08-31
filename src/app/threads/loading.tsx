import Skeleton from '@/components/ui/Skeleton';

interface LoadingProps {}

const Loading: React.FC<LoadingProps> = ({}) => {
  return (
    <div className="flex flex-col gap-2">
      {Array.from({ length: 10 }).map((_, index) => (
        <div
          key={index}
          className="flex items-center space-x-4 space-y-2 border p-2 border-neutral-600 rounded-md w-full"
        >
          <div className="space-y-2 w-full">
            <Skeleton className="h-8 max-w-xs" />
            <Skeleton className="h-8 w-full" />
            <div className="flex gap-2">
              <Skeleton className="h-4 w-[30px]" />
              <Skeleton className="h-4 w-[100px]" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Loading;
