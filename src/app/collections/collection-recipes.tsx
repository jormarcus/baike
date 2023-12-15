import AddRecipesToCollectionModal from '@/components/recipes/add-recipes-to-collection-modal';
import RecipeCard from '@/components/recipes/recipe-card';
import EmptyState from '@/components/ui/empty-state';
import { SafeCollection } from '@/types';

interface CollectionRecipesProps {
  activeCollection: SafeCollection;
}

const CollectionRecipes: React.FC<CollectionRecipesProps> = ({
  activeCollection,
}) => {
  return (
    <div className="flex h-full w-full flex-col overflow-y-scroll rounded-md border-t border-l border-neutral-600">
      <div className="flex items-center justify-between pt-8 px-16">
        <h2 className="text-3xl font-semibold">{activeCollection.name}</h2>
        <AddRecipesToCollectionModal
          collectionId={activeCollection.id}
          name={activeCollection.name}
          label="Add recipes to collection"
        />
      </div>
      {activeCollection?.recipes && activeCollection.recipes.length === 0 ? (
        <div className="flex h-1/2 flex-col items-center justify-evenly">
          <EmptyState title="No recipes in this collection" />
        </div>
      ) : (
        <div className="p-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-16 pb-2">
          {activeCollection?.recipes &&
            activeCollection?.recipes.map((recipe) => (
              <div key={recipe.id} className="">
                <RecipeCard recipe={recipe} />
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default CollectionRecipes;
