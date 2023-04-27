export class BookModel {
  title: string;
  subtitle: string;
  authors?: string;
  publisher?: string;
  isbn10?: string;
  isbn13: string;
  pages?: string;
  year?: string;
  desc?: string;
  image: string;
  url: string;

  constructor(
    title: string,
    subtitle: string,
    authors: string,
    publisher: string,
    isbn10: string,
    isbn13: string,
    pages: string,
    year: string,
    desc: string,
    image: string,
    url: string
  ) {
    this.title = title;
    this.subtitle = subtitle;
    this.authors = authors;
    this.publisher = publisher;
    this.isbn10 = isbn10;
    this.isbn13 = isbn13;
    this.pages = pages;
    this.year = year;
    this.desc = desc;
    this.image = image;
    this.url = url;
  }
}
