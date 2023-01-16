import React from "react";
import UserRow from "../components/UserRow";
import { Table } from "react-bootstrap";
import phone from "../media/icons/phone.svg";
import email from "../media/icons/email.svg";
import fullname from "../media/icons/fullname.svg";
import liked from "../media/icons/liked.svg";
import adopted from "../media/icons/adopted.svg";
import timed from "../media/icons/timed.svg";

function UsersList({ allUsers }) {
  return (
    <Table striped bordered hover>
      <thead className="text-center">
        <tr>
          <th>
            <p>Full Name</p>
            <img className="icon" src={fullname} />
          </th>
          <th>
            <p>Email</p>
            <img className="icon" src={email} />
          </th>
          <th>
            <p>Saved Pets</p>
            <img className="icon" src={liked} />
          </th>
          <th>
            <p>Fostered Pets</p>
            <img className="icon" src={timed} />
          </th>
          <th>
            <p>Adopted Pets</p>
            <img className="icon" src={adopted} />
          </th>
          <th>
            <p>Phone</p>
            <img className="icon" src={phone} />
          </th>
        </tr>
      </thead>
      <tbody>
        {allUsers.map((user) => {
          return <UserRow key={user._id} user={user} />;
        })}
      </tbody>
    </Table>
  );
}

export default UsersList;
