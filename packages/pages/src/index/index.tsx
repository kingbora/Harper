import React from "react";

let IndexPage: React.ComponentType;

if (__PLATFORM__ === "h5") {
  IndexPage = require("./h5").default;
} else {
  IndexPage = require("./native").default;
}

export default IndexPage;