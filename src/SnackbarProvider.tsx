import * as React from 'react';
import SnackbarContext, {
  SnackbarHorizontalPosition,
  ProviderContext,
  SnackbarType,
  SnackbarVerticalPosition,
  SnackbarTransition,
} from './SnackbarContext';
import Snackbar, { SnackbarRefType } from './Snackbar';
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

  /**
   * Default transition affect when snackbar open/close
   * @default "fade"
   */
  transition?: SnackbarTransition;
}

const SnackbarProvider: React.FC<SnackbarProviderProps> = ({
  children,
  maxSnack = 1,
  vertical: defaultVertical = DEFAULTS.vertical,
  horizontal: defaultHorizontal = DEFAULTS.horizontal,
  transition: defaultTransition = DEFAULTS.transition,
}) => {
  if (maxSnack < 1) throw new Error('maxSnack must be greater than 0');
  const [snacks, setSnacks] = React.useState<SnackbarType[]>([]);

  const snackbarRefs = React.useRef<Record<string, SnackbarRefType>>({});
  const snackQueue = React.useRef<SnackbarType[]>([]);

  /**
   * adds a new snackbar in stack
   */
  const enqueueSnackbar: ProviderContext['enqueueSnackbar'] = React.useCallback(
    (options) => {
      const uniqueId = new Date().valueOf() + '' + Math.random() * 100;

      const snack: SnackbarType = {
        vertical: defaultVertical,
        horizontal: defaultHorizontal,
        transition: defaultTransition,
        ...options,
        key: uniqueId,
      };

      // if snacks array has more item then maxSnack then store snack in the queue
      if (snacks.length >= maxSnack || snackQueue.current.length > 0) {
        snackQueue.current.push(snack);
        const oldestSnack = snacks[0];
        if (oldestSnack) {
          snackbarRefs.current[oldestSnack.key]?.close();
        }
      } else {
        setSnacks([...snacks, snack]);
      }

      return uniqueId;
    },
    [
      defaultVertical,
      defaultHorizontal,
      snacks,
      maxSnack,
      snackQueue,
      defaultTransition,
    ]
  );

  /**
   * closes a snackbar with the given key
   */
  const closeSnackbar: ProviderContext['closeSnackbar'] = React.useCallback(
    (key) => {
      if (typeof key !== 'string' || key === '')
        throw new Error('No key is provided');

      // remove snack from the queue
      const newSnacks = [...snacks];
      const snackIndex = newSnacks.findIndex((snack) => snack.key === key);
      if (snackIndex > -1) {
        newSnacks.splice(snackIndex, 1);
      }

      if (snackQueue.current.length > 0 && newSnacks.length < maxSnack) {
        const snack = snackQueue.current.shift();
        newSnacks.push(snack!);
      }

      setSnacks(newSnacks);
    },
    [snacks, maxSnack]
  );

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
                  ref={(el) => {
                    snackbarRefs.current[key] = el!;
                  }}
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
