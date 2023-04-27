import React from 'react';
import { Pressable as CustomPressable } from 'react-native';

const mergePressableStyles = (style, pressStyle) => {
  if (!pressStyle) {
    return style;
  }

  if (!style) {
    return ({ pressed }) => (pressed ? pressStyle : undefined);
  }

  return ({ pressed }) => (pressed ? [style, pressStyle] : style);
};

const Pressable = ({ style, pressStyle, ...props }) => (
  <CustomPressable style={mergePressableStyles(style, pressStyle)} {...props} />
);

export default Pressable;
