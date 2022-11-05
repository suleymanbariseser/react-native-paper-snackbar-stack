import { createContext } from 'react';
import type { SnackbarProps } from 'react-native-paper';

export type SnackbarVariant =
  | 'default'
  | 'success'
  | 'error'
  | 'warning'
  | 'info';

export type Transition = 'slide' | 'grow' | 'fade' | 'zoom';

export type SnackbarType = {
  message: SnackbarProps['children'];
  key: string;
  variant?: SnackbarVariant;
} & Pick<SnackbarProps, 'action' | 'duration'>;

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
