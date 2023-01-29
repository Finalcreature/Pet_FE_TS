import React, { useEffect, useState } from "react";

import Results from "../components/Results";

import { usePetContext } from "../libs/PetContext";
import { useUserContext } from "../libs/UserContext";

function MyPets() {
  const { myPets, savedPets, fetchOwnedPets } = usePetContext();
  const { userId } = useUserContext();
  const [isOwned, setIsOwned] = useState(true);

  async function setOwndedPets() {
    if (!myPets.length) {
      await fetchOwnedPets(userId);
    }
  }

  const setPetMode = (bool) => {
    setIsOwned(bool);
  };

  useEffect(() => {
    setOwndedPets();
  }, [isOwned]);

  return (
    <div className="container">
      <div>
        <label className="px-4" htmlFor="ownPet">
          Pet modes
        </label>
        <input
          onClick={() => setPetMode(!isOwned)}
          id="ownPet"
          type="checkbox"
        />
      </div>
      <Results petList={isOwned ? myPets : savedPets} />
    </div>
  );
}

export default MyPets;
