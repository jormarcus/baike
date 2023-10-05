'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { Avoidance } from '@prisma/client';

import { throwContextNotInitializedError } from '@/lib/utils';

interface UserPreferencesContextStore {
  userAvoidances: Avoidance[];
  setUserAvoidances: React.Dispatch<React.SetStateAction<Avoidance[]>>;
}

export const UserPreferencesContextProvider =
  createContext<UserPreferencesContextStore>({
    userAvoidances: [],
    setUserAvoidances: throwContextNotInitializedError,
  });

export const UserPreferencesProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [userAvoidances, setUserAvoidances] = useState<Avoidance[]>([]);

  useEffect(() => {
    const fetchAvoidances = async () => {
      const response = await fetch(`/api/avoidances`);
      const avoidancesData = await response.json();
      setUserAvoidances(avoidancesData);
    };

    fetchAvoidances();
  }, []);

  return (
    <UserPreferencesContextProvider.Provider
      value={{
        userAvoidances,
        setUserAvoidances,
      }}
    >
      {children}
    </UserPreferencesContextProvider.Provider>
  );
};

export const useUserPreferences = () =>
  useContext(UserPreferencesContextProvider);
