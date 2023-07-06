'use client';

import Link from 'next/link';
import ImportRecipeModal from '../modals/ImportRecipeModal';
import { Button } from '../ui/Button';

interface RecipePageHeaderProps {}

const RecipePageHeader: React.FC<RecipePageHeaderProps> = () => {
  return (
    <div className="flex flex-row justify-between items-center">
      <div>
        <h2 className="font-bold text-2xl">Recipes</h2>
      </div>
      <div className="flex flex-row gap-3">
        <ImportRecipeModal />

        <Link href="/recipes/add">
          <Button
            className="bg-amber-500 text-white hover:bg-amber-400"
            variant="default"
            onClick={() => console.log('Add recipe')}
          >
            Add recipe
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default RecipePageHeader;
