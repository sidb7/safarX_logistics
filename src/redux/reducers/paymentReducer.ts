import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PaymentState {
    payNow: boolean;
    yaariPointsAvail : boolean;
}

const initialState: PaymentState = {
    payNow: false,
    yaariPointsAvail: false,
};

const PaymentSlice = createSlice({
    name: "payment",
    
    initialState,
    reducers: {
        paymentState: (state, action) => {
            state.payNow = action.payload;
          },
        yaariPointsAvailState: (state, action) => {
            state.yaariPointsAvail = action.payload;
        },
     
    },
  });
  
  export const { paymentState ,yaariPointsAvailState } = PaymentSlice.actions;
  
  export default PaymentSlice.reducer;