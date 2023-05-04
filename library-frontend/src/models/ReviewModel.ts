export class ReviewModel {
  id: number;
  userEmail: string;
  date: string;
  rating: number;
  isbn: string;
  reviewDescription?: string;

  constructor(
    id: number,
    userEmail: string,
    date: string,
    rating: number,
    isbn: string,
    reviewDescription: string
  ) {
    this.id = id;
    this.userEmail = userEmail;
    this.date = date;
    this.rating = rating;
    this.isbn = isbn;
    this.reviewDescription = reviewDescription;
  }
}
