'use client';

import { useParams, useRouter } from 'next/navigation';

import { SafeCollection } from '@/types';
import RecipeImage from '../recipes/recipe-image';
import CollectionPopover from './collection-popover';
import { cn } from '@/lib/utils';

interface CollectionCardProps {
  collection: SafeCollection;
  index: number;
}

const CollectionCard: React.FC<CollectionCardProps> = ({
  collection,
  index,
}) => {
  const router = useRouter();
  const params = useParams();

  const isActive =
    params.collectionId === collection.id.toString() ||
    (index === 0 && !params.collectionId);

  const handleClick = () => {
    if (isActive) {
      return;
    }

    router.push(`/collections/${collection.id}`);
  };

  return (
    <div
      className={cn(
        'flex max-w-[500px] cursor-pointer hover:bg-secondary transition-colors duration-300 ease-in-out rounded-lg mx-2 my-1',
        isActive ? 'bg-secondary' : ''
      )}
      onClick={handleClick}
    >
      <div className="flex items-center w-full p-2 justify-between">
        <div className="flex items-center gap-4 basis-11/12 max-w-[60px] max-h-[60px]">
          <RecipeImage
            image={
              collection.recipes && collection.recipes.length > 0
                ? collection.recipes[0]['imageSrc']
                : null
            }
            alt={collection.name}
          />

          <div className="flex flex-col gap-1">
            <h2 className="text-md">{collection.name}</h2>
            <div className="text-sm text-gray-500">
              {collection.recipesCount ===
              0 ? null : collection.recipesCount === 1 ? (
                <span>1 recipe</span>
              ) : (
                <span>{collection.recipesCount} recipes</span>
              )}
            </div>
          </div>
        </div>
        <div className="flex justify-end self-start basis-1/12">
          <CollectionPopover collection={collection} isActive={isActive} />
        </div>
      </div>
    </div>
  );
};

export default CollectionCard;
