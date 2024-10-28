import { closeSnackbar, useSnackbar } from 'notistack';

let useSnackbarRef: {
  enqueueSnackbar: (message: string, options?: any) => any;
  current?: any;
};

export const SnackbarUtilsConfigurator: React.FC = () => {
  useSnackbarRef = useSnackbar();
  return null;
};

interface SnackbarUtilsProps {
  success(msg: string): void;
  warning(msg: string): void;
  info(msg: string): void;
  error(msg: string): void;
  toast(msg: string, variant?: string): void;
  savingToast(msg?: string, variant?: string): void;
  hideToast(): void;
}

const SnackbarUtils: SnackbarUtilsProps = {
  success(msg) {
    this.toast(msg, 'success');
  },
  warning(msg) {
    this.toast(msg, 'warning');
  },
  info(msg) {
    this.toast(msg, 'info');
  },
  error(msg) {
    this.toast(msg, 'error');
  },
  toast(msg, variant = 'default') {
    useSnackbarRef?.enqueueSnackbar(msg, {
      variant,
    });
  },
  savingToast(msg = 'Saving please wait', variant = 'info') {
    useSnackbarRef.enqueueSnackbar(msg, {
      variant,
      persist: true,
    });
  },
  hideToast() {
    closeSnackbar(useSnackbarRef.current);
  },
};

export default SnackbarUtils;
