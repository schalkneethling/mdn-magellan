#!/usr/bin/env node

const css = require("./css/supported");
const versionInfo = require("./browsers/version-info");

function execute() {
  let supported = versionInfo.getLastThreeVersions("safari");
  console.log(supported);
}

execute();
