import Image from 'next/image';
import Link from 'next/link';
import { Folder } from 'lucide-react';

import { CollectionWithRecipeNamesAndImage } from '@/types';
import FeatureCard from '../ui/feature-card';
import { useIsMobile } from '@/hooks/use-is-mobile';
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
    <div className="w-full">
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
