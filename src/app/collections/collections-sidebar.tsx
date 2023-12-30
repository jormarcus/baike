'use client';

import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'next/navigation';

import CollectionCard from '@/components/collections/collection-card';
import EmptyState from '@/components/ui/empty-state';
import useIntersectionObserver from '@/hooks/use-intersection-observer';
import { SafeCollection } from '@/types';
import { getPaginatedCollections } from '../_actions/collection-actions';

interface CollectionsSidebarProps {
  initialCollections: SafeCollection[];
  totalCount: number;
}

const CollectionsSidebar: React.FC<CollectionsSidebarProps> = ({
  initialCollections,
  totalCount,
}) => {
  const searchParams = useSearchParams();
  const [collections, setCollections] =
    useState<SafeCollection[]>(initialCollections);

  const container = useRef<HTMLDivElement>(null);
  const isVisible = useIntersectionObserver(container, {});

  useEffect(() => {
    const getCollections = async () => {
      try {
        const skip = collections.length;
        if (skip >= totalCount) {
          return;
        }

        const query: string = searchParams.get('search') || '';

        const fetchedCollections: SafeCollection[] =
          await getPaginatedCollections(query, 10, skip);
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
  }, [isVisible, collections.length, searchParams, totalCount, setCollections]);

  return (
    <div className="flex h-full w-full max-w-[300px] max-h-screen flex-col overflow-y-scroll rounded-lg">
      {collections.length > 0 ? (
        collections.map((collection, index) => {
          return index === collections.length - 1 && index < totalCount ? (
            <div ref={container} key={collection.id} className="w-full">
              <CollectionCard collection={collection} index={index} />
            </div>
          ) : (
            <CollectionCard
              key={collection.id}
              collection={collection}
              index={index}
            />
          );
        })
      ) : (
        <EmptyState
          title="You do not have any collections"
          subtitle="Create one"
        />
      )}
    </div>
  );
};

export default CollectionsSidebar;
