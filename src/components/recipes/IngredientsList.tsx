'use client';

import { ChangeEvent, useState } from 'react';
import { stagger, useAnimate } from 'framer-motion';

import { SafeIngredient } from '@/types';
import { Label } from '../ui/Label';

interface IngredientsListProps {
  ingredients: SafeIngredient[];
}

const IngredientsList: React.FC<IngredientsListProps> = ({ ingredients }) => {
  const [ingredientsList, setIngredientsList] = useState(ingredients);

  let [ref, animate] = useAnimate();

  const handleChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const checked: boolean = e.target.checked;

    let updatedIngredients = ingredientsList.map((ingredient, idx) =>
      index === idx ? { ...ingredient, isChecked: checked } : ingredient
    );

    setIngredientsList(updatedIngredients);

    let lastCompletedItem = updatedIngredients.findIndex((i) => !i.isChecked);

    if (
      checked &&
      updatedIngredients.every((ingredient) => ingredient.isChecked)
    ) {
      animate(
        'input',
        { scale: [1, 1.25, 1] },
        { duration: 0.35, delay: stagger(0.075, { from: lastCompletedItem }) }
      );
    }

    if (checked) {
      animate(
        e.target,
        { rotate: [0, 10, -10, 0] },
        {
          duration: 0.5,
          delay: stagger(0.1, { from: lastCompletedItem }),
        }
      );
    }
  };

  return (
    <div className="flex flex-col items-center sm:items-start basis-1/3">
      <h4 className="text-xl font-semibold tracking-tight mb-2">Ingredients</h4>
      <ul ref={ref} className="list-none">
        {ingredientsList.map((ingredient, index) => (
          <li
            key={index}
            className="flex items-center space-x-2 mt-2 leading-7"
          >
            <input
              onChange={(e) => handleChange(e, index)}
              type="checkbox"
              className="h-5 w-5 rounded-md border-2 border-gray-300 text-amber-500 transition-colors duration-300 focus:ring-0 focus:ring-offset-0 focus-visible:ring-2 focus-visible:ring-amber-500/50 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-100 group-active:border-amber-500 group-active:checked:text-amber-500/25"
            />
            <Label
              className={
                ingredient.isChecked
                  ? 'line-through whitespace-nowrap'
                  : 'whitespace-nowrap'
              }
            >
              {ingredient.input}
            </Label>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default IngredientsList;
