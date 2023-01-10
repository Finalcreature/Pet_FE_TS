import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useUserContext } from "./UserContext";
export const PetContext = createContext();

export const usePetContext = () => useContext(PetContext);

export default function PetContextProvider({ children, onModalShow }) {
  const [petList, setPetList] = useState([]);
  const [myPets, setMyPets] = useState([]);
  const [savedPets, setSavedPets] = useState([]);
  const { updateUser, userId, onError, onLogOut } = useUserContext();

  const baseURL = "http://localhost:8080";
  useEffect(() => {
    if (!userId) {
      setPetList([]);
      setMyPets([]);
    }
  }, [userId]);

  // const fetchPets = async () => {
  //   try {
  //     const res = await axios.get(`${baseURL}/pets`);
  //     setPetList(res.data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const filterEditParams = (petToEdit, existingValues) => {
    const filtered = {};
    for (const key in petToEdit) {
      if (petToEdit[key] !== existingValues[key] && key !== "photo") {
        console.log(key, " is different");
        filtered[key] = petToEdit[key];
      }
    }
    return filtered;
  };

  const editPet = async (petToEdit, existingValues, id) => {
    const petParams = filterEditParams(petToEdit, existingValues);
    petParams.id = id;
    //Change to admin axios instance when able
    try {
      const res = axios.put(`${baseURL}/pets/${id}`, petParams, {
        withCredentials: true,
      });
    } catch (error) {
      console.log(error);

      if (error.response.status === 401) onCookieExpired();
    }
  };

  const getCurrentPet = async (id) => {
    if (petList.length) {
      const thisPet = petList.find((pet) => pet._id === id);
      if (thisPet) {
        return thisPet;
      } else {
        const petDetails = await axios.get(`${baseURL}/pets/${id}`);
        return petDetails.data;
      }
    }
    const petDetails = await axios.get(`${baseURL}/pets/${id}`);
    return petDetails.data;
  };

  const createForm = (newPet) => {
    const formData = new FormData();
    for (const key in newPet) {
      formData.append(key, newPet[key]);
    }

    return formData;
  };

  const onCookieExpired = () => {
    onModalShow(true);
    onLogOut();
    onError(401);
  };

  const addPet = async (newPet) => {
    try {
      const petData = createForm(newPet);
      const petAdded = await axios.post(`${baseURL}/pets`, petData, {
        withCredentials: true,
      });

      console.log(petAdded);
      return petAdded.data._id;
    } catch (error) {
      console.log(error.response.data);

      if (error.response.status === 401) onCookieExpired();
    }
  };

  const deletePet = async (petId) => {
    // const res = await axios.delete(`${baseURL}/pets`);
    const newPetList = petList.filter((pet) => pet.id !== petId);
    setPetList(newPetList);
  };

  const savePet = async (petId) => {
    try {
      const savedPet = await axios.post(
        `${baseURL}/pets/${petId}/save`,
        {},
        { withCredentials: true }
      );
      fetchOwnedPets(userId);
      updateUser(savedPet.data.saved);
    } catch (error) {
      console.log(error);

      if (error.response.status === 401) onCookieExpired();
    }
  };

  const unsavePet = async (petId) => {
    try {
      const unsavedPet = await axios.delete(`${baseURL}/pets/${petId}/save`, {
        withCredentials: true,
      });
      fetchOwnedPets(userId);
      updateUser(unsavedPet.data.saved);
    } catch (error) {
      console.log(error);

      if (error.response.status === 401) onCookieExpired();
    }
  };

  const updateLocalList = async (id, status = "Available", owner = "") => {
    if (!petList?.length) {
      const newPetList = await fetchSearchedPets({});
      console.log(newPetList);
      setPetList(newPetList);
      return;
    }
    console.log(petList);
    const updatedPet = petList.find((pet) => pet._id === id);
    console.log(updatedPet.status);
    updatedPet.status = status;
    updatedPet.owner = owner;
    setPetList([...petList]);
  };

  const removeOwnedPet = (id) => {
    const updatedOwnedList = myPets.filter((pet) => pet._id !== id);
    setMyPets(updatedOwnedList);
  };

  const adoptPet = async (petToAdopt) => {
    try {
      const changedStatus = await axios.post(
        `${baseURL}/pets/${petToAdopt.petId}/adopt`,
        petToAdopt,
        { withCredentials: true }
      );
      const { petId, petStatus } = petToAdopt;
      updateLocalList(petId, petStatus, userId);
      console.log(changedStatus);
      fetchOwnedPets(userId);
    } catch (error) {
      console.log(error.message);

      if (error.response.status === 401) onCookieExpired();
    }
  };

  const returnPet = async (petToReturn) => {
    try {
      await axios.post(
        `${baseURL}/pets/${petToReturn.petId}/return`,
        petToReturn,
        { withCredentials: true }
      );
      updateLocalList(petToReturn.petId);
      removeOwnedPet(petToReturn.petId);
    } catch (error) {
      console.log(error);

      if (error.response.status === 401) onCookieExpired();
    }
  };

  const fetchSearchedPets = async (searchParams) => {
    const filteredParams = {};
    const params = Object.keys(searchParams);

    params.map((param) => {
      if (searchParams[param]) filteredParams[param] = searchParams[param];
    });

    const res = await axios.get(`${baseURL}/pets`, {
      params: filteredParams,
    });
    setPetList(res.data);
    return res.data;
  };

  const fetchOwnedPets = async (id) => {
    try {
      const res = await axios.get(`${baseURL}/pets/user/${id}`, {
        withCredentials: true,
      });
      const { saved, fostered, adopted } = res.data;
      const ownedPets = [...fostered, ...adopted];
      setMyPets(ownedPets);
      setSavedPets(saved);
      return ownedPets;
    } catch (error) {
      console.log(error);

      if (error.response.status === 401) onCookieExpired();
    }
  };

  return (
    <PetContext.Provider
      value={{
        petList,
        myPets,
        savedPets,
        addPet,
        deletePet,
        fetchSearchedPets,
        fetchOwnedPets,
        getCurrentPet,
        adoptPet,
        returnPet,
        savePet,
        editPet,
        unsavePet,
      }}
    >
      {children}
    </PetContext.Provider>
  );
}
