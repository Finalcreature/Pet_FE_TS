import React from "react";

function UserRow({ user }) {
  return (
    <div className="border border-danger">
      I am {user.firstName} {user.lastName}
      <div>I have {user.saved.length} saved pets</div>
      <div>I have {user.adopted.length} adopted pets</div>
      <div>I have {user.fostered.length} fostered pets</div>
    </div>
  );
}

export default UserRow;
