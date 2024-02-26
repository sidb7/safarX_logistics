import { createSlice } from "@reduxjs/toolkit";

interface ChannelState {
  channel: any;
  failedOrder: number;
}

const initialState: ChannelState = {
  channel: [],
  failedOrder: 0,
};

export const ChannelSlice = createSlice({
  name: "channel",
  initialState: initialState,
  reducers: {
    channelState: (state, action) => {
      state.channel = action.payload;
    },
    failedOrderCount: (state, action) => {
      state.failedOrder = action.payload;
    },
  },
});

export const { channelState, failedOrderCount } = ChannelSlice.actions;
