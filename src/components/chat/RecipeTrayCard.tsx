import { SafeRecipe } from '@/types';
import AverageRating from '../recipes/AverageRating';
import { Button } from '../ui/Button';
import RecipeImage from '../recipes/RecipeImage';
import RecipeCookTime from '../recipes/RecipeCookTime';

interface RecipeTrayCardProps {
  recipe: SafeRecipe;
}

const RecipeTrayCard: React.FC<RecipeTrayCardProps> = ({ recipe }) => {
  return (
    <div className="border-2 border-white rounded-2xl flex flex-col w-full">
      <div className="flex items-center gap-2 border-b-2 border-white h-2/5">
        <div className="px-2 text-2xl text-amber-500 font-bold basis-1/3">
          <div className="flex flex-col gap-2 items-center text-center">
            {recipe.name}
            {recipe.averageRating && (
              <AverageRating averageRating={recipe.averageRating} />
            )}
            <div className="flex flex-col items-center md:self-start gap-2 pt-2">
              <RecipeCookTime
                label="Prep"
                hours={recipe.prepHours}
                minutes={recipe.prepMinutes}
              />
              <RecipeCookTime
                label="Cook"
                hours={recipe.cookHours}
                minutes={recipe.cookMinutes}
              />
            </div>
          </div>
        </div>
        <div className="border-r-2 border-l-2 border-white flex items-center basis-1/3 ">
          <RecipeImage
            image={recipe.imageSrc}
            alt={recipe.name}
            width={200}
            height={200}
          />
        </div>
        <div className="flex flex-col basis-1/3 items-center py-2 space-y-2 h-full">
          <Button className="bg-amber-500 text-white">Save Recipe</Button>
          <Button className="bg-neutral-950 text-neutral-300">
            Edit Recipe
          </Button>
          <Button className="bg-neutral-950 text-neutral-300">
            Add to collections
          </Button>
        </div>
      </div>
      <div className="flex gap-4 px-4">
        <div className="flex flex-col items-start basis-1/3 border-white border-r-2 py-8">
          <div className="font-lg">Ingredients</div>
          <ul className="flex flex-col">
            {recipe.ingredients.length > 0 &&
              recipe.ingredients.map((ingredient) => (
                <li key={ingredient.id} className="flex flex-nowrap">
                  <div className="font-light">- {ingredient.input}</div>
                </li>
              ))}
          </ul>
        </div>
        <div className="flex flex-col items-start basis-2/3 py-8">
          <div className="font-lg">Instructions</div>
          <ul className="flex flex-col">
            {recipe.instructions.length > 0 &&
              recipe.instructions.map((instruction, index) => (
                <li key={index}>
                  <div className="font-light">- {instruction}</div>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default RecipeTrayCard;
