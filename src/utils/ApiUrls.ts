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
const POST_SIGN_UP_URL = `${SELLER_URL}/api/v1/seller/createNewSeller?companyName=${process.env.REACT_APP_COMPANY}`;
const POST_SEND_OTP_URL = `${SELLER_URL}/api/v1/seller/sendSignUpOtp`;
const POST_VERIFY_OTP = `${SELLER_URL}/api/v1/seller/verifySignUpOtp`;
const GET_PROFILE_URL = `${SELLER_URL}/api/v1/seller/getSingleSeller`;

export {
  SELLER_URL,
  POST_SIGN_IN_URL,
  POST_SIGN_UP_URL,
  POST_SEND_OTP_URL,
  GET_PROFILE_URL,
  POST_VERIFY_OTP,
};
