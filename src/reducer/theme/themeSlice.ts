import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface ThemeState {
  theme: "light" | "dark";
}

const initialState: ThemeState = {
  theme: "dark", // Default theme
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<"light" | "dark">) => {
      state.theme = action.payload;
    },
    toggleTheme: state => {
      state.theme = state.theme === "dark" ? "light" : "dark";
    },
  },
});

export const { setTheme, toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;
