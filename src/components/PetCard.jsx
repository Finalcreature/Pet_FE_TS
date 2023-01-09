import React, { useState } from "react";
import { Card } from "react-bootstrap";
import { NavLink, Outlet } from "react-router-dom";
import { useUserContext } from "../libs/UserContext";

function PetCard({ pet }) {
  const { savedPets } = useUserContext();

  console.log("CARD ", savedPets);
  console.log(pet);
  return (
    <div className="col">
      <Card className="w-100">
        <Card.Header className={savedPets.includes(pet._id) && "bg-warning"}>
          <div>
            <img width={200} height={200} src={pet.photo} />
          </div>
          <div>
            <h2>{pet.name}</h2>
            <span>{pet.status.toString()}</span>
          </div>
        </Card.Header>
        <Card.Body>
          <blockquote className="blockquote mb-0">
            <p>The best pet</p>
            <footer>
              <NavLink to={`/PetPage/${pet._id}`}>See more</NavLink>
              <Outlet />
            </footer>
          </blockquote>
        </Card.Body>
      </Card>
    </div>
  );
}

export default PetCard;
