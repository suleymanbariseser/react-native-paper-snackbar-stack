import type { SnackbarProps as PaperSnackbarProps } from 'react-native-paper';
import { Snackbar as PaperSnackbar, useTheme, Text } from 'react-native-paper';
import * as React from 'react';
import type { SnackbarVariant } from './SnackbarContext';
import { Dimensions, StyleSheet } from 'react-native';
import color from 'color';

export type SnackbarProps = {
  variant?: SnackbarVariant;
} & Omit<PaperSnackbarProps, 'theme'>;

const Snackbar: React.FC<SnackbarProps> = ({
  variant = 'default',
  children,
  ...props
}) => {
  const [isMobile, setIsMobile] = React.useState(true);
  const theme = useTheme();
  const colors: Record<SnackbarVariant, string> = {
    default: theme.colors.text,
    error: theme.colors.error,
    info: theme.colors.primary,
    success: theme.colors.accent,
    warning: '#ff9966',
  };

  const backgroundColor = colors[variant];

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
