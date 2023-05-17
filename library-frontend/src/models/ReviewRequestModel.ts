export class ReviewRequestModel {
  isbn: string;
  rating: number;
  reviewDescription?: string;

  constructor(isbn: string, rating: number, reviewDescription: string) {
    this.isbn = isbn;
    this.rating = rating;
    this.reviewDescription = reviewDescription;
  }
}
