import React, { FC } from 'react';
import { View, ViewProps } from 'react-native';

const HStack: FC<ViewProps> = ({ style, ...props }) => {
  return (
    <View
      style={[{ flexDirection: 'row', alignItems: 'center', gap: 8 }, style]}
      {...props}
    />
  );
};

export default HStack;
