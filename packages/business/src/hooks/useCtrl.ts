import React from "react";
import { CtrlContext } from "../context";

export default function useCtrl<T>() {
  const self = React.useContext<T>(CtrlContext);
  return self;
}