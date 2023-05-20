import { createContext, useContext, useState } from 'react';

import { throwContextNotInitializedError } from '@/lib/utils';
interface RegisterModalContextStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const RegisterModalContextProvider =
  createContext<RegisterModalContextStore>({
    isOpen: false,
    onOpen: throwContextNotInitializedError,
    onClose: throwContextNotInitializedError,
  });

export const RegisterModalProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);

  return (
    <RegisterModalContextProvider.Provider value={{ isOpen, onOpen, onClose }}>
      {children}
    </RegisterModalContextProvider.Provider>
  );
};

export const useRegisterModal = () => useContext(RegisterModalContextProvider);
