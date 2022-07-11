import React from "react";
import { CtrlContext } from "../context";

let BasePageController: PageControllerConstructor;

if (__PLATFORM__ === "native") {
  BasePageController = require("./native").default;
} else {
  BasePageController = require("./h5").default;
}

interface PageControllerConstructor {
  new (): React.Component;
  pageDidMount?: () => void;
  pageWillUnmount?: () => void;
  pageDidShow?: () => void;
  pageDidHide?: () => void;
}

export const withController = function (SuperClass: PageControllerConstructor) {
  return function (View: React.ComponentType): React.ComponentClass {
    class ViewTemplete extends SuperClass {
      componentDidMount() {
        (this as unknown as PageControllerConstructor).pageDidMount?.();
      }
      componentWillUnmount() {
        (this as unknown as PageControllerConstructor).pageWillUnmount?.();
      }
      render() {
        return (
          <CtrlContext.Provider value={this}>
            {React.createElement(View)}
          </CtrlContext.Provider>
        );
      }
    }

    return ViewTemplete;
  };
};

export class PageController extends BasePageController {}