import React, { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { Button } from "react-bootstrap";
import { useUserContext } from "../libs/UserContext";
import { useEffect } from "react";

function Navbar({ onModalShow }) {
  const { token, onLogOut } = useUserContext();

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
          {/*Need to use connected && later on */}

          <NavLink
            activeclassname="active"
            to="/AddPet"
            className={"px-4 text-decoration-none nav-item"}
          >
            Add Pet
          </NavLink>
          <NavLink
            activeclassname="active"
            to="/Profile"
            className={"px-4 text-decoration-none nav-item"}
          >
            Profile Settings
          </NavLink>
        </div>
        <div>
          {!token ? (
            <Button
              onClick={() => onModalShow(true)}
              className={"px-4 text-decoration-none nav-item"}
            >
              Login
            </Button>
          ) : (
            <Button onClick={onLogOut}>Logout</Button>
          )}
        </div>
      </div>
      <Outlet />
    </div>
  );
}

export default Navbar;
