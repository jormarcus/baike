'use client';

import { SafeIngredient } from '@/types';
import { Checkbox } from '../ui/Checkbox';
import { Label } from '../ui/Label';

interface IngredientsListProps {
  ingredients: SafeIngredient[];
}

const IngredientsList: React.FC<IngredientsListProps> = ({ ingredients }) => {
  return (
    <div className="flex flex-col items-start gap-2">
      <h4 className="text-xl font-semibold tracking-tight mt-0 flex flex-1 shrink items-center justify-between text-ellipsis">
        Ingredients
      </h4>
      <ul className="mt-2 list-none">
        {ingredients.map((ingredient, index) => (
          <li
            key={index}
            className="flex items-center space-x-2 mt-2 leading-7"
          >
            <Checkbox className="rounded-full text-amber-500 data-[state=checked]:bg-amber-500 data-[state=checked]:border-amber-500 data-[state=checked]:text-white" />
            <Label className={ingredient.isChecked ? 'line-through' : ''}>
              {ingredient.name}
            </Label>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default IngredientsList;
