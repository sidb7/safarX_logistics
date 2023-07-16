import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "./reducers/useReducer";
import mapReducer from "./reducers/mapReducer";

const rootReducer = combineReducers({
  user: userReducer,
  map: mapReducer
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
