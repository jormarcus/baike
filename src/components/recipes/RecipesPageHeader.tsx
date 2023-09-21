'use client';

import { Croissant, PlusCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';

import ImportRecipeModal from '../modals/ImportRecipeModal';
import { Button } from '../ui/Button';
import Searchbox from '../ui/Searchbox';

interface RecipesPageHeaderProps {}

const RecipesPageHeader: React.FC<RecipesPageHeaderProps> = () => {
  const router = useRouter();

  return (
    <div className="sticky top-0 z-[15] border border-border/60 dark:border-border/80 divide-border/60 dark:divide-border/80 ring-border dark:ring-border bg-background dark:bg-background">
      <div className="py-4 md:py-8 mx-auto max-w-screen-xl px-4 md:px-12 flex flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-4">
          <Croissant size={30} />
          <h2 className="text-3xl">Recipes</h2>
        </div>

        <div className="flex items-center justify-center max-w-md w-full">
          <Searchbox placeholder="Search your recipes..." />
        </div>

        <div className="flex flex-row gap-3">
          <ImportRecipeModal />

          <Button
            className="bg-amber-500 text-white hover:bg-amber-400 flex gap-2"
            variant="default"
            onClick={() => router.push('/recipes/add')}
          >
            <PlusCircle />
            Add recipe
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RecipesPageHeader;
