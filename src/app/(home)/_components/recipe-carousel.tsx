import RecipeCard from '@/components/recipes/recipe-card';
import { SafeRecipe } from '@/types';

type RecipeCarouselProps = {
  title: string;
  recipes: SafeRecipe[];
};

export function RecipeCarousel({ title, recipes }: RecipeCarouselProps) {
  return (
    <div>
      <h2 className="pl-3 text-2xl font-bold">{title}</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
        {recipes.map((recipe) => (
          <div className="p-3" key={recipe.id}>
            <RecipeCard recipe={recipe} />
          </div>
        ))}
      </div>
    </div>
  );
}
