import React from "react";
import { RouterType } from "@cus/controllers/dist/base/types";
import createEntry from "@cus/controllers/dist/base/createEntry";
import IndexPage from "./index/index";

const routes: RouterType[] = [{
  path: "/index",
  name: "indexPage",
  component: <IndexPage />,
}];

createEntry(routes);
