import React, { createContext, useContext, useState } from "react";
import axios from "axios";
import { useEffect } from "react";

export const PetContext = createContext();

export const usePetContext = () => useContext(PetContext);

export default function PetContextProvider({ children }) {
  const [petList, setPetList] = useState([]);

  const baseURL = "http://localhost:8080";

  const fetchPets = async () => {
    try {
      const res = await axios.get(`${baseURL}/pets`);
      setPetList(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(petList);

  const addPet = (newPet) => {
    const newPetsArray = [...petList, newPet];
    setPetList(newPetsArray);
  };

  const deletePet = async (petId) => {
    // const res = await axios.delete(`${baseURL}/pets`);
    const newPetList = petList.filter((pet) => pet.id !== petId);
    setPetList(newPetList);
  };

  useEffect(() => {
    fetchPets();
  }, []);

  return (
    <PetContext.Provider value={{ petList, addPet, deletePet }}>
      {children}
    </PetContext.Provider>
  );
}
