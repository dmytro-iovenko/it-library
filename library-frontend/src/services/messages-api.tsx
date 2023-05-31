import axios, { AxiosRequestConfig } from "axios";

const baseURL = "http://localhost:8080/api/messages";

function getAxios(endPoint?: string, config?: AxiosRequestConfig<string>) {
    return axios.get(baseURL + endPoint, config).then((response: any) => response.data);
}

function getMessagesByUserEmail(email?: string, page?: number, size?: number) {
  const url = "/search/findByUserEmail/?userEmail=" + email + (page ? "&page=" + page : "") + (size ? "&size=" + size : "");
  return getAxios(url);
}

export { getMessagesByUserEmail };
