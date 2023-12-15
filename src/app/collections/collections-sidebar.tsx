'use client';

import { useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import { toast } from 'react-hot-toast';

import CollectionCard from '@/components/collections/collection-card';
import EmptyState from '@/components/ui/empty-state';
import { useCollections } from '@/context/collections-context';
import useIntersectionObserver from '@/hooks/use-intersection-observer';
import { SafeCollection } from '@/types';
import {
  getCollectionsWithCount,
  getPaginatedCollections,
} from '../_actions/collection-actions';

interface CollectionsSidebarProps {}

const CollectionsSidebar: React.FC<CollectionsSidebarProps> = ({}) => {
  const searchParams = useSearchParams();
  const container = useRef<HTMLDivElement>(null);
  const isVisible = useIntersectionObserver(container, {});
  const { collections, totalCount, setCollections, setTotalCount } =
    useCollections();

  const query: string = searchParams.get('search') || '';

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const { collections, totalCount: count } =
          await getCollectionsWithCount(query);
        setCollections(collections);
        setTotalCount(count);
      } catch (error) {
        console.error(error);
        toast.error('Could not fetch collections');
      }
    };
    fetchCollections();
  }, [query, setCollections, setTotalCount]);

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
    <div className="flex h-full w-full max-w-[300px] flex-col overflow-y-scroll rounded-lg">
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
