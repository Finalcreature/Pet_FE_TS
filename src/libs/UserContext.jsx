import React, { createContext, useContext, useState } from "react";
import axios from "axios";
import loggedUser from "../api/loggedUser";

export const UserContext = createContext();

export const useUserContext = () => useContext(UserContext);

export default function UserContextProvider({ children }) {
  const baseURL = "http://localhost:8080";
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [userId, setUserId] = useState(localStorage.getItem("id") || "");
  const [userInfo, setUserInfo] = useState({});
  const [savedPets, setSavedPets] = useState(
    localStorage.getItem("savedPets") || []
  );
  const [signError, setSignError] = useState({ on: false, message: "" });

  const headerConfig = {
    headers: {
      authorization: `Bearer ${token}`,
    },
  };

  console.log("Saved", savedPets);

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
      setUserId(res.data._id);
      return res.data;
    } catch (error) {
      console.log(error);
      onError(
        error.response.data.code,
        Object.keys(error.response.data.keyValue)[0]
      );
    }
  };

  const onSignIn = async (existingUser) => {
    try {
      const res = await axios.post(`${baseURL}/login`, existingUser);
      console.log(res.data);
      setUserId(res.data.id);
      localStorage.setItem("id", res.data.id);
      setToken(res.data.token);
      localStorage.setItem("token", res.data.token);
      setSavedPets(res.data.saved);
      localStorage.setItem("savedPets", res.data.saved);

      const userToGet = await loggedUser.get(`/user/${res.data.id}`);

      setUserInfo(userToGet.data);
      return res.data;
    } catch ({ response }) {
      const errData = response.data;
      // console.log(response);
      // if (errData.code) {
      //   onError(errData.code, Object.keys(errData.keyValue)[0]);
      //   return;
      // }
      onError(response.status, response.data);
    }
  };

  const onLogOut = () => {
    setUserId("");
    setToken("");
    setSavedPets([]);
    setUserInfo({});
    localStorage.clear();
    console.log("Cleared");
  };

  const updateUser = (savedList) => {
    console.log(savedList);
    setSavedPets(savedList);
    localStorage.setItem("savedPets", savedList);
  };

  return (
    <UserContext.Provider
      value={{
        userId,
        userInfo,
        onSignUp,
        onSignIn,
        onLogOut,
        onError,
        onErrorReset,
        signError,
        setToken,
        token,
        headerConfig,
        savedPets,
        updateUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
