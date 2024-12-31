import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface DashboardRevenueState {
  revenueData: any; // The actual data fetched from API
  revenueLoading: boolean;
  revenueError: string | null;
}

const initialState: DashboardRevenueState = {
  revenueData: null,
  revenueLoading: false,
  revenueError: null,
};

export const dashboardRevenueSlice = createSlice({
  name: "dashboardRevenue",
  initialState,
  reducers: {
    setRevenueLoading(state, action: PayloadAction<boolean>) {
      state.revenueLoading = action.payload;
    },
    clearRevenueLoading(state) {
      state.revenueLoading = false;
    },
    setRevenueData(state, action: PayloadAction<any>) {
      state.revenueLoading = false;
      state.revenueData = action.payload;
    },
    setRevenueError(state, action: PayloadAction<string>) {
      state.revenueLoading = false;
      state.revenueError = action.payload;
    },
  },
});

export const {
  setRevenueLoading,
  clearRevenueLoading,
  setRevenueData,
  setRevenueError,
} = dashboardRevenueSlice.actions;
export default dashboardRevenueSlice.reducer;
