import React from "react";
import { useUserContext } from "../libs/UserContext";

function Home() {
  const { userInfo } = useUserContext();
  return (
    <div className="container border ">
      <div className="text-center">
        {`Welcome ${userInfo.firstName}  - this site is for filling your life with adorable pets`}
      </div>
      <div className="text-center">
        You can look around and find your favorite pets - and if you like it
        consider logging in and add it to your collection
      </div>
    </div>
  );
}

export default Home;
