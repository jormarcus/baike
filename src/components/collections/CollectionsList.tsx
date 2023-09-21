'use client';

import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'next/navigation';

import { CollectionWithRecipeNamesAndImage } from '@/types';
import useIntersectionObserver from '@/hooks/useIntersectionObserver';
import CollectionCard from './CollectionCard';
import { getPaginatedCollections } from '@/app/_actions/collection-actions';
import EmptyState from '../ui/EmptyState';

interface CollectionsListProps {
  initialCollections: CollectionWithRecipeNamesAndImage[];
  totalCount: number;
}

const CollectionsList: React.FC<CollectionsListProps> = ({
  initialCollections,
  totalCount,
}) => {
  const searchParams = useSearchParams();
  const [collections, setCollections] = useState<
    CollectionWithRecipeNamesAndImage[]
  >([]);

  const container = useRef<HTMLDivElement>(null);
  const options = {};
  const isVisible = useIntersectionObserver(container, options);

  useEffect(() => {
    setCollections(initialCollections);
  }, [initialCollections]);

  useEffect(() => {
    const getCollections = async () => {
      try {
        const skip = collections.length;
        if (skip >= totalCount) {
          return;
        }

        const query: string = searchParams.get('search') || '';

        const fetchedCollections: CollectionWithRecipeNamesAndImage[] =
          await getPaginatedCollections(query, skip);
        setCollections((prevCollections) => [
          ...prevCollections,
          ...fetchedCollections,
        ]);
      } catch (error) {
        console.error(error);
      }
    };

    if (isVisible) {
      getCollections();
    }
  }, [isVisible, collections.length, searchParams, totalCount]);

  return (
    <>
      <div className="w-full h-full mx-auto max-w-screen-xl md:px-xl px-md flex flex-col gap-4 pb-2">
        {collections.length > 0 ? (
          collections.map((collection, index) => {
            return index === collections.length - 1 && index < totalCount ? (
              <div ref={container} key={collection.id}>
                <CollectionCard collection={collection} />
              </div>
            ) : (
              <CollectionCard key={collection.id} collection={collection} />
            );
          })
        ) : (
          <EmptyState
            title="You do not have any collections"
            subtitle="Create one"
          />
        )}
      </div>
    </>
  );
};

export default CollectionsList;
