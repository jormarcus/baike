'use client';

import { createContext, useContext, useState } from 'react';
import { toast } from 'react-hot-toast';

import { throwContextNotInitializedError } from '@/lib/utils';
import { SafeCollection } from '@/types';
import { deleteCollection } from '@/app/_actions/collection-actions';

interface CollectionsContextStore {
  collections: SafeCollection[];
  setCollections: React.Dispatch<React.SetStateAction<SafeCollection[]>>;
  totalCount: number;
  setTotalCount: React.Dispatch<React.SetStateAction<number>>;
  activeCollection: SafeCollection | null;
  setActiveCollection: React.Dispatch<
    React.SetStateAction<SafeCollection | null>
  >;
  handleCollectionSelect: () => void;
  handleDelete: (id: number) => Promise<void>;
  isVisible: boolean;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export const CollectionsContextProvider =
  createContext<CollectionsContextStore>({
    collections: [],
    setCollections: throwContextNotInitializedError,
    totalCount: 0,
    setTotalCount: throwContextNotInitializedError,
    activeCollection: null,
    setActiveCollection: throwContextNotInitializedError,
    handleCollectionSelect: throwContextNotInitializedError,
    handleDelete: throwContextNotInitializedError,
    isVisible: false,
    setIsVisible: throwContextNotInitializedError,
  });

export const CollectionsProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [collections, setCollections] = useState<SafeCollection[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [activeCollection, setActiveCollection] =
    useState<SafeCollection | null>(null);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const handleCollectionSelect = () => {
    console.log('handleCollectionSelect');
  };

  const handleDelete = async (id: number) => {
    try {
      const deletedCollection = await deleteCollection(id);
      if (!deletedCollection) {
        toast.error('Failed to delete collection');
        return;
      }

      let deletedIndex = -1;

      setCollections((prevCollections) =>
        prevCollections.filter((collection, index) => {
          if (collection.id !== id) {
            return collection;
          } else {
            deletedIndex = index;
            return null;
          }
        })
      );
      setTotalCount((prevCount) => prevCount - 1);
      if (activeCollection?.id === id) {
        setActiveCollection(
          deletedIndex === 0 ? collections[1] : collections[deletedIndex - 1]
        );
      }
      toast.success('collection deleted');
    } catch (error) {
      toast.error('Failed to delete collection');
    }
  };

  return (
    <CollectionsContextProvider.Provider
      value={{
        collections,
        setCollections,
        totalCount,
        setTotalCount,
        activeCollection,
        setActiveCollection,
        handleCollectionSelect,
        handleDelete,
        isVisible,
        setIsVisible,
      }}
    >
      {children}
    </CollectionsContextProvider.Provider>
  );
};

export const useCollections = () => useContext(CollectionsContextProvider);
