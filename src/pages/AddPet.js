import React, { useState, useRef, useEffect } from "react";
import { usePetContext } from "../libs/PetContext";
import { useNavigate, useParams } from "react-router-dom";

function AddPet() {
  const { addPet, getCurrentPet, editPet } = usePetContext();
  const [editValue, setEditValue] = useState({});

  console.log(editValue);

  const petHypo = useRef();
  const petPhoto = useRef();

  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    console.log(params.id);
    if (params.id) {
      const getPetDetails = async () => {
        const details = await getCurrentPet(params.id);
        setEditValue(details);
        console.log(details);
      };
      getPetDetails();
    }
  }, []);

  function getFormInputValues(form) {
    const addedDetails = {};
    Array.from(form.target).forEach((input) => {
      if (input.type !== "CHECKBOX" && input.tagName !== "BUTTON") {
        const key = input.name;
        console.log(key === "");
        const value = Number(input.value) || input.value;
        addedDetails[key] = value;
      }
      addedDetails.hypoallergenic = petHypo.current.checked;
      addedDetails.photo = petPhoto.current.files[0];
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
    navigate("/PetPage/" + petId);
  }

  if (params.id && !editValue._id) return <div>Loading...</div>;
  return (
    <div>
      <div className="row d-flex justify-content-center">
        <div className="col-md-6 col-xl-6">
          <div className="card mb-5">
            <div className="card-body d-flex flex-column align-items-center">
              <label
                htmlFor="petPhoto"
                role={"button"}
                className="avatar rounded-circle me-4 bg-primary mb-3 p-5 text-light"
              >
                Upload pet img
                <input
                  name="photo"
                  hidden
                  className="my-2"
                  type="file"
                  id="petPhoto"
                  ref={petPhoto}
                  accept="image/png, image/jpeg"
                />
              </label>
              <form className="text-center w-100" onSubmit={onSubmit}>
                <div className="mb-3">
                  <input
                    className="form-control"
                    type="text"
                    name="name"
                    placeholder="Enter name"
                    required
                    defaultValue={editValue.name}
                  />
                </div>

                <div className="mb-3">
                  <select
                    id="type"
                    name="type"
                    className="form-select"
                    defaultValue={editValue.type}
                  >
                    <optgroup label="Type">
                      <option value={"Dogs"}>Dog</option>
                      <option value={"Cats"}>Cat</option>
                      <option value={"Rabbits"}>Rabbit</option>
                    </optgroup>
                  </select>
                </div>

                <div className="input-group mb-3">
                  <input
                    className="form-control"
                    type="number"
                    name="height"
                    placeholder="Height"
                    max={110}
                    min={0}
                    required
                    step="0.01"
                    defaultValue={editValue.height}
                  />
                  <span className="input-group-text bg-secondary">cm</span>
                </div>
                <div className="input-group mb-3">
                  <input
                    className="form-control"
                    type="number"
                    name="weight"
                    placeholder="Weight"
                    min={0}
                    step="0.01"
                    required
                    defaultValue={editValue.weight}
                  />
                  <span className="input-group-text bg-secondary">kg</span>
                </div>
                <div className="mb-3">
                  <input
                    className="form-control"
                    type="text"
                    name="color"
                    placeholder="Enter color"
                    defaultValue={editValue.color}
                  />
                </div>
                <div className="mb-3">
                  <select
                    id="status"
                    name="status"
                    className="form-select"
                    defaultValue={editValue.status}
                  >
                    <optgroup label="Adoption Status">
                      <option value={"Available"}>Available</option>
                      <option value={"Fostered"}>Fostered</option>
                      <option value={"Adopted"}>Adopted</option>
                    </optgroup>
                  </select>
                </div>

                <div className="mb-3">
                  <input
                    className="form-control"
                    type="text"
                    name="breed"
                    placeholder="Enter breed"
                    defaultValue={editValue.breed}
                  />
                </div>
                <div className="mb-3">
                  <input
                    className="form-control"
                    type="text"
                    name="dietary"
                    placeholder="Enter Dietary restrictions"
                    defaultValue={editValue.dietary}
                  />
                </div>
                <textarea
                  rows={6}
                  placeholder="Enter bio"
                  className="form-control my-3"
                  name="bio"
                  defaultValue={editValue.bio}
                ></textarea>
                <div className="form-check form-switch">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    role="switch"
                    id="flexSwitchCheckDefault"
                    name="hypoallergenic"
                    ref={petHypo}
                    defaultChecked={editValue.hypoallergenic}
                  />
                  <label
                    className="form-check-label"
                    htmlFor="flexSwitchCheckDefault"
                  >
                    Hypoallergenic
                  </label>
                </div>
                <div className="mb-3">
                  <button
                    className="btn btn-primary d-block w-100"
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
