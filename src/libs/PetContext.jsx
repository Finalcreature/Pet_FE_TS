import React, { createContext, useContext, useState } from "react";
import axios from "axios";

export const PetContext = createContext();

export const usePetContext = () => useContext(PetContext);

export default function PetContextProvider({ children }) {
  const [petList, setPetList] = useState([]);

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

    const petAdded = await axios.post(`${baseURL}/pets`, newPet);
    console.log(petAdded.data, "data");
  };

  const deletePet = async (petId) => {
    // const res = await axios.delete(`${baseURL}/pets`);
    const newPetList = petList.filter((pet) => pet.id !== petId);
    setPetList(newPetList);
  };

  const adoptPet = async (petToAdopt) => {
    console.log(petToAdopt);
    try {
      const changedStatus = await axios.post(
        `${baseURL}/pets/${petToAdopt.petId}/adopt`,
        petToAdopt
      );
      console.log(changedStatus);
    } catch (error) {
      console.log(error.message);
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
      }}
    >
      {children}
    </PetContext.Provider>
  );
}
