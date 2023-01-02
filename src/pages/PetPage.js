import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { usePetContext } from "../libs/PetContext";
import { useNavigate } from "react-router-dom";
import BackArrow from "../media/BackArrow.svg";
import { useUserContext } from "../libs/UserContext";

function PetPage() {
  const [petDetails, setPetDetails] = useState({});
  const { getCurrentPet, adoptPet, returnPet, savePet } = usePetContext();
  const { userId, savedPets } = useUserContext();
  const [isSaved, setIsSaved] = useState(false);

  const navigate = useNavigate();

  const params = useParams();

  console.log(isSaved);

  useEffect(() => {
    const getPetDetails = async () => {
      const details = await getCurrentPet(params);
      setPetDetails(details);
      setIsSaved(savedPets.includes(details._id));
    };
    getPetDetails();
  }, [savedPets]);

  const {
    name,
    status,
    weight,
    height,
    color,
    dietary,
    hypoallergenic,
    bio,
    breed,
    owner,
  } = petDetails;

  const onReturn = async () => {
    try {
      await returnPet({ petId: petDetails._id, userId });
      setPetDetails({ ...petDetails, status: "Available" });
    } catch (error) {
      console.log(error);
    }
  };

  const onAdopt = async (isToAdopt) => {
    console.log(isToAdopt);
    if (userId) {
      const petStatus = isToAdopt ? "Adopted" : "Fostered";
      await adoptPet({
        petId: petDetails._id,
        userId,
        petStatus,
      });
      setPetDetails({ ...petDetails, status: petStatus });
    }
  };

  const onSave = async (isToSave) => {
    try {
      console.log("User ID", userId);
      const requestDetailes = { petId: petDetails._id, userId, isToSave };
      const user = await savePet(requestDetailes);
      setIsSaved(isToSave);
    } catch (error) {
      console.log("didn't save pet");
    }
  };

  return (
    <div className="container py-4 py-xl-5">
      <span role="button" onClick={() => navigate("/search")}>
        <img src={BackArrow} />
      </span>
      <div className="row mb-5">
        <div className="col-md-8 col-xl-6 text-center mx-auto">
          <h2>{name}</h2>
          <img
            height={500}
            width={500}
            src={
              petDetails.type === "Dogs"
                ? "https://www.indiantrailanimalhospital.com/sites/default/files/styles/large/public/golden-retriever-dog-breed-info.jpg"
                : "https://i.guim.co.uk/img/media/26392d05302e02f7bf4eb143bb84c8097d09144b/446_167_3683_2210/master/3683.jpg?width=1200&quality=85&auto=format&fit=max&s=a52bbe202f57ac0f5ff7f47166906403"
            }
            alt="pet pic"
          />
        </div>
        <div className="text-center">{status}</div>
        <div>
          {status === "Available" && (
            <div>
              <button disabled={!userId} onClick={() => onAdopt(true)}>
                Adopt
              </button>
              <button disabled={!userId} onClick={() => onAdopt(false)}>
                Foster
              </button>
            </div>
          )}
          {status === "Adopted" && owner === userId && (
            <button onClick={onReturn}>Return</button>
          )}
          {status === "Fostered" && owner === userId && (
            <div>
              <button onClick={() => onAdopt(true)}>Adopt</button>
              <button onClick={onReturn}>Return</button>
            </div>
          )}
          {
            <button disabled={!userId} onClick={() => onSave(!isSaved)}>
              {!isSaved ? "Save" : "Unsave"}
            </button>
          }
        </div>

        {isSaved && <h3 className="text-center text-dark bg-warning">SAVED</h3>}
      </div>
      <div className="row gy-4 row-cols-1 row-cols-md-2 row-cols-xl-3">
        <div className="col">
          <div className="card">
            <div className="card-body p-4">
              <div className="bs-icon-md bs-icon-rounded bs-icon-primary d-flex justify-content-center align-items-center d-inline-block mb-3 bs-icon"></div>
              <h4 className="card-title">Physics</h4>
              <p className="card-text">{`Breed: ${breed}`}</p>
              <p className="card-text">{`Height: ${height} cm`}</p>
              <p className="card-text">{`Weight: ${weight} kg`}</p>
              <p className="card-text">{`Color: ${color}`}</p>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="card">
            <div className="card-body p-4">
              <div className="bs-icon-md bs-icon-rounded bs-icon-primary d-flex justify-content-center align-items-center d-inline-block mb-3 bs-icon"></div>
              <h4 className="card-title">Bio</h4>
              <p className="card-text">{`${bio}`}</p>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="card">
            <div className="card-body p-4">
              <div className="bs-icon-md bs-icon-rounded bs-icon-primary d-flex justify-content-center align-items-center d-inline-block mb-3 bs-icon"></div>
              <h4 className="card-title">Additional Information</h4>
              <p className="card-text">{`Hypoallergenic: ${
                hypoallergenic ? "Yes" : "No"
              }`}</p>
              <p className="card-text">{`Dietary restrictions: ${dietary}`}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PetPage;
