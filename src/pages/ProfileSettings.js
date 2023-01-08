import React, { useState } from "react";
import UserForm from "../components/UserForm";
import { useUserContext } from "../libs/UserContext";

function ProfileSettings() {
  const [changePass, setChangePass] = useState(false);
  const { updateUserInfo, onError } = useUserContext();
  const onChangePass = (isEnabled) => {
    setChangePass(isEnabled);
  };

  const onSubmit = (userInputs) => {
    if (userInputs.newPass !== userInputs.repassword) {
      console.log("NOT MATCH");
      onError(400, "Passwords don't match");
      return;
    }
    console.log(userInputs);
    updateUserInfo(userInputs);
  };

  return (
    <div className="container w-75">
      <div className="">
        <UserForm
          isConnected={true}
          changePass={changePass}
          onChangePass={onChangePass}
          OnSubmit={onSubmit}
        />
      </div>
    </div>
  );
}

export default ProfileSettings;
