import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SignInState {
  email: string;
}

const initialState: SignInState = {
  email: "",
};

export const SignInSlice = createSlice({
  name: "signin",
  initialState,
  reducers: {
    signInUser: (
      state,
      action: PayloadAction<{
        email: string;
      }>
    ) => {
      state.email = action.payload.email;
    },
  },
});
export const { signInUser } = SignInSlice.actions;
