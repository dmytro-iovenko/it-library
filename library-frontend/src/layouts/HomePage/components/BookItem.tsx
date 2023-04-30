import React from "react";
import { BookModel } from "../../../models/BookModel";

export const BookItem: React.FC<{ book: BookModel }> = ({ book }) => {
  return (
    <div className="col-xs-6 col-sm-6 col-md-4 col-lg-3 mb-3">
      <div className="text-center">
        <img src={book.image} width={151} height={233} alt="book" />
        <h6 className="mt-2">{book.title}</h6>
        <a className="btn btn-outline-secondary main-color text-white" href="#">
          Reserve
        </a>
      </div>
    </div>
  );
};
