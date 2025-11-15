import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from "../../contexts/auth";

const RequireAuth = () => {
  const { user } = useAuth();


  if (user?.email === "" || !user) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

export default RequireAuth
