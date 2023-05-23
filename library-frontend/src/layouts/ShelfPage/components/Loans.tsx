import { useEffect, useState } from "react";
import { useOktaAuth } from "@okta/okta-react";
import { CurrentLoans } from "../../../models/CurrentLoans";
import { SpinnerLoading } from "../../Utils/SpinnerLoading";
import * as BooksAPI from "../../../services/books-api";

export const Loans = () => {
  const { authState } = useOktaAuth();
  const [httpError, setHttpError] = useState(null);

  // Current Loans
  const [currentLoans, setCurrentLoans] = useState<CurrentLoans[]>([]);
  const [isLoadingUserLoans, setIsLoadingUserLoans] = useState(true);

  useEffect(() => {
    if (authState && authState.isAuthenticated) {
      const config = {
        headers: {
          Authorization: "Bearer " + authState.accessToken?.accessToken,
          "Content-Type": "application/json",
        },
      };

      BooksAPI.getUserCurrentLoansCount(config)
        .then((resultData: any) => console.log(resultData))
        .catch((error: any) => {
          setHttpError(error.message);
        });
    }
    setIsLoadingUserLoans(false);
  }, [authState]);


  if (isLoadingUserLoans) {
    return <SpinnerLoading />;
  }

  if (httpError) {
    return (
      <div className="container m-5">
        <p>{httpError}</p>
      </div>
    );
  }

  return <div>Current Loans</div>;
};
