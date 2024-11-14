import { createSlice } from "@reduxjs/toolkit";

import { removeAuthFromLocal, saveAuthToLocal } from "@/utils/storage";

const initialAuthState = {
  accessToken: "",
  userId: "",
  email: "",
  step: 1,
  fullName: "",
  purpose: "",
  userName: "",
  active: false,
  isEmailVerified: false,
  registrationStatus: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    login(state, action) {
      saveAuthToLocal(action.payload);
      // Directly update the state properties instead of reassigning the state
      state.accessToken = action.payload.accessToken;
      state.userId = action.payload.userId;
      state.email = action.payload.email;
      state.fullName = action.payload.fullName;
      state.active = action.payload.active;
      state.isEmailVerified = action.payload.isEmailVerified;
      state.registrationStatus = action.payload.registrationStatus;
    },

    stepUpdate(state, action) {
      state.step = action.payload?.steps || 1;
    },
    tempSignUp(state, action) {
      state.email = action.payload.email;
      state.userName = action.payload.userName;
      state.isEmailVerified = action.payload.isEmailVerified || false;
      state.purpose = action.payload.purpose;
    },
    logout(state) {
      // Reset each state property to the initial state
      state.accessToken = initialAuthState.accessToken;
      state.userId = initialAuthState.userId;
      state.email = initialAuthState.email;
      state.fullName = initialAuthState.fullName;
      state.active = initialAuthState.active;
      state.isEmailVerified = initialAuthState.isEmailVerified;
      state.registrationStatus = initialAuthState.registrationStatus;
      removeAuthFromLocal();
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
