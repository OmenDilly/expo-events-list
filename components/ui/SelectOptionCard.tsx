import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import { useTheme } from '@react-navigation/native';
import React, { FC } from 'react';
import { PressableProps, StyleSheet, View } from 'react-native';
import Animated, {
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from 'react-native-reanimated';
import AnimatedPressable from './AnimatedPressable';

interface SelectOptionCardProps extends PressableProps {
  active?: boolean;
}

const SelectOptionCard: FC<SelectOptionCardProps> = ({
  active,
  children,
  ...props
}) => {
  const { colors } = useTheme();

  const animatedActive = useDerivedValue(() => {
    return active
      ? withTiming(1, { duration: 200 })
      : withTiming(0, { duration: 200 });
  }, [active]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      borderColor: interpolateColor(
        animatedActive.value,
        [0, 1],
        ['transparent', colors.primary]
      ),
    };
  }, [animatedActive.value, colors.primary]);

  const animatedIconContainerStyle = useAnimatedStyle(() => {
    return {
      borderColor: interpolateColor(
        animatedActive.value,
        [0, 1],
        [colors.border, colors.primary]
      ),
    };
  }, [animatedActive.value, colors.primary, colors.border]);

  const animatedIconStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { scale: interpolate(animatedActive.value, [0, 1], [2, 1.2]) },
      ],
      opacity: interpolate(animatedActive.value, [0, 1], [0, 1]),
    };
  }, [animatedActive.value]);

  return (
    <AnimatedPressable {...props}>
      <Animated.View
        style={[
          {
            borderWidth: 2,
          },
          styles.optionWrapper,
          animatedStyle,
        ]}
      >
        <View style={styles.optionBase}>
          <View style={styles.optionContent}>{children}</View>
          <Animated.View
            style={[
              {
                borderWidth: 2,

                borderRadius: 24,
                width: 22,
                height: 22,
                overflow: 'hidden',
              },
              animatedIconContainerStyle,
            ]}
          >
            <Animated.View
              style={[
                {
                  position: 'absolute',
                  top: 0,
                  left: 0,
                },
                animatedIconStyle,
              ]}
            >
              <Icon name="check-circle" color={colors.primary} size={18} />
            </Animated.View>
          </Animated.View>
        </View>
      </Animated.View>
    </AnimatedPressable>
  );
};

export default SelectOptionCard;

const styles = StyleSheet.create({
  optionWrapper: {
    flexDirection: 'row',
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 12,
    borderRadius: 8,
  },
  optionBase: {
    gap: 6,
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  optionIndicator: {
    height: 8,
    width: 8,
    margin: 6,
    borderRadius: 100,
  },
  optionContent: {
    gap: 6,
    flex: 1,
  },
  optionSubtitle: {
    fontWeight: '300',
  },
});
