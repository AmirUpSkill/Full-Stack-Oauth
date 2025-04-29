"use client";

import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
} from "react";
import { UserDTO, fetchCurrentUser } from "@/lib/api";

export interface UserContextType {
  user: UserDTO | null;
  loading: boolean;
}

export const UserContext = createContext<UserContextType>({
  user: null,
  loading: true,
});

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<UserDTO | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadUser = async () => {
      console.log("UserProvider: Attempting to fetch current user on mount...");
      try {
        setLoading(true);
        const fetchedUser = await fetchCurrentUser();
        setUser(fetchedUser);
        console.log("UserProvider: User fetch completed.", fetchedUser);
      } catch (error) {
        console.error("UserProvider: Unexpected error during loadUser:", error);
        setUser(null);
      } finally {
        setLoading(false);
        console.log("UserProvider: Loading set to false.");
      }
    };

    loadUser();
  }, []);

  const contextValue: UserContextType = {
    user,
    loading,
  };

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};
