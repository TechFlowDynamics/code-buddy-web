import { combineReducers } from "@reduxjs/toolkit";
import apiSlice from "@/features/apiSlice";
import authSlice from "@/reducer/auth/authSlice";
import themeSlice from "@/reducer/theme/themeSlice";

const rootReducer = combineReducers({
  [apiSlice.reducerPath]: apiSlice.reducer,
  auth: authSlice,
  theme: themeSlice,
});

export default rootReducer;
