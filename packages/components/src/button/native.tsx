import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { BaseButtonProps, getButtonSize } from ".";

export interface ButtonProps extends BaseButtonProps {}

const Button: React.FC<ButtonProps> = function (props) {
  const size = getButtonSize(props.size);
  return (
    <TouchableOpacity>
      <View>
        {props.children}
        <Text>{size}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default Button;