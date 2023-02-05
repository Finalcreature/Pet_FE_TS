import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { usePetContext } from "../libs/PetContext";

import addImage from "../media/icons/addImage.svg";
import hypoallergenic from "../media/icons/hypoallergenic.svg";
import notHypo from "../media/icons/not_hypo.svg";
import defaultPetPic from "../media/Pet_Avatar.gif";

function AddPet() {
  const { addPet, getCurrentPet, editPet } = usePetContext();
  const [editValue, setEditValue] = useState({});
  const [petPreview, setPetPreview] = useState("");
  const [isHypo, setIsHypo] = useState(false);

  const target = useRef(null);

  const petHypo = useRef();
  const petPhoto = useRef();

  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    if (params.id) {
      const getPetDetails = async () => {
        const details = await getCurrentPet(params.id);
        setEditValue(details);
      };
      getPetDetails();
    }
  }, []);

  useEffect(() => {
    const photoToSet = editValue.photo ? editValue.photo : defaultPetPic;
    setPetPreview(photoToSet);
  }, [editValue]);

  function getFormInputValues(form) {
    const addedDetails = {};
    Array.from(form.target).forEach((input) => {
      if (input.type !== "CHECKBOX" && input.tagName !== "BUTTON") {
        const key = input.name;

        const value = Number(input.value) || input.value;
        addedDetails[key] = value;
      }
      addedDetails.hypoallergenic = petHypo.current.checked;

      if (petPhoto.current.files[0]) {
        addedDetails.photo = petPhoto.current.files[0];
      }
    });
    return addedDetails;
  }

  async function onSubmit(e) {
    e.preventDefault();

    const petDetails = getFormInputValues(e);
    if (params.id) {
      editPet(petDetails, editValue, params.id);
      return;
    }

    const petId = await addPet(petDetails);
    console.log(petId);
    if (petId) return navigate("/PetPage/" + petId);
  }

  function setPreview(e) {
    const pic = URL.createObjectURL(e.target.files[0]);
    setPetPreview(pic);
  }

  if (params.id && !editValue._id) return <div>Loading...</div>;
  return (
    <div className="main-blue">
      <div className="row d-flex justify-content-center w-100">
        <div className="col-md-6 col-xl-6">
          <div className=" mb-5">
            <div className="card-body d-flex flex-column align-items-center main-blue ">
              <div className="position-relative">
                <label
                  htmlFor="petPhoto"
                  role={"button"}
                  className="avatar rounded-circle me-4 bg-light mb-3 p-5 text-light d-flex preview-pic justify-content-center align-items-center"
                  style={{
                    backgroundImage: `url(${petPreview})`,
                    backgroundSize: "cover",
                  }}
                >
                  <input
                    name="photo"
                    hidden
                    type="file"
                    id="petPhoto"
                    ref={petPhoto}
                    accept="image/png, image/jpeg"
                    onChange={setPreview}
                  />
                </label>
                <div>
                  <label htmlFor="petPhoto" role={"button"}>
                    <img
                      alt="add pic"
                      src={addImage}
                      className="icon preview-icon position-absolute"
                    />
                  </label>
                </div>
              </div>
              <form className="text-center w-100" onSubmit={onSubmit}>
                <div className="mb-4">
                  <input
                    className="form-control fs-4 py-2"
                    type="text"
                    name="name"
                    placeholder="Enter name"
                    required
                    defaultValue={editValue.name}
                  />
                </div>

                <div className="mb-4">
                  <select
                    id="type"
                    name="type"
                    className="form-select "
                    defaultValue={editValue.type}
                  >
                    <optgroup label="Type">
                      <option value={"Dog"}>Dog</option>
                      <option value={"Cat"}>Cat</option>
                    </optgroup>
                  </select>
                </div>

                <div className="input-group mb-4 ">
                  <input
                    ref={target}
                    className="form-control fs-4 py-4"
                    type="number"
                    name="height"
                    placeholder="Height"
                    max={110}
                    min={0}
                    required
                    step="0.01"
                    defaultValue={editValue.height}
                  />
                  <span className="input-group-text gray ">cm</span>
                </div>
                <div className="input-group mb-4">
                  <input
                    className="form-control fs-4 py-4"
                    type="number"
                    name="weight"
                    placeholder="Weight"
                    max={127}
                    min={0}
                    step="0.01"
                    required
                    defaultValue={editValue.weight}
                  />
                  <span className="input-group-text gray">kg</span>
                </div>
                <div className="input-group mb-4 ">
                  <input
                    className="form-control fs-4 py-4"
                    type="text"
                    name="color"
                    placeholder="Enter color"
                    defaultValue={editValue.color}
                  />
                </div>
                <div className="mb-4">
                  <select
                    id="status"
                    name="status"
                    className="form-select fs-4"
                    defaultValue={editValue.status}
                  >
                    <optgroup label="Adoption Status">
                      <option value={"Available"}>Available</option>
                      <option value={"Fostered"}>Fostered</option>
                      <option value={"Adopted"}>Adopted</option>
                    </optgroup>
                  </select>
                </div>

                <div className="mb-4">
                  <input
                    className="form-control fs-4 py-2"
                    type="text"
                    name="breed"
                    placeholder="Enter breed"
                    defaultValue={editValue.breed}
                  />
                </div>
                <div className="mb-4">
                  <input
                    className="form-control fs-4 py-2"
                    type="text"
                    name="dietary"
                    placeholder="Enter Dietary restrictions"
                    defaultValue={editValue.dietary}
                  />
                </div>
                <textarea
                  rows={6}
                  placeholder="Enter bio"
                  className="form-control border border-light px-2 my-3 "
                  name="bio"
                  defaultValue={editValue.bio}
                ></textarea>
                <div>
                  <label className="form-check-label " htmlFor="hypo">
                    <h2 className="text-light">
                      {isHypo ? "Hypoallergenic" : "Non-Hypoallergenic"}
                    </h2>
                    <div className="border border-light bg-light bg-opacity-75 d-inline-block px-4 py-3 rounded-circle">
                      <img alt="hypo" src={isHypo ? hypoallergenic : notHypo} />
                    </div>
                  </label>
                </div>
                <div className="form-check form-switch d-flex align-items-center flex-column">
                  <input
                    onChange={() => setIsHypo(!isHypo)}
                    type="checkbox"
                    hidden
                    id="hypo"
                    name="hypoallergenic"
                    ref={petHypo}
                    defaultChecked={editValue.hypoallergenic}
                  />
                </div>

                <div className="mb-4 py-3 fs-4  ">
                  <button
                    className="border-none round orange d-block w-100 text-light p-2"
                    type="submit"
                  >
                    {editValue._id ? "Edit Pet" : "Add Pet"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddPet;
