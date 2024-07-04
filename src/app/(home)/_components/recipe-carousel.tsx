import RecipeCard from '@/components/recipes/recipe-card';
import Box from '@/components/ui/box';
import { SafeRecipe } from '@/types';

type RecipeCarouselProps = {
  title: string;
  recipes: SafeRecipe[];
};

export function RecipeCarousel({ title, recipes }: RecipeCarouselProps) {
  return (
    <Box className="p-4">
      <h2 className="mb-2 pl-3 text-4xl font-bold">{title}</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4">
        {recipes.map((recipe) => (
          <div className="p-3" key={recipe.id}>
            <RecipeCard recipe={recipe} />
          </div>
        ))}
      </div>
    </Box>
  );
}
