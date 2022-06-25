import React from "react";
import { BaseButtonProps, getButtonSize } from ".";

let value: string;

if (__PLATFORM__ === "h5") {
  value = "123";
} else {
  value = "234";
}

export interface ButtonProps extends BaseButtonProps {
  
}

const Button: React.FC<ButtonProps> = function (props) {
  const size = getButtonSize(props.size);
  return <button style={{width: 20}}>{props.children}{size}{value}</button>;
};

export default Button;
