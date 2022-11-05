import React from 'react';
import SnackbarContext, {
  ProviderContext,
  SnackbarType,
} from './SnackbarContext';
import Snackbar from './Snackbar';
import SnackbarContainer from './SnackbarContainer';

export interface SnackbarProviderProps {
  children?: React.ReactNode;
  maxSnack?: number;
}

const SnackbarProvider: React.FC<SnackbarProviderProps> = ({
  children,
  maxSnack = 2,
}) => {
  const [snacks, setSnacks] = React.useState<SnackbarType[]>([]);

  const enqueueSnackbar: ProviderContext['enqueueSnackbar'] = (options) => {
    const uniqueId = new Date().valueOf() + '' + Math.random() * 100;

    const snack = {
      ...options,
      key: uniqueId,
    };

    setSnacks([...snacks, snack]);

    return uniqueId;
  };

  const closeSnackbar: ProviderContext['closeSnackbar'] = React.useCallback(
    (key) => {
      if (typeof key !== 'string' || key === '')
        throw new Error('No key is provided');

      const snackIndex = snacks.findIndex((sn: any) => sn.key === key);

      if (snackIndex >= 0) {
        const newSnacks = [...snacks];
        newSnacks.splice(snackIndex, 1);
        setSnacks(newSnacks);
      }
    },
    [snacks]
  );

  // if number of snacks exceed max snacks then remove first snack
  const handleSnacks = React.useCallback(() => {
    const firstSnack = snacks[0];
    if (snacks.length > maxSnack && firstSnack) {
      closeSnackbar(firstSnack.key);
    }
  }, [snacks, maxSnack, closeSnackbar]);

  React.useEffect(() => handleSnacks(), [handleSnacks]);

  return (
    <SnackbarContext.Provider value={{ enqueueSnackbar, closeSnackbar }}>
      {children}
      <SnackbarContainer>
        {snacks.map(({ message, duration, key, action, variant }) => (
          <Snackbar
            visible
            variant={variant}
            onDismiss={closeSnackbar.bind(this, key)}
            key={key}
            action={action}
            duration={duration}
          >
            {message}
          </Snackbar>
        ))}
      </SnackbarContainer>
    </SnackbarContext.Provider>
  );
};

export default SnackbarProvider;
