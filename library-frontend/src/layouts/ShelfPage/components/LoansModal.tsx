import { CurrentLoans } from "../../../models/CurrentLoans";

export const LoansModal: React.FC<{
  currentLoan: CurrentLoans;
  mobile: boolean;
  returnBook: any;
  renewLoan: any;
}> = ({ currentLoan, mobile, returnBook, renewLoan }) => {
  return (
    <div
      className="modal fade"
      id={
        mobile ? `mobilemodal${currentLoan.isbn}` : `modal${currentLoan.isbn}`
      }
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
      key={currentLoan.isbn}
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="staticBackdropLabel">
              Loan Options
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <div className="container">
              <div className="mt-3">
                <div className="row">
                  <div className="col-2">
                    <img
                      src={currentLoan.book?.image}
                      width="56"
                      height="87"
                      alt="Book"
                    />
                  </div>
                  <div className="col-10">
                    <h6>{currentLoan.book.authors}</h6>
                    <h4>{currentLoan.book.title}</h4>
                  </div>
                </div>
                <hr />
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
                    onClick={() => returnBook(currentLoan.isbn)}
                    data-bs-dismiss="modal"
                    className="list-group-item list-group-item-action"
                    aria-current="true"
                  >
                    Return Book
                  </button>
                  <button
                    onClick={
                      currentLoan.daysLeft < 0
                        ? (event) => event.preventDefault()
                        : () => renewLoan(currentLoan.isbn)
                    }
                    data-bs-dismiss="modal"
                    className={
                      currentLoan.daysLeft < 0
                        ? "list-group-item list-group-item-action inactiveLink"
                        : "list-group-item list-group-item-action"
                    }
                  >
                    {currentLoan.daysLeft < 0
                      ? "Late dues cannot be renewed"
                      : "Renew loan for 7 days"}
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
