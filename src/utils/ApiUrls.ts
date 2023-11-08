export let Environment = "";
export let SELLER_WEB_URL = "";
let SELLER_URL = "";
let PARTNER_URL = "";
let FILE_SERVER_URL = "";
let PAYMENT_URL = "";
let LANDMARK_URL = "";
let TRACKING_URL = "";

// Environment Declaration
Environment = process.env.REACT_APP_ENV || "development";

switch (Environment) {
  case "development":
    SELLER_URL = `${process.env.REACT_APP_SELLER_DEV}`;
    PARTNER_URL = `${process.env.REACT_APP_PARTNER_DEV}`;
    FILE_SERVER_URL = `${process.env.REACT_APP_FILE_SERVER_DEV}`;
    PAYMENT_URL = `${process.env.REACT_APP_PAYMENT_DEV}`;
    LANDMARK_URL = `${process.env.REACT_APP_LANDMARK_DEV}`;
    TRACKING_URL = `${process.env.REACT_APP_TRACKING_URL_DEV}`;
    SELLER_WEB_URL = `${process.env.REACT_APP_SELLER_WEB_URL_DEV}`;

    break;

  case "test":
    SELLER_URL = `${process.env.REACT_APP_SELLER_TEST}`;
    PARTNER_URL = `${process.env.REACT_APP_PARTNER_TEST}`;
    FILE_SERVER_URL = `${process.env.REACT_APP_FILE_SERVER_TEST}`;
    PAYMENT_URL = `${process.env.REACT_APP_PAYMENT_TEST}`;
    LANDMARK_URL = `${process.env.REACT_APP_LANDMARK_TEST}`;
    TRACKING_URL = `${process.env.REACT_APP_TRACKING_URL_TEST}`;
    SELLER_WEB_URL = `${process.env.REACT_APP_SELLER_WEB_URL_TEST}`;
    break;

  case "production":
    SELLER_URL = `${process.env.REACT_APP_SELLER_PROD}`;
    PARTNER_URL = `${process.env.REACT_APP_PARTNER_PROD}`;
    FILE_SERVER_URL = `${process.env.REACT_APP_FILE_SERVER_PROD}`;
    PAYMENT_URL = `${process.env.REACT_APP_PAYMENT_PROD}`;
    LANDMARK_URL = `${process.env.REACT_APP_LANDMARK_PROD}`;
    TRACKING_URL = `${process.env.REACT_APP_TRACKING_URL_PROD}`;
    SELLER_WEB_URL = `${process.env.REACT_APP_SELLER_WEB_URL_PROD}`;

    break;

  default:
    SELLER_URL = `${process.env.REACT_APP_SELLER_LOCAL}`;
    PARTNER_URL = `${process.env.REACT_APP_PARTNER_LOCAL}`;
    FILE_SERVER_URL = `${process.env.REACT_APP_FILE_SERVER_LOCAL}`;
    PAYMENT_URL = `${process.env.REACT_APP_PAYMENT_LOCAL}`;
    LANDMARK_URL = `${process.env.REACT_APP_LANDMARK_LOCAL}`;
    TRACKING_URL = `${process.env.REACT_APP_TRACKING_URL_LOCAL}`;
    SELLER_WEB_URL = `http://localhost:3000`;

    break;
}

//KYC  URLs
const POST_BUSINESS_TYPE_URL = `${SELLER_URL}/api/v1/seller/updateBusinessType`;
const POST_VERIFY_AADHAR_URL = `${SELLER_URL}/api/v1/seller/sendAadhaarCard`;
const POST_VERIFY_AADHAR_OTP_URL = `${SELLER_URL}/api/v1/seller/verifyAadhaarCard`;
const POST_VERIFY_PAN_URL = `${SELLER_URL}/api/v1/seller/verifyPanCardDesc`;
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
const POST_SIGN_UP_WITH_GOOGLE_URL = `${SELLER_BASE_URL}/seller/signUpWithGoogle?companyName=${process.env.REACT_APP_COMPANY}`;
const POST_SIGN_IN_WITH_GOOGLE_URL = `${SELLER_BASE_URL}/seller/signInWithGoogle?companyName=${process.env.REACT_APP_COMPANY}`;

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
// const GET_SELLER_ORDER = `${SELLER_BASE_URL}/order/getSellerOrder`;
const GET_SELLER_ORDER = `${SELLER_BASE_URL}/order/getSellerOrderIN`;
const GET_ORDER_BY_ID = `${SELLER_BASE_URL}/order/getOrderById`;
const CANCEL_WAY_BILL = `${SELLER_BASE_URL}/order/cancelWayBill`;
const CANCEL_TEMP_SELLER_ORDER = `${SELLER_BASE_URL}/order/deleteTempOrder`;
//NewOrder URLs
const VERIFY_ADDRESS = `${SELLER_BASE_URL}/seller/verifyAddress`;

const ADD_PICKUP_LOCATION = `${SELLER_BASE_URL}/order/addPickupAddress`;
const ADD_DELIVERY_LOCATION = `${SELLER_BASE_URL}/order/addDeliveryAddress`;
const GET_COURIER_PARTNER_SERVICE = `${SELLER_BASE_URL}/order/getAvailableService`;
const SET_PARTNER_SERVICE_INFO = `${SELLER_BASE_URL}/order/setServiceInfo`;

const PLACE_ORDER = `${SELLER_BASE_URL}/order/payOrderAmount`;
// const LANDMARK_API = `${SELLER_BASE_URL}/landmark/landmark`;
const POST_SET_ORDER_ID = `${SELLER_BASE_URL}/order/setOrderId`;
const POST_PLACE_ORDER = `${SELLER_BASE_URL}/order/placeOrder`;

//product URLs
const POST_PRODUCT_URL = `${SELLER_URL}/api/v1/order/addProductInfo`;
const GET_LATEST_ORDER = `${SELLER_URL}/api/v1/order/getLatestOrder`;
const GET_PRODUCT_URL = `${SELLER_URL}/api/v1/product/getProduct`;
const GET_SELLER_BOX = `${SELLER_URL}/api/v1/box/getSellerBox`;
const POST_ADD_PRODUCT = `${SELLER_URL}/api/v1/newProduct/addNewProduct`;
const ADD_BOX_INFO = `${SELLER_URL}/api/v1/order/setBoxAndCODInfo`;
const GET_CATEGOROIES = `${SELLER_URL}/api/v1/categories/getCategories`;
//BOX URLs (Seller & Company Box)
const CREATE_SELLER_BOX = `${SELLER_URL}/api/v1/box/createSellerBox`;
const UPDATE_SELLER_BOX = `${SELLER_URL}/api/v1/box/updateSellerBox`;
const DELETE_SELLER_BOX = `${SELLER_URL}/api/v1/box/deleteSellerBox`;
const GET_SELLER_COMPANY_BOX = `${SELLER_URL}/api/v1/box/getCompanyBox`;

//Combo Product URL
const GET_COMBO_PRODUCT_URL = `${SELLER_URL}/api/v1/newComboProduct/getComboProduct`;
const ADD_COMBO_PRODUCT_URL = `${SELLER_URL}/api/v1/newComboProduct/addNewComboProduct`;
const ADD_COD_INFO = `${SELLER_URL}/api/v1/order/addCodInfo`;
const GET_PACKAGE_INSURANCE = `${SELLER_URL}/api/v1/order/addInsuranceInfo`;

//catalogue URLs
const GET_PICKUP_ADDRESS = `${SELLER_BASE_URL}/pickupAddress/getPickupAddress`;
const GET_DELIVERY_ADDRESS = `${SELLER_BASE_URL}/deliveryAddress/getDeliveryAddress`;
const POST_UPDATE_PRODUCT = `${SELLER_BASE_URL}/product/updateProduct`;

// PAYMENT GATEWAYS
// Paytm
const INITIAL_RECHARGE = `${SELLER_URL}/api/v1/walletRecharge/initRecharge`;
const RECHARGE_STATUS = `${SELLER_URL}/api/v1/walletRecharge/getRechargeStatus`;
const POST_ADD_BANK_DETAILS = `${SELLER_URL}/api/v1/seller/verifyBankAccount`;
//PhonePe
const PHONEPE_INIT_TRANSACTION = `${SELLER_URL}/api/v1/phonepay/initTransaction`;
const PHONEPE_TRANSACTION_STATUS = `${SELLER_URL}/api/v1/walletRecharge/getRechargeStatus`;

// Wallet
const GET_CURRENT_WALLET = `${SELLER_URL}/api/v1/wallet/getWallet`;
const GET_WALLET_TRANSACTION = `${SELLER_URL}/api/v1/walletTransaction/getWalletTransaction`;

const GET_SELLER_BOX_DETAILS = `${SELLER_BASE_URL}/box/getSellerBox`;
const GET_COMPANY_BOX_DETAILS = `${SELLER_BASE_URL}/box/getCompanyBox`;

// Validate Token
const VALIDATE_USER_TOKEN = `${SELLER_URL}/api/v1/seller/validatetoken`;
const ADD_PICKUP_ADDRESS = `${SELLER_BASE_URL}/pickupAddress/createPickupLocation`;
const ADD_PICKUP_ADDRESS_CATALOGUE = `${SELLER_BASE_URL}/pickupAddress/createPickupAddress`;
const UPDATE_PICKUP_ADDRESS = `${SELLER_BASE_URL}/pickupAddress/updatePickupAddress`;
const ADD_DELIVERY_ADDRESS = `${SELLER_BASE_URL}/delivery/createDeliveryLocation`;
const UPDATE_DELIVERY_ADDRESS = `${SELLER_BASE_URL}/delivery/updateDeliveryLocation`;

//servicable-pincode
const GET_SERVICABLE_PINCODE = `${PARTNER_BASE_URL}/pincodes/checkServiceable`;

//Pincode Data for Address
const GET_PINCODE_DATA = `${SELLER_BASE_URL}/pincodes/getPincodeDetails`;

//Plan
const GET_PLAN_URL = `${SELLER_BASE_URL}/sellerPlans/getSellerPlan`;
const GET_ALL_PLANS = `${SELLER_BASE_URL}/sellerPlans/getAllCompanyPlanBySeller`;
const POST_CREATE_PLAN = `${SELLER_BASE_URL}/sellerPlans/createSellerPlan`;

//Gst Agreement
const GST_AGREEMENTS = `${SELLER_URL}/api/v1/seller/acceptNoGSTAgreement`;

//Role Management
const POST_CREATE_NEW_ROLL = `${SELLER_BASE_URL}/sellerRole/createSellerRole`;
const POST_GET_ALL_ROLES_DATA = `${SELLER_BASE_URL}/sellerRole/fetchAllSellerRole`;
const POST_GET_ALL_INITIAL_MENU = `${SELLER_BASE_URL}/sellerMenu/getSellerMenus`;
const POST_UPDATE_SELLER_ROLE = `${SELLER_BASE_URL}/sellerRole/updateSellerRole`;
const POST_DELETE_ROLE_DATA = `${SELLER_BASE_URL}/sellerRole/deleteSellerRole`;
const POST_FETCH_SELLER_ROLE = `${SELLER_BASE_URL}/sellerRole/fetchSellerRole`;

//User Management
const POST_CREATE_NEW_USER = `${SELLER_BASE_URL}/sellerUser/createSellerUser`;
const POST_DELETE_USER_DATA = `${SELLER_BASE_URL}/sellerUser/deleteSellerUser`;
const POST_GET_ALL_USER_DATA = `${SELLER_BASE_URL}/sellerUser/getSellerUser`;
const POST_UPDATE_USER_DATA = `${SELLER_BASE_URL}/sellerUser/updateSellerUser`;

// Courier Pricing List
const COURIER_PRICING = `${SELLER_URL}/api/v1/sellerPlans/getSellerPlanWithRates`;

// CREATE BULK PRODUCT
const CREATE_BULK_PRODUCT = `${SELLER_BASE_URL}/product/createBulkProduct`;
const GET_PRODUCTS = `${SELLER_BASE_URL}/product/getProduct`;

//COMBO PRODUCTS
//create combo
const CREATE_COMBO_PRODUCT = `${SELLER_BASE_URL}/comboProduct/createComboProduct`;
//get combo
const GET_COMBO_PRODUCT = `${SELLER_BASE_URL}/comboProduct/getComboProduct`;

//Landmark endpoint
const LANDMARK_API = `${LANDMARK_URL}/api/v1/landmark/landmark`;

//BulkUpload
const BULK_UPLOAD = `${SELLER_BASE_URL}/order/placeBulkOrder`;

//bulk upload products
const BULK_PRODUCT_UPLOAD = `${SELLER_BASE_URL}/product/uploadBulkProduct`;
const DOWNLOAD_SAMPLE_PRODUCT = `${SELLER_BASE_URL}/product/downloadSampleProduct`;

//Forgot Password
const FORGOT_PASSWORD = `${SELLER_BASE_URL}/seller/forgotPassword`;
const VERIFY_FORGET_PASSWORD = `${SELLER_BASE_URL}/seller/verifyForgotPassword`;
const LOGOUT = `${SELLER_BASE_URL}/seller/logout`;

// System Logs
const GET_SYSTEM_LOG = `${SELLER_BASE_URL}/seller/getSystemLog`;

const GET_SINGLE_FILE = `${SELLER_BASE_URL}/fileManagement/getSingleFile`;
//Channel Store
const POST_CREATE_STORE = `${SELLER_BASE_URL}/channel/shopify/createShopifyStore`;
const GET_ALL_STORES = `${SELLER_BASE_URL}/channel/getStores`;
const GET_SINGLE_STORE = `${SELLER_BASE_URL}/channel/shopify/getSingleStore`;
const UPDATE_SINGLE_STORE = `${SELLER_BASE_URL}/channel/shopify/updateStore`;
const CREATE_WOOCOMMERCE_STORE = `${SELLER_BASE_URL}/channel/woocommerce/createWCStore`;
const UPDATE_WOOCOMMERCE_STORE = `${SELLER_BASE_URL}/channel/woocommerce/updateWCStore`;

//Returing User
const RETURNING_USER_PICKUP = `${SELLER_BASE_URL}/pickupAddress/getPickupAddress`;
const RETURNING_USER_DELIVERY = `${SELLER_BASE_URL}/deliveryAddress/getDeliveryAddress`;

//Tracking
const TRACKING = `${TRACKING_URL}/api/v1/tracking/getTracking`;

//feedback
//feedback
const CREATE_FEEDBACK = `${SELLER_BASE_URL}/feedback/createFeedback`;
const GET_FEEDBACK = `${SELLER_BASE_URL}/feedback/getFeedback`;

//Serviceability URL
const POST_SERVICEABILITY = `${SELLER_BASE_URL}/order/checkServiceability`;
const GET_COMPANY_SERVICE = `${SELLER_URL}/api/v1/seller/getCompanyService`;

//Dashboard URL
const GET_DASHBOARD_INFO = `${SELLER_URL}/api/v1/order/orderDashboardCardDetails`;

//Invoice Download
const INVOICE_DOWNLOAD_URL = `${SELLER_BASE_URL}/order/generateInvoicePDF`;
const GET_ALL_INVOICES = `${SELLER_BASE_URL}/order/getAllInvoiceData`;

export {
  DOWNLOAD_SAMPLE_PRODUCT,
  UPDATE_SELLER_BOX,
  GET_CATEGOROIES,
  SELLER_URL,
  ADD_BOX_INFO,
  DELETE_SELLER_BOX,
  BULK_PRODUCT_UPLOAD,
  CREATE_SELLER_BOX,
  GET_SINGLE_FILE,
  GET_SELLER_ORDER,
  ADD_COD_INFO,
  POST_SIGN_IN_URL,
  POST_SIGN_UP_URL,
  GET_SELLER_BOX,
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
  ADD_PICKUP_ADDRESS,
  UPDATE_PICKUP_ADDRESS,
  GET_DELIVERY_ADDRESS,
  ADD_DELIVERY_ADDRESS,
  UPDATE_DELIVERY_ADDRESS,
  GET_SELLER_BOX_DETAILS,
  GET_COMPANY_BOX_DETAILS,
  GET_LATEST_ORDER,
  GET_PRODUCT_URL,
  GET_COMBO_PRODUCT_URL,
  INITIAL_RECHARGE,
  RECHARGE_STATUS,
  GET_SELLER_COMPANY_BOX,
  GET_CURRENT_WALLET,
  VALIDATE_USER_TOKEN,
  POST_ADD_BANK_DETAILS,
  GET_SERVICABLE_PINCODE,
  POST_ADD_PRODUCT,
  ADD_COMBO_PRODUCT_URL,
  GET_PACKAGE_INSURANCE,
  PLACE_ORDER,
  GET_PLAN_URL,
  VERIFY_ADDRESS,
  GET_WALLET_TRANSACTION,
  POST_SIGN_UP_WITH_GOOGLE_URL,
  POST_SIGN_IN_WITH_GOOGLE_URL,
  GST_AGREEMENTS,
  POST_GET_ALL_ROLES_DATA,
  POST_GET_ALL_INITIAL_MENU,
  POST_UPDATE_SELLER_ROLE,
  POST_FETCH_SELLER_ROLE,
  POST_DELETE_ROLE_DATA,
  POST_CREATE_NEW_ROLL,
  POST_GET_ALL_USER_DATA,
  POST_DELETE_USER_DATA,
  POST_CREATE_NEW_USER,
  POST_UPDATE_USER_DATA,
  POST_SET_ORDER_ID,
  GET_ALL_PLANS,
  POST_CREATE_PLAN,
  COURIER_PRICING,
  CREATE_BULK_PRODUCT,
  GET_PRODUCTS,
  CREATE_COMBO_PRODUCT,
  GET_COMBO_PRODUCT,
  POST_PLACE_ORDER,
  LANDMARK_API,
  BULK_UPLOAD,
  FORGOT_PASSWORD,
  VERIFY_FORGET_PASSWORD,
  POST_CREATE_STORE,
  GET_ALL_STORES,
  GET_SINGLE_STORE,
  UPDATE_SINGLE_STORE,
  RETURNING_USER_PICKUP,
  RETURNING_USER_DELIVERY,
  TRACKING,
  GET_SYSTEM_LOG,
  LOGOUT,
  PHONEPE_INIT_TRANSACTION,
  PHONEPE_TRANSACTION_STATUS,
  POST_UPDATE_PRODUCT,
  GET_ORDER_BY_ID,
  GET_PINCODE_DATA,
  CANCEL_WAY_BILL,
  CREATE_WOOCOMMERCE_STORE,
  UPDATE_WOOCOMMERCE_STORE,
  CANCEL_TEMP_SELLER_ORDER,
  POST_SERVICEABILITY,
  GET_COMPANY_SERVICE,
  ADD_PICKUP_ADDRESS_CATALOGUE,
  CREATE_FEEDBACK,
  GET_FEEDBACK,
  GET_DASHBOARD_INFO,
  INVOICE_DOWNLOAD_URL,
  GET_ALL_INVOICES,
};
