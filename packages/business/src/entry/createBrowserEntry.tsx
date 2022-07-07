import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router";
import { RouterType } from "../types";

const root = document.getElementById("root");

interface AppProps {
  routes: RouterType[];
}

const App: React.FC<AppProps> = function(props) {
  return (
    <BrowserRouter>
      <Routes>
        {props.routes.map(route => {
          return (
            <Route
              key={route.name}
              path={route.path}
              element={route.component}
            />
          );
        })}
      </Routes>
    </BrowserRouter>
  );
};

export default function createBrowserEntry(routes: RouterType[]) {
  ReactDOM.render(<App routes={routes} />, root);
}
