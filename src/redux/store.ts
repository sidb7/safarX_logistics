import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./reducers/userReducer";
import { PaymentSlice } from "./reducers/paymentReducer";
import { mapSlice } from "./reducers/mapReducer";

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    payment: PaymentSlice.reducer,
    map: mapSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = ReturnType<typeof store.dispatch>;
