import React, { createContext, useContext, useState } from "react";
import axios from "axios";

export const UserContext = createContext();

export const useUserContext = () => useContext(UserContext);

export default function UserContextProvider({ children }) {
  const baseURL = "http://localhost:8080";
  const [connectedUser, setConnectedUser] = useState(null);
  const [signError, setSignError] = useState({ on: false, message: "" });
  const [test, setTest] = useState(1234);

  console.log("UserContext connectedUser: ", connectedUser);

  const onErrorReset = () => {
    setSignError({ on: false, message: "" });
  };

  const onError = (code, value) => {
    let message = "";
    if (code === 11000) {
      message = `${value} already exists`;
    } else if (code === 400) {
      message = value;
    }

    setSignError({ on: true, message });
  };

  const onSignUp = async (newUser) => {
    try {
      const res = await axios.post(`${baseURL}/user`, newUser);
      setConnectedUser(res.data._id);
    } catch (error) {
      onError(
        error.response.data.code,
        Object.keys(error.response.data.keyValue)[0]
      );
    }
  };

  const onSignIn = async (existingUser) => {
    try {
      const res = await axios.post(`${baseURL}/login`, existingUser);
      setConnectedUser(res.data);
      return res.data;
    } catch ({ response }) {
      const errData = response.data;

      if (errData.code) {
        onError(errData.code, Object.keys(errData.keyValue)[0]);
        return;
      }
      onError(response.status, errData);
    }
  };

  const onLogOut = () => {
    setConnectedUser(null);
  };

  return (
    <UserContext.Provider
      value={{
        connectedUser,
        onSignUp,
        onSignIn,
        onLogOut,
        onError,
        onErrorReset,
        signError,
        test,
        setTest,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
