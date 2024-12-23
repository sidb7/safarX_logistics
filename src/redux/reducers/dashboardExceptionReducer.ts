import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface DashboardExceptionState {
  exceptionData: any; // The actual data fetched from API
  exceptionLoading: boolean;
  ExceptionError: string | null;
}

const initialState: DashboardExceptionState = {
  exceptionData: null,
  exceptionLoading: false,
  ExceptionError: null,
};

export const dashboardExceptionSlice = createSlice({
  name: "dashboardException",
  initialState,
  reducers: {
    setExceptionLoading(state, action: PayloadAction<boolean>) {
      state.exceptionLoading = action.payload;
    },
    clearExceptionLoading(state) {
      state.exceptionLoading = false;
    },
    setExceptionData(state, action: PayloadAction<any>) {
      state.exceptionLoading = false;
      state.exceptionData = action.payload;
    },
    setError(state, action: PayloadAction<string>) {
      state.exceptionLoading = false;
      state.ExceptionError = action.payload;
    },
  },
});

export const {
  setExceptionLoading,
  clearExceptionLoading,
  setExceptionData,
  setError,
} = dashboardExceptionSlice.actions;
export default dashboardExceptionSlice.reducer;
