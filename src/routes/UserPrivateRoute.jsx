/* eslint-disable react/prop-types */
import { useContext } from "react";

import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext/AuthProvider";
import LoadingScreen from "../components/LoadingScreen";
import { toast } from "sonner";

const UserPrivateRoute = ({ children }) => {
  const { userDB, isLoading } = useContext(AuthContext);
  const location = useLocation();

  if (isLoading) {
    return <LoadingScreen />;
  }

  // console.log({ isLoading, userDB });

  if (userDB?.role === "user") {
    return children;
  }
  toast.info("Login required for access", { id: "login", duration: 8000 });
  return (
    <Navigate to="/dashboard" state={{ from: location }} replace></Navigate>
  );
};

export default UserPrivateRoute;
