import type { ViewStyle } from 'react-native';
import type {
  SnackbarHorizontalPosition,
  SnackbarVerticalPosition,
} from './SnackbarContext';

export const getHorizontalStyle = (
  horizontal: SnackbarHorizontalPosition
): ViewStyle['alignItems'] => {
  if (horizontal === 'center') {
    return 'center';
  }

  if (horizontal === 'right') return 'flex-end';

  return 'flex-start';
};

export const getVerticalStyle = (
  vertical: SnackbarVerticalPosition
): ViewStyle['justifyContent'] => {
  if (vertical === 'bottom') {
    return 'flex-end';
  }

  return 'flex-start';
};
