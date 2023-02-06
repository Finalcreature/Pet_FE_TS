import React, { useEffect, useState } from "react";
import { Pet } from "../interfaces/pet_interface";
import { User } from "../interfaces/user_interface";
import { useUserContext } from "../libs/UserContext";

function PetRow({ pet }: { pet: Pet }) {
  const [showOwner, setShowOwner] = useState(false);

  const [owner, setOwner] = useState<User | {}>({});
  const { getUserForAdmin } = useUserContext();
  const getOwner = async () => {
    setShowOwner(!showOwner);
    console.log("_id" in owner);
    if (pet.owner && !("_id" in owner)) {
      const user = await getUserForAdmin!(pet.owner);
      console.log(user);
      setOwner(user);
    }
  };

  const shortBio =
    pet.bio.length > 100
      ? pet.bio.slice(0, 100).replace(/\w+$/, "...")
      : pet.bio;
  useEffect(() => {}, []);

  console.log(owner);

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
            {"_id" in owner ? (
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
