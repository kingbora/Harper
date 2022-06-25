import React from "react";

export interface BaseHeaderProps {
  renderLeft?: () => React.ReactElement;
  renderCenter?: () => React.ReactElement;
  renderRight?: () => React.ReactElement;
  title?: string;
}