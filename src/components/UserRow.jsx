import React, { useRef } from "react";
import { Row, Col, ListGroup, Spinner } from "react-bootstrap";
import { useState } from "react";
import { usePetContext } from "../libs/PetContext";
import SeeMore from "../media/SeeMore.svg";
import { NavLink, Outlet } from "react-router-dom";

function UserRow({ user }) {
  const [showPets, setShowPets] = useState(false);
  const [userPets, setUserPets] = useState([]);
  const { fetchOwnedPets } = usePetContext();

  const [isLoading, setIsLoading] = useState(false);

  const getOwnedPets = async () => {
    setShowPets(!showPets);
    if (!showPets && !userPets.length) {
      setIsLoading(true);
      const pets = await fetchOwnedPets(user._id);
      setUserPets(pets);
      setIsLoading(false);
    }
  };

  console.log(showPets);

  return (
    <div>
      <Row>
        <Col xs={1} className="border-top-0 border border-3 border-dark">
          {user.firstName}
        </Col>
        <Col
          className="border-top-0 border-start-0 border border-3 border-dark"
          xs={1}
        >
          {user.lastName}
        </Col>
        <Col
          className="border-top-0 border-start-0 border border-3 border-dark"
          xs={2}
        >
          {user.email}
        </Col>
        <Col>{user.saved.length}</Col>
        <Col>{user.fostered.length} </Col>
        <Col>{user.adopted.length}</Col>
        <Col>{user.phone}</Col>
        <Col>
          <button onClick={getOwnedPets}>Owned pets</button>
        </Col>
      </Row>
      <div className="d-flex justify-content-center">
        <ListGroup className=" mt-3 mb-5 " hidden={!showPets} variant="flush">
          <Row className="text-light bg-dark text-center">
            <Col>
              <b>Name</b>
            </Col>
            <Col>
              <b>Status</b>
            </Col>
            <Col>
              <b>See More</b>
            </Col>

            {userPets.map((pet) => {
              return (
                <ListGroup.Item
                  className="mt-2 p-0 border border-dark border-5"
                  key={pet._id}
                >
                  <Row className="m-0">
                    <Col className="border-dark border-5 border-end">
                      {pet.name}
                    </Col>
                    <Col className="bg-info border-dark border-5 border-end">
                      {pet.status}
                    </Col>
                    <Col className="bg-primary">
                      <NavLink to={`/PetPage/${pet._id}`}>
                        <img width={40} height={40} src={SeeMore} alt="" />
                      </NavLink>
                      <Outlet />
                    </Col>
                  </Row>
                </ListGroup.Item>
              );
            })}
          </Row>
          {isLoading && <Spinner />}
        </ListGroup>
      </div>
    </div>
  );
}

export default UserRow;
