import { Pet } from "./pet_interface";

export interface IPetContext {
  petList: Pet[];
  myPets: Pet[];
  savedPets: Pet[];
  addPet: (newPet: Pet) => Promise<string>;
  deletePet: (petId: string) => Promise<void>;
  fetchSearchedPets: (searchParams: SearchParams | {}) => Promise<Pet[]>;
  fetchOwnedPets: (id: string) => Promise<Pet[] | undefined>;
  getCurrentPet: (id: string) => Promise<Pet> | Pet;
  adoptPet: (petToAdopt: { petId: string; petStatus: string }) => Promise<void>;
  returnPet: (petToReturn: { petId: string; userId: string }) => Promise<void>;
  savePet: (petId: string) => Promise<void>;
  unsavePet: (petId: string) => Promise<void>;
  editPet: (
    petToEdit: Pet,
    existingValues: Partial<Pet>,
    id: string
  ) => Promise<void>;
}

export interface SearchParams {
  height_category: string;
  name: string;
  status: string[];
  type: string;
  weight_category: string;
}
