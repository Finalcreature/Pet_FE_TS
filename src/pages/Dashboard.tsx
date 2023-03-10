import React, { useEffect, useState } from "react";

import PetsList from "../components/PetsList";
import UsersList from "../components/UsersList";

import { useUserContext } from "../libs/UserContext";
import { usePetContext } from "../libs/PetContext";
import { Pet } from "../interfaces/pet_interface";
import { User } from "../interfaces/user_interface";

function Dashboard() {
  const { fetchSearchedPets } = usePetContext();
  const { getAllUsers } = useUserContext();
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [allPets, setAllPets] = useState<Pet[]>([]);

  const [isPetView, setIsPetView] = useState("Users");

  const getPets = async () => {
    const pets = await fetchSearchedPets!({});
    setAllPets(pets);
  };

  const getUsers = async () => {
    const users = await getAllUsers!();
    setAllUsers(users);
  };

  useEffect(() => {
    getUsers();
    getPets();
  }, []);

  return (
    <div className="d-flex flex-column align-items-center">
      <select
        className="form-select w-50 text-center my-2"
        onChange={(e) => setIsPetView(e.target.value)}
      >
        <option value={isPetView}>Open to select what to view</option>
        <option value="Users">Users</option>
        <option value="Pets">Pets</option>
      </select>
      <div className="container mt-3 border main-blue pt-2 rounded">
        {isPetView === "Pets" ? (
          <PetsList allPets={allPets} />
        ) : (
          <UsersList allUsers={allUsers} />
        )}
      </div>
    </div>
  );
}

export default Dashboard;
