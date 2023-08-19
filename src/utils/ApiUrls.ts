let SELLER_URL = "";
let PARTNER_URL = "";
let FILE_SERVER_URL = "";
let Enviornment = "";

// Environment Declaration
Enviornment = process.env.REACT_APP_ENV || "development";

switch (Enviornment) {
  case "development":
    SELLER_URL = `${process.env.REACT_APP_SELLER_DEV}`;
    PARTNER_URL = `${process.env.REACT_APP_PARTNER_DEV}`;
    FILE_SERVER_URL = `${process.env.REACT_APP_FILE_SERVER_DEV}`;
    break;
  case "production":
    SELLER_URL = `${process.env.REACT_APP_SELLER_DEV}`;
    PARTNER_URL = `${process.env.REACT_APP_PARTNER_DEV}`;
    FILE_SERVER_URL = `${process.env.REACT_APP_FILE_SERVER_PROD}`;
    break;
  default:
    SELLER_URL = `${process.env.REACT_APP_SELLER_LOCAL}`;
    PARTNER_URL = `${process.env.REACT_APP_PARTNER_LOCAL}`;
    FILE_SERVER_URL = `${process.env.REACT_APP_FILE_SERVER_DEV}`;
    break;
}

// Base URLs
const SELLER_BASE_URL = `${SELLER_URL}/api/v1`;
const PARTNER_BASE_URL = `${PARTNER_URL}/api/v1`;
const FILE_BASE_URL = `${FILE_SERVER_URL}/api/v1`;

// Onboarding URLs
const POST_SIGN_IN_URL = `${SELLER_BASE_URL}/seller/signIn`;
const POST_SIGN_UP_URL = `${SELLER_BASE_URL}/seller/createNewSeller?companyName=${process.env.REACT_APP_COMPANY}`;
const POST_SEND_OTP_URL = `${SELLER_BASE_URL}/seller/sendSignUpOtp`;
const POST_VERIFY_OTP = `${SELLER_BASE_URL}/seller/verifySignUpOtp`;

// Questionair URLs
const GET_QUESTIONNAIRE = `${SELLER_BASE_URL}/accounSetupQnA/getQuestionBank?companyName=${process.env.REACT_APP_COMPANY}`;
const POST_SUBMIT_QUESTIONNAIRE = `${SELLER_BASE_URL}/sellerQnA/submitAnswer`;

// Profile URLs
const GET_PROFILE_URL = `${SELLER_BASE_URL}/seller/getSingleSeller`;
const GET_PROFILE_NOTIFICATION = `${SELLER_BASE_URL}/notification/readNotification`;
const UPDATE_PROFILE_NOTIFICATION = `${SELLER_BASE_URL}/notification/updateNotification`;
const UPDATE_SELLER = `${SELLER_BASE_URL}/seller/updateSingleSeller`;

// Order URLs
const GET_SELLER_ORDER = `${SELLER_BASE_URL}/order/getSellerOrder`;

export {
  SELLER_URL,
  GET_SELLER_ORDER,
  POST_SIGN_IN_URL,
  POST_SIGN_UP_URL,
  POST_SEND_OTP_URL,
  GET_PROFILE_URL,
  POST_VERIFY_OTP,
  GET_PROFILE_NOTIFICATION,
  UPDATE_PROFILE_NOTIFICATION,
  GET_QUESTIONNAIRE,
  POST_SUBMIT_QUESTIONNAIRE,
  UPDATE_SELLER,
};
