import { SafeCollection } from '@/types';
import Image from 'next/image';

interface CollectionCardProps {
  collection: SafeCollection;
}

const CollectionCard: React.FC<CollectionCardProps> = ({ collection }) => {
  return (
    <div className="flex flex-col space-y-2 w-full border p-1 border-neutral-600 rounded-md cursor-pointer hover:border-500">
      <div className="flex justify-start gap-4">
        <Image
          src={collection?.image || '/images/food_placeholder.png'}
          alt={collection.name}
          width={70}
          height={70}
        />
        <div className="flex flex-col items w-full pr-4">
          <div className="flex justify-between items-center">
            <h3 className="text-2xl font-bold">{collection.name}</h3>
            <div>{collection.recipesCount} recipes</div>
          </div>
          <p>{collection.recipes}</p>
        </div>
      </div>
    </div>
  );
};

export default CollectionCard;
