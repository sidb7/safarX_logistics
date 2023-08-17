import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SignUpState {
  email: string;
  firstName: string;
  lastName: string;
  mobileNo?: number;
  referalCode?: string;
  password?: string;
}

const initialState: SignUpState = {
  email: "",
  firstName: "",
  lastName: "",
  mobileNo: 0,
  referalCode: "",
  password: "",
};

export const SignupSlice = createSlice({
  name: "signup",
  initialState,
  reducers: {
    signUpUser: (
      state,
      action: PayloadAction<{
        email: string;
        firstName: string;
        lastName: string;
        mobileNo: number;
        referalCode: string;
        password: string;
      }>
    ) => {
      state.email = action.payload.email;
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      state.mobileNo = action.payload.mobileNo;
      state.referalCode = action.payload.referalCode;
      state.password = action.payload.password;
    },
  },
});
export const { signUpUser } = SignupSlice.actions;
