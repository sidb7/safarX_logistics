import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PaymentState {
  payNow: boolean;
  yaariPointsAvail: boolean;
  amount: number;
}

const initialState: PaymentState = {
  payNow: false,
  yaariPointsAvail: false,
  amount: 0,
};

export const PaymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {
    paymentState: (state, action) => {
      state.payNow = action.payload;
    },
    yaariPointsAvailState: (state, action) => {
      state.yaariPointsAvail = action.payload;
    },
    paymentAmount: (state, action) => {
      state.amount = action.payload;
    },
  },
});

export const { paymentState, yaariPointsAvailState, paymentAmount } =
  PaymentSlice.actions;
