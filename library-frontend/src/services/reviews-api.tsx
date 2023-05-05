import axios from "axios";

const baseURL = "http://localhost:8080/api/reviews";

function getAxios(endPoint?: string) {
  return axios.get(baseURL + endPoint).then((response: any) => response.data);
}

// get all reviews list
function getAllReviews() {
  return getAxios();
}
// get reviews by ISBN
function getReviewsByISBN(isbn: string) {
  const url = "/search/findByIsbn?isbn=" + isbn;
  return getAxios(url);
}

export { getAllReviews, getReviewsByISBN };
