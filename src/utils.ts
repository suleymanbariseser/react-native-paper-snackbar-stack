import {
  Animated,
  Dimensions,
  StyleProp,
  TransformsStyle,
  ViewStyle,
} from 'react-native';
import { DEFAULTS } from './constants';
import type {
  SnackbarHorizontalPosition,
  SnackbarTransition,
  SnackbarVerticalPosition,
} from './SnackbarContext';

export const getHorizontalStyle = (
  horizontal: SnackbarHorizontalPosition
): ViewStyle['alignItems'] => {
  if (horizontal === 'left') {
    return 'flex-start';
  }

  if (horizontal === 'right') return 'flex-end';

  return 'center';
};

export const getVerticalStyle = (
  vertical: SnackbarVerticalPosition
): ViewStyle['justifyContent'] => {
  if (vertical === 'top') {
    return 'flex-start';
  }

  return 'flex-end';
};

export const getContainerStyle = (
  vertical: SnackbarVerticalPosition,
  horizontal: SnackbarHorizontalPosition
): ViewStyle => {
  const alignItems = getHorizontalStyle(horizontal)!;

  if (vertical === 'top') {
    return {
      top: 0,
      alignItems,
    };
  }

  return {
    bottom: 0,
    alignItems,
    flexDirection: 'column-reverse',
  };
};

export type AnimatedViewStyles = Animated.AnimatedProps<StyleProp<ViewStyle>>;

export type AnimatedTransform = Animated.AnimatedProps<TransformsStyle>;

export const getSlideAnimation = (
  anim: Animated.Value,
  vertical: SnackbarVerticalPosition = DEFAULTS.vertical,
  horizontal: SnackbarHorizontalPosition = DEFAULTS.horizontal
): AnimatedViewStyles => {
  const windowSize = Dimensions.get('window');

  const [transformValue, field]: [number, keyof AnimatedTransform] =
    horizontal === 'center'
      ? [windowSize.height, 'translateY']
      : [windowSize.width, 'translateX'];

  const transformSign =
    horizontal === 'left' || (horizontal === 'center' && vertical === 'top')
      ? -1
      : 1;

  const translate = anim.interpolate<number>({
    inputRange: [0, 1],
    outputRange: [transformValue * transformSign, 0],
  });

  return {
    transform: [
      // @ts-ignore
      {
        [field]: translate,
      },
    ],
  };
};

export const getZoomAnimation = (anim: Animated.Value): AnimatedViewStyles => {
  const scale = anim.interpolate<number>({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  return {
    transform: [
      {
        scale,
      },
    ],
  };
};

export const getFadeAnimation = (anim: Animated.Value): AnimatedViewStyles => {
  const opacity = anim.interpolate<number>({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  return {
    opacity,
  };
};

export const getTransitionAnimation = (
  transition: SnackbarTransition | undefined,
  anim: Animated.Value,
  vertical: SnackbarVerticalPosition = DEFAULTS.vertical,
  horizontal: SnackbarHorizontalPosition = DEFAULTS.horizontal
): AnimatedViewStyles => {
  switch (transition) {
    case 'slide':
      return getSlideAnimation(anim, vertical, horizontal);
    case 'zoom':
      return getZoomAnimation(anim);
    case 'fade':
    default:
      return getFadeAnimation(anim);
  }
};
