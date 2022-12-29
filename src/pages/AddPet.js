import React, { useState, useRef } from "react";
import { usePetContext } from "../libs/PetContext";

function AddPet() {
  const { addPet } = usePetContext();

  const petHypo = useRef();
  const petPhoto = useRef();
  const petStatus = useRef();
  const petType = useRef();

  const autoResize = (e) => {
    e.target.rows = 1;
    e.target.rows = e.target.scrollHeight / 20;
  };

  function onSubmit(e) {
    e.preventDefault();

    let petDetails = {};
    Array.from(e.target).forEach((element) => {
      if (element.tagName === "INPUT" || element.tagName === "TEXTAREA") {
        const key = element.name;
        const value = Number(element.value) || element.value;
        petDetails = { ...petDetails, [key]: value };
      }
    });

    petDetails = {
      ...petDetails,
      hypoallergenic: petHypo.current.checked,
      photo: petPhoto.current.files[0],
      status: petStatus.current.value,
      type: petType.current.value,
    };

    addPet(petDetails);
  }

  return (
    <div>
      <div className="row d-flex justify-content-center">
        <div className="col-md-6 col-xl-4">
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
              <form className="text-center" onSubmit={onSubmit}>
                <div className="mb-3">
                  <input
                    className="form-control"
                    type="text"
                    name="name"
                    placeholder="Enter name"
                    required
                  />
                </div>

                <div className="mb-3">
                  <select
                    ref={petType}
                    id="status"
                    name="status"
                    className="form-select"
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
                  />
                  <span className="input-group-text bg-secondary">kg</span>
                </div>
                <div className="mb-3">
                  <input
                    className="form-control"
                    type="text"
                    name="color"
                    placeholder="Enter color"
                  />
                </div>
                <div className="mb-3">
                  <select
                    ref={petStatus}
                    id="status"
                    name="status"
                    className="form-select"
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
                  />
                </div>
                <div className="mb-3">
                  <input
                    className="form-control"
                    type="text"
                    name="dietary"
                    placeholder="Enter Dietary restrictions"
                  />
                </div>
                <textarea
                  onChange={autoResize}
                  placeholder="Enter bio"
                  className="form-control my-3"
                  name="bio"
                ></textarea>
                <div className="mb-3">
                  <button
                    className="btn btn-primary d-block w-100"
                    type="submit"
                  >
                    Add Pet
                  </button>
                </div>
              </form>
              <div className="form-check form-switch">
                <input
                  className="form-check-input"
                  type="checkbox"
                  role="switch"
                  id="flexSwitchCheckDefault"
                  name="hypoallergenic"
                  ref={petHypo}
                />
                <label
                  className="form-check-label"
                  htmlFor="flexSwitchCheckDefault"
                >
                  Hypoallergenic
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddPet;
