"use client";

import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";

import { SafeCollection } from "@/types";
import useIntersectionObserver from "@/hooks/use-intersection-observer";
import CollectionCard from "./collection-card";
import {
  deleteCollection,
  getPaginatedCollections,
} from "@/app/_actions/collection-actions";
import EmptyState from "../ui/empty-state";
import toast from "react-hot-toast";
import RecipeCard from "../recipes/recipe-card";
import AddRecipesToCollectionModal from "../recipes/add-recipes-to-collection-modal";

interface CollectionsProps {
  initialCollections: SafeCollection[];
  totalCount: number;
}

const Collections: React.FC<CollectionsProps> = ({
  initialCollections,
  totalCount,
}) => {
  const searchParams = useSearchParams();
  const [collections, setCollections] = useState<SafeCollection[]>([]);
  const [count, setCount] = useState<number>(0);
  const [activeCollection, setActiveCollection] =
    useState<SafeCollection | null>(null);

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

        const query: string = searchParams.get("search") || "";

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

  const handleDelete = async (id: number) => {
    try {
      const deletedCollection = await deleteCollection(id);
      if (!deletedCollection) {
        toast.error("Failed to delete collection");
        return;
      }
      setCollections((prevCollections) =>
        prevCollections.filter((collection) => collection.id !== id),
      );
      setCount((prevCount) => prevCount - 1);
      toast.success("collection deleted");
    } catch (error) {
      toast.error("Failed to delete collection");
    }
  };

  return (
    <div className="h-full w-full">
      <div className="flex w-full">
        <div className="flex h-[calc(100vh-120px)] w-full min-w-[400px] max-w-[460px] flex-col overflow-y-scroll rounded-md border border-neutral-500">
          {collections.length > 0 ? (
            collections.map((collection, index) => {
              return index === collections.length - 1 && index < totalCount ? (
                <div ref={container} key={collection.id} className="w-full">
                  <CollectionCard
                    collection={collection}
                    handleDelete={handleDelete}
                    isActive={activeCollection?.id === collection.id}
                  />
                </div>
              ) : (
                <CollectionCard
                  key={collection.id}
                  collection={collection}
                  handleDelete={handleDelete}
                  isActive={activeCollection?.id === collection.id}
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
        <div className="flex h-[calc(100vh-120px)] w-full min-w-[620px] max-w-[700px] flex-col overflow-y-scroll rounded-md border border-neutral-500">
          {activeCollection?.recipes &&
          activeCollection.recipes.length === 0 ? (
            <div className="flex h-1/2 flex-col items-center justify-evenly">
              <EmptyState title="No recipes in this collection" />
              <div className="max-w-sm">
                <AddRecipesToCollectionModal
                  collectionId={activeCollection.id}
                  name={activeCollection.name}
                  label="Add recipes to collection"
                />
              </div>
            </div>
          ) : (
            <div className="flex flex-wrap">
              {activeCollection?.recipes &&
                activeCollection?.recipes.map((recipe) => (
                  <div key={recipe.id} className="w-1/3">
                    <RecipeCard recipe={recipe} />
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Collections;
