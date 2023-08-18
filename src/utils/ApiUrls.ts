let SELLER_URL = "";
let FILE_SERVER_URL = "";
let Enviornment = "";

Enviornment = process.env.REACT_APP_ENV || "development";

switch (Enviornment) {
  case "development":
    SELLER_URL = `${process.env.REACT_APP_SELLER_DEV}`;
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
const POST_SIGN_UP_URL = `${SELLER_URL}/api/v1/seller/createNewSeller?companyName=SHIPYAARI`;
const POST_SEND_OTP_URL = `${SELLER_URL}/api/v1/seller/sendSignUpOtp`;
const GET_PROFILE_URL = `${SELLER_URL}/api/v1/seller/getSingleSeller`;
//KYC API URLs
const POST_BUSINESS_TYPE_URL = `${SELLER_URL}/api/v1/seller/updateBusinessType`;
const POST_VERIFY_AADHAR_URL = `${SELLER_URL}/api/v1/seller/sendAadhaarCard`;
const POST_VERIFY_AADHAR_OTP_URL = `${SELLER_URL}/api/v1/seller/verifyAadhaarCard`;
const POST_VERIFY_PAN_URL = `${SELLER_URL}/api/v1/seller/verifyPanCardLite`;
const POST_VERIFY_GST_URL = `${SELLER_URL}/api/v1/seller/verifyGSTIN`;
const POST_UPDATE_COMPANY_URL = `${SELLER_URL}/api/v1/seller/updateCompany`;
const POST_GET_SINGLE_FILE = `${FILE_SERVER_URL}/api/v1/upload/getSingleFile`;
const POST_UPDATE_COMPANY_ADDRESS = `${SELLER_URL}/api/v1/seller/updateCompany`;
const GET_PROFILE_NOTIFICATION = `${SELLER_URL}/api/v1/notification/readNotification`;
const UPDATE_PROFILE_NOTIFICATION = `${SELLER_URL}/api/v1/notification/updateNotification`;

export {
  SELLER_URL,
  POST_SIGN_IN_URL,
  POST_SIGN_UP_URL,
  POST_SEND_OTP_URL,
  GET_PROFILE_URL,
  POST_BUSINESS_TYPE_URL,
  POST_VERIFY_AADHAR_URL,
  POST_VERIFY_AADHAR_OTP_URL,
  POST_VERIFY_PAN_URL,
  POST_VERIFY_GST_URL,
  POST_UPDATE_COMPANY_URL,
  POST_GET_SINGLE_FILE,
  POST_UPDATE_COMPANY_ADDRESS,
  GET_PROFILE_NOTIFICATION,
  UPDATE_PROFILE_NOTIFICATION,
};
