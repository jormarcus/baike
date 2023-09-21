import Image from 'next/image';
import Link from 'next/link';
import { Folder } from 'lucide-react';

import { CollectionWithRecipeNamesAndImage } from '@/types';
import FeatureCard from '../FeatureCard';
import { useIsMobile } from '@/hooks/useIsMobile';
import { cn } from '@/lib/utils';

interface CollectionCardProps {
  collection: CollectionWithRecipeNamesAndImage;
}

const CollectionCard: React.FC<CollectionCardProps> = ({ collection }) => {
  const isMobile = useIsMobile();
  const getRecipeAmntLabel = (amnt: number) => {
    if (amnt === 1) {
      return '1 recipe';
    } else {
      return `${amnt} recipes`;
    }
  };

  return (
    <div className="max-w-3xl w-full">
      <FeatureCard>
        <Link
          href={`/collection/${collection.id}`}
          className="cursor-pointer flex items-center"
        >
          <div
            className={cn(
              `flex w-full cursor-pointer items-center justify-between gap-4 overflow-hidden rounded-lg bg-gradient-to-r from-neutral-500/10 from-75% to-100% p-4 py-2 text-black/90 duration-300 group-active/challenge:bg-neutral-500/40 group-active/challenge:duration-75 dark:text-white/90 sm:py-4`,
              !isMobile &&
                'group-hover/challenge:scale-105 group-hover/challenge:rounded-xl group-hover/challenge:bg-neutral-500/20'
            )}
          >
            <div className="flex justify-center items-center">
              {collection?.recipes &&
              collection.recipes[0] &&
              collection.recipes[0]['imageSrc'] ? (
                <Image
                  src={collection.recipes[0]['imageSrc']}
                  alt={collection.name}
                  width={70}
                  height={70}
                />
              ) : (
                <Folder />
              )}
            </div>
            <div className="w-full pr-4">
              <div className="flex justify-between items-center">
                <h3 className="text-2xl font-bold">{collection.name}</h3>
                <div>
                  {collection?.recipes &&
                    getRecipeAmntLabel(collection.recipes.length)}
                </div>
              </div>
              <hr className="mb-1 w-full" />
              <div className="flex items-center flex-wrap gap-2 h-6">
                {collection.recipes &&
                  collection.recipes.map((recipe, index) => (
                    <div
                      key={recipe.name}
                      className="font-light tracking-tight whitespace-nowrap"
                    >
                      {recipe.name}
                      {index === collection.recipes.length - 1 ? '' : ', '}
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </Link>
      </FeatureCard>
    </div>
  );
};

export default CollectionCard;

// function Track({ className, difficulty, id, label }: Track) {
//   const isMobile = useIsMobile();
//   return (
//     <label
//       htmlFor={id}
//       className="group/challenge flex w-[69%] cursor-pointer flex-col items-center pt-2"
//     >
//       <div
//         className={clsx(
//           `flex w-full cursor-pointer items-center justify-between gap-3 overflow-hidden rounded-lg bg-gradient-to-r from-neutral-500/10 ${BGS_BY_DIFFICULTY[difficulty]} from-75% to-100% p-4 py-2 text-black/90 duration-300 group-active/challenge:bg-neutral-500/40 group-active/challenge:duration-75 dark:text-white/90 sm:py-4`,
//           className,
//           !isMobile &&
//             'group-hover/challenge:scale-105 group-hover/challenge:rounded-xl group-hover/challenge:bg-neutral-500/20',
//         )}
//       >
//         <div className="relative flex items-center gap-3 text-xs sm:text-base">
//           <input className="peer hidden appearance-none" type="checkbox" id={id} />
//           <div className="h-5 w-5 rounded-full border border-black/70 bg-black/10 duration-75 peer-checked:border-transparent peer-checked:bg-green-600/80 dark:border-white/50 dark:bg-white/10 peer-checked:dark:bg-green-300/80" />
//           <Check className="absolute left-1 my-auto h-3 w-3 scale-0 stroke-[4] text-white duration-300 peer-checked:scale-100 dark:text-black" />
//           {label}
//         </div>
//         <div
//           className={`relative text-xs font-medium tracking-wide ${COLORS_BY_DIFFICULTY[difficulty]}`}
//         >
//           {difficulty[0]}
//           {difficulty.substring(1, difficulty.length).toLowerCase()}
//         </div>
//       </div>
//     </label>
//   );
// }
