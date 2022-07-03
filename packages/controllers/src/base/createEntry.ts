import { RouterType } from "./types";

let createEntry: (routes: RouterType[]) => void;

if (__PLATFORM__ === "native") {
  createEntry = require("./createNativeEntry").default;
} else {
  createEntry = require("./createBrowserEntry").default;
}

export default createEntry;