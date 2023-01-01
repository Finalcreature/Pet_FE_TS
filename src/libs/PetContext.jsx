import React, { createContext, useContext, useState } from "react";
import axios from "axios";
import { useUserContext } from "./UserContext";
import loggedUser from "../api/loggedUser";
export const PetContext = createContext();

export const usePetContext = () => useContext(PetContext);

export default function PetContextProvider({ children }) {
  const [petList, setPetList] = useState([]);

  const { token, headerConfig } = useUserContext();

  const baseURL = "http://localhost:8080";

  // const fetchPets = async () => {
  //   try {
  //     const res = await axios.get(`${baseURL}/pets`);
  //     setPetList(res.data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const getCurrentPet = async (params) => {
    if (petList.length) {
      return petList.find((pet) => pet._id === params.id);
    }
    const petDetails = await axios.get(`${baseURL}/pets/${params.id}`);
    return petDetails.data;
  };

  const createForm = (newPet) => {
    const formData = new FormData();

    for (const key in newPet) {
      formData.append(key, newPet[key]);
    }

    return formData;
  };

  const addPet = async (newPet) => {
    console.log(newPet, "New Pet");

    // const petData = createForm();
    // const petAdded = await axios.post(`${baseURL}/pets`, petData);

    // const headerConfig = {
    //   headers: {
    //     authorization: `Bearer ${token}`,
    //   },
    // };

    // console.log(headerConfig);

    try {
      // const petAdded = loggedUser.post("pets", newPet);
      const petAdded = await axios.post(
        `${baseURL}/pets`,
        newPet,
        headerConfig
      );
      console.log(petAdded.data, "data");
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const deletePet = async (petId) => {
    // const res = await axios.delete(`${baseURL}/pets`);
    const newPetList = petList.filter((pet) => pet.id !== petId);
    setPetList(newPetList);
  };

  const savePet = (petToSave) => {
    console.log(petToSave);
  };

  const updateLocalList = async (id, status = "Available") => {
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
    setPetList([...petList]);
  };

  const adoptPet = async (petToAdopt) => {
    try {
      const changedStatus = await axios.post(
        `${baseURL}/pets/${petToAdopt.petId}/adopt`,
        petToAdopt,
        headerConfig
      );
      const { petId, petStatus } = petToAdopt;
      updateLocalList(petId, petStatus);
      console.log(changedStatus);
    } catch (error) {
      console.log(error.message);
    }
  };

  const returnPet = async (petToReturn) => {
    try {
      await axios.post(
        `${baseURL}/pets/${petToReturn.petId}/return`,
        petToReturn,
        headerConfig
      );
      updateLocalList(petToReturn.petId);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchSearchedPets = async (searchParams) => {
    let filteredParams = {};
    const params = Object.keys(searchParams);

    params.map((param) => {
      if (searchParams[param])
        filteredParams = { ...filteredParams, [param]: searchParams[param] };
    });

    const res = await axios.get(`${baseURL}/pets`, {
      params: filteredParams,
    });

    setPetList(res.data);
    return res.data;
  };

  return (
    <PetContext.Provider
      value={{
        petList,
        addPet,
        deletePet,
        fetchSearchedPets,
        getCurrentPet,
        adoptPet,
        returnPet,
        savePet,
      }}
    >
      {children}
    </PetContext.Provider>
  );
}
