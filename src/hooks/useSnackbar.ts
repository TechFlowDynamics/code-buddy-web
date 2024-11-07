import React from "react";
import { closeSnackbar, useSnackbar, SnackbarOrigin } from "notistack";

let useSnackbarRef: {
  enqueueSnackbar: (message: string, options?: any) => any;
  current?: any;
};

export const SnackbarUtilsConfigurator: React.FC = () => {
  useSnackbarRef = useSnackbar();
  return null;
};

interface SnackbarUtilsProps {
  success(msg: string, anchorOrigin?: SnackbarOrigin): void;
  warning(msg: string, anchorOrigin?: SnackbarOrigin): void;
  info(msg: string, anchorOrigin?: SnackbarOrigin): void;
  error(msg: string, anchorOrigin?: SnackbarOrigin): void;
  toast(msg: string, variant?: string, anchorOrigin?: SnackbarOrigin): void;
  savingToast(
    msg?: string,
    variant?: string,
    anchorOrigin?: SnackbarOrigin,
  ): void;
  hideToast(): void;
}

const SnackbarUtils: SnackbarUtilsProps = {
  success(msg, anchorOrigin) {
    this.toast(msg, "success", anchorOrigin);
  },
  warning(msg, anchorOrigin) {
    this.toast(msg, "warning", anchorOrigin);
  },
  info(msg, anchorOrigin) {
    this.toast(msg, "info", anchorOrigin);
  },
  error(msg, anchorOrigin) {
    this.toast(msg, "error", anchorOrigin);
  },
  toast(
    msg,
    variant = "default",
    anchorOrigin = { vertical: "top", horizontal: "right" },
  ) {
    useSnackbarRef?.enqueueSnackbar(msg, {
      variant,
      anchorOrigin,
    });
  },
  savingToast(
    msg = "Saving, please wait",
    variant = "info",
    anchorOrigin = { vertical: "bottom", horizontal: "left" },
  ) {
    useSnackbarRef.enqueueSnackbar(msg, {
      variant,
      persist: true,
      anchorOrigin,
    });
  },
  hideToast() {
    closeSnackbar(useSnackbarRef.current);
  },
};

export default SnackbarUtils;
