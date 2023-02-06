import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { IUserContext, NewUser, User } from "../interfaces/user_interface";

export const UserContext = createContext<Partial<IUserContext>>({});

export const useUserContext = () => useContext(UserContext);

export default function UserContextProvider({
  children,
  onModalShow,
}: {
  children: React.ReactNode;
  onModalShow: (condition: boolean) => void;
}) {
  const baseURL = process.env.REACT_APP_SERVER_URL;
  const [userId, setUserId] = useState<string>(
    localStorage.getItem("id") || ""
  );
  const [userInfo, setUserInfo] = useState<User | null>(null);
  const [savedPets, setSavedPets] = useState<string[] | string>(
    localStorage.getItem("savedPets") || []
  );

  const [signError, setSignError] = useState<{ on: boolean; message: string }>({
    on: false,
    message: "",
  });

  const onErrorReset = () => {
    setSignError({ on: false, message: "" });
  };

  const onError = (code: number, value = "") => {
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

  const onSignUp = async (newUser: NewUser) => {
    try {
      const res = await axios.post(`${baseURL}/signUp`, newUser);
      return res.data;
    } catch (error: any) {
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

  const getUserForAdmin = async (id: string) => {
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

  const onSignIn = async (existingUser: {
    email: string;
    password: string;
  }) => {
    try {
      const res = await axios.post(`${baseURL}/login`, existingUser, {
        withCredentials: true,
      });
      setUserId(res.data.id);
      localStorage.setItem("id", res.data.id);
      setSavedPets(res.data.saved);
      localStorage.setItem("savedPets", res.data.saved);
      console.log(res.data);
      return res.data;
    } catch (err: any) {
      if (err.response) onError(err.response.status, err.response.data);
      else onError(500, err.message);
    }
  };

  const onLogOut = async () => {
    setUserId("");
    setSavedPets([]);
    setUserInfo(null);
    localStorage.clear();
    axios.delete(`${baseURL}`, { withCredentials: true });
  };

  const onCookieExpired = () => {
    onModalShow(true);
    onLogOut();
    onError(401);
  };

  const updateUser = (savedList: string[]) => {
    setSavedPets(savedList);
    localStorage.setItem("savedPets", JSON.stringify(savedList));
  };

  const updateUserInfo = async (paramsToUpdate: object) => {
    try {
      await axios.put(`${baseURL}/user/${userId}`, paramsToUpdate, {
        withCredentials: true,
      });
    } catch (err: any) {
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
