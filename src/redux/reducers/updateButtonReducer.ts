import { createSlice } from "@reduxjs/toolkit";

export const buttonFlagSlice = createSlice({
  name: "flag",
  initialState: {
    flag: false,
  },
  reducers: {
    updateButtonFlag: (state, action) => {
      state.flag = action.payload;
    },
  },
});

export const { updateButtonFlag } = buttonFlagSlice.actions;

export default buttonFlagSlice.reducer;
