import { Navigate, Outlet } from "react-router-dom";
import { useOktaAuth } from "@okta/okta-react";
import { SpinnerLoading } from "./SpinnerLoading";

export const SecureRoutes = () => {
  const { authState } = useOktaAuth();

  if (!authState) {
    return <SpinnerLoading />;
  }

  return (
    <>
      {authState && authState.isAuthenticated ? (
        <Outlet />
      ) : (
        <Navigate to="/login" />
      )}
    </>
  );
};
