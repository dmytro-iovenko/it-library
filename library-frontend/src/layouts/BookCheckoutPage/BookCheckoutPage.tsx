import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BookModel } from "../../models/BookModel";
import { SpinnerLoading } from "../Utils/SpinnerLoading";
import * as BooksAPI from "../../services/itbooks-api";

export const BookCheckoutPage = () => {
  const [book, setBook] = useState<BookModel>();
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(null);
  const { isbn } = useParams();

  useEffect(() => {
    isbn &&
      BooksAPI.getBookByISBN(isbn)
        .then((resultData: any) => setBook(resultData))
        .catch((error: any) => {
          setHttpError(error.message);
        });
    setIsLoading(false);
  }, [isbn]);

  if (isLoading) {
    return <SpinnerLoading />;
  }

  if (httpError) {
    return (
      <div className="container m-5">
        <p>{httpError}</p>
      </div>
    );
  }

  return <div></div>;
};
