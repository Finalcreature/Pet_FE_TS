import React, { createContext, useContext, useState } from "react";

export const UserContext = createContext();

export const useUserContext = () => useContext(UserContext);

export default function userContextProvider({ children }) {
  const [connectedUser, setConnectedUser] = useState(null);

  return (
    <UserContext.Provider value={{ connectedUser }}>
      {children}
    </UserContext.Provider>
  );
}
