import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "./reducers/userReducer";
import mapReducer from "./reducers/mapReducer";
import catalogueReducer from "./reducers/catalogue";

const rootReducer = combineReducers({
  user: userReducer,
  map: mapReducer,
  catalogue: catalogueReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
