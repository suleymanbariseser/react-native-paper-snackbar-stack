import { View, StyleSheet, ViewStyle } from 'react-native';
import * as React from 'react';
import type {
  SnackbarHorizontalPosition,
  SnackbarVerticalPosition,
} from './SnackbarContext';
import { getHorizontalStyle, getVerticalStyle } from './utils';

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
  const rootStyles: ViewStyle = {
    alignItems: getHorizontalStyle(horizontal),
    justifyContent: getVerticalStyle(vertical),
  };

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
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
});
