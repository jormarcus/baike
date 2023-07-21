import { ChangeEvent, FormEvent, createContext } from 'react';
import { Message, useChat } from 'ai/react';

import { throwContextNotInitializedError } from '@/lib/utils';
import { ChatRequestOptions } from 'ai';

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
  } = useChat();

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
