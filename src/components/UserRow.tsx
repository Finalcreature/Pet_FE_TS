import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Spinner } from "react-bootstrap";

import { usePetContext } from "../libs/PetContext";
import { User } from "../interfaces/user_interface";
import { Pet } from "../interfaces/pet_interface";

function UserRow({ user }: { user: User }) {
  const [showPets, setShowPets] = useState(false);
  const [userPets, setUserPets] = useState<Pet[]>([]);
  const { fetchOwnedPets } = usePetContext();

  const [isLoading, setIsLoading] = useState(false);

  const getOwnedPets = async () => {
    setShowPets(!showPets);
    if (!showPets && !userPets.length) {
      setIsLoading(true);
      const pets = await fetchOwnedPets!(user._id);
      setUserPets(pets!);
      setIsLoading(false);
    }
  };

  return (
    <>
      <tr className="text-center " role={"button"} onClick={getOwnedPets}>
        <td>{`${user.firstName} ${user.lastName}`}</td>
        <td>{user.email}</td>
        <td>{user.saved.length}</td>
        <td>{user.fostered.length} </td>
        <td>{user.adopted.length}</td>
        <td>{user.phone}</td>
      </tr>
      <tr hidden={!showPets}>
        <td colSpan={6} className="gap-3 bg-info text-center">
          <Spinner hidden={!isLoading} />
          <div className="d-flex flex-wrap justify-content-around ">
            {userPets.map((pet) => {
              return (
                <div key={pet._id}>
                  <NavLink
                    className=" d-flex gap-3 mx-2 flex-column "
                    to={`/PetPage/${pet._id}`}
                  >
                    <h2 className="mx-3">{pet.name}</h2>
                    <div>
                      <img alt="pet" height={150} width={150} src={pet.photo} />
                    </div>
                    <h4 className="mx-3">{pet.status}</h4>
                  </NavLink>
                </div>
              );
            })}
          </div>
        </td>
      </tr>
    </>
  );
}

export default UserRow;
