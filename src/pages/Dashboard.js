import React, { useEffect, useState } from "react";
import UserRow from "../components/UserRow";
import { useUserContext } from "../libs/UserContext";
import { Row, Col } from "react-bootstrap";

function Dashboard() {
  const { getAllUsers } = useUserContext();
  const [allUsers, setAllUsers] = useState([]);

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
      <Row>
        <Col
          xs={1}
          className="bg-secondary ps-0 text-center border-top-0 border border-3 border-dark "
        >
          <b> First Name</b>
        </Col>
        <Col
          className="bg-secondary ps-0 text-center border-top-0 border-start-0 border border-3 border-dark"
          xs={1}
        >
          <b>Last Name</b>
        </Col>
        <Col
          xs={2}
          className="bg-secondary ps-0 text-center border-start-0 border-top-0 border border-3 border-dark "
        >
          <b>Email</b>
        </Col>
        <Col>
          <b>Saved Pets</b>
        </Col>
        <Col>
          <b>Forstered Pets</b>
        </Col>
        <Col>
          <b>Adopted Pets</b>
        </Col>
        <Col>
          <b>Phone</b>
        </Col>
        <Col>
          <b>Show Pets</b>
        </Col>
      </Row>
      {allUsers.map((user) => {
        return <UserRow key={user._id} user={user} />;
      })}
    </div>
  );
}

export default Dashboard;
