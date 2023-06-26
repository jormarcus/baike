import { nanoid } from 'nanoid';

export function createEmptyMessage() {
  return {
    id: nanoid(),
    isUserMessage: false,
    text: '',
  };
}
