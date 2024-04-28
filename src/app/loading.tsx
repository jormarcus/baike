import Skeleton from '@/components/ui/skeleton';

const RecipeCarouselSkeleton = () => {
  return (
    <>
      <Skeleton className="pl-3 h-8 w-48" />
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="border-none rounded-lg flex flex-col">
            <Skeleton className="h-[196px] w-[196px] p-3" />

            <div className="flex flex-col items-start gap-2 mt-1">
              <div className="w-full flex gap-2">
                <Skeleton className="h-5 w-[160px]" />
                <Skeleton className="h-5 w-[28px]" />
              </div>

              <div className="w-full flex gap-1">
                <Skeleton className="h-5 w-[20px]" />
                <Skeleton className="h-5 w-[100px]" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

const Loading = () => {
  return (
    <div className="mt-1 flex flex-col gap-6">
      <RecipeCarouselSkeleton />
      <RecipeCarouselSkeleton />
    </div>
  );
};

export default Loading;
