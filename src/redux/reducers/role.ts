import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { POST_FETCH_SELLER_ROLE } from "../../utils/ApiUrls";
import { POST } from "../../utils/webService";
import { toast } from "react-hot-toast";

let role: any;
export function checkPageAuthorized(name: any) {
  let status = false;
  name = name.toLowerCase();
  if (role) {
    for (let parent of role?.menu) {
      console.log("🚀 ~ checkPageAuthorized ~ parent:", parent);
      if (parent.name.toLowerCase() === name) {
        status = true;
        break;
      } else {
        if (parent?.menu?.length > 0) {
          for (let child of parent?.menu) {
            if (child.name.toLowerCase() === name) {
              status = true;
              break;
            }
          }
          for (let child of parent?.menu?.[0]?.pages) {
            if (child.name.toLowerCase() === name) {
              status = true;
              break;
            }
          }
        }
      }
    }
    return status;
  }
}

const initialState: any = {
  roles: [],
};

export const getRoles: any = createAsyncThunk(
  "roles",
  async (id: any, thunkApi) => {
    try {
      const { data: response } = await POST(POST_FETCH_SELLER_ROLE, {});
      role = response?.data?.[0];
      return role;
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
      state.roles = [action.payload];
    });
    builder.addCase(getRoles.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message ?? "Something went wrong";
    });
  },
});
