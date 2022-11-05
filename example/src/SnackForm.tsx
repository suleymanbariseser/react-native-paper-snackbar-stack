import Slider from '@react-native-community/slider';
import React, { FC, ReactNode, useState } from 'react';
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
  SnackbarVariant,
  useSnackbar,
} from 'react-native-paper-snackbar-stack';

interface SectionProps {
  title: string;
  children?: ReactNode;
  buttonText: string;
  onPress: ButtonProps['onPress'];
}
const Section: FC<SectionProps> = ({
  title,
  children,
  buttonText,
  onPress,
}) => {
  return (
    <Surface style={styles.section}>
      <Headline style={styles.headline}>{title}</Headline>
      <View style={styles.container}>{children}</View>
      <Button onPress={onPress} mode="outlined">
        {buttonText}
      </Button>
    </Surface>
  );
};

interface SectionItemProps {
  title: string;
  value?: string | number;
  children?: ReactNode;
}
const SectionItem: FC<SectionItemProps> = ({ title, value, children }) => {
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

const ExampleButtons = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [text, setText] = useState('');
  const [duration, setDuration] = useState(1000);
  const [maxSnackbar, setMaxSnackbar] = useState(1);
  const [variant, setVariant] = useState<SnackbarVariant>('default');

  const handleShowSnackbar = () => {
    enqueueSnackbar({
      message: text,
      duration,
      variant,
    });
  };

  const handleOnChangeText = (value: string) => {
    setText(value);
  };

  return (
    <ScrollView style={styles.root}>
      <Section
        title="Provider Options"
        buttonText="Update"
        onPress={console.log}
      >
        <SectionItem title="Max Snackbar" value={maxSnackbar}>
          <Slider
            style={styles.slider}
            minimumValue={1}
            maximumValue={5}
            step={1}
            minimumTrackTintColor="#000000"
            maximumTrackTintColor="#000000"
            tapToSeek
            onValueChange={setMaxSnackbar}
            value={maxSnackbar}
          />
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
            <View style={styles.radio}>
              <RadioButton value="default" />
              <Text>Default</Text>
            </View>
            <View style={styles.radio}>
              <RadioButton value="success" />
              <Text>Success</Text>
            </View>
            <View style={styles.radio}>
              <RadioButton value="error" />
              <Text>Error</Text>
            </View>
            <View style={styles.radio}>
              <RadioButton value="warning" />
              <Text>Warning</Text>
            </View>
            <View style={styles.radio}>
              <RadioButton value="info" />
              <Text>Info</Text>
            </View>
          </RadioButton.Group>
        </SectionItem>
      </Section>
    </ScrollView>
  );
};

export default ExampleButtons;

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
