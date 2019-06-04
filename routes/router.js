const express = require("express");
const router = express.Router();

const css = require("../src/css/supported");
const versionInfo = require("../src/browsers/version-info");

router.get("/", (req, res) => {
  res.render("index");
});

router.get("/latest-versions", (req, res) => {
  let versions = versionInfo.getLastThreeVersions(req.query.browser);
  res.json(versions);
});

router.get("/versions-for-browser", (req, res) => {
  let browser = req.query.browser;
  let browserVersions = [];
  let versions = versionInfo.getBrowserVersions(browser);
  Object.entries(versions).forEach(version => {
    if (browser !== "safari" && browser !== "ie") {
      browserVersions.push(version[1].engine_version);
    } else {
      browserVersions.push(version[0]);
    }
  });
  res.json(browserVersions);
});

router.get("/is-css-supported", (req, res) => {
  let query = req.query;
  let supported = css.isSupported(
    query.browser,
    parseFloat(query.browser_version),
    query.type,
    query.css
  );
  res.json(supported);
});

module.exports = router;
