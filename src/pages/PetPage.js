import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { usePetContext } from "../libs/PetContext";
import { useNavigate } from "react-router-dom";
import BackArrow from "../media/BackArrow.svg";

function PetPage() {
  const [petDetails, setPetDetails] = useState({});
  const { getCurrentPet } = usePetContext();

  const navigate = useNavigate();

  const params = useParams();

  useEffect(() => {
    const getPetDetails = async () => {
      const details = await getCurrentPet(params);
      console.log(details);
      setPetDetails(details);
    };
    getPetDetails();
  }, []);

  const { name, status, weight, height } = petDetails;

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
      </div>
      <div className="row gy-4 row-cols-1 row-cols-md-2 row-cols-xl-3">
        <div className="col">
          <div className="card">
            <div className="card-body p-4">
              <div className="bs-icon-md bs-icon-rounded bs-icon-primary d-flex justify-content-center align-items-center d-inline-block mb-3 bs-icon"></div>
              <h4 className="card-title">Physics</h4>
              <p className="card-text">{`Breed: Golden Retriever (hardcoded)`}</p>
              <p className="card-text">{`Height: ${height}`}</p>
              <p className="card-text">{`Weight: ${weight}`}</p>
              <p className="card-text">{`Color: Brown (hardcoded)`}</p>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="card">
            <div className="card-body p-4">
              <div className="bs-icon-md bs-icon-rounded bs-icon-primary d-flex justify-content-center align-items-center d-inline-block mb-3 bs-icon"></div>
              <h4 className="card-title">Bio</h4>
              <p className="card-text">
                {`${name} is a friendly and energetic 2-year-old Golden Retriever. He
                loves nothing more than going for long walks and playing fetch
                with his favorite toys. ${name} is always up for a good belly rub
                and a snuggle on the couch. He gets along well with other dogs
                and is great with kids. In his spare time, ${name} enjoys practicing
                his agility skills and training for obedience competitions.
                Overall, ${name} is a happy and well-behaved dog who brings joy to
                everyone he meets.`}
              </p>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="card">
            <div className="card-body p-4">
              <div className="bs-icon-md bs-icon-rounded bs-icon-primary d-flex justify-content-center align-items-center d-inline-block mb-3 bs-icon"></div>
              <h4 className="card-title">Additional Information</h4>
              <p className="card-text">{`Hypoallergenic: No (hardcoded)`}</p>
              <p className="card-text">{`Dietary restrictions: N/A (hardcoded)`}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PetPage;
