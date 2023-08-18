let SELLER_URL = "";
let FILE_SERVER_URL = "";
let Enviornment = "";

Enviornment = process.env.REACT_APP_ENV || "development";

switch (Enviornment) {
  case "development":
    SELLER_URL = `${process.env.REACT_APP_SELLER_LOCAL}`;
    FILE_SERVER_URL = `${process.env.REACT_APP_FILE_SERVER_DEV}`;
    break;
  case "production":
    SELLER_URL = `${process.env.REACT_APP_SELLER_PROD}`;
    FILE_SERVER_URL = `${process.env.REACT_APP_FILE_SERVER_PROD}`;
    break;
  default:
    SELLER_URL = `${process.env.REACT_APP_SELLER_LOCAL}`;
    FILE_SERVER_URL = `${process.env.REACT_APP_FILE_SERVER_DEV}`;
    break;
}

const POST_SIGN_IN_URL = `${SELLER_URL}/api/v1/seller/signIn`;
const POST_SIGN_UP_URL = `${SELLER_URL}/api/v1/seller/createNewSeller?companyName=${process.env.REACT_APP_COMPANY}`;
const POST_SEND_OTP_URL = `${SELLER_URL}/api/v1/seller/sendSignUpOtp`;
const POST_VERIFY_OTP = `${SELLER_URL}/api/v1/seller/verifySignUpOtp`;
const GET_PROFILE_URL = `${SELLER_URL}/api/v1/seller/getSingleSeller`;
const GET_PROFILE_NOTIFICATION = `${SELLER_URL}/api/v1/notification/readNotification`;
const UPDATE_PROFILE_NOTIFICATION = `${SELLER_URL}/api/v1/notification/updateNotification`;
const GET_SELLER_ORDER = `${SELLER_URL}/api/v1/order/getSellerOrder`;
const GET_QUESTIONNAIRE = `${SELLER_URL}/api/v1/accounSetupQnA/getQuestionBank?companyName=${process.env.REACT_APP_COMPANY}`;
const POST_SUBMIT_QUESTIONNAIRE = `${SELLER_URL}/api/v1/sellerQnA/submitAnswer`;
const UPDATE_SELLER = `${SELLER_URL}/api/v1/seller/updateSingleSeller`;

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
