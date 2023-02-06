import React from "react";
import { Table } from "react-bootstrap";
import { Pet } from "../interfaces/pet_interface";

import PetRow from "./PetRow";

// import phone from "../media/icons/phone.svg";
// import email from "../media/icons/email.svg";
// import fullname from "../media/icons/fullname.svg";
// import adopted from "../media/icons/adopted.svg";
// import timed from "../media/icons/timed.svg";

function PetsList({ allPets }: { allPets: Pet[] }) {
  return (
    <Table striped bordered hover>
      <thead className="text-center">
        <tr>
          <th>
            <p>Photo</p>
            {/* <img alt="timed" className="icon" src={timed} /> */}
          </th>
          <th>
            <p>Name</p>
            {/* <img alt="fullname" className="icon" src={fullname} /> */}
          </th>
          <th>
            <p>Status</p>
            {/* <img alt="email" className="icon" src={email} /> */}
          </th>
          <th>
            <p>Bio</p>
            {/* <img alt="adopted" className="icon" src={adopted} /> */}
          </th>
          <th>
            <p>Type</p>
            {/* <img alt="phone" className="icon" src={phone} /> */}
          </th>
        </tr>
      </thead>
      <tbody>
        {allPets.map((pet) => {
          return <PetRow key={pet._id} pet={pet} />;
        })}
      </tbody>
    </Table>
  );
}

export default PetsList;
