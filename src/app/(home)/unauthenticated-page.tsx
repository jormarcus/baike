import { SafeRecipe } from '@/types';
import { getUnauthHomeRecipes } from '../_actions/recipe-actions';
import { RecipeCarousel } from './_components/recipe-carousel';

export default async function UnauthenticatedPage() {
  const {
    trendingRecipes,
    popularRecipes,
  }: {
    trendingRecipes: SafeRecipe[];
    popularRecipes: SafeRecipe[];
  } = await getUnauthHomeRecipes();

  return (
    <div className="mt-1 flex flex-col gap-6">
      <RecipeCarousel recipes={trendingRecipes} title="Trending recipes" />
      <RecipeCarousel recipes={popularRecipes} title="Popular recipes" />
    </div>
  );
}
