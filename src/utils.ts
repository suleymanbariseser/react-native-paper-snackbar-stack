import {
  Animated,
  Dimensions,
  StyleProp,
  TransformsStyle,
  ViewStyle,
} from 'react-native';
import type {
  SnackbarHorizontalPosition,
  SnackbarTransition,
  SnackbarVerticalPosition,
} from './SnackbarContext';

export const getHorizontalStyle = (
  horizontal: SnackbarHorizontalPosition
): ViewStyle['alignItems'] => {
  if (horizontal === 'center') {
    return 'center';
  }

  if (horizontal === 'right') return 'flex-end';

  return 'flex-start';
};

export const getVerticalStyle = (
  vertical: SnackbarVerticalPosition
): ViewStyle['justifyContent'] => {
  if (vertical === 'bottom') {
    return 'flex-end';
  }

  return 'flex-start';
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
  vertical: SnackbarVerticalPosition = 'bottom',
  horizontal: SnackbarHorizontalPosition = 'center'
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
    outputRange: [(transformValue * transformSign) / 2, 0],
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

export const getTransitionAnimation = (
  transition: SnackbarTransition | undefined,
  anim: Animated.Value,
  vertical: SnackbarVerticalPosition = 'bottom',
  horizontal: SnackbarHorizontalPosition = 'center'
): AnimatedViewStyles => {
  if (!transition) return {};

  if (transition === 'slide') {
    return getSlideAnimation(anim, vertical, horizontal);
  }

  return {};
};
