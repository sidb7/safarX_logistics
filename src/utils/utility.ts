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

export function BaseOptionChart({ useDatetime = false } = {}) {
  // useStyles();
  // const theme = useTheme();

  const LABEL_TOTAL = {
    show: true,
    label: "Total",
    color: "red",
    // ...theme.typography.subtitle2,
  };

  const LABEL_VALUE = {
    offsetY: 8,
    color: "grey",
    // ...theme.typography.h3,
  };

  return {
    // Colors
    colors: [
      "#3371FF",
      "#52e389",
      "#5ab8eb",
      // theme.palette.primary.main,
      // theme.palette.chart.yellow[0],
      // theme.palette.chart.blue[0],
      // theme.palette.chart.violet[0],
      // theme.palette.chart.green[0],
      // theme.palette.chart.red[0],
    ],

    // Chart
    chart: {
      toolbar: {
        show: true,
        tools: { download: false },
        offsetX: 0,
        offsetY: 0,
      },
      zoom: { enabled: true },
      animations: { enabled: true },
      foreColor: "grey",
      fontFamily: "Lato",
    },

    // States
    states: {
      hover: {
        filter: {
          type: "lighten",
          value: 0.04,
        },
      },
      active: {
        filter: {
          type: "darken",
          value: 0.88,
        },
      },
    },

    // Fill
    fill: {
      opacity: 1,
      gradient: {
        type: "vertical",
        shadeIntensity: 0,
        opacityFrom: 0.4,
        opacityTo: 0,
        stops: [0, 100],
      },
    },

    // Datalabels
    dataLabels: { enabled: false },

    // Stroke
    stroke: {
      width: 3,
      curve: "smooth",
      lineCap: "round",
    },

    // Grid
    grid: {
      strokeDashArray: 3,
      borderColor: "#b1b1b19b",
    },

    // Xaxis
    xaxis: {
      axisBorder: { show: true },
      axisTicks: { show: true },
      // type: "datetime",
      ...(useDatetime && { type: "datetime" }),
    },

    // Markers
    markers: {
      size: 3,
      strokeColors: "#3371FF",
    },

    // Tooltip
    tooltip: {
      x: {
        show: true,
        format: "dd MMM yyyy",
      },
    },

    // Legend
    legend: {
      show: true,
      fontSize: 13,
      position: "top",
      horizontalAlign: "right",
      markers: {
        radius: 12,
      },
      fontWeight: 500,
      itemMargin: { horizontal: 12 },
      labels: {
        colors: "#3371FF",
      },
    },

    // plotOptions
    plotOptions: {
      // Bar
      bar: {
        columnWidth: "40%",
        borderRadius: 4,
      },
      // Pie + Donut
      pie: {
        customScale: 10,
        donut: {
          labels: {
            show: true,
            value: LABEL_VALUE,
            total: LABEL_TOTAL,
          },
        },
      },
      // Radialbar
      // radialBar: {
      //   track: {
      //     strokeWidth: "100%",
      //     background: "white",
      //   },
      //   dataLabels: {
      //     value: LABEL_VALUE,
      //     total: LABEL_TOTAL,
      //   },
      // },
      // Radar
      // radar: {
      //   polygons: {
      //     fill: { colors: ["transparent"] },
      //     strokeColors: "grey",
      //     connectorColors: "grey",
      //   },
      // },
      // polarArea
      // polarArea: {
      //   rings: {
      //     strokeColor: "grey",
      //   },
      //   spokes: {
      //     connectorColors: "grey",
      //   },
      // },
    },

    // Responsive
    responsive: [
      {
        // sm
        breakpoint: 800,
        options: {
          plotOptions: { bar: { columnWidth: "40%" } },
        },
      },
      {
        // md
        breakpoint: 1000,
        options: {
          plotOptions: { bar: { columnWidth: "32%" } },
        },
      },
    ],
  };
}

export function kFormatter(num: number) {
  return Math.abs(num) > 999
    ? (Math.sign(num) * (Math.abs(num) / 1000)).toFixed(1) + "k"
    : Math.sign(num) * Math.abs(num);
}

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
  return removeEmptySpaceKeys(json) || {};
};

function removeEmptySpaceKeys(obj: any) {
  const newObj: any = {};
  Object.keys(obj).forEach((key) => {
    if (key.trim() !== "") {
      newObj[key] = obj[key];
    }
  });
  return newObj;
}

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

// export const convertEpochToDateTimeV2 = (value: number) => {
//   console.log("****************", value);
//   let epoch = value as any;
//   console.log("🚀 ~ convertEpochToDateTimeV2 ~ epoch:", epoch);
//   const date = new Date(epoch);
//   console.log("🚀 ~ convertEpochToDateTimeV2 ~ date:", date);
//   const year = date.getFullYear();
//   const month = date.getMonth() + 1; // Months are zero-based, so add 1
//   const day = date.getDate();
//   const hours = date.getHours();
//   const minutes = date.getMinutes();
//   const seconds = date.getSeconds();

//   // const formattedDateTime = `${year}-${month.toString().padStart(2, "0")}-${day
//   //   .toString()
//   //   .padStart(2, "0")}`;
//   const formattedDateTime = `${day.toString().padStart(2, "0")}/${month
//     .toString()
//     .padStart(2, "0")}/${year} `;
//   console.log("🚀 ~ formattedDateTime ~ formattedDateTime:", formattedDateTime);

//   return formattedDateTime;
// };

export const convertEpochToDateTimeV2 = (value: any) => {
  if (!value) return;
  let epoch = +value; // convert seconds to milliseconds
  const date = new Date(epoch);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Months are zero-based, so add 1
  const day = date.getDate().toString().padStart(2, "0");
  const formattedDateTime = `${day}-${month}-${year}`;
  return formattedDateTime;
};

// export verifyToken = apiIntergration function
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
  "Serviceable Error": "Update Serviceable Pincode",
};

export const orderErrorCategoryENUMs = {
  Address: "Address",
  "Box And Product": "Box And Product", // stop point
  "Delivery Address": "Delivery Address",
  "Pickup Address": "Pickup Address",
  Service: "Service",
  Payment: "Payment", // stop point
  Others: "Others", // stop point { cod error, kyc, orderId }
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

export const calculateDaysAgoFromToday = (epochCreatedAt: any) => {
  const now: any = new Date();
  const epochDate = new Date(epochCreatedAt);
  const diffInMillis = Math.abs(now - epochCreatedAt);
  const diffInDays = diffInMillis / (1000 * 60 * 60 * 24);
  const roundedDiffInDays = Math.ceil(diffInDays);
  if (diffInDays < 1) {
    return 0;
  } else {
    return roundedDiffInDays;
  }
};
