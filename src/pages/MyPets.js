import React, { useEffect } from "react";
import { useState } from "react";
import Results from "../components/Results";
import { usePetContext } from "../libs/PetContext";
import { useUserContext } from "../libs/UserContext";

function MyPets() {
  const { myPets, fetchOwnedPets } = usePetContext();
  const { userId, savedPets } = useUserContext();
  const [allPets, setAllPets] = useState([]);

  async function setOwndedPets() {
    if (!myPets.length) {
      const pets = await fetchOwnedPets(userId);
      console.log(pets);
      console.log(savedPets);
      //setAllPets(myPets + savedPets);
    }
  }

  useEffect(() => {
    setOwndedPets();
  }, []);

  return (
    <div className="container">
      <Results petList={myPets} />
    </div>
  );
}

export default MyPets;
