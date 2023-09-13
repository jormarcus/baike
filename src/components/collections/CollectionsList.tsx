'use client';

import { useEffect, useRef, useState } from 'react';

import { CollectionWithRecipeNamesAndImage } from '@/types';
import { useSearchParams } from 'next/navigation';
import useIntersectionObserver from '@/hooks/useIntersectionObserver';
import CollectionCard from './CollectionCard';

import { getPaginatedCollections } from '@/app/_actions/collection-actions';
import Loading from '@/app/collections/loading';

interface CollectionsListProps {
  initialCollections: CollectionWithRecipeNamesAndImage[];
  totalCount: number;
}

const CollectionsList: React.FC<CollectionsListProps> = ({
  initialCollections,
  totalCount,
}) => {
  const searchParams = useSearchParams();
  const [collections, setCollections] =
    useState<CollectionWithRecipeNamesAndImage[]>(initialCollections);

  const container = useRef<HTMLDivElement>(null);
  const options = {};
  const isVisible = useIntersectionObserver(container, options);

  useEffect(() => {
    const getCollections = async () => {
      try {
        const skip = collections.length;
        if (skip >= totalCount) return;

        console.log('searchParams - search', searchParams.get('search'));
        const fetchedCollections: CollectionWithRecipeNamesAndImage[] =
          await getPaginatedCollections(searchParams.get('search') || '', skip);
        setCollections((prevCollections) => [
          ...prevCollections,
          ...fetchedCollections,
        ]);
        console.log('fetchedCollections', fetchedCollections);
      } catch (error) {
        console.error(error);
      }
    };

    if (isVisible) {
      getCollections();
    }
  }, [isVisible, collections.length, searchParams, totalCount]);

  return (
    <div>
      <div className="flex flex-col gap-4 pb-2">
        {collections.map((collection) => (
          <CollectionCard key={collection.id} collection={collection} />
        ))}
      </div>
      {totalCount > collections.length ? (
        <div ref={container} className="w-full mt-2">
          <Loading />
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

export default CollectionsList;
