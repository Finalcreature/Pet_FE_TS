import React from "react";
import { Card } from "react-bootstrap";

function PetCard({ pet }) {
  // console.log(pet);
  return (
    <div>
      <Card className="w-50">
        <Card.Header>{pet.name}</Card.Header>
        <Card.Body>
          <blockquote className="blockquote mb-0">
            <p>The best pet</p>
            <footer></footer>
          </blockquote>
        </Card.Body>
      </Card>
    </div>
  );
}

export default PetCard;
