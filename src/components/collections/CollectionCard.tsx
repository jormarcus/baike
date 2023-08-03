import { SafeCollection } from '@/types';
import { Utensils } from 'lucide-react';
import Image from 'next/image';

interface CollectionCardProps {
  collection: SafeCollection;
}

const CollectionCard: React.FC<CollectionCardProps> = ({ collection }) => {
  const getRecipeAmntLabel = (amnt: number) => {
    if (amnt === 1) {
      return '1 recipe';
    } else {
      return `${amnt} recipes`;
    }
  };

  return (
    <div className="flex flex-col space-y-2 w-full border p-1 border-neutral-600 rounded-md cursor-pointer hover:border-500">
      <div className="flex justify-start gap-4">
        <div className="bg-white rounded-md">
          <Image
            src={collection.image || '/images/basket.png'}
            alt={collection.name}
            width={70}
            height={70}
          />
        </div>
        <div className="w-full pr-4">
          <div className="flex justify-between items-center">
            <h3 className="text-2xl font-bold">{collection.name}</h3>
            <div>{getRecipeAmntLabel(collection.recipes.length)}</div>
          </div>
          <hr className="mb-1 w-full" />
          <div className="flex items-center flex-wrap gap-2">
            {collection.recipes.map((recipe) => (
              <div
                key={recipe.name}
                className="font-light tracking-tight whitespace-nowrap"
              >
                {recipe.name}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollectionCard;
