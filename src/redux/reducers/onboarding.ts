import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define a type for the slice state
interface OnboardingState {
  businessType?: string;
  gstNumber?: string;
  panNumber?: string;
  aadharNumber?: number;
  onOtpClientId?: string;
  otp?: number;
  otpFormBtnStatus?: boolean;
  errorDetails?: {
    gstError?: string;
    panError?: string;
    aadharError?: string;
    otpError?: string;
  };
}

// Define the initial state using that type
const initialState: OnboardingState = {
  businessType: "individual",
  gstNumber: "",
  panNumber: "",
  aadharNumber: 0,
  otp: 0,
  onOtpClientId: "",
  otpFormBtnStatus: false,

  errorDetails: {
    gstError: "",
    panError: "",
    aadharError: "",
    otpError: "",
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
} = onboardingSlice.actions;

export default onboardingSlice.reducer;
