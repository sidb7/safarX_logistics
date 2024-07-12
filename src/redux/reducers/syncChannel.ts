import { createSlice } from "@reduxjs/toolkit";

interface ChannelState {
  channel: any;
  failedOrder: number;
  timerObject: any;
  time: any;
}

const initialState: ChannelState = {
  channel: [],
  failedOrder: 0,
  timerObject: { startTimer: false, syncChannelWidth: 0 },
  time: 0,
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
    timerObject: (state, action) => {
      state.timerObject = action.payload;
    },
    timer: (state, action) => {
      state.time = action.payload;
    },
  },
});

export const { channelState, failedOrderCount, timerObject, timer } =
  ChannelSlice.actions;
