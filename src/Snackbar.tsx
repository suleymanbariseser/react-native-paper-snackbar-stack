import type { SnackbarProps as PaperSnackbarProps } from 'react-native-paper';
import { Snackbar as PaperSnackbar, useTheme, Text } from 'react-native-paper';
import React, { FC } from 'react';
import type { SnackbarVariant } from './SnackbarContext';
import { StyleSheet } from 'react-native';
import color from 'color';

export type SnackbarProps = { variant?: SnackbarVariant } & Omit<
  PaperSnackbarProps,
  'theme'
>;

const Snackbar: FC<SnackbarProps> = ({
  variant = 'default',
  children,
  ...props
}) => {
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

  return (
    <PaperSnackbar
      wrapperStyle={[styles.snackbar]}
      style={{ backgroundColor }}
      {...props}
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
