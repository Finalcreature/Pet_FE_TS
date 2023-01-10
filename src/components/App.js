import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Navbar";
import ProfileSettings from "../pages/ProfileSettings";
import PrivateRoute from "./PrivateRoute";
import Home from "../pages/Home";
import SignModal from "./SignModal";
import Search from "../pages/Search";
import PetPage from "../pages/PetPage";
import AddPet from "../pages/AddPet";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "../Style/App.css";
import PetContextProvider from "../libs/PetContext";
import UserContextProvider from "../libs/UserContext";
import MyPets from "../pages/MyPets";
import Dashboard from "../pages/Dashboard";

function App() {
  const [show, setShow] = useState(false);

  const onModalShow = (condition) => {
    setShow(condition);
  };

  return (
    <div>
      <UserContextProvider>
        <PetContextProvider onModalShow={onModalShow}>
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
                  <PrivateRoute>
                    <AddPet />
                  </PrivateRoute>
                }
              />
              <Route
                path="/EditPet/:id"
                element={
                  <PrivateRoute>
                    <AddPet />
                  </PrivateRoute>
                }
              />
              <Route
                path="/Dashboard"
                element={
                  <PrivateRoute>
                    <Dashboard />
                  </PrivateRoute>
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
