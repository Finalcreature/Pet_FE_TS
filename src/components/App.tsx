import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./Navbar";
import PrivateRoute from "./PrivateRoute";
import PrivateRouteAdmin from "./PrivateRouteAdmin";
import ProfileSettings from "../pages/ProfileSettings";

import PetContextProvider from "../libs/PetContext";
import UserContextProvider from "../libs/UserContext";

import Home from "../pages/Home";
import SignModal from "./SignModal";
import Search from "../pages/Search";
import PetPage from "../pages/PetPage";
import AddPet from "../pages/AddPet";
import MyPets from "../pages/MyPets";
import Dashboard from "../pages/Dashboard";

import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "../Style/App.css";

function App() {
  const [show, setShow] = useState(false);

  const onModalShow = (condition: boolean) => {
    setShow(condition);
  };

  return (
    <div>
      <UserContextProvider onModalShow={onModalShow}>
        <PetContextProvider>
          <BrowserRouter>
            <Navbar onModalShow={onModalShow} />
            <SignModal show={show} onModalShow={onModalShow} />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/Search" element={<Search />} />
              <Route path="/PetPage/:id" element={<PetPage />} />
              <Route
                path="/Profile"
                element={
                  <PrivateRoute>
                    <ProfileSettings />
                  </PrivateRoute>
                }
              />
              <Route
                path="/MyPets"
                element={
                  <PrivateRoute>
                    <MyPets />
                  </PrivateRoute>
                }
              />
              <Route
                path="/AddPet"
                element={
                  <PrivateRouteAdmin>
                    <AddPet />
                  </PrivateRouteAdmin>
                }
              />
              <Route
                path="/EditPet/:id"
                element={
                  <PrivateRouteAdmin>
                    <AddPet />
                  </PrivateRouteAdmin>
                }
              />
              <Route
                path="/Dashboard"
                element={
                  <PrivateRouteAdmin>
                    <Dashboard />
                  </PrivateRouteAdmin>
                }
              />
            </Routes>
          </BrowserRouter>
        </PetContextProvider>
      </UserContextProvider>
    </div>
  );
}

export default App;
