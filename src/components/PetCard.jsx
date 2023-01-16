import React, { useState } from "react";
import { Card } from "react-bootstrap";
import { NavLink, Outlet } from "react-router-dom";
import { useUserContext } from "../libs/UserContext";
import seeMore from "../media/icons/see_more.svg";

function PetCard({ pet }) {
  const { savedPets, userInfo } = useUserContext();

  return (
    <div className="col">
      <Card className="w-100">
        <Card.Body
          className="d-flex align-items-end ps-3"
          style={{
            backgroundImage: `url(${pet.photo})`,
            backgroundSize: "cover",
            height: 340,
          }}
        >
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

          <footer className="d-flex  w-100 me-4 bg-white">
            <h2 className="bg-white">{pet.name}</h2>
          </footer>
          <div className="bg-light ms-5 w-50">
            <NavLink to={`/PetPage/${pet._id}`}>
              <img src={seeMore} />
            </NavLink>
          </div>
          <Outlet />
        </Card.Body>
      </Card>
    </div>
  );
}

export default PetCard;
