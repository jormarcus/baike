declare module 'parse-ingredient' {
  export function parseIngredient(ingredients: string): {
    name: string;
    description: string;
    quantity: number;
    quantity2: number;
    unitOfMeasure: string;
    unitOfMeasureID: string;
    isGroupHeader: boolean;
  }[];
}
