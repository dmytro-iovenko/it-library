import axios, { AxiosRequestConfig } from "axios";

const baseURL = "http://localhost:8080/api/reviews";

function getAxios(endPoint?: string, config?: AxiosRequestConfig<string>) {
    return axios.get(baseURL + endPoint, config).then((response: any) => response.data);
}

// get all reviews list
function getAllReviews() {
  return getAxios();
}
// get reviews by ISBN
function getReviewsByISBN(isbn: string, page?: number, size?: number) {
  const url = "/search/findByIsbn?isbn=" + isbn + (page ? "&page=" + page : "") + (size ? "&size=" + size : "");
  return getAxios(url);
}

function getIsReviewedByUser(isbn: string, config: any) {
  const url = "/secure/isReviewedByUser?isbn=" + isbn;
  return getAxios(url, config);
}


export { getAllReviews, getReviewsByISBN, getIsReviewedByUser };
