import { SafeRecipe } from '@/types';
import AverageRating from '../recipes/AverageRating';
import { Button } from '../ui/Button';
import RecipeImage from '../recipes/RecipeImage';
import RecipeCookTime from '../recipes/RecipeCookTime';

interface RecipeTrayCardProps {
  recipe: SafeRecipe;
}

const RecipeNameBox = ({ recipe }: { recipe: SafeRecipe }) => (
  <div className="px-2 text-2xl text-amber-500 font-bold basis-1/3">
    <div className="flex flex-col gap-2 items-center text-center py-4">
      {recipe.name}
      {recipe.averageRating ? (
        <AverageRating averageRating={recipe.averageRating} />
      ) : null}
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
);

const RecipeTrayCard: React.FC<RecipeTrayCardProps> = ({ recipe }) => {
  return (
    <div className="border-2 border-white rounded-2xl flex self-center flex-col max-w-md sm:max-w-lg lg:max-w-xl h-[460px]">
      <div className="flex items-center gap-2 border-b-2 border-white h-[2/5]">
        <div className="flex items-center basis-1/3 border-r-2 border-white h-full">
          <RecipeImage
            image={recipe.imageSrc}
            alt={recipe.name}
            width={200}
            height={200}
          />
        </div>
        <RecipeNameBox recipe={recipe} />
        <div className="flex flex-col basis-1/3 items-center justify-evenly py-2 space-y-2 h-full border-l-2 border-white">
          <Button className="bg-amber-500 text-white w-[110px]">
            Save Recipe
          </Button>
          <Button className="bg-neutral-950 text-neutral-300 w-[110px]">
            Edit Recipe
          </Button>
          <Button className="bg-neutral-950 text-neutral-300 w-[110px]">
            Add to collections
          </Button>
        </div>
      </div>
      <div className="flex gap-4 px-4 overflow-hidden">
        <div className="flex flex-col items-start basis-1/3 border-white border-r-2 pt-4 overflow-scroll">
          <div className="text-lg font-semibold pb-2">Ingredients</div>
          <ul className="flex flex-col">
            {recipe.ingredients.length > 0 &&
              recipe.ingredients.map((ingredient) => (
                <li
                  key={ingredient.name}
                  className="flex flex-nowrap overflow-ellipsis"
                >
                  <div className="font-light">- {ingredient.input}</div>
                </li>
              ))}
          </ul>
        </div>
        <div className="flex flex-col items-start basis-2/3 pt-4 pb-4 overflow-scroll">
          <div className="text-lg font-semibold pb-2">Instructions</div>
          <ol className="flex flex-col gap-1">
            {recipe.instructions.length > 0 &&
              recipe.instructions.map((instruction, index) => (
                <li key={index}>
                  <div className="font-light">- {instruction}</div>
                </li>
              ))}
          </ol>
        </div>
      </div>
    </div>
  );
};

export default RecipeTrayCard;
