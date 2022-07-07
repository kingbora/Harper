import React from "react";
import { RouterType } from "@cus/business/dist/types";
import createEntry from "@cus/business/dist/entry";
import IndexPage from "./index/index";

const routes: RouterType[] = [{
  path: "/index",
  name: "indexPage",
  component: <IndexPage />,
}];

createEntry(routes);
