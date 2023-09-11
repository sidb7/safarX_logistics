import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { POST_FETCH_SELLER_ROLE } from "../../utils/ApiUrls"
import { POST } from "../../utils/webService";
import { toast } from "react-toastify";

const initialState: any = {
  roles: [],
};

export const getRoles: any = createAsyncThunk(
  "roles",
  async (id: any, thunkApi) => {
    try {
      const { data: response } = await POST(POST_FETCH_SELLER_ROLE, {});
      return response?.data?.[0];
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const roleSlice = createSlice({
  name: "roleSlice",
  initialState: initialState,
  reducers: {},

  extraReducers(builder) {
    builder.addCase(getRoles.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getRoles.fulfilled, (state, action) => {
      state.loading = false;
      state.roles = [action.payload]
    });
    builder.addCase(getRoles.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message ?? "Something went wrong";
    });
  },
});
