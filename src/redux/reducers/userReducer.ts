import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define a type for the slice state
interface UserState {
  id: string | null;
  name: string | null;
  email: string | null;
  loggedIn: boolean;
}

// Define the initial state using that type
const initialState: UserState = {
  id: null,
  name: null,
  email: null,
  loggedIn: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (
      state,
      action: PayloadAction<{ id: string; name: string; email: string }>
    ) => {
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.loggedIn = true;
    },
    logout: (state) => {
      state.id = null;
      state.name = null;
      state.email = null;
      state.loggedIn = false;
    },
    // other reducers...
  },
});

export const { login, logout } = userSlice.actions;
