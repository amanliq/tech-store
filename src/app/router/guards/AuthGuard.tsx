import { useUserStore } from "@/entities/user";
import { Navigate, Outlet, useLocation } from "react-router-dom";

export const AuthGuard = () => {
  const isLoggedIn = useUserStore((state) => !!state.token);
  const location = useLocation();

  if (!isLoggedIn) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  return <Outlet />;
};
