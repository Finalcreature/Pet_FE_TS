import React from "react";

import { useUserContext } from "../libs/UserContext";

function Home() {
  const { userInfo } = useUserContext();
  return (
    <div className=" text-shadow ">
      <div className="text-center ">
        <h1 className="sub-header text-shadow ">
          You can look around and find your favorite pets - and if you like it
          consider logging in and add it to your collection
        </h1>
      </div>
      <div className="main-blue">
        <img
          alt="dog and cat"
          className="home-pic mt-4"
          src="https://site-547756.mozfiles.com/files/547756/DogCatFur.jpg"
        />
      </div>
      <div className="home-text d-flex flex-column mx-5">
        <h5 className=" text-center">
          {`Welcome ${
            userInfo && "firstName" in userInfo && userInfo.firstName
              ? userInfo.firstName
              : "user"
          }  - this site is for filling your life with adorable pets`}
        </h5>

        <h2>Adopt a pet today!</h2>
      </div>
    </div>
  );
}

export default Home;
