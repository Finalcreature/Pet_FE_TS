import React, { createContext, useContext, useState } from "react";
import axios from "axios";

export const UserContext = createContext();

export const useUserContext = () => useContext(UserContext);

export default function UserContextProvider({ children }) {
  const baseURL = "http://localhost:8080";
  const [connectedUser, setConnectedUser] = useState(null);

  const onSignUp = async (newUser) => {
    console.log(newUser);
    const userToRegister = await axios.post(`${baseURL}/user`, newUser);
    console.log(userToRegister);
  };

  return (
    <UserContext.Provider value={{ connectedUser, onSignUp }}>
      {children}
    </UserContext.Provider>
  );
}
