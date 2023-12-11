'use client';

import { ChangeEvent, FormEvent, createContext } from 'react';
import { Message, useChat } from 'ai/react';
import {
  // ChatRequest,
  ChatRequestOptions,
  // FunctionCallHandler,
  // nanoid,
} from 'ai';
import toast from 'react-hot-toast';

import { throwContextNotInitializedError } from '@/lib/utils';

// const functionCallHandler: FunctionCallHandler = async (
//   chatMessages,
//   functionCall
// ) => {
//   if (functionCall.name === 'importRecipe') {
//     if (functionCall.arguments) {
//       const parsedFunctionCallArguments = JSON.parse(functionCall.arguments);
//       // You now have access to the parsed arguments here (assuming the JSON was valid)
//       // If JSON is invalid, return an appropriate message to the model so that it may retry?
//       console.log(parsedFunctionCallArguments);
//     }

//     const functionResponse: ChatRequest = {
//       messages: [
//         ...chatMessages,
//         {
//           id: nanoid(),
//           name: 'importRecipe',
//           role: 'function' as const,
//           content: functionCall.arguments || '',
//         },
//       ],
//     };
//     return functionResponse;
//   }
// };

interface ChatContextStore {
  messages: Message[];
  input: string;
  handleInputChange: (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ) => void;
  setInput: React.Dispatch<React.SetStateAction<string>>;
  handleSubmit: (
    e: FormEvent<HTMLFormElement>,
    chatRequestOptions?: ChatRequestOptions | undefined
  ) => void;
  setMessages: (messages: Message[]) => void;
  reload: (
    chatRequestOptions?: ChatRequestOptions | undefined
  ) => Promise<string | null | undefined>;
}

export const ChatContext = createContext<ChatContextStore>({
  messages: [],
  input: '',
  handleInputChange: throwContextNotInitializedError,
  setInput: throwContextNotInitializedError,
  handleSubmit: throwContextNotInitializedError,
  setMessages: throwContextNotInitializedError,
  reload: throwContextNotInitializedError,
});

export const ChatProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const {
    messages,
    input,
    handleInputChange,
    setInput,
    handleSubmit,
    setMessages,
    reload,
  } = useChat({
    // experimental_onFunctionCall: functionCallHandler,
    onResponse: (response) => {
      if (response.status === 429) {
        toast.error('You have reached your request limit for the day.');
        return;
      }
    },
  });

  return (
    <ChatContext.Provider
      value={{
        messages,
        input,
        handleInputChange,
        setInput,
        handleSubmit,
        setMessages,
        reload,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
