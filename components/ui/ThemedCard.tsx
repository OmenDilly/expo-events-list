import { useTheme } from '@react-navigation/native';
import React, { FC } from 'react';
import { StyleSheet, View, ViewProps } from 'react-native';

const ThemedCard: FC<ViewProps> = ({ children, style, ...props }) => {
  const { colors } = useTheme();

  return (
    <View
      style={[styles.cardContent, { backgroundColor: colors.card }, style]}
      {...props}
    >
      {children}
    </View>
  );
};

export default ThemedCard;

const styles = StyleSheet.create({
  cardContent: {
    padding: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
});
