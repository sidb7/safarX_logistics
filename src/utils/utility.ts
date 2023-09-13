export const setLocalStorage = (key: string, value: any) => {
  return localStorage.setItem(key, value);
};
export const getLocalStorage = (key: string) => {
  return localStorage.getItem(key);
};
export const removeLocalStorage = (key: string) => {
  return localStorage.removeItem(key);
};
export const clearLocalStorage = () => {
  return localStorage.clear();
};
export const maskMobileNumber = (mobileNumber: any) => {
  if (typeof mobileNumber === "string" && mobileNumber.length === 10) {
    const maskedDigits = mobileNumber.substring(0, 7).replace(/\d/g, "*");
    return maskedDigits + mobileNumber.substring(7);
  }
  return mobileNumber;
};

export const capitalizeFirstLetter = (str: string) => {
  return str
    ?.toLowerCase()
    ?.replace(/(?:^|\s|-)\S/g, (match: any) => match?.toUpperCase())
    ?.replace(/\s{2,}/g, " ");
};

export const GetCurrentPath = () => {
  const currentUrl = window.location.href;
  const url = new URL(currentUrl);
  const location = url;
  const path = location.pathname;
  const pathArray = path.split("/");
  const removedFirstPath = pathArray.slice(1);
  return removedFirstPath;
};

export const getQueryJson = () => {
  let queryParams: string = window.location.search.substring(1);
  if (queryParams.charAt(0) === "?") {
    queryParams = queryParams.substring(1);
  }
  const paramPairs = queryParams.split("&");
  const json: any = {};
  paramPairs?.forEach((paramPair) => {
    const [key, value] = paramPair.split("=");
    const decodedKey = decodeURIComponent(key);
    const decodedValue = decodeURIComponent(value);
    json[decodedKey] = decodedValue;
  });
  return json;
};

export const generateUniqueCode = (minLength: number, maxLength: number) => {
  const charset =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const length =
    Math.floor(Math.random() * (maxLength - minLength + 1)) + minLength;
  let code = "";

  while (code.length < length) {
    const randomIndex = Math.random() * charset.length;
    const randomIndexOnFloor = Math.floor(randomIndex);
    code += charset.charAt(randomIndexOnFloor);
  }

  return code;
};

export const searchResults = (value: any, searchProductData: any = []) => {
  let productArray: any = [];
  searchProductData.map((eachProduct: any, index: any) => {
    let joinedName = eachProduct?.name?.split(" ").join("");
    if (
      eachProduct?.name?.toUpperCase().includes(value.toUpperCase()) ||
      joinedName.toUpperCase().includes(value.toUpperCase())
    ) {
      productArray.push(eachProduct);
    }
  });
  return productArray;
};

export const convertEpochToDateTime = (value: number) => {
  let epoch = value;
  const date = new Date(epoch);
  const year = date.getFullYear();
  const month = date.getMonth() + 1; // Months are zero-based, so add 1
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  // Format the date and time as a string
  const formattedDateTime = `${year}-${month.toString().padStart(2, "0")}-${day
    .toString()
    .padStart(2, "0")} ${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;

  return formattedDateTime;
};

//export verifyToken = apiIntergration function
export const tokenKey = "891f5e6d-b3b3-4c16-929d-b06c3895e38d";

export const titleCase = (str: string) => {
  if (typeof str !== "string" || str.length === 0) {
    return null;
  }

  return str[0].charAt(0).toUpperCase() + str.substring(1, str.length);
};
