import * as React from 'react';
import SnackbarContext, {
  SnackbarHorizontalPosition,
  ProviderContext,
  SnackbarType,
  SnackbarVerticalPosition,
} from './SnackbarContext';
import Snackbar from './Snackbar';
import SnackbarContainer from './SnackbarContainer';
import { DEFAULTS } from './constants';

type CombinedPosition =
  `${SnackbarVerticalPosition}-${SnackbarHorizontalPosition}`;

export interface SnackbarProviderProps {
  children?: React.ReactNode;

  /**
   * The maximum number of the snackbars at a moment.
   * @default 1
   */
  maxSnack?: number;

  /**
   * Default vertical position of snackbars
   * @default "bottom"
   */
  vertical?: SnackbarVerticalPosition;

  /**
   * Default horizontal position of snackbars
   * @default "center"
   */
  horizontal?: SnackbarHorizontalPosition;
}

const SnackbarProvider: React.FC<SnackbarProviderProps> = ({
  children,
  maxSnack = 1,
  vertical: defaultVertical = DEFAULTS.vertical,
  horizontal: defaultHorizontal = DEFAULTS.horizontal,
}) => {
  const [snacks, setSnacks] = React.useState<SnackbarType[]>([]);

  /**
   * adds a new snackbar in stack
   */
  const enqueueSnackbar: ProviderContext['enqueueSnackbar'] = React.useCallback(
    (options) => {
      const uniqueId = new Date().valueOf() + '' + Math.random() * 100;

      const snack: SnackbarType = {
        vertical: defaultVertical,
        horizontal: defaultHorizontal,
        ...options,
        key: uniqueId,
      };

      setSnacks([...snacks, snack]);

      return uniqueId;
    },
    [defaultVertical, defaultHorizontal, snacks]
  );

  /**
   * closes a snackbar with the given key
   */
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

  /**
   * Group snackbars with their vertical and horizontal positions
   */
  const groupedSnacks = React.useMemo(() => {
    const newGroups: Partial<Record<CombinedPosition, SnackbarType[]>> = {};

    snacks.forEach((snack) => {
      const groupKey = [snack.vertical, snack.horizontal].join(
        '-'
      ) as CombinedPosition;

      const group = newGroups[groupKey] || [];
      group.push(snack);
      newGroups[groupKey] = group;

      return newGroups;
    });

    return newGroups;
  }, [snacks]);

  React.useEffect(() => handleSnacks(), [handleSnacks]);

  return (
    <SnackbarContext.Provider value={{ enqueueSnackbar, closeSnackbar }}>
      {children}
      {Object.entries(groupedSnacks).map(([groupKey, groupSnacks]) => {
        const [vertical, horizontal] = groupKey.split('-') as [
          SnackbarVerticalPosition,
          SnackbarHorizontalPosition
        ];

        return (
          <SnackbarContainer
            key={groupKey}
            vertical={vertical}
            horizontal={horizontal}
          >
            {groupSnacks.map(
              ({ message, duration, key, action, variant, transition }) => (
                <Snackbar
                  key={`${groupKey}-${key}`}
                  variant={variant}
                  onDismiss={closeSnackbar.bind(this, key)}
                  action={action}
                  duration={duration}
                  vertical={vertical}
                  horizontal={horizontal}
                  transition={transition}
                >
                  {message}
                </Snackbar>
              )
            )}
          </SnackbarContainer>
        );
      })}
    </SnackbarContext.Provider>
  );
};

export default SnackbarProvider;
