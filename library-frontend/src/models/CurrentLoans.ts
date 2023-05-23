import { BookModel } from "./BookModel";

export class CurrentLoans {
    isbn: string;
    book: BookModel;
    daysLeft: number;

    constructor(isbn: string, book: BookModel, daysLeft: number) {
        this.isbn = isbn;
        this.book = book;
        this.daysLeft = daysLeft;
    }
}
