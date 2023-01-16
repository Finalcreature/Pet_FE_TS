import React from "react";

import PetRow from "./PetRow";
import { Table } from "react-bootstrap";
import phone from "../media/icons/phone.svg";
import email from "../media/icons/email.svg";
import fullname from "../media/icons/fullname.svg";
import liked from "../media/icons/liked.svg";
import adopted from "../media/icons/adopted.svg";
import timed from "../media/icons/timed.svg";

function PetsList({ allPets }) {
  return (
    <Table striped bordered hover>
      <thead className="text-center">
        <tr>
          <th>
            <p>Photo</p>
            <img className="icon" src={timed} />
          </th>
          <th>
            <p>Name</p>
            <img className="icon" src={fullname} />
          </th>
          <th>
            <p>Status</p>
            <img className="icon" src={email} />
          </th>
          <th>
            <p>Bio</p>
            <img className="icon" src={adopted} />
          </th>
          <th>
            <p>Type</p>
            <img className="icon" src={phone} />
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
