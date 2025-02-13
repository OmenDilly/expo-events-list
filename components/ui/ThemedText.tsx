import { useTheme } from '@react-navigation/native';
import React, { FC } from 'react';
import { Text, TextProps } from 'react-native';

const ThemedText: FC<TextProps> = ({ style, ...props }) => {
  const { colors } = useTheme();

  return (
    <Text style={[{ color: colors.text, fontSize: 16 }, style]} {...props} />
  );
};

export default ThemedText;
