import { useState } from "react";
import { useParams } from "react-router-dom";
import { BookModel } from "../../models/BookModel";

export const BookCheckoutPage = () => {
    const [book, setBook] = useState<BookModel>();
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState(null);
    const { isbn } = useParams();

    return(<div></div>);
}