import { getCollectionWithRecipesById } from '@/app/_actions/collection-actions';
import AddRecipesToCollectionModal from '@/components/modals/add-recipes-to-collection-modal';
import RecipeCard from '@/components/recipes/recipe-card';
import EmptyState from '@/components/ui/empty-state';
import { SafeCollection } from '@/types';

interface CollectionPageProps {
  params: {
    collectionId: string;
  };
}

export default async function CollectionPage({
  params: { collectionId },
}: CollectionPageProps) {
  const collection: SafeCollection | null = await getCollectionWithRecipesById(
    Number(collectionId)
  );

  if (!collection) {
    return <EmptyState title="Recipe not found" />;
  }

  return (
    <div className="my-16 flex flex-col items-center">
      <h1 className="text-3xl font-bold my-8">{collection.name}</h1>
      <div className="flex flex-row self-center sm:self-end">
        <AddRecipesToCollectionModal
          collectionId={collection.id}
          name={collection.name}
        />
      </div>
      {collection.recipes && collection.recipes.length === 0 ? (
        <EmptyState title="This collection is empty." />
      ) : (
        <div className="grid grid-cols-1 gap-6 pt-8 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 grid-auto-rows-auto">
          {collection.recipes &&
            collection.recipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
        </div>
      )}
    </div>
  );
}
