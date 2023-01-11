import React, { useRef } from "react";
import { Row, Col, ListGroup, Spinner, Accordion } from "react-bootstrap";
import { useState } from "react";
import { usePetContext } from "../libs/PetContext";
import SeeMore from "../media/SeeMore.svg";
import { NavLink, Outlet } from "react-router-dom";

function UserRow({ user }) {
  const [showPets, setShowPets] = useState(false);
  const [userPets, setUserPets] = useState([]);
  const { fetchOwnedPets } = usePetContext();

  const [isLoading, setIsLoading] = useState(false);

  const getOwnedPets = async () => {
    setShowPets(!showPets);
    if (!showPets && !userPets.length) {
      setIsLoading(true);
      const pets = await fetchOwnedPets(user._id);

      setUserPets(pets);
      setIsLoading(false);
    }
  };

  return (
    <>
      <tr role={"button"} onClick={getOwnedPets}>
        <td>{`${user.firstName} ${user.lastName}`}</td>
        <td>{user.email}</td>
        <td>{user.saved.length}</td>
        <td>{user.fostered.length} </td>
        <td>{user.adopted.length}</td>
        <td>{user.phone}</td>
      </tr>
      <tr hidden={!showPets}>
        <td colSpan={6} className="gap-3 bg-info text-center">
          <div className="d-flex">
            {userPets.map((pet) => {
              return (
                <>
                  <NavLink
                    className="text-dark d-flex gap-3 mx-2 flex-column justify-content-between w-100"
                    to={`/PetPage/${pet._id}`}
                  >
                    <h2 className="mx-3">{pet.name}</h2>
                    <div>
                      <img height={150} width={150} src={pet.photo} />
                    </div>
                    <h4 className="mx-3">{pet.status}</h4>
                  </NavLink>
                </>
              );
            })}
          </div>
        </td>
      </tr>
    </>
  );
}

export default UserRow;
