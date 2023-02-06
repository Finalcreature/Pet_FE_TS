import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

import { useUserContext } from "./UserContext";
import { IPetContext, SearchParams } from "../interfaces/interface";
import { Pet } from "../interfaces/pet_interface";

export const PetContext = createContext<Partial<IPetContext>>({});

export const usePetContext = () => useContext(PetContext);

export default function PetContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [petList, setPetList] = useState<Pet[]>([]);
  const [myPets, setMyPets] = useState<Pet[]>([]);
  const [savedPets, setSavedPets] = useState<Pet[]>([]);
  const { updateUser, userId, onCookieExpired } = useUserContext();

  const baseURL = process.env.REACT_APP_SERVER_URL;
  useEffect(() => {
    if (!userId) {
      setPetList([]);
      setMyPets([]);
    }
  }, [userId]);

  const filterEditParams = (petToEdit: Pet, existingValues: Partial<Pet>) => {
    const filtered: any = {};
    for (const key in petToEdit) {
      if ((petToEdit as any)[key] !== (existingValues as any)[key])
        filtered[key] = (petToEdit as any)[key];
    }
    return filtered;
  };

  const editPet = async (
    petToEdit: Pet,
    existingValues: Partial<Pet>,
    id: string
  ) => {
    const petParams = filterEditParams(petToEdit, existingValues);
    petParams.id = id;

    const petForm = createForm(petParams);

    try {
      const res = await axios.put(`${baseURL}/pets/${id}`, petForm, {
        withCredentials: true,
      });
      console.log(res.data);
    } catch (error: any) {
      console.log(error);
      if (error.response.status === 401) onCookieExpired!();
    }
  };

  const getCurrentPet = async (id: string) => {
    if (petList.length === 0) {
      const thisPet = petList.find((pet: Pet) => pet._id === id);
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

  const createForm = (newPet: Pet) => {
    const formData = new FormData();
    for (const key in newPet) {
      formData.append(key, (newPet as any)[key]);
    }

    return formData;
  };

  const addPet = async (newPet: Pet) => {
    try {
      const petData = createForm(newPet);
      const petAdded = await axios.post(`${baseURL}/pets`, petData, {
        withCredentials: true,
      });

      return petAdded.data._id;
    } catch (error: any) {
      console.log(error.response.data);

      if (error.response.status === 401) onCookieExpired!();
      return error.response.data;
    }
  };

  const deletePet = async (petId: string) => {
    const newPetList = petList.filter((pet) => pet._id !== petId);
    setPetList(newPetList);
  };

  const savePet = async (petId: string) => {
    try {
      const savedPet = await axios.post(
        `${baseURL}/pets/${petId}/save`,
        {},
        { withCredentials: true }
      );
      fetchOwnedPets(userId!);
      updateUser!(savedPet.data.saved);
    } catch (error: any) {
      console.log(error);

      if (error.response.status === 401) onCookieExpired!();
    }
  };

  const unsavePet = async (petId: string) => {
    try {
      const unsavedPet = await axios.delete(`${baseURL}/pets/${petId}/save`, {
        withCredentials: true,
      });
      fetchOwnedPets(userId!);
      updateUser!(unsavedPet.data.saved);
    } catch (error: any) {
      console.log(error);

      if (error.response.status === 401) onCookieExpired!();
    }
  };

  const updateLocalList = async (
    id: string,
    status = "Available",
    owner = ""
  ) => {
    if (!petList?.length) {
      const newPetList = await fetchSearchedPets({});
      setPetList(newPetList);
      return;
    }
    const updatedPet = petList.find((pet: Pet) => pet._id === id);
    updatedPet!.status = status;
    updatedPet!.owner = owner;
    setPetList([...petList]);
  };

  const removeOwnedPet = (id: string) => {
    const updatedOwnedList = myPets.filter((pet: Pet) => pet._id !== id);
    setMyPets(updatedOwnedList);
  };

  const adoptPet = async (petToAdopt: { petId: string; petStatus: string }) => {
    try {
      await axios.post(
        `${baseURL}/pets/${petToAdopt.petId}/adopt`,
        petToAdopt,
        { withCredentials: true }
      );
      const { petId, petStatus } = petToAdopt;
      updateLocalList(petId, petStatus, userId);
      fetchOwnedPets(userId!);
    } catch (error: any) {
      console.log(error.message);

      if (error.response.status === 401) onCookieExpired!();
    }
  };

  const returnPet = async (petToReturn: { petId: string; userId: string }) => {
    try {
      await axios.post(
        `${baseURL}/pets/${petToReturn.petId}/return`,
        petToReturn,
        { withCredentials: true }
      );
      updateLocalList(petToReturn.petId);
      removeOwnedPet(petToReturn.petId);
    } catch (error: any) {
      console.log(error);

      if (error.response.status === 401) onCookieExpired!();
    }
  };

  const fetchSearchedPets = async (searchParams: SearchParams | {}) => {
    const filteredParams: any = {};
    const params = Object.keys(searchParams);

    params.forEach((param) => {
      if ((searchParams as any)[param])
        filteredParams[param] = (searchParams as any)[
          param as keyof SearchParams
        ];
    });

    const res = await axios.get(`${baseURL}/pets`, {
      params: filteredParams,
    });

    setPetList(res.data);
    return res.data;
  };

  const fetchOwnedPets = async (id: string) => {
    try {
      const res = await axios.get(`${baseURL}/pets/user/${id}`, {
        withCredentials: true,
      });
      const { saved, fostered, adopted } = res.data;
      const ownedPets: Pet[] = [...fostered, ...adopted];
      setMyPets(ownedPets);
      setSavedPets(saved);
      return ownedPets;
    } catch (error: any) {
      console.log(error);

      if (error.response.status === 401) onCookieExpired!();
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
        unsavePet,
        editPet,
      }}
    >
      {children}
    </PetContext.Provider>
  );
}
