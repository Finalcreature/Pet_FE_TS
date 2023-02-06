import React, { useState } from "react";

import UserForm from "../components/UserForm";
import { NewUser } from "../interfaces/user_interface";

import { useUserContext } from "../libs/UserContext";

function ProfileSettings() {
  const [changePass, setChangePass] = useState(false);
  const { updateUserInfo, onError } = useUserContext();
  const onChangePass = (isEnabled: boolean) => {
    setChangePass(isEnabled);
  };

  const onSubmit = (userInputs: Partial<NewUser>) => {
    if (userInputs.newPass !== userInputs.repassword) {
      console.log("NOT MATCH");
      onError!(400, "Passwords don't match");
      return;
    }
    updateUserInfo!(userInputs);
  };

  return (
    <div className="w-100 main-blue p-5">
      <UserForm
        changePass={changePass}
        onChangePass={onChangePass}
        OnSubmit={onSubmit}
      />
    </div>
  );
}

export default ProfileSettings;
