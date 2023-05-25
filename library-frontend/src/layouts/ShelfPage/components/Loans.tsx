import { useEffect, useState } from "react";
import { useOktaAuth } from "@okta/okta-react";
import { CurrentLoans } from "../../../models/CurrentLoans";
import { SpinnerLoading } from "../../Utils/SpinnerLoading";
import * as ITBooksAPI from "../../../services/itbooks-api";
import * as BooksAPI from "../../../services/books-api";
import { Link } from "react-router-dom";
import { LoansModal } from "./LoansModal";

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
          for (const loan of resultData) {
            loan.isbn &&
              ITBooksAPI.getBookByISBN(loan.isbn)
                .then((resultData: any) =>
                  setCurrentLoans((prev) =>
                    !prev.find((value) => value.isbn === loan.isbn)
                      ? [...prev, { ...loan, book: resultData }]
                      : prev
                  )
                )
                .then(() => setIsLoadingBooks(false))
                .catch((error: any) => {
                  setHttpError(error.message);
                  setIsLoadingBooks(false);
                });
          }
        })
        .then(() => setIsLoadingUserLoans(false))
        .catch((error: any) => {
          setHttpError(error.message);
          setIsLoadingUserLoans(false);
        });
    }
    window.scrollTo(0, 0);
  }, [authState]);

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

  const returnBook = (isbn: string) => {

  }

  const renewLoan = (isbn: string) => {
    
  }

  return (
    <div>
      {/* Desktop */}
      <div className="d-none d-lg-block mt-2">
        {currentLoans.length > 0 ? (
          <>
            <h5>Current Loans: </h5>
            {currentLoans.map((currentLoan) => (
              <div key={currentLoan.isbn}>
                <div className="row mt-3 mb-3">
                  <div className="col-4 col-md-4 container">
                    <img
                      src={currentLoan.book.image}
                      width="226"
                      height="349"
                      alt="Book"
                    />
                  </div>
                  <div className="card col-3 col-md-3 container d-flex">
                    <div className="card-body">
                      <div className="mt-3">
                        <h4>Loan Options</h4>
                        {currentLoan.daysLeft > 0 && (
                          <p className="text-secondary">
                            Due in {currentLoan.daysLeft} days.
                          </p>
                        )}
                        {currentLoan.daysLeft === 0 && (
                          <p className="text-success">Due Today.</p>
                        )}
                        {currentLoan.daysLeft < 0 && (
                          <p className="text-danger">
                            Past due by {currentLoan.daysLeft} days.
                          </p>
                        )}
                        <div className="list-group mt-3">
                          <button
                            className="list-group-item list-group-item-action"
                            aria-current="true"
                            data-bs-toggle="modal"
                            data-bs-target={`#modal${currentLoan.isbn}`}
                          >
                            Manage Loan
                          </button>
                          <Link
                            className="list-group-item list-group-item-action"
                            to={"/search"}
                          >
                            Search more books?
                          </Link>
                        </div>
                      </div>
                      <hr />
                      <p className="mt-3">
                        Help other find their adventure by reviewing your loan.
                      </p>
                      <Link
                        className="btn btn-primary"
                        to={`/checkout/book/${currentLoan.isbn}`}
                      >
                        Leave a review
                      </Link>
                    </div>
                  </div>
                </div>
                <hr />
                <LoansModal currentLoan={currentLoan} mobile={false} returnBook={returnBook} 
                                renewLoan={renewLoan}/>
              </div>
            ))}
          </>
        ) : (
          <>
            <h3 className="mt-3">Currently no loans</h3>
            <Link className="btn btn-primary" to={`search`}>
              Search for a new book
            </Link>
          </>
        )}
      </div>

      {/* Mobile */}
      <div className="container d-lg-none mt-2">
        {currentLoans.length > 0 ? (
          <>
            <h5 className="mb-3">Current Loans: </h5>

            {currentLoans.map((currentLoan) => (
              <div key={currentLoan.isbn}>
                <div className="row mt-3 mb-3">
                  <div className="d-flex justify-content-center align-items-center">
                    <img
                      src={currentLoan.book.image}
                      width="226"
                      height="349"
                      alt="Book"
                    />
                  </div>
                  
                  <div className="card d-flex mt-5 mb-3">
                    <div className="card-body container">
                      <div className="mt-3">
                        <h4>Loan Options</h4>
                        {currentLoan.daysLeft > 0 && (
                          <p className="text-secondary">
                            Due in {currentLoan.daysLeft} days.
                          </p>
                        )}
                        {currentLoan.daysLeft === 0 && (
                          <p className="text-success">Due Today.</p>
                        )}
                        {currentLoan.daysLeft < 0 && (
                          <p className="text-danger">
                            Past due by {currentLoan.daysLeft} days.
                          </p>
                        )}
                        <div className="list-group mt-3">
                          <button
                            className="list-group-item list-group-item-action"
                            aria-current="true"
                            data-bs-toggle="modal"
                            data-bs-target={`#mobilemodal${currentLoan.isbn}`}
                          >
                            Manage Loan
                          </button>
                          <Link
                            to={"/search"}
                            className="list-group-item list-group-item-action"
                          >
                            Search more books?
                          </Link>
                        </div>
                      </div>
                      <hr />
                      <p className="mt-3">
                        Help other find their adventure by reviewing your loan.
                      </p>
                      <Link
                        className="btn btn-primary"
                        to={`/checkout/book/${currentLoan.isbn}`}
                      >
                        Leave a review
                      </Link>
                    </div>
                  </div>
                  <hr />
                  <LoansModal currentLoan={currentLoan} mobile={true} returnBook={returnBook} 
                                renewLoan={renewLoan}/>

                </div>
              </div>
            ))}
          </>
        ) : (
          <>
            <h3 className="mt-3">Currently no loans</h3>
            <Link className="btn btn-primary" to={`search`}>
              Search for a new book
            </Link>
          </>
        )}
      </div>
    </div>
  );
};
