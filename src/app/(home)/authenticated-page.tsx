import WelcomeWizard from '@/components/welcome-wizard/welcome-wizard';
import { getRecipesWithCount } from '../_actions/recipe-actions';
import { SafeRecipe } from '@/types';
import ListItem from '@/components/ListItem';

export default async function AuthenticatedPage() {
  const { recipes, totalCount }: { recipes: SafeRecipe[]; totalCount: number } =
    await getRecipesWithCount();

  return (
    <div>
      <div className="mb-2">
        <h1 className="text-white text-3xl font-semibold">Welcome back</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl-grid-cols-3 2xl:grid-cols-4 gap-3 mt-4">
          {recipes.map((recipe) => {
            return (
              <ListItem
                key={recipe.id}
                image={recipe?.imageSrc || undefined}
                name={recipe.name}
              />
            );
          })}
        </div>
      </div>
      <WelcomeWizard />
      <main className="mt-2 mb-7 px-6">
        <div className="flex justify-between items-center">
          <h1 className="text-white text-2xl font-semibold">Newest recipes</h1>
        </div>
        <div>Page content</div>
      </main>
    </div>
  );
}
