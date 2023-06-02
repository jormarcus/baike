import { createContext, useContext, useState } from 'react';

import { throwContextNotInitializedError } from '@/lib/utils';
interface AddRecipeModalContextStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const AddRecipeModalContextProvider =
  createContext<AddRecipeModalContextStore>({
    isOpen: false,
    onOpen: throwContextNotInitializedError,
    onClose: throwContextNotInitializedError,
  });

export const AddRecipeModalProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);

  return (
    <AddRecipeModalContextProvider.Provider value={{ isOpen, onOpen, onClose }}>
      {children}
    </AddRecipeModalContextProvider.Provider>
  );
};

export const useAddRecipeModal = () =>
  useContext(AddRecipeModalContextProvider);
