import React from "react";
import { StyleProp, View, ViewStyle } from "react-native";
import { BaseHeaderProps } from ".";

export interface HeaderProps extends BaseHeaderProps {
  style?: StyleProp<ViewStyle>;
}

const Header: React.FC<HeaderProps> = function () {
  return <View></View>;
};

export default Header;
