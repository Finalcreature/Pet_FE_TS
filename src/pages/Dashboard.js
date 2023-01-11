import React, { useEffect, useState } from "react";
import UserRow from "../components/UserRow";
import { useUserContext } from "../libs/UserContext";
import { Row, Col, Table, Accordion } from "react-bootstrap";
import { MDBAccordion, MDBAccordionItem } from "mdb-react-ui-kit";

function Dashboard() {
  const { getAllUsers } = useUserContext();
  const [allUsers, setAllUsers] = useState([]);
  const [activeKey, setActiveKey] = useState(null);

  console.log(allUsers);

  const getUsers = async () => {
    const users = await getAllUsers();
    setAllUsers(users);
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="container">
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Full name</th>
            <th>Email</th>
            <th>Saved Pets</th>
            <th>Forstered Pets</th>
            <th>Adopted Pets</th>
            <th>Phone</th>
          </tr>
        </thead>
        <tbody>
          {allUsers.map((user) => {
            return <UserRow key={user._id} user={user} />;
          })}
        </tbody>
      </Table>
    </div>
  );
}

export default Dashboard;
