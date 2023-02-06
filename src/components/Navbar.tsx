import React from "react";
import { Button } from "react-bootstrap";
import { NavLink, Outlet } from "react-router-dom";
import { useUserContext } from "../libs/UserContext";

interface NavbarProps {
  onModalShow: (bool: boolean) => void;
}

const Navbar: React.FC<NavbarProps> = ({ onModalShow }) => {
  const { userId, onLogOut, userInfo } = useUserContext();

  return (
    <div className=" main-blue w-100 position-relative">
      <div className="navbar-bg w-100 d-flex justify-content-between align-items-center p-3 rounded  gap-3">
        <div>
          <NavLink
            // activeclassname="active"
            to="/"
            className="text-decoration-none px-4 nav-item fs-4"
          >
            Home
          </NavLink>
          <NavLink
            // activeclassname="active"
            to="/Search"
            className="text-decoration-none px-4 nav-item fs-4"
          >
            Search
          </NavLink>
          {/*Need to use connected && later on */}

          <NavLink
            hidden={
              (userInfo && !("is_admin" in userInfo)) ||
              (userInfo &&
                "is_admin" in userInfo &&
                userInfo.is_admin === false)
            }
            // activeclassname="active"
            to="/AddPet"
            className={"px-4 text-decoration-none nav-item fs-4"}
          >
            Add Pet
          </NavLink>
          <NavLink
            hidden={!userId}
            // activeclassname="active"
            to="/Profile"
            className={"px-4 text-decoration-none nav-item fs-4"}
          >
            Profile Settings
          </NavLink>
          <NavLink
            hidden={!userId}
            // activeclassname="active"
            to="/MyPets"
            className={"px-4 text-decoration-none nav-item fs-4"}
          >
            My Pets
          </NavLink>
          <NavLink
            hidden={
              (userInfo && !("is_admin" in userInfo)) ||
              (userInfo &&
                "is_admin" in userInfo &&
                userInfo.is_admin === false)
            }
            // activeclassname="active"
            to="/Dashboard"
            className={"px-4 text-decoration-none nav-item fs-4"}
          >
            Dashboard
          </NavLink>
        </div>
        <div>
          {!userId ? (
            <Button
              variant="none"
              onClick={() => onModalShow(true)}
              className={
                "py-2 px-3 disable-hover text-decoration-none nav-item bg-orange rounded text-light"
              }
            >
              Login
            </Button>
          ) : (
            <NavLink
              // variant="none"
              className=" py-2 px-3 fs-6 btn disable-hover text-light bg-orange rounded "
              to={"/"}
              onClick={onLogOut}
            >
              Logout
            </NavLink>
          )}
        </div>
      </div>
      <Outlet />
    </div>
  );
};

export default Navbar;
