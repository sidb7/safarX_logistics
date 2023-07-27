import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define a type for the slice state
interface CatalogueState {
  channelName? : string
  productBtnName? : string
  addressBtnName? : string
}

// Define the initial state using that type
const initialState: CatalogueState = {
  channelName : "Channel Integration",
  productBtnName : "Single Product",
  addressBtnName : "Pickup Address"
};

export const catalogueSlice = createSlice({
  name: "catalogue",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    channelName: (state, action ) => {
      state.channelName = action.payload;
    },
    productBtnName: (state, action ) => {
      state.productBtnName = action.payload;
    },
    addressBtnName: (state, action ) => {
      state.addressBtnName = action.payload;
    },
  },
});

export const { channelName, productBtnName, addressBtnName } = catalogueSlice.actions;

export default catalogueSlice.reducer;
