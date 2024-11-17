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
  refreshToken: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    login(state, action) {
      saveAuthToLocal(action.payload);
      // Directly update the state properties instead of reassigning the state
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.userId = action.payload.data.userId;
      state.email = action.payload.data.email;
      state.fullName = action.payload.data.userName;
      state.active = action.payload.data.active;
      state.isEmailVerified = action.payload.data.emailVerified;
      state.step = action.payload.data.steps || undefined;
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
