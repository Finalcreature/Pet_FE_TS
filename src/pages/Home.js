import React from "react";
import PetForm from "../Tests/PetForm";

function Home() {
  return (
    <div className="container border ">
      <div className="text-center">
        Welcome user - this site is for filling your life with adorable pets
      </div>
      <div className="text-center">
        You can look around and find your favorite pets - and if you like it
        consider logging in and add it to your collection
      </div>

      <PetForm />
    </div>
  );
}

export default Home;
