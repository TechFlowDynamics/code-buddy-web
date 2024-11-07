import { SnackbarOrigin } from "notistack";

export const TOP_RIGHT: SnackbarOrigin = {
  vertical: "top",
  horizontal: "right",
};
export const TOP_LEFT: SnackbarOrigin = {
  vertical: "top",
  horizontal: "left",
};
export const TOP_CENTER: SnackbarOrigin = {
  vertical: "top",
  horizontal: "center",
};
export const BOTTOM_RIGHT: SnackbarOrigin = {
  vertical: "bottom",
  horizontal: "right",
};
export const BOTTOM_LEFT: SnackbarOrigin = {
  vertical: "bottom",
  horizontal: "left",
};
export const BOTTOM_CENTER: SnackbarOrigin = {
  vertical: "bottom",
  horizontal: "center",
};

const defaultConstants = {
  TOP_RIGHT,
  TOP_LEFT,
  TOP_CENTER,
  BOTTOM_RIGHT,
  BOTTOM_LEFT,
  BOTTOM_CENTER,
};

export default defaultConstants;
