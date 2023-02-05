import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

export const UserContext = createContext();

export const useUserContext = () => useContext(UserContext);

export default function UserContextProvider({ children, onModalShow }) {
  const baseURL = process.env.REACT_APP_SERVER_URL;
  const [userId, setUserId] = useState(localStorage.getItem("id") || "");
  const [userInfo, setUserInfo] = useState({});
  const [savedPets, setSavedPets] = useState(
    localStorage.getItem("savedPets") || []
  );

  const [signError, setSignError] = useState({ on: false, message: "" });

  const onErrorReset = () => {
    setSignError({ on: false, message: "" });
  };

  const onError = (code, value = "") => {
    let message = "";
    if (code === 11000) {
      message = `${value} already exists`;
    } else if (code === 401) {
      if (userId) {
        message = "You've been disconnected, please login again";
      } else {
        message = "Please login to perform action";
      }
    } else {
      message = value;
    }

    setSignError({ on: true, message });
  };

  const onSignUp = async (newUser) => {
    try {
      const res = await axios.post(`${baseURL}/signUp`, newUser);
      return res.data;
    } catch (error) {
      console.log(error);
      onError(
        error.response.data.code,
        Object.keys(error.response.data.keyValue)[0]
      );
    }
  };

  const getUserDetails = async () => {
    const userToGet = await axios.get(`${baseURL}/user/${userId}`, {
      withCredentials: true,
    });
    setUserInfo(userToGet.data);
  };

  const getUserForAdmin = async (id) => {
    try {
      const userToGet = await axios.get(`${baseURL}/user/${id}/full`, {
        withCredentials: true,
      });
      return userToGet.data;
    } catch (error) {}
  };

  useEffect(() => {
    userId && getUserDetails();
  }, [userId]);

  const onSignIn = async (existingUser) => {
    try {
      const res = await axios.post(`${baseURL}/login`, existingUser, {
        withCredentials: true,
      });
      setUserId(res.data.id);
      localStorage.setItem("id", res.data.id);
      setSavedPets(res.data.saved);
      localStorage.setItem("savedPets", res.data.saved);
      return res.data;
    } catch (err) {
      if (err.response) onError(err.response.status, err.response.data);
      else onError(500, err.message);
    }
  };

  const onLogOut = async () => {
    setUserId("");
    setSavedPets([]);
    setUserInfo({});
    localStorage.clear();
    axios.delete(`${baseURL}`, { withCredentials: true });
  };

  const onCookieExpired = () => {
    onModalShow(true);
    onLogOut();
    onError(401);
  };

  const updateUser = (savedList) => {
    setSavedPets(savedList);
    localStorage.setItem("savedPets", savedList);
  };

  const updateUserInfo = async (paramsToUpdate) => {
    try {
      await axios.put(`${baseURL}/user/${userId}`, paramsToUpdate, {
        withCredentials: true,
      });
    } catch (err) {
      onError(err.response.status, err.response.message);
    }
  };

  const getAllUsers = async () => {
    const users = await axios.get(`${baseURL}/user`, { withCredentials: true });
    return users.data;
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
        savedPets,
        updateUser,
        updateUserInfo,
        getAllUsers,
        getUserDetails,
        getUserForAdmin,
        onCookieExpired,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
