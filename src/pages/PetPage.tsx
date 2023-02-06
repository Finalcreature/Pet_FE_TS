import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Pet } from "../interfaces/pet_interface";

import { usePetContext } from "../libs/PetContext";
import { useUserContext } from "../libs/UserContext";

import BackArrow from "../media/BackArrow.svg";
import emptyHeart from "../media/icons/empty_heart.svg";
import filledHeart from "../media/icons/filled_heart.svg";

function PetPage() {
  const [petDetails, setPetDetails] = useState<Pet | null>(null);
  const { getCurrentPet, adoptPet, returnPet, savePet, unsavePet } =
    usePetContext();
  const { userId, savedPets, userInfo, getUserDetails } = useUserContext();
  const [isSaved, setIsSaved] = useState(false);

  const navigate = useNavigate();

  const params = useParams();

  useEffect(() => {
    const getPetDetails = async () => {
      const details = await getCurrentPet!(params.id!);
      setPetDetails(details);
      setIsSaved(savedPets!.includes(details._id));
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
  } = petDetails!;

  const onReturn = async () => {
    try {
      if (userId) await returnPet!({ petId: petDetails!._id, userId });
      setPetDetails({ ...petDetails!, status: "Available" });
      getUserDetails!();
    } catch (error) {
      console.log(error);
    }
  };

  const onAdopt = async (isToAdopt: boolean) => {
    if (userId) {
      const petStatus = isToAdopt ? "Adopted" : "Fostered";
      await adoptPet!({
        petId: petDetails!._id,
        petStatus,
      });
      setPetDetails({ ...petDetails!, status: petStatus, owner: userId });
      getUserDetails!();
    }
  };

  const onSave = async () => {
    if (userInfo) return alert("Please login to save pet");

    try {
      !isSaved
        ? await savePet!(petDetails!._id)
        : await unsavePet!(petDetails!._id);

      setIsSaved(!isSaved);
    } catch (error) {
      console.log("didn't save pet");
    }
  };

  return (
    <div className="container py-4 py-xl-5">
      <span role="button" onClick={() => navigate(-1)}>
        <img alt="back arrow" src={BackArrow} />
      </span>
      <div className="row mb-5">
        <div className="col-md-8 col-xl-6 text-center mx-auto">
          <h1>{name}</h1>
          <img
            className="rounded"
            height={500}
            width={500}
            src={petDetails!.photo}
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
            <div className="d-flex align-items-center">
              <button onClick={onReturn}>Return</button>
            </div>
          )}
          {status === "Fostered" && owner === userId && (
            <div>
              <button onClick={() => onAdopt(true)}>Adopt</button>
              <button onClick={onReturn}>Return</button>
            </div>
          )}
          {userInfo!.is_admin && (
            <button
              onClick={() => {
                navigate(`/EditPet/${petDetails!._id}`);
              }}
            >
              Edit
            </button>
          )}
          {
            <label onClick={onSave} role="button">
              <img src={isSaved ? filledHeart : emptyHeart} />
            </label>
          }
        </div>
      </div>
      <div className="row gy-4 row-cols-1 row-cols-md-2 row-cols-xl-3">
        <div className="col">
          <div className="card">
            <div className="card-body p-4">
              <div className="bs-icon-md bs-icon-rounded bs-icon-primary d-flex justify-content-center align-items-center d-inline-block mb-3 bs-icon"></div>
              <h4 className="card-title">Physique</h4>
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
