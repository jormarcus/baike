import Skeleton from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

const Loading = () => {
  return (
    <div className="mx-auto flex max-w-4xl flex-col items-center sm:items-start space-y-4 py-16 px-4 sm:px-0">
      <div className="flex gap-12 w-full">
        {[...Array(5)].map((_skeleton, index) => {
          return (
            <Skeleton
              key={index}
              className={cn(
                'h-10 rounded-full',
                index === 1 ? 'w-40' : index === 3 ? 'w-24' : 'w-20'
              )}
            />
          );
        })}
      </div>

      <div className="flex flex-col gap-8 sm:gap-16">
        <div className="flex flex-col sm:flex-row gap-12 sm:gap-16">
          <div className="flex flex-col gap-4 basis-1/3 items-center">
            <Skeleton className="h-[277px] w-[277px]" />
            <div className="flex items-center sm:items-start justify-center sm:justify-start gap-1">
              {[...Array(5)].map((_skeleton, index) => {
                return <Skeleton key={index} className="h-5 w-5" />;
              })}
            </div>
            <Skeleton className="h-12 w-48" />
          </div>
          <div className="flex flex-col space-y-2 items-center sm:items-start basis-2/3">
            <h1 className="hidden sm:block font-serif font-extrabold tracking-tight text-3xl lg:text-4xl">
              <Skeleton className="h-10 w-[415px]" />
            </h1>
            <div className="flex items-center sm:items-start justify-center sm:justify-start gap-1">
              {[...Array(5)].map((_skeleton, index) => {
                return <Skeleton key={index} className="h-5 w-5" />;
              })}
            </div>
            <div className="flex flex-col items-center md:self-start gap-2 pt-2">
              <Skeleton className="h-6 w-36" />
              <Skeleton className="h-6 w-36" />
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-8 md:gap-16">
          <div className="flex flex-col items-center sm:items-start basis-1/3">
            <Skeleton className="h-7 w-24" />
            {[...Array(8)].map((_skeleton, index) => {
              return (
                <div key={index} className="flex flex-col gap-1 my-4">
                  <div className="flex gap-1">
                    <Skeleton className="h-5 w-5" />
                    <Skeleton className="h-5 w-60" />
                  </div>
                </div>
              );
            })}
          </div>
          <div className="basis-2/3 flex flex-col items-center sm:items-start">
            <Skeleton className="h-7 w-24" />
            {[...Array(3)].map((_skeleton, index) => {
              return (
                <div key={index} className="flex flex-col gap-1 my-4">
                  <Skeleton className="h-7 w-12" />
                  <Skeleton className="h-20 w-[550px]" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
