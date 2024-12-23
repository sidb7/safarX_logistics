// src/reducers/dashboardSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the state shape
interface DashboardOrderState {
  data: any; // The actual data fetched from API
  loading: boolean;
  error: string | null;
}

const initialState: DashboardOrderState = {
  data: null,
  loading: false,
  error: null,
};

// Create the slice
export const dashboardOrderSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload; // This now sets isLoading based on the payload (true or false)
    },
    clearLoading(state) {
      state.loading = false; // Explicitly set to false if needed
    },
    setData(state, action: PayloadAction<any>) {
      state.loading = false;
      state.data = action.payload;
    },
    setError(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

// Export actions and reducer
export const { setLoading, clearLoading, setData, setError } =
  dashboardOrderSlice.actions;
export default dashboardOrderSlice.reducer;
