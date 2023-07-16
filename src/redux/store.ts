import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";
import PaymentSlice from "./reducers/paymentReducer";

const store = configureStore({
  reducer: {
    rootReducer, 
  payment: PaymentSlice,
  }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
