import { ChatCompletionFunctions } from 'openai-edge/types/api';

export const functions: ChatCompletionFunctions[] = [
  {
    name: 'createRecipe',
    description: 'Creates a recipe',
    parameters: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
          description: 'Name of the recipe',
        },
        authorId: {
          type: 'number',
          description: 'Author ID of the recipe',
        },
        imageSrc: {
          type: 'string',
          description: 'Image source of the recipe',
        },
        url: {
          type: 'string',
          description: 'URL of the recipe',
        },
        description: {
          type: 'string',
          description: 'Description of the recipe',
        },
        averageRating: {
          type: 'number',
          description: 'Rating of the recipe',
        },
        servings: {
          type: 'number',
          description: 'Servings of the recipe',
        },
        prepHours: {
          type: 'number',
          description: 'Total amount of hours of prep of the recipe',
        },
        prepMinutes: {
          type: 'number',
          description: 'Total amount of minutes of prep of the recipe',
        },
        cookHours: {
          type: 'number',
          description: 'Total amount of hours of cooking of the recipe',
        },
        cookMinutes: {
          type: 'number',
          description: 'Total amount of minutes of cooking of the recipe',
        },
        ingredients: {
          type: 'array',
          description: 'Recipe ingredients',
          items: {
            type: 'object',
            properties: {
              name: {
                type: 'string',
                description: 'Name of the ingredient e.g. "flour"',
              },
              quantity: {
                type: 'number',
                description:
                  'The primary quantity (the lower quantity in a range, if applicable)',
              },
              quantity2: {
                type: 'number',
                description:
                  'The secondary quantity (the upper quantity in a range, or `null` if not applicable)',
              },
              unitOfMeasure: {
                type: 'string',
                description: 'The unit of measure e.g. "cups", "teaspoons"',
              },
              unitOfMeasureID: {
                type: 'string',
                description: 'The unit of measure identifier e.g. "cup", "tsp"',
              },
              input: {
                type: 'string',
                description:
                  'Input of the ingredient, with the quantity, unit of measure, and name e.g. "1 cup of flour"',
              },
              isGroupHeader: {
                type: 'boolean',
                description:
                  'Whether the "ingredient" is actually a group header, e.g. "For icing:"',
              },
            },
            required: ['name', 'input'],
          },
        },
        instructions: {
          type: 'array',
          description: 'Instructions of the recipe',
          items: {
            type: 'string',
          },
        },
        notes: {
          type: 'string',
          description: 'Notes of the recipe',
        },
      },
      required: ['name'],
    },
  },
];
