import apiSlice from "@/features/apiSlice";
import authSlice from "@/reducer/auth/authSlice";
import themeSlice from "@/reducer/theme/themeSlice";
import { combineReducers } from "@reduxjs/toolkit";

const rootReducer = combineReducers({
  [apiSlice.reducerPath]: apiSlice.reducer,
  auth: authSlice,
  theme: themeSlice,
});

export default rootReducer;
