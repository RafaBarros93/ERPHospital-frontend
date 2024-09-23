// src/context/UserContext.tsx
import { Address } from "@/interfaces/IAddress.Interfaces";
import { User } from "@/interfaces/IUser.interfaces";
import React, { createContext, useState, ReactNode } from "react";

interface UserContextProps {
  user: User;
  setUser: (user: User) => void;
  addAddress: (address: Address) => void;
}

const defaultUser: User = {
  name: "",
  email: "",
  phone: "",
  document: "",
  addresses: [],
  password: "",
};

export const UserContext = createContext<UserContextProps>({
  user: defaultUser,
  setUser: () => {},
  addAddress: () => {},
});

export const UserProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User>(defaultUser);

  // Função para adicionar um novo endereço, prevenindo duplicatas
  const addAddress = (address: Address) => {
    if (!user.addresses.includes(address)) {
      setUser({
        ...user,
        addresses: [...user.addresses, address],
      });
    }
  };

  return (
    <UserContext.Provider value={{ user, setUser, addAddress }}>
      {children}
    </UserContext.Provider>
  );
};
