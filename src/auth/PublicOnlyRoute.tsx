import type { JSX, ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

type PublicOnlyRouteProps = {
  children: ReactNode;
};

const PublicOnlyRoute = ({ children }: PublicOnlyRouteProps): JSX.Element => {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;
  if (user) return <Navigate to="/" replace />;

  return <>{children}</>;
};

export default PublicOnlyRoute;
