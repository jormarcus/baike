import { Recipe } from '@prisma/client';

export async function getRecipeById(id: string) {
  const response = await fetch(`api/recipes/${id}`);
  const recipe = await response.json();
  return recipe;
}

export async function getMyRecipes() {
  const response = await fetch(`api/recipes`);
  const recipes = await response.json();
  return recipes;
}

export async function createRecipe(recipe: Recipe) {
  const response = await fetch(`api/recipes`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ recipe }),
  });
  const createdRecipe = await response.json();
  return createdRecipe;
}

export async function updateRecipe(recipe: Recipe) {
  const response = await fetch(`api/recipes/${recipe.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ recipe }),
  });
  const updatedRecipe = await response.json();
  return updatedRecipe;
}

export async function deleteRecipe(id: string) {
  const response = await fetch(`api/recipes/${id}`, {
    method: 'DELETE',
  });
  const deletedRecipe = await response.json();
  return deletedRecipe;
}
