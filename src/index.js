#!/usr/bin/env node

const css = require("./css/supported");
const versionInfo = require("./browsers/version-info");

function execute() {
  let supported = css.isSupported("firefox", 2, "selectors", "after");
  console.log(supported);
}

execute();
