import * as Haptics from 'expo-haptics';
import React, { FC, forwardRef, Ref, RefAttributes } from 'react';
import { Pressable, PressableProps } from 'react-native';
import Animated, {
  AnimatedProps,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

export interface AnimatedPressableProps extends AnimatedProps<PressableProps> {
  animateOpactity?: boolean;
}

const AnimPressable = Animated.createAnimatedComponent(Pressable);

const AnimatedPressable: FC<
  AnimatedPressableProps & RefAttributes<PressableProps>
> = forwardRef<Ref<PressableProps>, AnimatedPressableProps>(
  ({ style, onPressIn, onPressOut, animateOpactity = true, ...props }, ref) => {
    const animatedValue = useSharedValue(0);

    const animatedStyle = useAnimatedStyle(() => {
      return {
        transform: [
          { scale: interpolate(animatedValue.value, [0, 1], [1, 0.97]) },
        ],
        opacity: animateOpactity
          ? interpolate(animatedValue.value, [0, 1], [1, 0.8])
          : 1,
      };
    }, [animatedValue.value, animateOpactity]);

    return (
      <AnimPressable
        ref={ref}
        style={[animatedStyle, style]}
        onPressIn={(e) => {
          animatedValue.value = withTiming(1, { duration: 200 });
          onPressIn?.(e);
        }}
        onPressOut={(e) => {
          animatedValue.value = withTiming(0, { duration: 200 });
          Haptics.selectionAsync();
          onPressOut?.(e);
        }}
        {...props}
      />
    );
  }
);

export default AnimatedPressable;
