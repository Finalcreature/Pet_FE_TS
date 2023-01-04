import React, { useEffect } from "react";
import Results from "../components/Results";
import { usePetContext } from "../libs/PetContext";
import { useUserContext } from "../libs/UserContext";

function MyPets() {
  const { myPets, fetchOwnedPets } = usePetContext();
  const { userId } = useUserContext();

  useEffect(() => {
    if (!myPets.length) {
      fetchOwnedPets(userId);
    }
  }, []);

  return (
    <div className="container">
      <Results petList={myPets} />
    </div>
  );
}

export default MyPets;
