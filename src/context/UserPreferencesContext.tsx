import { createContext, useContext, useEffect, useState } from 'react';
import { Allergy, Avoidance } from '@prisma/client';

import { throwContextNotInitializedError } from '@/lib/utils';
import { set } from 'date-fns';
import { ca } from 'date-fns/locale';

interface UserPreferencesContextStore {
  isNewUser: boolean;
  allergies: Allergy[];
  avoidances: Avoidance[];
  setIsNewUser: React.Dispatch<React.SetStateAction<boolean>>;
  setAllergies: React.Dispatch<React.SetStateAction<Allergy[]>>;
  setAvoidances: React.Dispatch<React.SetStateAction<Avoidance[]>>;
}

export const UserPreferencesContextProvider =
  createContext<UserPreferencesContextStore>({
    isNewUser: false,
    allergies: [],
    avoidances: [],
    setIsNewUser: throwContextNotInitializedError,
    setAllergies: throwContextNotInitializedError,
    setAvoidances: throwContextNotInitializedError,
  });

export const UserPreferencesProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [isNewUser, setIsNewUser] = useState(false);
  const [allergies, setAllergies] = useState<Allergy[]>([]);
  const [avoidances, setAvoidances] = useState<Avoidance[]>([]);

  useEffect(() => {
    const fetchAllergies = async () => {
      const response = await fetch(`/api/allergies`);
      return await response.json();
    };

    const fetchAvoidances = async () => {
      const response = await fetch(`/api/avoidances`);
      return await response.json();
    };

    Promise.all([fetchAllergies(), fetchAvoidances()])
      .then(([allergiesData, avoidancesData]) => {
        setAllergies(allergiesData);
        setAvoidances(avoidancesData);
      })
      .catch((error) => {
        console.error('Error fetching user preferences:', error);
      });
  }, []);

  return (
    <UserPreferencesContextProvider.Provider
      value={{
        isNewUser,
        setIsNewUser,
        allergies,
        avoidances,
        setAllergies,
        setAvoidances,
      }}
    >
      {children}
    </UserPreferencesContextProvider.Provider>
  );
};

export const useUserPreferences = () =>
  useContext(UserPreferencesContextProvider);
