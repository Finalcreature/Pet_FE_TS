import React, { useEffect, useState } from "react";
import UserRow from "../components/UserRow";
import { useUserContext } from "../libs/UserContext";

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
      {allUsers.map((user) => {
        return <UserRow user={user} />;
      })}
    </div>
  );
}

export default Dashboard;
