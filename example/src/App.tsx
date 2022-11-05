import * as React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { Provider } from 'react-native-paper';
import {
  SnackbarProvider,
  SnackbarProviderProps,
} from 'react-native-paper-snackbar-stack';

import SnackForm from './SnackForm';

export default function App() {
  const [globalOptions, setGlobalOptions] = React.useState<
    Omit<SnackbarProviderProps, 'children'>
  >({
    maxSnack: 1,
    vertical: 'top',
    horizontal: 'center',
  });

  return (
    <Provider>
      <SnackbarProvider
        maxSnack={globalOptions.maxSnack}
        vertical={globalOptions.vertical}
        horizontal={globalOptions.horizontal}
      >
        <SafeAreaView style={styles.root}>
          <SnackForm
            globalOptions={globalOptions}
            onGlobalOptionsChange={setGlobalOptions}
          />
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
