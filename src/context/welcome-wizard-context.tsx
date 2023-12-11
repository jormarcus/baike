'use client';

import { createContext, useContext, useState } from 'react';

import { throwContextNotInitializedError } from '@/lib/utils';
import { Avoidance } from '@prisma/client';
import { addAvoidancesToUser } from '@/app/_actions/user-preference-actions';
import { useUserPreferences } from './user-preferences-context';

interface WelcomeWizardContextStore {
  isOpen: boolean;
  selectedAvoidances: Avoidance[];
  setSelectedAvoidances: (selectedAvoidances: Avoidance[]) => void;
  activeStep: number;
  isNewUser: boolean;
  setIsNewUser: (isNewUser: boolean) => void;
  handleBack: () => void;
  handleNext: () => void;
  handleOpenChange: (open: boolean) => void;
  onSubmit: (data: any) => void;
}

export const WelcomeWizardContextProvider =
  createContext<WelcomeWizardContextStore>({
    isOpen: false,
    selectedAvoidances: [],
    setSelectedAvoidances: throwContextNotInitializedError,
    activeStep: 0,
    isNewUser: false,
    setIsNewUser: throwContextNotInitializedError,
    handleBack: throwContextNotInitializedError,
    handleNext: throwContextNotInitializedError,
    handleOpenChange: throwContextNotInitializedError,
    onSubmit: throwContextNotInitializedError,
  });

export const WelcomeWizardProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedAvoidances, setSelectedAvoidances] = useState<Avoidance[]>([]);
  const [activeStep, setActiveStep] = useState(0);
  const [isNewUser, setIsNewUser] = useState(false);

  const { setUserAvoidances } = useUserPreferences();

  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleOpenChange = (open: boolean) => {
    if (open) {
      onOpen();
    } else {
      onClose();
      setActiveStep(0); // wont be needed just for testing
      // we do not want to show the wizard again, if the user closes it
      setIsNewUser(false);
    }
  };

  const onSubmit = async () => {
    await addAvoidancesToUser(selectedAvoidances);
    setUserAvoidances(selectedAvoidances);
    onClose();
  };

  return (
    <WelcomeWizardContextProvider.Provider
      value={{
        isOpen,
        selectedAvoidances,
        setSelectedAvoidances,
        activeStep,
        isNewUser,
        setIsNewUser,
        handleBack,
        handleNext,
        handleOpenChange,
        onSubmit,
      }}
    >
      {children}
    </WelcomeWizardContextProvider.Provider>
  );
};

export const useWelcomeWizard = () => useContext(WelcomeWizardContextProvider);
