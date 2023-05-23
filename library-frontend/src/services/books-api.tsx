import axios, { AxiosRequestConfig } from "axios";

const baseURL = "http://localhost:8080/api/books";

function getAxios(endPoint?: string, config?: AxiosRequestConfig<string>) {
  return axios
    .get(baseURL + endPoint, config)
    .then((response: any) => response.data);
}

function putAxios(
  endPoint: string,
  body: string,
  config?: AxiosRequestConfig<string>
) {
  return axios
    .put(baseURL + endPoint, body, config)
    .then((response: any) => response.data);
}

function getUserCurrentLoansCount(config: any) {
  const url = "/secure/currentLoans/count";
  return getAxios(url, config);
}

function getUserCurrentLoans(config: any) {
  const url = "/secure/currentLoans";
  return getAxios(url, config);
}

function getIsCheckedOutByUser(isbn: string, config: any) {
  const url = "/secure/isCheckedOutByUser?isbn=" + isbn;
  return getAxios(url, config);
}

function checkoutBook(isbn: string, body: string, config: any) {
  const url = "/secure/isCheckedOutByUser?isbn=" + isbn;
  return putAxios(url, body, config);
}

export { getUserCurrentLoans, getUserCurrentLoansCount, getIsCheckedOutByUser, checkoutBook };
