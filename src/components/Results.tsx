import React from "react";
import { Pet } from "../interfaces/pet_interface";
import PetCard from "./PetCard";

function Results({ petList }: { petList: Pet[] }) {
  return (
    <div className="row gy-4 row-cols-1 row-cols-md-2 row-cols-xl-3">
      {petList.map((pet) => {
        return <PetCard pet={pet} key={pet._id} />;
      })}
    </div>
  );
}

export default Results;
