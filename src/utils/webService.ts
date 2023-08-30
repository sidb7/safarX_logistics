import axios from "axios";
import { SELLER_URL } from "./ApiUrls";
import { tokenKey } from "./utility";

axios.defaults.baseURL = SELLER_URL;

const createHeader = (_URL: string, options = {}) => {
  let header = {
    Accept: "/",
    Authorization: `Bearer ${localStorage.getItem(tokenKey)}`,
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

export { POST, PUT, GET, PATCH, DELETE };
