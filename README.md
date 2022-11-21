# react-native-paper-snackbar-stack

This library is a React native library which allows you to use react-native-paper snackbar component with great functionality.

## Installation

**npm:**

```sh
npm install react-native-paper-snackbar-stack
```

**yarn:**

```sh
yarn add react-native-paper-snackbar-stack
```

## Usage

Wrap your root component in **SnackbarProvider** from react-native-paper-snackbar-stack. While it uses react-native-paper, it also requires **Provider** from react-native-paper to wrap itself.

```ts
import { SnackbarProvider } from 'react-native-paper-snackbar-stack';
import * as React from 'react';
import { Provider } from 'react-native-paper';

export default function App() {
  return (
    <Provider>
      <SnackbarProvider maxSnack={2}>{/** Body component*/}</SnackbarProvider>
    </Provider>
  );
}
```

Now, useSnackbar can be used in the body of the SnackbarProvider.

```ts
import { useSnackbar } from 'react-native-paper-snackbar-stack';
import { Button } from 'react-native-paper';

export default function SnackbarTest() {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [snackbarId, setSnackbarId] = useState('');

  const handleOpenSnackbar = () => {
    const id = enqueueSnackbar({
      message: 'This is an example snackbar',
      variant: 'info',
    });

    setSnackbarId(id);
  };

  const handleCloseSnackbar = () => {
    closeSnackbar(snackbarId);
  };

  return (
    <View>
      <Button onPress={handleOpenSnackbar}>Show</Button>
      <Button onPress={handleCloseSnackbar}>Close</Button>
    </View>
  );
}
```

## SnackbarProvider Props

- `children`

  The part that can access all functionalities of the package.

  Type: `React.ReactNode`

- `maxSnack`

  Maximum number of displayed snackbars at a time.

  Type: `number`

  Default: `1`

- `style`

  custom style for snackbar container

  Type: [`ViewStyle`](https://reactnative.dev/docs/view-style-props)

- `wrapperStyle`

  custom style for snackbar wrapper

  Type: [`ViewStyle`](https://reactnative.dev/docs/view-style-props)

- and [`Common Props`](#commonProps)

## enqueueSnackbar Options

- `message`

  The string that is displayed in the snackbar

  Type: `string`

- `duration`

  The number of milliseconds to close snackbar automatically

  Type: `number`

- `action`

  The action button that will be shown on the right of the message. It will close the snackbar on pressed.

  Type: [`SnackbarProps['action']`](https://callstack.github.io/react-native-paper/snackbar.html#action)

- and [`Common Props`](#commonProps)

## closeSnackbar Options

- `key`

  The unique identifier for a snackbar. It is returned from `enqueueSnackbar` call.

## <p id="commonProps">Common Props</p>

- `variant`

  Prestyled snackbar variants

  Type: `'default' | 'success' | 'error' | 'warning'`

  Default: `'default'`

- `vertical`

  Vertical position of the snackbar.

  Type: `'bottom' | 'top'`

  Default: `'bottom'`

- `horizontal`

  Horizontal position of the snackbar.

  Type: `'left' | 'center' | 'right'`

  Default: `'center'`

- `transition`

  transition effect when snackbar opens/closes

  Type: `'fade' | 'slide' | 'zoom'`

  Default: `'fade'`

## Example App

To use example app in expo go, scan the qr code in the mobile device.

<p align="center">
  <img alt="react-native-paper" src="docs/assets/expo-go.svg" height="300">
  <img alt="ipad_demo.gif" src="docs/assets/ipad_demo.gif" height="300" />
</p>

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
