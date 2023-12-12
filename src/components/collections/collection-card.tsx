import { SafeCollection } from '@/types';
import RecipeImage from '../recipes/recipe-image';
import CollectionPopover from './collection-popover';
import { cn } from '@/lib/utils';

interface CollectionCardProps {
  collection: SafeCollection;
  handleDelete: (id: number) => void;
  isActive: boolean;
}

const CollectionCard: React.FC<CollectionCardProps> = ({
  collection,
  handleDelete,
  isActive,
}) => {
  const getRecipeAmntLabel = (amnt: number) => {
    if (amnt === 1) {
      return '1 recipe';
    } else {
      return `${amnt} recipes`;
    }
  };

  return (
    <div
      className={cn(
        'w-full flex border border-neutral-500 max-w-[500px]',
        isActive ? 'bg-secondary' : ''
      )}
    >
      <div className="flex items-center w-full p-2">
        <div className="flex items-center gap-4 basis-11/12">
          <div className="h-[80px] w-[80px]">
            <RecipeImage
              image={
                collection.recipes && collection.recipes.length > 0
                  ? collection.recipes[0]['imageSrc']
                  : null
              }
              alt={collection.name}
              width={60}
              height={60}
            />
          </div>

          <div className="flex flex-col gap-1">
            <h2 className="text-xl">{collection.name}</h2>
            <div className="text-sm text-gray-500">
              {collection.recipes &&
                getRecipeAmntLabel(collection.recipes.length)}
            </div>
          </div>
        </div>
        <div className="flex justify-end self-start basis-1/12">
          <CollectionPopover
            collection={collection}
            handleDelete={handleDelete}
            isActive={isActive}
          />
        </div>
      </div>
    </div>
  );
};

export default CollectionCard;

{
  /* <div className="flex justify-end p-2 border border-neutral-500 rounded-md">
        <div className="flex flex-col p-2">
          <CollectionPopover
            collection={collection}
            handleDelete={handleDelete}
          />
        </div>
        <Link
          href={`/collection/${collection.id}`}
          className="cursor-pointer flex items-center"
        >
          <div className="flex justify-center items-center w-[70px] h-[70px]">
            {collection?.recipes &&
            collection.recipes[0] &&
            collection.recipes[0]['imageSrc'] ? (
              <RecipeImage
                image={collection.recipes[0]['imageSrc']}
                alt={collection.name}
                width={70}
                height={70}
              />
            ) : (
              <Folder />
            )}
          </div>
          <div className="w-full pr-4">
            <div className="flex justify-between items-center">
              <h3 className="text-2xl font-bold">{collection.name}</h3>
              <div>
                {collection?.recipes &&
                  getRecipeAmntLabel(collection.recipes.length)}
              </div>
            </div>
            <hr className="mb-1 w-full" />
            <div className="flex items-center flex-wrap gap-2 h-6">
              {collection.recipes &&
                collection.recipes.map((recipe, index) => (
                  <div
                    key={recipe.name}
                    className="font-light tracking-tight whitespace-nowrap"
                  >
                    {recipe.name}
                    {index === collection.recipes.length - 1 ? '' : ', '}
                  </div>
                ))}
            </div>
          </div>
        </Link>
      </div> */
}
