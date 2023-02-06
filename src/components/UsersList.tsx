import React from "react";
import UserRow from "./UserRow";
import { Table } from "react-bootstrap";
import phone from "../media/icons/phone.svg";
import email from "../media/icons/email.svg";
import fullname from "../media/icons/fullname.svg";
import liked from "../media/icons/liked.svg";
import adopted from "../media/icons/adopted.svg";
import timed from "../media/icons/timed.svg";
import { User } from "../interfaces/user_interface";

function UsersList({ allUsers }: { allUsers: User[] }) {
  return (
    <Table striped bordered hover>
      <thead className="text-center">
        <tr>
          <th>
            <p>Full Name</p>
            <img alt="fullname" className="icon" src={fullname} />
          </th>
          <th>
            <p>Email</p>
            <img alt="email" className="icon" src={email} />
          </th>
          <th>
            <p>Saved Pets</p>
            <img alt="liked" className="icon" src={liked} />
          </th>
          <th>
            <p>Fostered Pets</p>
            <img alt="timed" className="icon" src={timed} />
          </th>
          <th>
            <p>Adopted Pets</p>
            <img alt="adopted" className="icon" src={adopted} />
          </th>
          <th>
            <p>Phone</p>
            <img alt="phone" className="icon" src={phone} />
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
