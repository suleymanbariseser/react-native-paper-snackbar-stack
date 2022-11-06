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

## Example App

To use example app in expo go, scan the qr code in the mobile device.

<img alt="react-native-paper" src="docs/assets/expo-go.svg" width="300">

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
