import { createSlice } from "@reduxjs/toolkit";

export const paginationSlice = createSlice({
  name: "dropdown",
  initialState: {
    value: 10,
  },
  reducers: {
    updateDropdownValue: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { updateDropdownValue } = paginationSlice.actions;

export default paginationSlice.reducer;
