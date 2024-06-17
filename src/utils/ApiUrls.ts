export let Environment = "";
export let SELLER_WEB_URL = "";
let SELLER_URL = "";
let PARTNER_URL = "";
let FILE_SERVER_URL = "";
let PAYMENT_URL = "";
let LANDMARK_URL = "";
let TRACKING_URL = "";
let REACT_APP_GTM_ID = "";
let REACT_APP_GA4_ID = "";
let ADMIN_URL = "";
let SMALL_LOGO = "";
let LARGE_LOGO = "";
let COMPANY_NAME = "";
// Environment Declaration
Environment = process.env.REACT_APP_ENV || "development";
// console.log("🚀 ~ Environment:5454", process.env.REACT_APP_SELLER_DEV);

// console.log(process.env.REACT_APP_SELLER_DEV, "biswjit");

switch (Environment) {
  case "development":
    SELLER_URL = `${process.env?.REACT_APP_SELLER_DEV || "Env Not available"}`;
    //||
    // "https://sysellerconsoledev.yaarilabs.com";
    REACT_APP_GTM_ID = `${process.env.REACT_APP_GTM_ID}`;
    REACT_APP_GA4_ID = `${process.env.REACT_APP_GA4_ID}`;
    PARTNER_URL = `${process.env.REACT_APP_PARTNER_DEV}`;
    FILE_SERVER_URL = `${process.env.REACT_APP_FILE_SERVER_DEV}`;
    PAYMENT_URL = `${process.env.REACT_APP_PAYMENT_DEV}`;
    LANDMARK_URL = `${process.env.REACT_APP_LANDMARK_DEV}`;
    TRACKING_URL = `${process.env.REACT_APP_TRACKING_URL_DEV}`;
    SELLER_WEB_URL = `${process.env.REACT_APP_SELLER_WEB_URL_DEV}`;
    ADMIN_URL = `${process.env.REACT_APP_ADMIN_DEV}`;
    SMALL_LOGO = `${process.env.REACT_APP_SMALL_LOGO}`;
    LARGE_LOGO = `${process.env.REACT_APP_LARGE_LOGO}`;
    COMPANY_NAME = `${process.env.REACT_APP_WHITE_COMPANYNAME}`;
    break;

  case "test":
    SELLER_URL = `${process.env?.REACT_APP_SELLER_TEST || "Env Not available"}`;
    // ||
    // "https://sysellerconsoledev.yaarilabs.com";
    PARTNER_URL = `${process.env.REACT_APP_PARTNER_TEST}`;
    FILE_SERVER_URL = `${process.env.REACT_APP_FILE_SERVER_TEST}`;
    REACT_APP_GTM_ID = `${process.env.REACT_APP_GTM_ID}`;
    REACT_APP_GA4_ID = `${process.env.REACT_APP_GA4_ID}`;
    PAYMENT_URL = `${process.env.REACT_APP_PAYMENT_TEST}`;
    LANDMARK_URL = `${process.env.REACT_APP_LANDMARK_TEST}`;
    TRACKING_URL = `${process.env.REACT_APP_TRACKING_URL_TEST}`;
    SELLER_WEB_URL = `${process.env.REACT_APP_SELLER_WEB_URL_TEST}`;
    ADMIN_URL = `${process.env.REACT_APP_ADMIN_DEV}`;
    SMALL_LOGO = `${process.env.REACT_APP_SMALL_LOGO}`;
    LARGE_LOGO = `${process.env.REACT_APP_LARGE_LOGO}`;
    COMPANY_NAME = `${process.env.REACT_APP_WHITE_COMPANYNAME}`;

    break;

  case "production":
    SELLER_URL = `${process.env?.REACT_APP_SELLER_PROD || "Env Not available"}`;
    PARTNER_URL = `${process.env.REACT_APP_PARTNER_PROD}`;
    FILE_SERVER_URL = `${process.env.REACT_APP_FILE_SERVER_PROD}`;
    REACT_APP_GTM_ID = `${process.env.REACT_APP_GTM_ID}`;
    REACT_APP_GA4_ID = `${process.env.REACT_APP_GA4_ID}`;
    PAYMENT_URL = `${process.env.REACT_APP_PAYMENT_PROD}`;
    LANDMARK_URL = `${process.env.REACT_APP_LANDMARK_PROD}`;
    TRACKING_URL = `${process.env.REACT_APP_TRACKING_URL_PROD}`;
    SELLER_WEB_URL = `${process.env.REACT_APP_SELLER_WEB_URL_PROD}`;
    ADMIN_URL = `${process.env.REACT_APP_ADMIN_PROD}`;
    SMALL_LOGO = `${process.env.REACT_APP_SMALL_LOGO}`;
    LARGE_LOGO = `${process.env.REACT_APP_LARGE_LOGO}`;
    COMPANY_NAME = `${process.env.REACT_APP_WHITE_COMPANYNAME}`;

    break;

  default:
    SELLER_URL = `${
      process.env?.REACT_APP_SELLER_LOCAL || "Env Not available"
    }`;
    //||
    //  "https://sysellerconsoledev.yaarilabs.com";
    PARTNER_URL = `${process.env.REACT_APP_PARTNER_LOCAL}`;
    FILE_SERVER_URL = `${process.env.REACT_APP_FILE_SERVER_LOCAL}`;
    REACT_APP_GTM_ID = `${process.env.REACT_APP_GTM_ID}`;
    REACT_APP_GA4_ID = `${process.env.REACT_APP_GA4_ID}`;
    PAYMENT_URL = `${process.env.REACT_APP_PAYMENT_LOCAL}`;
    LANDMARK_URL = `${process.env.REACT_APP_LANDMARK_LOCAL}`;
    TRACKING_URL = `${process.env.REACT_APP_TRACKING_URL_LOCAL}`;
    ADMIN_URL = `${process.env.REACT_APP_ADMIN_LOCAL}`;
    SELLER_WEB_URL = `http://localhost:3000`;

    break;
}

// console.log(SELLER_URL, "jnjnjj");

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
const POST_SKIP_FOR_NOW_TRACKER = `${SELLER_BASE_URL}/seller/skipFornowLog`;

// Profile URLs
const GET_PROFILE_URL = `${SELLER_BASE_URL}/seller/getSingleSeller`;
const GET_PROFILE_NOTIFICATION = `${SELLER_BASE_URL}/notification/readNotification`;
const UPDATE_PROFILE_NOTIFICATION = `${SELLER_BASE_URL}/notification/updateNotification`;
const UPDATE_SELLER = `${SELLER_BASE_URL}/seller/updateSingleSeller`;
const UPDATE_PASSWORD = `${SELLER_BASE_URL}/seller/changePassword`;
const DELETE_SELLER = `${SELLER_BASE_URL}/seller/deleteSingleSeller`;
const LOGO_AND_BRAND = `${SELLER_BASE_URL}/seller/updateLogoAndBrand`;

// Order URLs
// const GET_SELLER_ORDER = `${SELLER_BASE_URL}/order/getSellerOrder`;
const GET_STATUS_COUNT = `${SELLER_BASE_URL}/order/getOrderCountIn`;
const GET_SELLER_ORDER = `${SELLER_BASE_URL}/order/getSellerOrderIN`;
const GET_ORDER_BY_ID = `${SELLER_BASE_URL}/order/getOrderById`;
const CANCEL_WAY_BILL = `${SELLER_BASE_URL}/order/cancelWayBill`;
const CANCEL_TEMP_SELLER_ORDER = `${SELLER_BASE_URL}/order/deleteTempOrder`;
const GET_ORDER_ERRORS = `${SELLER_BASE_URL}/order/tempOrderBoxCountError`;
//NewOrder URLs
const VERIFY_ADDRESS = `${SELLER_BASE_URL}/seller/verifyAddress`;
const UPDATE_TEMP_ORDER_INFO = `${SELLER_BASE_URL}/order/updateTempOrderInfo`;

const ADD_PICKUP_LOCATION = `${SELLER_BASE_URL}/order/addPickupAddress`;
const ADD_DELIVERY_LOCATION = `${SELLER_BASE_URL}/order/addDeliveryAddress`;
const GET_COURIER_PARTNER_SERVICE = `${SELLER_BASE_URL}/order/getAvailableService`;
const SET_PARTNER_SERVICE_INFO = `${SELLER_BASE_URL}/order/setServiceInfo`;
const SET_WEIGHT_INFO_ORDER = `${SELLER_BASE_URL}/order/setWeightInfoForOrder`;

const PLACE_ORDER = `${SELLER_BASE_URL}/order/payOrderAmount`;
// const LANDMARK_API = `${SELLER_BASE_URL}/landmark/landmark`;
const POST_SET_ORDER_ID = `${SELLER_BASE_URL}/order/setOrderId`;
const POST_PLACE_ORDER = `${SELLER_BASE_URL}/order/placeOrder`;
const SEARCH_PINCODE = `${SELLER_BASE_URL}/pincodes/searchingPincode`;

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
const UPLOAD_BULK_BOXES = `${SELLER_BASE_URL}/box/uploadBulkBox`;

//Combo Product URL
const GET_COMBO_PRODUCT_URL = `${SELLER_URL}/api/v1/newComboProduct/getComboProduct`;
const ADD_COMBO_PRODUCT_URL = `${SELLER_URL}/api/v1/newComboProduct/addNewComboProduct`;
const ADD_COD_INFO = `${SELLER_URL}/api/v1/order/addCodInfo`;
const GET_PACKAGE_INSURANCE = `${SELLER_URL}/api/v1/order/addInsuranceInfo`;

//catalogue URLs
const GET_PICKUP_ADDRESS = `${SELLER_BASE_URL}/pickupAddress/getPickupAddress`;
const ACTIVATE_PICKUP_ADDRESS = `${SELLER_BASE_URL}/pickupAddress/activatePickupAddress`;
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

const GET_WALLET_BALANCE = `${SELLER_BASE_URL}/wallet/getAmountBlazeToPhp`; // BlazeToPhp money swap into to and from
const POST_WALLET_BALANCE = `${SELLER_BASE_URL}/wallet/creditDebitAmountBlazeToPhp`; // money transfer

// Validate Token
const VALIDATE_USER_TOKEN = `${SELLER_URL}/api/v1/seller/validatetoken`;
const ADD_PICKUP_ADDRESS = `${SELLER_BASE_URL}/pickupAddress/createPickupLocation`;
const ADD_PICKUP_ADDRESS_CATALOGUE = `${SELLER_BASE_URL}/pickupAddress/createPickupAddress`;
const UPDATE_PICKUP_ADDRESS = `${SELLER_BASE_URL}/pickupAddress/updatePickupAddress`;
const ADD_DELIVERY_ADDRESS = `${SELLER_BASE_URL}/deliveryAddress/createDeliveryAddress`;
const UPDATE_DELIVERY_ADDRESS = `${SELLER_BASE_URL}/deliveryAddress/updateDeliveryAddress`;
const DELETE_PICKUP_ADDRESS = `${SELLER_BASE_URL}/pickupAddress/deletePickupAddress`;
const DELETE_DELIVERY_ADDRESS = `${SELLER_BASE_URL}/deliveryAddress/deleteDeliveryAddress`;

//servicable-pincode
const GET_SERVICABLE_PINCODE = `${SELLER_BASE_URL}/pincodes/checkServiceable`;

//Pincode Data for Address
const GET_PINCODE_DATA = `${SELLER_BASE_URL}/pincodes/getPincodeDetails`;

//Plan
const GET_PLAN_URL = `${SELLER_BASE_URL}/sellerPlans/getSellerPlan`;
const GET_ALL_PLANS = `${SELLER_BASE_URL}/sellerPlans/getAllCompanyPlanBySeller`;
const POST_CREATE_PLAN = `${SELLER_BASE_URL}/sellerPlans/createSellerPlan`;
const GET_PENDING_PLANS = `${SELLER_BASE_URL}/seller/pendingPlans`;
const POST_ASSIGN_PLANV3 = `${SELLER_BASE_URL}/seller/assignPlanV4`;
const GET_PLANS_PREVIEW = `${SELLER_BASE_URL}/sellerPlans/planPreview`;

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
const DELETE_PRODUCT = `${SELLER_BASE_URL}/product/deleteProduct`;

//COMBO PRODUCTS
//create combo
const CREATE_COMBO_PRODUCT = `${SELLER_BASE_URL}/comboProduct/createComboProduct`;
const DELETE_COMBO_PRODUCT = `${SELLER_BASE_URL}/comboProduct/deleteComboProduct`;
//get combo
const GET_COMBO_PRODUCT = `${SELLER_BASE_URL}/comboProduct/getComboProduct`;
const GET_COMBO_PRODUCT_SHEET = `${SELLER_BASE_URL}/comboProduct/generateExcelSheet`;
const UPLOAD_BULK_COMBOS = `${SELLER_BASE_URL}/comboProduct/uploadComboProduct`;

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
const CHANGE_PASSWORD = `${SELLER_BASE_URL}/seller/changePasswordv2`;

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
const UPDATE_EXPIRED_WC_TOKEN = `${SELLER_BASE_URL}/channel/woocommerce/updateExpireToken`;
const CREATE_ZOHO_STORE = `${SELLER_BASE_URL}/channel/zoho/createZohoStore`;
const CREATE_AMAZON_STORE = `${SELLER_BASE_URL}/channel/amazon/createAmazonStore`;
const DELETE_INTEGRATED_STORE = `${SELLER_BASE_URL}/channel/deleteStore `;
const CREATE_UNICOMMERCE_STORE = `${SELLER_BASE_URL}/channel/unicommerce/createUCStore`;
const UPDATE_EXPIRED_TOKEN = `${SELLER_BASE_URL}/channel/updateExpireToken`;

//Returing User
const RETURNING_USER_PICKUP = `${SELLER_BASE_URL}/pickupAddress/getPickupAddress`;
const RETURNING_USER_DELIVERY = `${SELLER_BASE_URL}/deliveryAddress/getDeliveryAddress`;

//Tracking
const TRACKING = `${SELLER_URL}/api/v1/tracking/getTracking`;
const GET_CLIENTTRACKING_INFO = `${SELLER_URL}/api/v1/tracking/getTracking`;

//feedback
const CREATE_FEEDBACK = `${SELLER_BASE_URL}/feedback/createFeedback`;
const GET_FEEDBACK = `${SELLER_BASE_URL}/feedback/getFeedback`;

//Serviceability URL
const POST_SERVICEABILITY = `${SELLER_BASE_URL}/order/checkServiceability`;
const GET_COMPANY_SERVICE = `${SELLER_URL}/api/v1/seller/getCompanyService`;

//Dashboard URL
const GET_DASHBOARD_INFO = `${SELLER_URL}/api/v1/order/orderDashboardCardDetails`;

const GET_DASHBOARD_INFO_REVENUE = `${SELLER_URL}/api/v1/order/orderDashboardCardRevenueAndorderDetails`;

//Invoice Download
const INVOICE_DOWNLOAD_URL = `${SELLER_BASE_URL}/order/generateInvoicePDF`;
const GET_ALL_INVOICES = `${SELLER_BASE_URL}/order/getAllInvoiceData`;

//Get all ParterList
const FETCH_ALL_PARTNER = `${SELLER_BASE_URL}/partners/getPartner`;
const FETCH_MANIFEST_DATA = `${SELLER_BASE_URL}/order/fetchManifest`;
const LEBEL_DOWNLOAD = `${SELLER_BASE_URL}/fileManagement/getMutipleFile`;
const FETCH_LABELS_REPORT_DOWNLOAD = `${SELLER_BASE_URL}/labels/fetchLabels`;
const FETCH_MULTI_TAX_REPORT_DOWNLOAD = `${SELLER_BASE_URL}/labels/fetchTaxInvoices`;

const FETCH_MANIFEST_REPORT_DATA = `${SELLER_BASE_URL}/order/downLoadInvoiceOrderDetails`;

const GET_SELLER_ORDER_COMPLETE_DATA = `${SELLER_BASE_URL}/order/getSellerOrderCompleteData`;

//Reports
const GET_REPORTS = `${SELLER_BASE_URL}/order/downloadShipMentReport`;
const CANCEL_MULTIPLE_WAYBILLS = `${SELLER_BASE_URL}/order/cancelMultipleWayBills`;

const GET_FILTERS_INFO_MENTIONFORORDER = `${SELLER_BASE_URL}/order/getFilltersInforMationForOrder`;

//Sync Order
const POST_SYNC_ORDER = `${SELLER_BASE_URL}/channel/shopify/fetchOrders`;

//Place Channel Orders
// const POST_PLACE_CHANNEL_ORDERS = `${SELLER_BASE_URL}/channel/placeChannelOrder`;
const POST_PLACE_ALL_ORDERS = `${SELLER_BASE_URL}/order/placeAllOrders`;

//label Setting
const POST_ADD_LABEL_DATA = `${SELLER_BASE_URL}/labels/setLabelSetting`;
const GET_ADD_LABEL_DATA = `${SELLER_BASE_URL}/labels/getLabelSetting`;

//
const UPDATE_PRODUCT_AND_BOX_DETAILS = `${SELLER_BASE_URL}/channel/updateProductAndBoxDetails`;
const GET_SERVICE_LIST_ORDER = `${SELLER_BASE_URL}/order/getServiceListOrder`;
const SET_SERVICE_INFO = `${SELLER_BASE_URL}/order/setServiceInfo`;
const UPDATE_OTHER_ORDER_DETAILS = `${SELLER_BASE_URL}/channel/updateOtherDetails`;

//Fetch Channel Inventory
const GET_CHANNEL_INVENTORY = `${SELLER_BASE_URL}/channel/getProducts`;
const GET_CHANNEL_INVENTORIES = `${SELLER_BASE_URL}/channel/getInventory`;
const UPDATE_ONE_CHANNEL_INVENTORY = `${SELLER_BASE_URL}/channel/updateOneChannelInventory`;
const UPDATE_TEMP_ORDER_ADDRESS = `${SELLER_BASE_URL}/channel/updateTempOrderAddress`;
const ORDERID_AND_EWAYBILLINFO = `${SELLER_BASE_URL}/order/setOrderIdAndEWayBillInfo`;

// External URL's

const AMAZON_BASE_URL = "https://sellercentral.amazon.in";

/* Billing */
const GET_COD_REMITTED = `${SELLER_BASE_URL}/billing/cod`;
const DOWNLOAD_COD_REMITTED = `${SELLER_BASE_URL}/billing/cod/downloadCodRemitReport`;

// RuleEngine
const FETCH_ALL_PARTNER_WITH_SERVICE = `${SELLER_BASE_URL}/ruleEngine/getAllPartner`;
const FETCH_ALL_CATEGOROIES = `${SELLER_BASE_URL}/categories/getOnlyCategories`;
const CREATE_RULE_SERVICE = `${SELLER_BASE_URL}/ruleEngine/createRuleEngine`;
const FETCH_RULE = `${SELLER_BASE_URL}/ruleEngine/fetchRuleEngine`;
const GET_ALLPARTNER_OFSELLER = `${SELLER_BASE_URL}/partners/getAllPartnersOfSeller`;
const UPDATE_ALLPARTNER_OF_SELLER = `${SELLER_BASE_URL}/partners/updataAllPartnersOfSeller`;
const GET_ALLPARTNERS_OF_RULEENGINE = `${SELLER_BASE_URL}/partners/getPartnersFromRuleEngine`;

// weight Management
const GET_WRIGHT_DISPUTE = `${SELLER_BASE_URL}/weightDispute/getDisputeInfo`;
const UPLOAD_DISPUTE_IMAGE = `${SELLER_BASE_URL}/weightDispute/uploadDisputeImages`;
const GET_MULTIPLE_FILE = `${SELLER_BASE_URL}/fileManagement/getMutipleFile`;
const DELETE_DISPUTE_IMAGES = `${SELLER_BASE_URL}/weightDispute/deleteDisputeImages`;
const ACCEPT_DISPUTE = `${SELLER_BASE_URL}/weightDispute/acceptDispute`;
const REJECT_DISPUTE = `${SELLER_BASE_URL}/weightDispute/rejectDispute`;

// Errors Handling API
const PAYMENT_ERRORS = `${SELLER_BASE_URL}/order/updatePaymentErrors`;

export {
  ADMIN_URL,
  GET_SELLER_ORDER_COMPLETE_DATA,
  REACT_APP_GTM_ID,
  REACT_APP_GA4_ID,
  GET_STATUS_COUNT,
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
  LEBEL_DOWNLOAD,
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
  GET_CLIENTTRACKING_INFO,
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
  FETCH_ALL_PARTNER,
  FETCH_MANIFEST_DATA,
  FETCH_MANIFEST_REPORT_DATA,
  CREATE_ZOHO_STORE,
  GET_REPORTS,
  CANCEL_MULTIPLE_WAYBILLS,
  DELETE_PICKUP_ADDRESS,
  DELETE_DELIVERY_ADDRESS,
  POST_SYNC_ORDER,
  POST_PLACE_ALL_ORDERS,
  GET_DASHBOARD_INFO_REVENUE,
  POST_ADD_LABEL_DATA,
  GET_CHANNEL_INVENTORY,
  GET_FILTERS_INFO_MENTIONFORORDER,
  DELETE_PRODUCT,
  DELETE_COMBO_PRODUCT,
  GET_ADD_LABEL_DATA,
  CREATE_AMAZON_STORE,
  AMAZON_BASE_URL,
  FETCH_LABELS_REPORT_DOWNLOAD,
  FETCH_MULTI_TAX_REPORT_DOWNLOAD,
  GET_CHANNEL_INVENTORIES,
  UPDATE_ONE_CHANNEL_INVENTORY,
  GET_ORDER_ERRORS,
  SET_WEIGHT_INFO_ORDER,
  LOGO_AND_BRAND,
  UPDATE_PRODUCT_AND_BOX_DETAILS,
  GET_SERVICE_LIST_ORDER,
  SET_SERVICE_INFO,
  GET_COD_REMITTED,
  UPDATE_TEMP_ORDER_ADDRESS,
  DOWNLOAD_COD_REMITTED,
  ORDERID_AND_EWAYBILLINFO,
  ACTIVATE_PICKUP_ADDRESS,
  POST_ASSIGN_PLANV3,
  DELETE_INTEGRATED_STORE,
  UPDATE_OTHER_ORDER_DETAILS,
  UPDATE_TEMP_ORDER_INFO,
  GET_PENDING_PLANS,
  GET_PLANS_PREVIEW,
  SEARCH_PINCODE,
  FETCH_ALL_PARTNER_WITH_SERVICE,
  FETCH_ALL_CATEGOROIES,
  CREATE_RULE_SERVICE,
  GET_WRIGHT_DISPUTE,
  UPLOAD_DISPUTE_IMAGE,
  GET_MULTIPLE_FILE,
  DELETE_DISPUTE_IMAGES,
  ACCEPT_DISPUTE,
  REJECT_DISPUTE,
  PAYMENT_ERRORS,
  CREATE_UNICOMMERCE_STORE,
  UPDATE_EXPIRED_TOKEN,
  FETCH_RULE,
  GET_WALLET_BALANCE,
  POST_WALLET_BALANCE,
  UPDATE_EXPIRED_WC_TOKEN,
  POST_SKIP_FOR_NOW_TRACKER,
  UPLOAD_BULK_BOXES,
  SMALL_LOGO,
  LARGE_LOGO,
  COMPANY_NAME,
  CHANGE_PASSWORD,
  GET_COMBO_PRODUCT_SHEET,
  UPLOAD_BULK_COMBOS,
  GET_ALLPARTNER_OFSELLER,
  UPDATE_ALLPARTNER_OF_SELLER,
  GET_ALLPARTNERS_OF_RULEENGINE,
};
