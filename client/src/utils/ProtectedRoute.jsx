import React, { useContext, useState } from "react";
import { QuizzieContext } from "../App";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ Component }) => {
  const [token] = useState(localStorage.getItem("token"));
  const { isLoggedIn } = useContext(QuizzieContext);
  const [userLoggedIn] = useState(!!token && !isLoggedIn);

  return (
    <div>
      {userLoggedIn ? (
        Component && <Component />
      ) : (
        !Component && <Navigate to="/" />
      )}
    </div>
  );
};

export default ProtectedRoute;
