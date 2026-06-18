import type { JSX, ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { Box, CircularProgress } from "@mui/material";
import { useAuth } from "./AuthContext";

type PublicOnlyRouteProps = {
  children: ReactNode;
};

const PublicOnlyRoute = ({ children }: PublicOnlyRouteProps): JSX.Element => {
  const { user, loading } = useAuth();

  if (loading)
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  if (user) return <Navigate to="/" replace />;

  return <>{children}</>;
};

export default PublicOnlyRoute;
