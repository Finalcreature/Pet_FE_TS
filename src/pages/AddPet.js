import React, { useState, useRef } from "react";

function AddPet() {
  const [petDetails, setPetDetails] = useState({});

  //Need to set the refs and set all the pets that will be send to the backend
  const petHypo = useRef();
  const petPhoto = useRef();

  const autoResize = (e) => {
    e.target.rows = 1;
    e.target.rows = e.target.scrollHeight / 20;
  };

  function onSubmit(e) {
    e.preventDefault();
    console.log(e.target);

    let userDetails = {};
    Array.from(e.target).forEach((element) => {
      if (element.tagName === "INPUT") {
        const key = element.name;
        const value = element.value;
        userDetails = { ...userDetails, [key]: value };
      }
    });
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
                <input hidden className="my-2" type="file" id="petPhoto" />
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
                </div>
                <div className="mb-3">
                  <input
                    className="form-control"
                    type="number"
                    name="weight"
                    placeholder="Weight"
                    min={0}
                    step="0.01"
                    required
                  />
                </div>
                <div className="mb-3">
                  <input
                    className="form-control"
                    type="text"
                    name="color"
                    placeholder="Enter color"
                    required
                  />
                </div>

                <div className="mb-3">
                  <input
                    className="form-control"
                    type="text"
                    name="dietary restrictions"
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
