import type { SnackbarType } from './SnackbarContext';

export const DEFAULTS: Required<
  Pick<SnackbarType, 'vertical' | 'horizontal' | 'variant' | 'transition'>
> = {
  vertical: 'bottom',
  horizontal: 'center',
  variant: 'default',
  transition: 'fade',
};
