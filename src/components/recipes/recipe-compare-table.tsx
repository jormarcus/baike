import React from 'react';

import { SafeRecipe } from '@/types';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '../ui/button';
import RecipeImage from './recipe-image';
import { cn } from '@/lib/utils';

interface RecipeCompareTableProps {
  recipes: SafeRecipe[];
}

const TableHeading = ({ recipes }: { recipes: SafeRecipe[] }) => {
  const height = recipes.length === 1 ? 240 : 80;
  return (
    <TableHeader>
      <TableRow className="grid grid-cols-5 border border-neutral-600">
        <TableHead className="col-span-1 px-0 border-r border-neutral-600 h-full flex flex-col items-center pt-4">
          <Button>Clear all</Button>
        </TableHead>
        {recipes.map((recipe, index) => (
          <TableHead
            key={recipe.id}
            className="flex items-center justify-between h-full col-span-1 px-0"
          >
            <div className="flex flex-col items-center justify-center border-r border-neutral-600 w-full pb-6 pt-2">
              <Button variant="ghost" className="self-end text-white">
                X
              </Button>
              <div className="object-cover transition duration-300 group-hover:scale-110 ease-cubic-bezier rounded-3xl flex items-center justify-center h-60 w-60 py-4">
                <RecipeImage image={recipe.imageSrc} alt={recipe.name} />
              </div>
            </div>
          </TableHead>
        ))}
      </TableRow>
    </TableHeader>
  );
};

const IngredientsRow = ({ recipes }: { recipes: SafeRecipe[] }) => {
  return (
    <TableRow className="text-left align-center border border-neutral-600 grid grid-cols-5">
      <TableHead className="border border-neutral-600 align-middle p-4 col-span-1">
        Ingredients
      </TableHead>

      {recipes.map((recipe) => (
        <TableCell
          key={recipe.id}
          className="text-center border border-neutral-600"
        >
          {recipe?.ingredients && recipe.ingredients.length > 0 ? (
            recipe.ingredients.map((ingredient) => (
              <div
                key={ingredient.id}
                className="border border-neutral-600 grid grid-cols-2"
              >
                <TableCell className="col-span-1 border border-neutral-600">
                  {ingredient.quantity} {ingredient.unitOfMeasure}
                </TableCell>
                <TableCell className="col-span-1 border border-neutral-600">
                  {ingredient.name}
                </TableCell>
              </div>
            ))
          ) : (
            <TableCell></TableCell>
          )}
        </TableCell>
      ))}
    </TableRow>
  );
};

const InstructionsRow = ({ recipes }: { recipes: SafeRecipe[] }) => {
  return (
    <TableRow className="text-left align-center border border-neutral-600 grid grid-cols-5">
      <TableHead className="border border-neutral-600 align-middle p-4 col-span-1">
        Instructions
      </TableHead>

      {recipes.map((recipe) => (
        <TableCell
          key={recipe.id}
          className="text-center border border-neutral-600 flex items-start justify-center"
        >
          <ol className="m-4 flex flex-col gap-8 list-decimal">
            {recipe?.instructions && recipe.instructions.length > 0 ? (
              recipe.instructions.map((instruction, index) => (
                <li key={index} className="leading-6 text-left">
                  {instruction}
                </li>
              ))
            ) : (
              <TableCell></TableCell>
            )}
          </ol>
        </TableCell>
      ))}
    </TableRow>
  );
};

function calcTotalTime(hours = 0, min = 0) {
  const time = hours * 60 + min;
  return time > 60
    ? `${Math.floor(time / 60)} hours and ${time % 60} minutes`
    : `${time} minutes`;
}

const RecipeCompareTable: React.FC<RecipeCompareTableProps> = ({ recipes }) => {
  const colSpan = recipes.length === 1 ? 3 : recipes.length === 2 ? 2 : 1;
  return (
    <Table className="overflow-scroll">
      <TableHeading recipes={recipes} />

      <TableBody>
        <TableRow className="text-left align-center border border-neutral-600 grid grid-cols-5">
          <TableHead className="border-r border-neutral-600 align-middle p-4 col-span-1">
            Name
          </TableHead>
          {recipes.map((recipe) => (
            <TableCell
              key={recipe.id}
              className={cn(
                'border-l border-r border-neutral-600',
                `col-span-${colSpan}`
              )}
            >
              {recipe.name}
            </TableCell>
          ))}
        </TableRow>
        <TableRow className="text-left align-center border border-neutral-600 grid grid-cols-5">
          <TableHead className="border-r border-neutral-600 align-middle p-4 col-span-1">
            Rating
          </TableHead>
          {recipes.map((recipe) => (
            <TableCell
              key={recipe.id}
              className={cn(
                'border-l border-r border-neutral-600',
                `col-span-${colSpan}`
              )}
            >
              {recipe.averageRating}
            </TableCell>
          ))}
        </TableRow>
        <TableRow className="text-left align-center border border-neutral-600 grid grid-cols-5">
          <TableHead className="border-l border-r border-neutral-600 align-middle p-4 col-span-1">
            Servings
          </TableHead>
          {recipes.map((recipe) => (
            <TableCell
              key={recipe.id}
              className={cn(
                'border-l border-r border-neutral-600',
                `col-span-${colSpan}`
              )}
            >
              {recipe.servings}
            </TableCell>
          ))}
        </TableRow>
        <TableRow className="text-left align-center border border-neutral-600 grid grid-cols-5">
          <TableHead className="border-l border-r border-neutral-600 align-middle p-4 col-span-1">
            Prep Time
          </TableHead>
          {recipes.map((recipe) => (
            <TableCell
              key={recipe.id}
              className={cn(
                'border-l border-r border-neutral-600',
                `col-span-${colSpan}`
              )}
            >
              {calcTotalTime(recipe.prepHours, recipe.prepMinutes)}
            </TableCell>
          ))}
        </TableRow>
        <TableRow className="text-left align-center border border-neutral-600 grid grid-cols-5">
          <TableHead className="border-l border-r border-neutral-600 align-middle p-4 col-span-1">
            Cook Time
          </TableHead>
          {recipes.map((recipe) => (
            <TableCell
              key={recipe.id}
              className={cn(
                'border-l border-r border-neutral-600',
                `col-span-${colSpan}`
              )}
            >
              {calcTotalTime(recipe.cookHours, recipe.cookMinutes)}
            </TableCell>
          ))}
        </TableRow>
        <IngredientsRow recipes={recipes} />
        <InstructionsRow recipes={recipes} />
      </TableBody>
    </Table>
  );
};

export default RecipeCompareTable;
