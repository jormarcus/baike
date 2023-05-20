import { createContext, useContext, useState } from 'react';

import { throwContextNotInitializedError } from '@/lib/utils';
interface LoginModalContextStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const LoginModalContextProvider = createContext<LoginModalContextStore>({
  isOpen: false,
  onOpen: throwContextNotInitializedError,
  onClose: throwContextNotInitializedError,
});

export const LoginModalProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);

  return (
    <LoginModalContextProvider.Provider value={{ isOpen, onOpen, onClose }}>
      {children}
    </LoginModalContextProvider.Provider>
  );
};

export const useLoginModal = () => useContext(LoginModalContextProvider);
