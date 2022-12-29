import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { Card } from "react-bootstrap";
import { NavLink, Outlet } from "react-router-dom";

function PetCard({ pet }) {
  // const [tempPic, setTempPic] = useState("");
  console.log(pet);

  // useEffect(() => {
  //   if (pet.type === "Dogs") {
  //     const pic = axios
  //       .get("https://random.dog/woof.json")
  //       .then((res) => setTempPic(res.data.url));
  //   } else {
  //     const pic = axios
  //       .get("https://aws.random.cat/meow")
  //       .then((res) => setTempPic(res.data.file));
  //     console.log(pic);
  //   }
  // }, []);

  return (
    <div className="col">
      <Card className="w-100">
        <Card.Header>
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
