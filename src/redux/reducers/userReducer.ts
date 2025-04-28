import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define a type for the slice state
interface UserState {
  id: string | null;
  name: string | null;
  email: string | null;
  loggedIn: boolean;
  isReturningUser: boolean;
  walletBalance: number;
  yaariCash?: number;
  isMasked: boolean;
}

// Define the initial state using that type
const initialState: UserState = {
  id: null,
  name: null,
  email: null,
  loggedIn: false,
  isReturningUser: true,
  walletBalance: 0,
  yaariCash: 0,
  isMasked: true,
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
    setWalletBalance: (state, action: PayloadAction<{ amt: number }>) => {
      state.walletBalance = action.payload.amt;
    },
    setYaariCashBalance: (state, action: PayloadAction<{ amt: number }>) => {
      state.yaariCash = action.payload.amt;
    },
    isMasked: (state, action) => {
      state.isMasked = action.payload.isMasked;
    },
    // other reducers...
  },
});

export const { login, logout, setWalletBalance, setYaariCashBalance, isMasked } = userSlice.actions;
export default userSlice.reducer;
