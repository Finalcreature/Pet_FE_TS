import React, { createContext, useContext, useState } from "react";
import axios from "axios";
import { useUserContext } from "./UserContext";
import loggedUser from "../api/loggedUser";
export const PetContext = createContext();

export const usePetContext = () => useContext(PetContext);

export default function PetContextProvider({ children }) {
  const [petList, setPetList] = useState([]);

  const { token, headerConfig, updateUser } = useUserContext();

  const baseURL = "http://localhost:8080";

  // const fetchPets = async () => {
  //   try {
  //     const res = await axios.get(`${baseURL}/pets`);
  //     setPetList(res.data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const filterEditParams = (petToEdit, existingValues) => {
    console.log(petToEdit);
    console.log(existingValues);
    const filtered = {};
    for (const key in petToEdit) {
      if (petToEdit[key] !== existingValues[key] && key !== "photo") {
        console.log(key, " is different");
        filtered[key] = petToEdit[key];
      }
    }

    console.log(filtered);
    return filtered;
  };

  const editPet = async (petToEdit, existingValues, id) => {
    const petParams = filterEditParams(petToEdit, existingValues);
    petParams.id = id;
    console.log("PetParams: ", petParams);
    //Change to admin axios instance when able
    const res = loggedUser.put(`/pets/${id}`, petParams);
  };

  const getCurrentPet = async (id) => {
    if (petList.length) {
      return petList.find((pet) => pet._id === id);
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

  const addPet = async (newPet) => {
    console.log(newPet, "New Pet");
    try {
      const petData = createForm(newPet);
      const petAdded = await axios.post(
        `${baseURL}/pets`,
        petData,
        headerConfig
      );

      console.log(petAdded);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const deletePet = async (petId) => {
    // const res = await axios.delete(`${baseURL}/pets`);
    const newPetList = petList.filter((pet) => pet.id !== petId);
    setPetList(newPetList);
  };

  const savePet = async (petToSave) => {
    try {
      const savedPet = await loggedUser.post(
        `pets/${petToSave.petId}/save`,
        petToSave
      );
      // const savedPet = await axios.post(
      //   `${baseURL}/pets/${petToSave.petId}/save`,
      //   petToSave,
      //   headerConfig
      // );
      console.log("After Save: ", savedPet.data.saved);
      updateUser(savedPet.data.saved);
    } catch (error) {
      console.log(error);
    }
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
        editPet,
      }}
    >
      {children}
    </PetContext.Provider>
  );
}
