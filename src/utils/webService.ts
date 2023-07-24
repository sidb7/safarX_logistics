import axios from "axios";
import { SELLER_URL } from "./ApiUrls";

axios.defaults.baseURL = SELLER_URL;

// Added a request interceptor to add the token to the header of every request

// axios.interceptors.request.use(
//   (config) => {
//     const token = getLocalStorage("891f5e6d-b3b3-4c16-929d-b06c3895e38d");
//     if (token && token) {
//       config.headers["Authorization"] = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     Promise.reject(error);
//   }
// );

const createHeader = (_URL: string, options = {}) => {
  let header = {
    Accept: "/",
    Authorization:
      "Bearer " + localStorage.getItem("891f5e6d-b3b3-4c16-929d-b06c3895e38d"),
  };
  options = { ...options, headers: header };
  return { URL: _URL, options: options };
};

const AdhaarCreateHeader = (_URL: string, options = {}) => {
  let header = {
    Accept: "/",
    Authorization:
      "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTYzNjM2MzIwMSwianRpIjoiNzBjZjg0NWMtNzkwNi00NmI0LWIyZjYtNDNkNmNlZTEyNTE4IiwidHlwZSI6ImFjY2VzcyIsImlkZW50aXR5IjoiZGV2LnNoaXB5YWFyaUBhYWRoYWFyYXBpLmlvIiwibmJmIjoxNjM2MzYzMjAxLCJleHAiOjE5NTE3MjMyMDEsInVzZXJfY2xhaW1zIjp7InNjb3BlcyI6WyJyZWFkIl19fQ.t979wsnPZcq746eK9X0iHFwT0pKOOhEXIN3u4FwzYOw",
  };
  options = { ...options, headers: header };
  return { URL: _URL, options: options };
};

const POST = async (_URL: string, data = {}, _options?: any) => {
  let { URL, options } = createHeader(_URL, _options);
  try {
    const response = await axios.post(URL, data, options);
    return response;
  } catch (error: any) {
    return error.response;
  }
};

const Adhaar_POST = async (_URL: string, data = {}, _options?: any) => {
  let { URL, options } = AdhaarCreateHeader(_URL, _options);
  try {
    const response = await axios.post(URL, data, options);
    return response;
  } catch (error: any) {
    return error.response;
  }
};
const GET = async (_URL: string, _options?: any) => {
  let { URL, options } = createHeader(_URL, _options);
  try {
    const response = await axios.get(URL, options);
    return response;
  } catch (error: any) {
    return error.response;
  }
};

const PATCH = async (_URL: string, data: any, _options?: any) => {
  let { URL, options } = createHeader(_URL, _options);
  try {
    const response = await axios.patch(URL, data, options);
    return response;
  } catch (error: any) {
    return error.response;
  }
};

const PUT = async (_URL: string, data: any, _options?: any) => {
  let { URL, options } = createHeader(_URL, _options);
  try {
    const response = await axios.put(URL, data, options);
    return response;
  } catch (error: any) {
    return error.response;
  }
};

const DELETE = async (_URL: string, _options?: any) => {
  let { URL, options } = createHeader(_URL, _options);
  try {
    const response = await axios.delete(URL, options);
    return response;
  } catch (error: any) {
    return error.response;
  }
};

export { POST, PUT, GET, PATCH, DELETE, Adhaar_POST };
