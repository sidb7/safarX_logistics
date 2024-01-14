import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SignInState {
  email: string;
  name: string;
}

const initialState: SignInState = {
  email: "",
  name: "",
};

export const SignInSlice = createSlice({
  name: "signin",
  initialState,
  reducers: {
    signInUser: (
      state,
      action: PayloadAction<{
        email: string;
        name: string;
      }>
    ) => {
      state.email = action.payload.email;
      state.name = action.payload.name;
    },
  },
});
export const { signInUser } = SignInSlice.actions;
