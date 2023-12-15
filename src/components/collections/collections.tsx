'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'next/navigation';

import { SafeCollection } from '@/types';
import useIntersectionObserver from '@/hooks/use-intersection-observer';
import CollectionCard from './collection-card';
import {
  deleteCollection,
  getPaginatedCollections,
} from '@/app/_actions/collection-actions';
import EmptyState from '../ui/empty-state';
import toast from 'react-hot-toast';
import RecipeCard from '../recipes/recipe-card';
import AddRecipesToCollectionModal from '../recipes/add-recipes-to-collection-modal';

interface CollectionsProps {
  initialCollections: SafeCollection[];
  totalCount: number;
}

const Collections: React.FC<CollectionsProps> = ({
  initialCollections,
  totalCount,
}) => {
  const [collections, setCollections] = useState<SafeCollection[]>([]);
  const [count, setCount] = useState<number>(0);
  const [activeCollection, setActiveCollection] =
    useState<SafeCollection | null>(null);

  const searchParams = useSearchParams();

  const container = useRef<HTMLDivElement>(null);
  const options = {};
  const isVisible = useIntersectionObserver(container, options);

  useEffect(() => {
    setCollections(initialCollections);
    setCount(totalCount);
    setActiveCollection(initialCollections[0]);
  }, [initialCollections, totalCount]);

  useEffect(() => {
    const getCollections = async () => {
      try {
        const skip = collections.length;
        if (skip >= totalCount) {
          return;
        }

        const query: string = searchParams.get('search') || '';

        const fetchedCollections: SafeCollection[] =
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
    <div className="h-full w-full">
      <div className="flex w-full"></div>
    </div>
  );
};

export default Collections;
