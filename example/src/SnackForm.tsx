import Slider from '@react-native-community/slider';
import * as React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import {
  Button,
  ButtonProps,
  Headline,
  RadioButton,
  Subheading,
  Surface,
  Text,
  TextInput,
} from 'react-native-paper';
import {
  SnackbarHorizontalPosition,
  SnackbarProviderProps,
  SnackbarVariant,
  useSnackbar,
  SnackbarVerticalPosition,
} from 'react-native-paper-snackbar-stack';

interface SectionProps {
  title: string;
  children?: React.ReactNode;
  buttonText?: string;
  onPress?: ButtonProps['onPress'];
  hideButton?: boolean;
}
const Section: React.FC<SectionProps> = ({
  title,
  children,
  buttonText,
  onPress,
  hideButton,
}) => {
  return (
    <Surface style={styles.section}>
      <Headline style={styles.headline}>{title}</Headline>
      <View style={styles.container}>{children}</View>
      {!hideButton && (
        <Button style={styles.button} onPress={onPress} mode="outlined">
          {buttonText}
        </Button>
      )}
    </Surface>
  );
};

interface SectionItemProps {
  title: string;
  value?: string | number;
  children?: React.ReactNode;
}
const SectionItem: React.FC<SectionItemProps> = ({
  title,
  value,
  children,
}) => {
  return (
    <View style={styles.item}>
      <View style={styles.header}>
        <Subheading>{title}</Subheading>
        {value && <Text>value: {value}</Text>}
      </View>
      <View style={styles.content}>{children}</View>
    </View>
  );
};

const variantOptions: SnackbarVariant[] = [
  'default',
  'error',
  'info',
  'success',
  'warning',
];
const verticalOptions: SnackbarVerticalPosition[] = ['top', 'bottom'];
const horizontalOptions: SnackbarHorizontalPosition[] = [
  'left',
  'right',
  'center',
];

export interface SnackFormProps {
  globalOptions: Omit<SnackbarProviderProps, 'children'>;
  onGlobalOptionsChange: (
    value: Omit<SnackbarProviderProps, 'children'>
  ) => void;
}

const SnackForm: React.FC<SnackFormProps> = ({
  globalOptions,
  onGlobalOptionsChange,
}) => {
  const { enqueueSnackbar } = useSnackbar();
  const [text, setText] = React.useState('');
  const [duration, setDuration] = React.useState(1000);
  const [variant, setVariant] = React.useState<SnackbarVariant>('default');
  const [verticalPosition, setVerticalPosition] =
    React.useState<SnackbarVerticalPosition>('top');
  const [horizontalPosition, setHorizontalPosition] =
    React.useState<SnackbarHorizontalPosition>('left');

  const handleShowSnackbar = () => {
    enqueueSnackbar({
      message: text,
      duration,
      variant,
      vertical: verticalPosition,
      horizontal: horizontalPosition,
    });
  };

  const handleOnChangeText = (value: string) => {
    setText(value);
  };

  const handleActionSnackbar = () => {
    enqueueSnackbar({
      message: 'This is an snackbar with action',
      duration: 5000,
      variant: 'info',
      action: {
        label: 'Dismiss',
        onPress: console.log,
      },
    });
  };

  return (
    <ScrollView style={styles.root}>
      <Section title="Provider Options" hideButton>
        <SectionItem title="Max Snackbar" value={globalOptions.maxSnack}>
          <Slider
            style={styles.slider}
            minimumValue={1}
            maximumValue={5}
            step={1}
            minimumTrackTintColor="#000000"
            maximumTrackTintColor="#000000"
            tapToSeek
            onValueChange={(value) =>
              onGlobalOptionsChange({ ...globalOptions, maxSnack: value })
            }
            value={globalOptions.maxSnack}
          />
        </SectionItem>
        <SectionItem title="Vertical Position" value={globalOptions.vertical}>
          <RadioButton.Group
            onValueChange={(value) =>
              onGlobalOptionsChange({
                ...globalOptions,
                vertical: value as SnackbarVerticalPosition,
              })
            }
            value={globalOptions.vertical!}
          >
            {verticalOptions.map((option) => (
              <View key={option} style={styles.radio}>
                <RadioButton value={option} />
                <Text>{option}</Text>
              </View>
            ))}
          </RadioButton.Group>
        </SectionItem>
        <SectionItem
          title="Horizontal Position"
          value={globalOptions.horizontal}
        >
          <RadioButton.Group
            onValueChange={(value) =>
              onGlobalOptionsChange({
                ...globalOptions,
                horizontal: value as SnackbarHorizontalPosition,
              })
            }
            value={globalOptions.horizontal!}
          >
            {horizontalOptions.map((option) => (
              <View key={option} style={styles.radio}>
                <RadioButton value={option} />
                <Text>{option}</Text>
              </View>
            ))}
          </RadioButton.Group>
        </SectionItem>
      </Section>
      <Section
        title="Snackbar Options"
        buttonText="Show"
        onPress={handleShowSnackbar}
      >
        <SectionItem title="Message">
          <TextInput
            style={styles.item}
            label="Message"
            value={text}
            onChangeText={handleOnChangeText}
            mode="outlined"
            autoCorrect={false}
            autoCapitalize="none"
          />
        </SectionItem>
        <SectionItem title="Duration" value={duration}>
          <Slider
            style={styles.slider}
            minimumValue={1000}
            maximumValue={10000}
            step={1000}
            minimumTrackTintColor="#000000"
            maximumTrackTintColor="#000000"
            tapToSeek
            onValueChange={setDuration}
            value={duration}
          />
        </SectionItem>
        <SectionItem title="Variant" value={variant}>
          <RadioButton.Group
            onValueChange={(value) => setVariant(value as SnackbarVariant)}
            value={variant}
          >
            {variantOptions.map((option) => (
              <View key={option} style={styles.radio}>
                <RadioButton value={option} />
                <Text>{option}</Text>
              </View>
            ))}
          </RadioButton.Group>
        </SectionItem>
        <SectionItem title="Vertical Position" value={verticalPosition}>
          <RadioButton.Group
            onValueChange={(value) =>
              setVerticalPosition(value as SnackbarVerticalPosition)
            }
            value={verticalPosition}
          >
            {verticalOptions.map((option) => (
              <View key={option} style={styles.radio}>
                <RadioButton value={option} />
                <Text>{option}</Text>
              </View>
            ))}
          </RadioButton.Group>
        </SectionItem>

        <SectionItem title="Horizontal Position" value={horizontalPosition}>
          <RadioButton.Group
            onValueChange={(value) =>
              setHorizontalPosition(value as SnackbarHorizontalPosition)
            }
            value={horizontalPosition}
          >
            {horizontalOptions.map((option) => (
              <View key={option} style={styles.radio}>
                <RadioButton value={option} />
                <Text>{option}</Text>
              </View>
            ))}
          </RadioButton.Group>
        </SectionItem>
      </Section>
      <Section
        buttonText="Show"
        onPress={handleActionSnackbar}
        title="With Action"
      />
    </ScrollView>
  );
};

export default SnackForm;

const styles = StyleSheet.create({
  root: {
    padding: 20,
    marginVertical: -10,
  },
  container: {},
  section: { padding: 20, borderRadius: 20, marginVertical: 10, elevation: 5 },
  headline: {
    textAlign: 'center',
  },
  button: {
    marginTop: 10,
  },
  item: {
    marginVertical: 5,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  content: {},
  slider: {
    width: '100%',
  },
  radio: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
