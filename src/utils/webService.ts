import axios from "axios";
import { SELLER_URL } from "./ApiUrls";
import { tokenKey } from "./utility";
import sessionManager from "./sessionManager";

axios.defaults.baseURL = SELLER_URL;

const createHeader = (_URL: string, options: any = {}) => {
  const { sellerInfo } = sessionManager({});

  const defaultHeaders = {
    Accept: "*/*",
    Authorization: `Bearer ${sellerInfo?.token || null}`,
  };

  // merge headers → custom headers take priority
  const mergedHeaders = {
    ...defaultHeaders,
    ...(options.headers || {}),
  };

  return { URL: _URL, options: { ...options, headers: mergedHeaders } };
};

const CreateHeaderToken = (_URL: string, _options?: any) => {
  const token = _options?.token; // Retrieve token from options if provided
  const headers = {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }), // Add token if available
  };

  return {
    URL: _URL,
    options: {
      ..._options,
      headers,
    },
  };
};

const POSTHEADER = async (_URL: string, data = {}, _options?: any) => {
  let { URL, options } = CreateHeaderToken(_URL, _options);

  try {
    const response = await axios.post(URL, data, options);
    return response;
  } catch (error: any) {
    return error.response;
  }
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

const GET = async (_URL: string, _options: any = {}) => {
  const { URL, options } = createHeader(_URL, _options);
  try {
    const response = await axios.get(URL, options);
    return response;
  } catch (error: any) {
    return error?.response;
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

export { POST, PUT, GET, PATCH, DELETE, POSTHEADER };
