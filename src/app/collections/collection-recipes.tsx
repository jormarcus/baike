import AddRecipesToCollectionModal from '@/components/recipes/add-recipes-to-collection-modal';
import RecipesList from '@/components/recipes/recipes-list';
import EmptyState from '@/components/ui/empty-state';
import { SafeCollection } from '@/types';

interface CollectionRecipesProps {
  activeCollection: SafeCollection;
}

const CollectionRecipes: React.FC<CollectionRecipesProps> = ({
  activeCollection,
}) => {
  return (
    <div className="flex w-full flex-col rounded-md border-t border-l border-neutral-600 max-h-screen overflow-y-scroll">
      <div className="flex items-center justify-between py-8 px-16 border-b border-border/60 dark:border-border/80 divide-border/60 dark:divide-border/80 ring-border dark:ring-border">
        <h2 className="text-3xl font-semibold">{activeCollection.name}</h2>
        <AddRecipesToCollectionModal
          collectionId={activeCollection.id}
          name={activeCollection.name}
          label="Add recipes to collection"
          buttonStyle="dark:bg-amber-500 dark:text-white dark:hover:bg-amber-400"
          hasIcon={false}
        />
      </div>
      {activeCollection?.recipes && activeCollection.recipes.length === 0 ? (
        <div className="flex h-1/2 flex-col items-center justify-evenly">
          <EmptyState title="No recipes in this collection" />
        </div>
      ) : (
        <div className="px-16">
          <RecipesList
            initialRecipes={activeCollection?.recipes || []}
            totalCount={activeCollection.recipes?.length || 0}
          />
        </div>
      )}
    </div>
  );
};

export default CollectionRecipes;
