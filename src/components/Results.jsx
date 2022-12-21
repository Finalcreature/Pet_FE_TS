import React from "react";
import { usePetContext } from "../libs/PetContext";
import PetCard from "./PetCard";

function Results() {
  const { petList } = usePetContext();

  return (
    <div>
      {petList.map((pet) => {
        return <PetCard pet={pet} key={pet.id} />;
      })}
    </div>
  );
}

export default Results;
