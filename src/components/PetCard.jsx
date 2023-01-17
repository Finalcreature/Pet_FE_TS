import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { NavLink, Outlet } from "react-router-dom";
import { useUserContext } from "../libs/UserContext";
import seeMore from "../media/icons/see_more.svg";
import cat from "../media/Cat.png";
import dog from "../media/Dog.png";
import emptyHeart from "../media/icons/empty_heart.svg";
import filledHeart from "../media/icons/filled_heart.svg";
import { usePetContext } from "../libs/PetContext";

function PetCard({ pet }) {
  const { savedPets, userInfo } = useUserContext();
  const [petBanner, setPetBanner] = useState("");
  const { savePet, unsavePet } = usePetContext();
  const [isSaved, setIsSaved] = useState(false);

  const onSave = async () => {
    try {
      !isSaved ? await savePet(pet._id) : await unsavePet(pet._id);

      setIsSaved(!isSaved);
    } catch (error) {
      console.log("didn't save pet");
    }
  };

  useEffect(() => {
    if (pet.type === "Cat") setPetBanner(cat);
    else setPetBanner(dog);
    setIsSaved(savedPets.includes(pet._id));
  }, []);

  return (
    <div className="col">
      <Card className="w-100">
        {/* {Object.keys(userInfo).length ? (
          <div>
            {userInfo.adopted.includes(pet._id) && (
              <p className="bg-danger">{pet.name} is adopted by you</p>
            )}
            {userInfo.fostered.includes(pet._id) && (
              <p className="bg-info">{pet.name} is fostered by you</p>
            )}
          </div>
        ) : (
          <p></p>
        )} */}
        <div className={`corner-banner ${pet.owner && "adopted"}`}>
          <img
            className="m-md-n4 mt-lg-3 pe-lg-3"
            src={petBanner}
            alt="pet banner"
          />
        </div>
        {Object.keys(userInfo).length ? (
          <div>
            {userInfo.adopted.includes(pet._id) && (
              <div className="ribbon">
                <span className="sub-ribbon">Your pet</span>
              </div>
            )}
            {userInfo.fostered.includes(pet._id) && (
              <div className="ribbon">
                <span className="sub-ribbon main-blue">Your fostered pet</span>
              </div>
            )}
          </div>
        ) : (
          <span></span>
        )}

        <Card.Body
          className="d-flex align-items-end ps-3"
          style={{
            backgroundImage: `url(${pet.photo})`,
            backgroundSize: "cover",
            height: 340,
          }}
        >
          <footer className="d-flex justify-content-between  col-8 ">
            <h2 className="text-shadow fw-bold">{pet.name}</h2>
            <label onClick={onSave} role="button">
              <img className="icon" src={isSaved ? filledHeart : emptyHeart} />
            </label>
          </footer>
          <div className="ms-5">
            <NavLink to={`/PetPage/${pet._id}`}>
              <img className="icon" src={seeMore} />
            </NavLink>
          </div>
          <Outlet />
        </Card.Body>
      </Card>
    </div>
  );
}

export default PetCard;
