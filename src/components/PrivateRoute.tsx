import React from "react";
import { Navigate } from "react-router-dom";
import { useUserContext } from "../libs/UserContext";

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { userId } = useUserContext();

  return (
    <div>
      {userId !== "" ? (
        <div>{children}</div>
      ) : (
        <h1 className="text-center"> Nothing to see here </h1>
      )}
    </div>
  );
}

export default PrivateRoute;
