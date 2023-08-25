let SELLER_URL = "";
let PARTNER_URL = "";
let FILE_SERVER_URL = "";
let PAYMENT_URL = "";
let Enviornment = "";

// Environment Declaration
Enviornment = process.env.REACT_APP_ENV || "development";

switch (Enviornment) {
  case "development":
    SELLER_URL = `${process.env.REACT_APP_SELLER_DEV}`;
    PARTNER_URL = `${process.env.REACT_APP_PARTNER_DEV}`;
    FILE_SERVER_URL = `${process.env.REACT_APP_FILE_SERVER_DEV}`;
    PAYMENT_URL = `${process.env.REACT_APP_PAYMENT_DEV}`;
    break;

  case "test":
    SELLER_URL = `${process.env.REACT_APP_SELLER_TEST}`;
    PARTNER_URL = `${process.env.REACT_APP_PARTNER_TEST}`;
    FILE_SERVER_URL = `${process.env.REACT_APP_FILE_SERVER_TEST}`;
    PAYMENT_URL = `${process.env.REACT_APP_PAYMENT_TEST}`;
    break;

  case "production":
    SELLER_URL = `${process.env.REACT_APP_SELLER_PROD}`;
    PARTNER_URL = `${process.env.REACT_APP_PARTNER_PROD}`;
    FILE_SERVER_URL = `${process.env.REACT_APP_FILE_SERVER_PROD}`;
    PAYMENT_URL = `${process.env.REACT_APP_PAYMENT_PROD}`;
    break;

  default:
    SELLER_URL = `${process.env.REACT_APP_SELLER_LOCAL}`;
    PARTNER_URL = `${process.env.REACT_APP_PARTNER_LOCAL}`;
    FILE_SERVER_URL = `${process.env.REACT_APP_FILE_SERVER_LOCAL}`;
    PAYMENT_URL = `${process.env.REACT_APP_PAYMENT_LOCAL}`;
    break;
}

//KYC  URLs
const POST_BUSINESS_TYPE_URL = `${SELLER_URL}/api/v1/seller/updateBusinessType`;
const POST_VERIFY_AADHAR_URL = `${SELLER_URL}/api/v1/seller/sendAadhaarCard`;
const POST_VERIFY_AADHAR_OTP_URL = `${SELLER_URL}/api/v1/seller/verifyAadhaarCard`;
const POST_VERIFY_PAN_URL = `${SELLER_URL}/api/v1/seller/verifyPanCardLite`;
const POST_VERIFY_GST_URL = `${SELLER_URL}/api/v1/seller/verifyGSTINBySendOtp`;
const POST_VERIFY_GST_OTP = `${SELLER_URL}/api/v1/seller/verifyGSTINBySubmitOtp`;
const POST_UPDATE_COMPANY_URL = `${SELLER_URL}/api/v1/seller/updateCompany`;
const POST_GET_SINGLE_FILE = `${FILE_SERVER_URL}/api/v1/upload/getRawSingleFile`;
const POST_UPDATE_COMPANY_ADDRESS = `${SELLER_URL}/api/v1/seller/updateCompany`;
const POST_ACCEPT_AGREEMENTS = `${SELLER_URL}/api/v1/seller/acceptAgreement`;
const FILE_UPLOAD = `${FILE_SERVER_URL}/api/v1/upload/uploadSingleFile`;
const GET_DEFAULT_ADDRESS = `${SELLER_URL}/api/v1/seller/getDocAddress`;
const POST_UPDATE_DEFAULT_ADDRESS = `${SELLER_URL}/api/v1/seller/updatedDocAddress`;
const MAGIC_ADDRESS = `${SELLER_URL}/api/v1/seller/verifyAddress`;

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
const UPDATE_PASSWORD = `${SELLER_BASE_URL}/seller/changePassword`;
const DELETE_SELLER = `${SELLER_BASE_URL}/seller/deleteSingleSeller`;

// Order URLs
const GET_SELLER_ORDER = `${SELLER_BASE_URL}/order/getSellerOrder`;

//NewOrder URLs
const ADD_PICKUP_LOCATION = `${SELLER_BASE_URL}/order/addPickupLocation`;
const ADD_DELIVERY_LOCATION = `${SELLER_BASE_URL}/order/addDeliveryLocation`;
const GET_COURIER_PARTNER_SERVICE = `${SELLER_BASE_URL}/order/getAvailableService`;
const SET_PARTNER_SERVICE_INFO = `${SELLER_BASE_URL}/order/setServiceInfo`;

//product URLs
const POST_PRODUCT_URL = `${SELLER_URL}/api/v1/order/addProductInfo`;
const GET_LATEST_ORDER = `${SELLER_URL}/api/v1/order/getLatestOrder`;
const GET_PRODUCT_URL = `${SELLER_URL}/api/v1/newProduct/getProduct`;
const GET_COMBO_PRODUCT_URL = `${SELLER_URL}/api/v1/newComboProduct/getComboProduct`;
const GET_SELLER_COMPANY_BOX = `${SELLER_URL}/api/v1/box/getCompanyBox`;
const POST_ADD_PRODUCT = `${SELLER_URL}/api/v1/newProduct/addNewProduct`;

//catalogue URLs
const GET_PICKUP_ADDRESS = `${SELLER_BASE_URL}/pickup/getPickupLocation`;
const GET_DELIVERY_ADDRESS = `${SELLER_BASE_URL}/delivery/getDeliveryLocation`;
//paytm
const INITIAL_RECHARGE = `${SELLER_URL}/api/v1/walletRecharge/initialRecharge`;
const RECHARGE_STATUS = `${SELLER_URL}/api/v1/walletRecharge/getRechargeStatus`;

const GET_SELLER_BOX_DETAILS = `${SELLER_BASE_URL}/box/getSellerBox`;
const GET_COMPANY_BOX_DETAILS = `${SELLER_BASE_URL}/box/getCompanyBox`;

//servicable-pincode
const GET_SERVICABLE_PINCODE = `${PARTNER_BASE_URL}/pincodes/checkServiceable`;



export {
  SELLER_URL,
  GET_SELLER_ORDER,
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
  POST_VERIFY_OTP,
  GET_PROFILE_NOTIFICATION,
  UPDATE_PROFILE_NOTIFICATION,
  GET_QUESTIONNAIRE,
  POST_SUBMIT_QUESTIONNAIRE,
  UPDATE_SELLER,
  POST_ACCEPT_AGREEMENTS,
  POST_VERIFY_GST_OTP,
  GET_DEFAULT_ADDRESS,
  POST_UPDATE_DEFAULT_ADDRESS,
  MAGIC_ADDRESS,
  UPDATE_PASSWORD,
  DELETE_SELLER,
  ADD_PICKUP_LOCATION,
  ADD_DELIVERY_LOCATION,
  GET_COURIER_PARTNER_SERVICE,
  POST_PRODUCT_URL,
  FILE_UPLOAD,
  SET_PARTNER_SERVICE_INFO,
  GET_PICKUP_ADDRESS,
  GET_DELIVERY_ADDRESS,
  GET_SELLER_BOX_DETAILS,
  GET_COMPANY_BOX_DETAILS,
  GET_LATEST_ORDER,
  GET_PRODUCT_URL,
  GET_COMBO_PRODUCT_URL,
  INITIAL_RECHARGE,
  RECHARGE_STATUS,
  GET_SELLER_COMPANY_BOX,
  GET_SERVICABLE_PINCODE,
  POST_ADD_PRODUCT,
};
