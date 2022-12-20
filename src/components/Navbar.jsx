import React, { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { Button } from "react-bootstrap";

function Navbar({ onModalShow }) {
  const [connected, setConnected] = useState(false);

  return (
    <div className="d-flex justify-content-center mb-5">
      <div className="navbar-bg w-75 p-3 rounded d-flex justify-content-between">
        <div>
          <NavLink
            activeclassname="active"
            to="/"
            className="text-decoration-none px-4 nav-item"
          >
            Home
          </NavLink>
          <NavLink
            activeclassname="active"
            to="/Search"
            className="text-decoration-none px-4 nav-item"
          >
            Search
          </NavLink>
          {connected && (
            <NavLink
              activeclassname="active"
              to="/ProfileSettings"
              className={"px-4 text-decoration-none nav-item"}
            >
              Profile Settings
            </NavLink>
          )}
        </div>
        <div>
          <Button
            onClick={() => onModalShow(true)}
            className={"px-4 text-decoration-none nav-item"}
          >
            Login
          </Button>
        </div>
      </div>
      <Outlet />
    </div>
  );
}

export default Navbar;
