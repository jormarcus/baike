import { Collection } from '@prisma/client';
import Link from 'next/link';

interface CollectionsRowProps {
  collections: Collection[];
}

const CollectionsRow: React.FC<CollectionsRowProps> = ({ collections }) => {
  if (!collections.length) {
    return null;
  }
  return (
    <div className="flex items-center gap-1">
      <div className="pr-2 font-light tracking-wide">Collections: </div>
      <div className="flex flex-row gap-2">
        {collections.map((collection) => (
          <Link
            key={collection.id}
            href={`/collections/${collection.id}`}
            className="font-bold border-b-2 border-neutral-500 hover:border-amber-500 transition duration-300"
          >
            {collection.name}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CollectionsRow;
