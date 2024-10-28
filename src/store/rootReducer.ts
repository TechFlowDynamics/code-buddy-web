import { combineReducers } from "@reduxjs/toolkit";
import apiSlice from "@/features/apiSlice";
import authSlice from "@/reducer/auth/authSlice";

const rootReducer = combineReducers({
  [apiSlice.reducerPath]: apiSlice.reducer,
  auth: authSlice,
});

export default rootReducer;
