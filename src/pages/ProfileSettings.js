import React, { useState } from "react";
import UserForm from "../components/UserForm";

function ProfileSettings() {
  const [changePass, setChangePass] = useState(false);

  const onChange = (isEnabled) => {
    setChangePass(isEnabled);
  };

  return (
    <div className="container w-75">
      <div className="">
        <UserForm
          isConnected={true}
          changePass={changePass}
          onChange={onChange}
        />
      </div>
    </div>
  );
}

export default ProfileSettings;
