import { View, StyleSheet, ViewStyle } from 'react-native';
import * as React from 'react';
import type {
  SnackbarHorizontalPosition,
  SnackbarVerticalPosition,
} from './SnackbarContext';
import { getContainerStyle } from './utils';

export interface SnackbarContainerProps {
  children?: React.ReactNode;
  vertical?: SnackbarVerticalPosition;
  horizontal?: SnackbarHorizontalPosition;
}
const SnackbarContainer: React.FC<SnackbarContainerProps> = ({
  children,
  vertical = 'bottom',
  horizontal = 'center',
}) => {
  const rootStyles: ViewStyle = getContainerStyle(vertical, horizontal);

  return (
    <View pointerEvents="box-none" style={[styles.root, rootStyles]}>
      {children}
    </View>
  );
};

export default SnackbarContainer;

const styles = StyleSheet.create({
  root: {
    position: 'absolute',
    left: 0,
    width: '100%',
  },
});
