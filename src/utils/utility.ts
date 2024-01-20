import {
  Environment,
  INITIAL_RECHARGE,
  RECHARGE_STATUS,
  SELLER_WEB_URL,
} from "./ApiUrls";
import { POST } from "./webService";

export const crypt = (salt: any, text: any) => {
  const textToChars = (text: any) =>
    text.split("").map((c: any) => c.charCodeAt(0));
  const byteHex = (n: any) => ("0" + Number(n).toString(16)).substr(-2);
  const applySaltToChar = (code: any) =>
    textToChars(salt).reduce((a: any, b: any) => a ^ b, code);

  return text
    .split("")
    .map(textToChars)
    .map(applySaltToChar)
    .map(byteHex)
    .join("");
};

export const decrypt = (salt: any, encoded: any) => {
  const textToChars = (text: any) =>
    text.split("").map((c: any) => c.charCodeAt(0));
  const applySaltToChar = (code: any) =>
    textToChars(salt).reduce((a: any, b: any) => a ^ b, code);
  return encoded
    .match(/.{1,2}/g)
    .map((hex: any) => parseInt(hex, 16))
    .map(applySaltToChar)
    .map((charCode: any) => String.fromCharCode(charCode))
    .join("");
};

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
  if (typeof str !== "string") {
    return "";
  }
  return str
    ?.toLowerCase()
    ?.replace(/(?:^|\s|-)\S/g, (match: any) => match?.toUpperCase())
    ?.replace(/\s{2,}/g, " ");
};

export const constructNavigationObject = (pathname: any, search: any) => {
  return {
    pathname,
    ...(search && { search }),
  };
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
  searchProductData?.map((eachProduct: any, index: any) => {
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

export const loadPhonePeTransaction = async (
  walletValue: string,
  redirectUrl: string,
  callbackUrl: string
) => {
  try {
    const payload = {
      paymentObject: {
        amount: (+walletValue?.replace(/,/g, "") * 100).toString(),
        redirectUrl,
        callbackUrl,
      },
      paymentGateway: "PHONEPE",
    };
    const { data } = await POST(INITIAL_RECHARGE, payload);

    let phonePayTransactionPage;
    if (!data) {
      phonePayTransactionPage = redirectUrl;
    } else {
      phonePayTransactionPage =
        data?.data[0]?.data?.instrumentResponse?.redirectInfo?.url;
    }

    setLocalStorage(
      "phonePeTransactionId",
      data?.data[0]?.data?.merchantTransactionId
    );

    window.location.href = phonePayTransactionPage;
  } catch (error: any) {
    console.log("PhonePe Error: ", error.message);
  }
};

export const loadRazorPayTransaction = async (
  amount: number,
  companyName: string,
  userName: string,
  email: string,
  redirectUrl?: any
) => {
  try {
    let key = "rzp_test_03BJrYhr9s8YHM";
    if (Environment === "production") key = "rzp_live_ielBjwfQcB6jUh"; // rzp_live_ielBjwfQcB6jUh
    const payload = {
      paymentObject: {
        amount: (amount * 100).toString(),
        callbackUrl: redirectUrl,
      },
      paymentGateway: "RAZORPE",
    };
    const { data } = await POST(INITIAL_RECHARGE, payload);

    if (!data?.success) {
      return data;
    }

    let orderId = data?.data?.[0]?.id;
    let transactionId = data?.data?.[0]?.receipt;

    const script = document.createElement("script");

    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.type = "application/javascript";

    document.body.appendChild(script);

    const options: any = {
      key,
      amount: (amount * 100).toString(),
      currency: "INR",
      name: companyName,
      description: "",
      image: "",
      order_id: orderId,
      handler: async (response: any) => {
        let body = {
          orderId: response.razorpay_payment_id,
          transactionId: transactionId,
          paymentGateway: "RAZORPE",
        };
        await POST(RECHARGE_STATUS, body);
        window.location.href = redirectUrl;
      },
      prefill: {
        name: userName,
        email: email,
        contact: "",
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };
    return options;
  } catch (error: any) {
    console.error("RazorPay Error: ", error.message);
    return null;
  }
};

export const capitalizeFirstLetterWithExclude = (
  text: any,
  excludeWords: string[] = []
) => {
  if (typeof text !== "string") {
    return text;
  }

  return text
    .split(" ")
    .map((word) => {
      if (excludeWords.includes(word.toUpperCase())) {
        return word;
      }
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join(" ");
};

export const orderErrorsEnum: any = {
  "Insufficient Balance": "Recharge",
  "Update Product And Box Details": "Update Product Details",
  "Non-Serviceable Pincodes": "Update Pincode",
  "Account Level Errors": "Update Account Details",
  "Update Pickup And Delivery Address": "Update Address",
  "Update Customer Details": "Update Customer Details",
  "No Product Assigned": "Add Product",
  "Administration Errors": "Contact Administration",
};

export const convertNumberToMultipleOfhundred = (number: any) => {
  if (number.length < 3) number = 100;
  else if (number.length === 3) {
    let lastDigits = number.slice(1, 3);
    if (lastDigits !== "00") {
      let firstDigit = number[0];
      number = (Number(firstDigit) + 1) * 100;
    }
  } else {
    let hundredDigit = number[number.length - 3];
    let lastDigits = number.slice(number.length - 2, number.length);
    if (lastDigits !== "00") {
      let threeDigit = (Number(hundredDigit) + 1) * 100;
      number = number.slice(0, number.length - 3) + threeDigit;
    }
  }
  return number;
};
