#!/usr/bin/env node

const css = require("./css/supported");
const js = require("./javascript/supported");
const versionInfo = require("./browsers/version-info");

function execute() {
  let supported = js.isSupported("edge", 11, "builtins", "Array");
  console.log(supported);
}

execute();
