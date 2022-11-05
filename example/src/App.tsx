import * as React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { Provider } from 'react-native-paper';
import { SnackbarProvider } from 'react-native-paper-snackbar-stack';

import SnackForm from './SnackForm';

export default function App() {
  return (
    <Provider>
      <SnackbarProvider>
        <SafeAreaView style={styles.root}>
          <SnackForm />
        </SafeAreaView>
      </SnackbarProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});
