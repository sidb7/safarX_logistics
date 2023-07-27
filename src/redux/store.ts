import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./reducers/userReducer";
import { PaymentSlice } from "./reducers/paymentReducer";
import { mapSlice } from "./reducers/mapReducer";
import { SignupSlice } from "./reducers/signUpReducer";
import { SignInSlice } from "./reducers/signInReducer";
import { catalogueSlice } from "./reducers/catalogue";

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    payment: PaymentSlice.reducer,
    map: mapSlice.reducer,
    signup: SignupSlice.reducer,
    signin: SignInSlice.reducer,
    catalogue : catalogueSlice.reducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = ReturnType<typeof store.dispatch>;
