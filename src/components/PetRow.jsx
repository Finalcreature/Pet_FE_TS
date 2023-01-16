import React, { useEffect, useState } from "react";
import { useUserContext } from "../libs/UserContext";

function PetRow({ pet }) {
  const [showOwner, setShowOwner] = useState(false);
  // const [isLoading, setIsLoading] = useState(false);

  const [owner, setOwner] = useState({});
  const { getUserForAdmin } = useUserContext();
  const getOwner = async () => {
    setShowOwner(!showOwner);
    if (pet.owner && !owner._id) {
      const user = await getUserForAdmin(pet.owner);
      setOwner(user);
      console.log(user);
    }
  };

  // console.log(pet.bio.length);

  // console.log(shortBio);

  const shortBio = pet.bio.slice(0, 100) + "...";
  useEffect(() => {}, []);

  return (
    <>
      <tr className="text-center " role={"button"} onClick={getOwner}>
        <td>
          <img width={100} height={100} src={pet.photo} alt="" />
        </td>
        <td>{pet.name}</td>
        <td>{pet.status} </td>
        <td>{shortBio}</td>
        <td>{pet.type}</td>
      </tr>
      <tr hidden={!showOwner}>
        <td colSpan={6} className="gap-3 bg-light text-center text-dark">
          <div className="d-flex flex-wrap justify-content-around flex-column ">
            {owner._id ? (
              <div>
                <h1>OWNER</h1>
                <h2 className="mx-3">{owner.firstName}</h2>
                <h4 className="mx-3">{owner.email}</h4>
                <h4 className="mx-3">{owner.phone}</h4>
              </div>
            ) : (
              <h1>No Owner</h1>
            )}
          </div>
        </td>
      </tr>
    </>
  );
}

export default PetRow;
