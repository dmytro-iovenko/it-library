import axios from "axios";

const baseURL = "http://localhost:8080/api/books";

function getAxios(endPoint?: string, config?: any) {
  return axios
    .get(baseURL + endPoint, config)
    .then((response: any) => response.data);
}

// get reviews by ISBN
function getUserCurrentLoansCount(config: any) {
  const url = "/secure/currentLoans/count";
  return getAxios(url, config);
}

export { getUserCurrentLoansCount };
