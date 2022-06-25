import React from "react";
import { BaseHeaderProps } from ".";

export interface HeaderProps extends BaseHeaderProps {
  className?: string;
  style?: React.CSSProperties;
}

const Header: React.FC<HeaderProps> = function () {
  return <header></header>;
};

export default Header;
