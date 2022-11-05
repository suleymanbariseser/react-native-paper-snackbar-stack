import React, { ReactNode } from 'react';
import SnackbarContext, {
  ProviderContext,
  SnackbarType,
} from './SnackbarContext';
import { useState } from 'react';
import type { FC } from 'react';
import Snackbar from './Snackbar';
import { useTheme } from 'react-native-paper';

export interface SnackbarProviderProps {
  children?: ReactNode;
}

const SnackbarProvider: FC<SnackbarProviderProps> = ({ children }) => {
  const [snacks, setSnacks] = useState<SnackbarType[]>([]);
  const theme = useTheme();

  console.log(theme.colors);

  const enqueueSnackbar: ProviderContext['enqueueSnackbar'] = (options) => {
    const uniqueId = new Date().valueOf() + '' + Math.random() * 100;

    const snack = {
      ...options,
      key: uniqueId,
    };

    setSnacks([...snacks, snack]);

    return uniqueId;
  };

  const closeSnackbar: ProviderContext['closeSnackbar'] = (key) => {
    if (typeof key !== 'string' || key === '')
      throw new Error('No key is provided');

    const snackIndex = snacks.findIndex((sn: any) => sn.key === key);

    if (snackIndex >= 0) {
      const newSnacks = [...snacks];
      newSnacks.splice(snackIndex, 1);
      setSnacks(newSnacks);
    }
  };

  return (
    <SnackbarContext.Provider value={{ enqueueSnackbar, closeSnackbar }}>
      {children}
      <Snackbar onDismiss={console.log} visible variant="error">
        Test
      </Snackbar>
      {/* <View style={{ position: 'relative' }}>
        {snacks.map(({ message, duration, key, action, variant }) => (
          <Snackbar
            visible
            variant={variant}
            wrapperStyle={{ position: 'relative' }}
            onDismiss={closeSnackbar.bind(this, key)}
            key={key}
            action={action}
            // duration={duration}
          >
            {message}
          </Snackbar>
        ))}
      </View> */}
    </SnackbarContext.Provider>
  );
};

export default SnackbarProvider;
