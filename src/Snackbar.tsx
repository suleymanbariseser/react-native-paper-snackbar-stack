import type { SnackbarProps as PaperSnackbarProps } from 'react-native-paper';
import { Snackbar as PaperSnackbar, Text } from 'react-native-paper';
import * as React from 'react';
import type { SnackbarVariant } from './SnackbarContext';
import { Dimensions, StyleSheet } from 'react-native';
import color from 'color';

export const COLORS: Record<SnackbarVariant, string> = {
  default: '#313131',
  error: '#d32f2f',
  info: '#2196f3',
  success: '#43a047',
  warning: '#ff9800',
};

export type SnackbarProps = {
  variant?: SnackbarVariant;
} & Omit<PaperSnackbarProps, 'theme'>;

const Snackbar: React.FC<SnackbarProps> = ({
  variant = 'default',
  children,
  ...props
}) => {
  const [isMobile, setIsMobile] = React.useState(true);

  const backgroundColor = COLORS[variant];

  const textColor = color(backgroundColor).isLight() ? 'black' : 'white';

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

  return (
    <PaperSnackbar
      {...props}
      wrapperStyle={wrapperStyle}
      style={{ backgroundColor }}
    >
      <Text style={{ color: textColor }}>{children}</Text>
    </PaperSnackbar>
  );
};

export default Snackbar;

const styles = StyleSheet.create({
  snackbar: {
    position: 'relative',
  },
});
