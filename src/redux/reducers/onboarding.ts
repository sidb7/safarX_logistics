import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define a type for the slice state
interface OnboardingState {
  businessType?: string;
  gstNumber?: string;
  panNumber?: string;
  aadharNumber?: number;
  onOtpClientId?: string;
  acceptTnCStatus?: boolean;
  otp?: number;
  verifyForOtpBtn?: {
    aadharVerify?: boolean;
    gstVerify?: boolean;
    panVerify?: boolean;
  };
  otpFormBtnStatus?: boolean;
  errorDetails?: {
    gstError?: string;
    panError?: string;
    aadharError?: string;
    otpError?: string;
  };
  navigateOnOtpFormVerify?: {
    aadharVerifyNavigate?: boolean;
    gstVerifyNavigate?: boolean;
    panVerifyNavigate?: boolean;
  };
  aadharNumberProprietor?: {
    aadharNumber?: number;
    otpBtnStatus?: boolean;
    aadharError?: string;
  };
}

// Define the initial state using that type
const initialState: OnboardingState = {
  businessType: "individual",
  gstNumber: "",
  panNumber: "",
  aadharNumber: 0,
  otp: 0,
  onOtpClientId: "gst_otp_qmefuaqpocskbwibegOZ",
  otpFormBtnStatus: false,
  acceptTnCStatus: false,
  verifyForOtpBtn: {
    aadharVerify: false,
    gstVerify: false,
    panVerify: false,
  },
  errorDetails: {
    gstError: "",
    panError: "",
    aadharError: "",
    otpError: "",
  },
  navigateOnOtpFormVerify: {
    aadharVerifyNavigate: false,
    gstVerifyNavigate: false,
    panVerifyNavigate: false,
  },
  aadharNumberProprietor: {
    aadharNumber: 0,
    otpBtnStatus: false,
    aadharError: "",
  },
};

export const onboardingSlice = createSlice({
  name: "onboarding",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setBusinessType: (state, action) => {
      state.businessType = action.payload;
    },
    setGSTNumber: (state, action) => {
      state.gstNumber = action.payload;
    },
    setPANNumber: (state, action) => {
      state.panNumber = action.payload;
    },
    setAadharNumber: (state, action) => {
      state.aadharNumber = action.payload;
    },
    setOTPNumber: (state, action) => {
      state.otp = action.payload;
    },
    setOnOtpClientId: (state, action) => {
      state.onOtpClientId = action.payload;
    },
    setOtpFormBtnStatus: (state, action) => {
      state.otpFormBtnStatus = action.payload;
    },
    setAcceptTnCStatus: (state, action) => {
      state.acceptTnCStatus = action.payload;
    },
    setErrorDetails: (
      state,
      action: PayloadAction<{
        gstError?: string;
        panError?: string;
        aadharError?: string;
        otpError?: string;
      }>
    ) => {
      state.errorDetails = {
        ...state.errorDetails,
        ...action.payload,
      };
    },

    setVerifyDetailsForOtpBtn: (
      state,
      action: PayloadAction<{
        aadharVerify?: boolean;
        gstVerify?: boolean;
        panVerify?: boolean;
      }>
    ) => {
      state.verifyForOtpBtn = {
        ...state.verifyForOtpBtn,
        ...action.payload,
      };
    },

    setNavigateOnOtpFormVerify: (
      state,
      action: PayloadAction<{
        aadharVerifyNavigate?: boolean;
        gstVerifyNavigate?: boolean;
        panVerifyNavigate?: boolean;
      }>
    ) => {
      state.navigateOnOtpFormVerify = {
        ...state.navigateOnOtpFormVerify,
        ...action.payload,
      };
    },

    setAadharNumberProprietor: (
      state,
      action: PayloadAction<{
        aadharNumber?: number;
        otpBtnStatus?: boolean;
        aadharError?: string;
      }>
    ) => {
      state.aadharNumberProprietor = {
        ...state.aadharNumberProprietor,
        ...action.payload,
      };
    },
  },
});

export const {
  setBusinessType,
  setGSTNumber,
  setPANNumber,
  setAadharNumber,
  setOTPNumber,
  setErrorDetails,
  setOnOtpClientId,
  setOtpFormBtnStatus,
  setVerifyDetailsForOtpBtn,
  setNavigateOnOtpFormVerify,
  setAadharNumberProprietor,
  setAcceptTnCStatus,
} = onboardingSlice.actions;

export default onboardingSlice.reducer;
