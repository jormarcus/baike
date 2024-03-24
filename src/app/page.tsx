import WelcomeWizard from '@/components/welcome-wizard/welcome-wizard';
import Header from '@/components/header';
import { getCurrentUser } from './_actions/user-actions';
import ListItem from '@/components/ListItem';
import { getRecentRecipes } from './_actions/recipe-actions';
import EmptyState from '@/components/ui/empty-state';
import { SafeRecipe } from '@/types';

type HomePageProps = {
  searchParams: {
    search: string;
  };
};

export default async function Home({ searchParams }: HomePageProps) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return (
      <EmptyState
        className="mt-36"
        title="Unauthorized"
        subtitle="Please login"
      />
    );
  }

  const recipes: SafeRecipe[] = await getRecentRecipes();

  return (
    <div className="bg-card rounded-lg h-full w-full overflow-hidden overflow-y-auto">
      <Header currentUser={currentUser}>
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
      </Header>
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
