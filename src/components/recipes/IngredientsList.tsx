'use client';

import { SafeIngredient } from '@/types';
import { Checkbox } from '../ui/Checkbox';
import { Label } from '../ui/Label';
import { CheckedState } from '@radix-ui/react-checkbox';
import { useEffect, useState } from 'react';

interface IngredientsListProps {
  ingredients: SafeIngredient[];
}

const IngredientsList: React.FC<IngredientsListProps> = ({ ingredients }) => {
  const [ingredientsList, setIngredientsList] = useState(ingredients);

  const crossOffIngredient = (checkedState: CheckedState, index: number) => {
    setIngredientsList((prevData) => {
      return prevData.map((ingredient, i) =>
        i === index ? { ...ingredient, isChecked: !!checkedState } : ingredient
      );
    });
  };

  useEffect(() => {
    setIngredientsList(ingredients);
  }, [ingredients]);

  return (
    <div className="flex flex-col items-start gap-2">
      <h4 className="text-xl font-semibold tracking-tight mt-0 flex flex-1 shrink items-center justify-between text-ellipsis">
        Ingredients
      </h4>
      <ul className="mt-2 list-none">
        {ingredientsList.map((ingredient, index) => (
          <li
            key={index}
            className="flex items-center space-x-2 mt-2 leading-7"
          >
            <Checkbox
              onCheckedChange={(checkedState: CheckedState) =>
                crossOffIngredient(checkedState, index)
              }
              className="rounded-full text-amber-500 data-[state=checked]:bg-amber-500 data-[state=checked]:border-amber-500 data-[state=checked]:text-white"
            />
            <Label className={ingredient.isChecked ? 'line-through' : ''}>
              {ingredient.input}
            </Label>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default IngredientsList;
