import { Navigate } from "react-router-dom";
import { useOktaAuth } from "@okta/okta-react";

export const AdminPage = () => {
  const { authState } = useOktaAuth();

  return (
    <>
      {authState?.accessToken?.claims.userType === undefined ? (
        <Navigate to="/home" />
      ) : (
        <div className="container">
          <div className="mt-5">
            <h3>Manage Library</h3>
            <nav>
              <div className="nav nav-tabs" id="nav-tab" role="tablist">
                <button
                  className="nav-link active"
                  id="nav-messages-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#nav-messages"
                  type="button"
                  role="tab"
                  aria-controls="nav-messages"
                  aria-selected="false"
                >
                  Messages
                </button>
              </div>
            </nav>
            <div
              className="tab-pane fade show active"
              id="nav-messages"
              role="tabpanel"
              aria-labelledby="nav-messages-tab"
            >
              <p>AdminMessages</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
