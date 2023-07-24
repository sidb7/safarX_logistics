import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define a type for the slice state
interface AddressState {
  address: string;
}

// Define the initial state using that type
const initialState: AddressState = {
  address: "",
};

export const mapSlice = createSlice({
  name: "map",
  initialState,
  reducers: {
    mapAddress: (state, action: PayloadAction<{ address: string }>) => {
      state.address = action.payload.address;
    },
  },
});

export const { mapAddress } = mapSlice.actions;