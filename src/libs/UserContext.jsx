import React, { createContext, useContext, useState } from "react";
import axios from "axios";

export const UserContext = createContext();

export const useUserContext = () => useContext(UserContext);

export default function UserContextProvider({ children }) {
  const baseURL = "http://localhost:8080";
  const [connectedUser, setConnectedUser] = useState(null);
  const [signError, setSignError] = useState({ on: false, message: "" });

  console.log("UserContext connectedUser: ", connectedUser);

  const onErrorReset = () => {
    setSignError({ on: false, message: "" });
  };

  const onError = (code, value) => {
    console.log("onError ", code, value);
    let message = "";
    if (code === 11000) {
      message = `${value} already exists`;
    } else if (code === 400) {
      message = value;
    }

    setSignError({ on: true, message });
  };

  const onSignUp = async (newUser) => {
    console.log(newUser);
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
    console.log("onSignIn ", existingUser);
    try {
      const res = await axios.post(`${baseURL}/login`, existingUser);
      console.log(res.data);
    } catch ({ response }) {
      const errData = response.data;

      if (errData.code) {
        onError(errData.code, Object.keys(errData.keyValue)[0]);
        return;
      }
      onError(response.status, errData);
    }
  };

  return (
    <UserContext.Provider
      value={{
        connectedUser,
        onSignUp,
        onSignIn,
        signError,
        onErrorReset,
        onError,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
