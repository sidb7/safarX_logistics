import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./reducers/userReducer";
import { PaymentSlice } from "./reducers/paymentReducer";
import { roleSlice } from "./reducers/role";
import { mapSlice } from "./reducers/mapReducer";
import { SignupSlice } from "./reducers/signUpReducer";
import { SignInSlice } from "./reducers/signInReducer";
import { catalogueSlice } from "./reducers/catalogue";
import { onboardingSlice } from "./reducers/onboarding";
import { Environment } from "../utils/ApiUrls";
import { ChannelSlice } from "./reducers/syncChannel";
import { paginationSlice } from "./reducers/paginationReducer";
import { buttonFlagSlice } from "./reducers/updateButtonReducer";
import { dashboardOrderSlice } from "./reducers/dashboardOrderReducer";
import { dashboardRevenueSlice } from "./reducers/dashboardRevenueReducer";
import { dashboardExceptionSlice } from "./reducers/dashboardExceptionReducer";
import { notificationSlice } from "./reducers/notificationReducer";
export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    payment: PaymentSlice.reducer,
    map: mapSlice.reducer,
    roles: roleSlice.reducer,
    signup: SignupSlice.reducer,
    signin: SignInSlice.reducer,
    catalogue: catalogueSlice.reducer,
    onboarding: onboardingSlice.reducer,
    channel: ChannelSlice.reducer,
    paginationSlice: paginationSlice.reducer,
    buttonFlagSlice: buttonFlagSlice.reducer,
    dashboardOrder: dashboardOrderSlice.reducer,
    dashboardRevenue: dashboardRevenueSlice.reducer,
    dashboardException: dashboardExceptionSlice.reducer,
    notifications: notificationSlice.reducer,
  },
  devTools: Environment !== "production" ? true : false,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = ReturnType<typeof store.dispatch>;
