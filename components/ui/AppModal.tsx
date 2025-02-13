import React, { ReactNode, useEffect, useRef, useState } from 'react';
import {
  BackHandler,
  Pressable,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export type AppModalProps = {
  dismissable?: boolean;
  dismissableBackButton?: boolean;
  onDismiss?: () => void;
  visible: boolean;
  children: ReactNode;
  contentContainerStyle?: StyleProp<ViewStyle>;
  style?: StyleProp<ViewStyle>;
};

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

function AppModal({
  dismissable = true,
  dismissableBackButton = dismissable,
  visible = false,
  onDismiss = () => {},
  children,
  contentContainerStyle,
  style,
}: AppModalProps) {
  const visibleRef = useRef(visible);

  useEffect(() => {
    visibleRef.current = visible;
  });

  const insets = useSafeAreaInsets();

  const [rendered, setRendered] = useState(visible);

  if (visible && !rendered) {
    setRendered(true);
  }
  useEffect(() => {
    if (!visible) {
      return undefined;
    }

    const onHardwareBackPress = () => {
      if (dismissable || dismissableBackButton) {
        setRendered(false);
      }

      return true;
    };

    const subscription = BackHandler.addEventListener(
      'hardwareBackPress',
      onHardwareBackPress
    );
    return () => subscription.remove();
  }, [dismissable, dismissableBackButton, visible]);

  const prevVisible = useRef<boolean | null>(null);

  useEffect(() => {
    if (prevVisible.current !== visible) {
      setRendered(!!visible);
    }
    prevVisible.current = visible;
  });

  if (!rendered) return null;

  return (
    <Animated.View
      pointerEvents={visible ? 'auto' : 'none'}
      accessibilityLiveRegion="polite"
      style={StyleSheet.absoluteFill}
      entering={FadeIn}
      exiting={FadeOut}
      onAccessibilityEscape={() => {
        onDismiss?.();
        setRendered(false);
      }}
    >
      <AnimatedPressable
        accessibilityRole="button"
        disabled={!dismissable}
        onPress={
          dismissable
            ? () => {
                onDismiss?.();
                setRendered(false);
              }
            : undefined
        }
        importantForAccessibility="no"
        style={[styles.backdrop]}
      />
      <View
        style={[{ top: insets.top }, styles.wrapper, style]}
        pointerEvents="box-none"
      >
        <Animated.View style={[styles.content, contentContainerStyle]}>
          {children}
        </Animated.View>
      </View>
    </Animated.View>
  );
}

export default AppModal;

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(1, 1, 1, 0.4)',
  },
  wrapper: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
  },
  content: {
    backgroundColor: 'transparent',
    justifyContent: 'center',
  },
});
