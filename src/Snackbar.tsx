import type { SnackbarProps as PaperSnackbarProps } from 'react-native-paper';
import { Snackbar as PaperSnackbar } from 'react-native-paper';
import * as React from 'react';
import type {
  SnackbarHorizontalPosition,
  SnackbarTransition,
  SnackbarVariant,
  SnackbarVerticalPosition,
} from './SnackbarContext';
import { Animated, Dimensions, StyleSheet } from 'react-native';
import useEventCallback from 'use-event-callback';
import { getTransitionAnimation } from './utils';

export const COLORS: Record<SnackbarVariant, string> = {
  default: '#313131',
  error: '#d32f2f',
  info: '#2196f3',
  success: '#43a047',
  warning: '#ff9800',
};

export type SnackbarProps = {
  variant?: SnackbarVariant;
  transition?: SnackbarTransition;

  /**
   * vertical position of the snackbar. It will be used for animation direction
   */
  vertical?: SnackbarVerticalPosition;
  horizontal?: SnackbarHorizontalPosition;
} & Omit<PaperSnackbarProps, 'theme' | 'visible'>;

const Snackbar: React.FC<SnackbarProps> = ({
  variant = 'default',
  children,
  duration = Number.POSITIVE_INFINITY,
  transition = 'slide',
  vertical = 'bottom',
  horizontal = 'center',
  onDismiss,
  ...props
}) => {
  const fadeAnim = React.useRef(new Animated.Value(0)).current;
  const [visible, setVisible] = React.useState(true);
  const [isMobile, setIsMobile] = React.useState(true);
  const timerRef = React.useRef<NodeJS.Timeout>();

  const backgroundColor = COLORS[variant];

  const wrapperStyle = [styles.snackbar, !isMobile && { maxWidth: 450 }];

  React.useEffect(() => {
    const updateIsMobile = (width: number) => {
      setIsMobile(width < 600);
    };

    Dimensions.addEventListener('change', ({ screen }) =>
      updateIsMobile(screen.width)
    );

    const { width: screenWidth } = Dimensions.get('screen');
    updateIsMobile(screenWidth);
  }, []);

  const handleClose = useEventCallback(() => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      useNativeDriver: true,
    }).start(() => {
      onDismiss?.();
      setVisible(false);
    });
  });

  const setAutoHideTimer = useEventCallback((autoHideDurationParam) => {
    const isInfinity =
      duration === Number.POSITIVE_INFINITY ||
      duration === Number.NEGATIVE_INFINITY;

    if (!onDismiss || autoHideDurationParam == null || isInfinity) {
      return;
    }

    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      handleClose();
    }, autoHideDurationParam);
  });

  React.useEffect(() => {
    if (visible) {
      setAutoHideTimer(duration);
    }

    return () => {
      clearTimeout(timerRef.current);
    };
  }, [visible, duration, setAutoHideTimer]);

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  const transitionStyle = getTransitionAnimation(
    transition,
    fadeAnim,
    vertical,
    horizontal
  );

  return (
    <PaperSnackbar
      {...props}
      onDismiss={handleClose}
      /**
       * disable paper snackbar. It resets the timer whenever onDismiss change
       */
      duration={Number.POSITIVE_INFINITY}
      wrapperStyle={wrapperStyle}
      style={[
        {
          backgroundColor,
        },
        transitionStyle,
      ]}
      visible={visible}
    >
      {children}
    </PaperSnackbar>
  );
};

export default Snackbar;

const styles = StyleSheet.create({
  snackbar: {
    position: 'relative',
  },
});
