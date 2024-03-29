import { useOktaAuth } from "@okta/okta-react";
import { Navigate } from "react-router-dom";
import { OktaSignInWidget } from "./OktaSignInWidget";
import { SpinnerLoading } from "../layouts/Utils/SpinnerLoading";

const LoginWidget = ({ config }) => {
  const { oktaAuth, authState } = useOktaAuth();
  const onSuccess = (tokens) => {
    oktaAuth.handleLoginRedirect(tokens);
  };

  const onError = (err) => {
    console.log("error logging in", err);
  };

  if (!authState) {
    return <SpinnerLoading />;
  }

  return (
    <>
      {!authState.isAuthenticated ? (
        <OktaSignInWidget
          config={config}
          onSuccess={onSuccess}
          onError={onError}
        />
      ) : (
        <Navigate to="/home" />
      )}
    </>
  );
};

export default LoginWidget;
