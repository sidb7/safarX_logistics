import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SignInState {
  emailId: string;
}

const initialState: SignInState = {
  emailId: "",
};

export const SignInSlice = createSlice({
  name: "signin",
  initialState,
  reducers: {
    signInUser: (
      state,
      action: PayloadAction<{
        emailId: string;
      }>
    ) => {
      state.emailId = action.payload.emailId;
    },
  },
});
export const { signInUser } = SignInSlice.actions;
