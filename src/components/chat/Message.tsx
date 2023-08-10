'use client';

import MarkdownLite from './MarkdownLite';
import { Message } from 'ai';
import RecipeTrayCard from './RecipeTrayCard';
interface MessageProps {
  message: Message;
}

const Message: React.FC<MessageProps> = ({ message }) => {
  let recipe;
  if (message.function_call && typeof message.function_call !== 'string') {
    recipe = message.function_call.arguments;
    console.log('recipeData: ', recipe);
  }

  // console.log('functionCallString: ', functionCallString);

  if (message.role === 'assistant' && message.function_call) {
    console.log('assistant message: ', message);
  }
  if (message.role === 'function') {
    console.log('function message: ', message);
  }

  if (message.content === undefined) return null;

  return (
    <div>
      {recipe ? (
        <RecipeTrayCard recipe={JSON.parse(recipe)} />
      ) : (
        <div
          className={`flex items-center justify-between w-auto px-4 py-2 dark:text-neutral-200 max-w-xl rounded-3xl
    ${
      message.role === 'user'
        ? 'dark:bg-amber-500 dark:text-white self-end'
        : 'dark:bg-neutral-900 text-neutral-300 self-start'
    }
    `}
        >
          <div>
            <MarkdownLite text={message.content} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Message;
