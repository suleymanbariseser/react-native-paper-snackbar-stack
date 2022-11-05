import { createContext } from 'react';
import type { SnackbarProps as PaperSnackbarProps } from 'react-native-paper';

export type SnackbarVariant =
  | 'default'
  | 'success'
  | 'error'
  | 'warning'
  | 'info';

export type SnackbarTransition = 'slide' | 'grow' | 'fade' | 'zoom';

export type SnackbarVerticalPosition = 'bottom' | 'top';

export type SnackbarHorizontalPosition = 'left' | 'center' | 'right';

export type SnackbarType = {
  message: PaperSnackbarProps['children'];
  key: string;
  variant?: SnackbarVariant;
  vertical?: SnackbarVerticalPosition;
  horizontal?: SnackbarHorizontalPosition;
} & Pick<PaperSnackbarProps, 'action' | 'duration'>;

export interface ProviderContext {
  enqueueSnackbar: (options: Omit<SnackbarType, 'key'>) => string;
  closeSnackbar: (key: string) => void;
}

const throwContextError = () => {
  throw new Error('No Context Provider');
};

const SnackbarContext = createContext<ProviderContext>({
  enqueueSnackbar: throwContextError,
  closeSnackbar: throwContextError,
});

export default SnackbarContext;
