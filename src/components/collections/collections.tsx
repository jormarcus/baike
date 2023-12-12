'use client';

import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'next/navigation';

import { CollectionWithRecipeNamesAndImage } from '@/types';
import useIntersectionObserver from '@/hooks/use-intersection-observer';
import CollectionCard from './collection-card';
import {
  deleteCollection,
  getPaginatedCollections,
} from '@/app/_actions/collection-actions';
import EmptyState from '../ui/empty-state';
import toast from 'react-hot-toast';

interface CollectionsProps {
  initialCollections: CollectionWithRecipeNamesAndImage[];
  totalCount: number;
}

const Collections: React.FC<CollectionsProps> = ({
  initialCollections,
  totalCount,
}) => {
  const searchParams = useSearchParams();
  const [collections, setCollections] = useState<
    CollectionWithRecipeNamesAndImage[]
  >([]);
  const [count, setCount] = useState<number>(0);

  const container = useRef<HTMLDivElement>(null);
  const options = {};
  const isVisible = useIntersectionObserver(container, options);

  useEffect(() => {
    setCollections(initialCollections);
    setCount(totalCount);
  }, [initialCollections, totalCount]);

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

  const handleDelete = async (id: number) => {
    try {
      const deletedCollection = await deleteCollection(id);
      if (!deletedCollection) {
        toast.error('Failed to delete collection');
        return;
      }
      setCollections((prevCollections) =>
        prevCollections.filter((collection) => collection.id !== id)
      );
      setCount((prevCount) => prevCount - 1);
      toast.success('collection deleted');
    } catch (error) {
      toast.error('Failed to delete collection');
    }
  };

  return (
    <>
      <div className="w-full h-full mx-auto max-w-3xl md:px-xl px-md flex flex-col gap-4 pb-2 items-center justify-center">
        {collections.length > 0 ? (
          collections.map((collection, index) => {
            return index === collections.length - 1 && index < totalCount ? (
              <div ref={container} key={collection.id} className="w-full">
                <CollectionCard
                  collection={collection}
                  handleDelete={handleDelete}
                />
              </div>
            ) : (
              <CollectionCard
                key={collection.id}
                collection={collection}
                handleDelete={handleDelete}
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
    </>
  );
};

export default Collections;
