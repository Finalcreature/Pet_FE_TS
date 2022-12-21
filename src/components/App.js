import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Navbar";
import ProfileSettings from "../pages/ProfileSettings";
import OwnerPets from "../pages/OwnerPets";
import PrivateRoute from "./PrivateRoute";
import Home from "../pages/Home";
import SignModal from "./SignModal";
import Search from "../pages/Search";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "../Style/App.css";
import PetContextProvider from "../libs/PetContext";

function App() {
  const [show, setShow] = useState(false);

  const onModalShow = (condition) => {
    setShow(condition);
  };

  return (
    <div>
      <PetContextProvider>
        <BrowserRouter>
          <Navbar onModalShow={onModalShow} />
          <SignModal show={show} onModalShow={onModalShow} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Search" element={<Search />} />
            <Route
              path="/Profile"
              element={
                <PrivateRoute>
                  <ProfileSettings />
                </PrivateRoute>
              }
            />
          </Routes>
        </BrowserRouter>
      </PetContextProvider>
    </div>
  );
}

export default App;
