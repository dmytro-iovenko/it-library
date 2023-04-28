import { BookModel } from "../../../models/BookModel";

export const SearchBooksItem: React.FC<{ book: BookModel }> = ({ book }) => {
  return (
    <div className="col-xl-5th col-lg-3 col-md-4 col-sm-6 col-xs-12">
      <div className="card shadow mb-3 bg-body rounded text-center">
        <img src={book.image} className="card-img-top" alt="Book" />
        <div className="card-body">
          <h5 className="card-title">{book.title}</h5>
          <p className="card-text">{book.subtitle}</p>
          <a className="btn btn-outline-primary main-color text-white" href="#">
            View Details
          </a>
        </div>
      </div>
    </div>
  );
};
