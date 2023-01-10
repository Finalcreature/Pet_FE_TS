import React, { useState } from "react";
import { Card } from "react-bootstrap";
import { NavLink, Outlet } from "react-router-dom";
import { useUserContext } from "../libs/UserContext";

function PetCard({ pet }) {
  const { savedPets, userInfo } = useUserContext();

  console.log(userInfo);

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
            {Object.keys(userInfo).length ? (
              <div>
                {userInfo.adopted.includes(pet._id) && (
                  <p className="bg-danger">{pet.name} is adopted by you</p>
                )}
                {userInfo.fostered.includes(pet._id) && (
                  <p className="bg-info">{pet.name} is fostered by you</p>
                )}
              </div>
            ) : (
              <p></p>
            )}

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
