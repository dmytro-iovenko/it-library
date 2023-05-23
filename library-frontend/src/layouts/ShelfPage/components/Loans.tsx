import { useEffect, useState } from "react";
import { useOktaAuth } from "@okta/okta-react";
import { CurrentLoans } from "../../../models/CurrentLoans";
import { SpinnerLoading } from "../../Utils/SpinnerLoading";
import * as ITBooksAPI from "../../../services/itbooks-api";
import * as BooksAPI from "../../../services/books-api";

export const Loans = () => {
  const { authState } = useOktaAuth();
  const [httpError, setHttpError] = useState(null);

  // Current Loans
  const [currentLoans, setCurrentLoans] = useState<CurrentLoans[]>([]);
  const [isLoadingUserLoans, setIsLoadingUserLoans] = useState(true);
  const [isLoadingBooks, setIsLoadingBooks] = useState(true);

  useEffect(() => {
    if (authState && authState.isAuthenticated) {
      const config = {
        headers: {
          Authorization: "Bearer " + authState.accessToken?.accessToken,
          "Content-Type": "application/json",
        },
      };

      BooksAPI.getUserCurrentLoans(config)
        .then((resultData: any) => {
          console.log(resultData);
          for (const loan of resultData) {
            setCurrentLoans(resultData);
          }
        })
        .catch((error: any) => {
          setHttpError(error.message);
        });
    }
    setIsLoadingUserLoans(false);
    window.scrollTo(0, 0);
  }, [authState]);

  useEffect(() => {
    if (currentLoans) {
      for (const loan of currentLoans) {
        loan.isbn &&
          ITBooksAPI.getBookByISBN(loan.isbn)
            .then((resultData: any) => loan.book = resultData)
            .catch((error: any) => {
              setHttpError(error.message);
            });
      }
    }
    setIsLoadingBooks(false);
  }, [currentLoans]);

  if (isLoadingUserLoans || isLoadingBooks) {
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
