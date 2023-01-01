import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { callback } from "../api/loggedUser";

export const UserContext = createContext();

export const useUserContext = () => useContext(UserContext);

export default function UserContextProvider({ children }) {
  const baseURL = "http://localhost:8080";
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [connectedUser, setConnectedUser] = useState(
    localStorage.getItem("email") || ""
  );
  const [signError, setSignError] = useState({ on: false, message: "" });
  const [test, setTest] = useState(1234);

  useEffect(() => {
    callback(token);
  }, []);

  const headerConfig = {
    headers: {
      authorization: `Bearer ${token}`,
    },
  };

  console.log("UserContext connectedUser: ", connectedUser);

  console.log("Token: ", token);

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
    console.log("ONSIGNUP", newUser);
    try {
      const res = await axios.post(`${baseURL}/signUp`, newUser);
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
      setToken(res.data.token);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("email", res.data.email);
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
    setConnectedUser("");
    setToken("");
    localStorage.setItem("token", "");
    localStorage.setItem("email", "");
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
        setToken,
        token,
        headerConfig,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
