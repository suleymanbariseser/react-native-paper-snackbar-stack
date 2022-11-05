import { View, StyleSheet } from 'react-native';
import React from 'react';

export interface SnackbarContainerProps {
  children?: React.ReactNode;
}
const SnackbarContainer: React.FC<SnackbarContainerProps> = ({ children }) => {
  return (
    <View pointerEvents="box-none" style={styles.root}>
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
  },
});
