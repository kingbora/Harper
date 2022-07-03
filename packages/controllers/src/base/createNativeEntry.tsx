import React from "react";
import { NativeRouter, useRoutes } from "react-router-native";
import { RouterType } from "./types";

interface AppProps {
  routes: RouterType[];
}

const App: React.FC<AppProps> = function (props) {
  const routes = useRoutes(props.routes);
  return (
    <NativeRouter>
      {routes}
    </NativeRouter>
  );
};

export default function createBrowserEntry (routes: RouterType[]) {
  
}

