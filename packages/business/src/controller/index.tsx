import React from "react";
import { CtrlContext } from "../context";

interface PageControllerConstructor {
  new (): PageController;
}

function mixins(target: any, source: any) {
  const properties: (string | symbol)[] = [];
  const sourcePrototype = source.prototype;
  // 合并
  properties.push(...Object.getOwnPropertyNames(sourcePrototype), ...Object.getOwnPropertySymbols(sourcePrototype));
  properties.forEach((prop) => {
    if (typeof prop === "string") {
      if (prop.match(/^(?:initializer|constructor|prototype|arguments|caller|name|bind|call|apply|toString|length)$/)) {
        // if (prop === "constructor") {
        //   sourcePrototype[prop].apply(target);
        // }
        return;
      }
    }
    const descriptor = Object.getOwnPropertyDescriptor(sourcePrototype, prop);
    if (descriptor) {
      Object.defineProperty(target, prop, descriptor);
    }
  });
}

export const withController = function (SuperClass: PageControllerConstructor) {
  return function (View: React.ComponentType): React.ComponentClass {
    class ViewTemplete extends React.Component {
      constructor(props: any) {
        super(props);
        mixins(this, SuperClass);
      }

      componentDidMount() {
        (this as unknown as ViewTemplete & PageController).pageDidMount?.();
      }

      componentWillUnmount() {
        (this as unknown as ViewTemplete & PageController).pageWillUnmount?.();
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

export default class PageController {
  pageDidMount() {}
  pageWillUnmount() {}
  pageDidShow() {}
  pageDidHide() {}
}