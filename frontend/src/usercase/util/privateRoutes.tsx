import { JSX } from "react";
import { Navigate } from 'react-router-dom';
import { useAuth } from "../../contexts/auth";

const RequireAuth = ({ children }: { children: JSX.Element }) => {
  const { user } = useAuth();


  if (user?.email === "" || !user) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default RequireAuth
