const bcd = require("mdn-browser-compat-data");

/**
 *
 * @param {Stirng} browserName - The browser name
 * @param {String} browserVersion  - The browser version
 * @param {String} type - One of at-rules, properties, selectors, types
 * @param {entry} entry - The entry for which to return support information
 */
function isSupported(browserName, browserVersion, type, entry) {
  /* Versions can be decimals such as 1.2 and therefore comparisons
     such as 1.5 <= 2 will yield an incorrect result. We therefore
     convert version number to two decimal places, and then multiply
     by 100 to remove the decimal place. */
  const browserCompareVersion = browserVersion.toFixed(2) * 100;
  const supportData =
    bcd["css"][type][entry]["__compat"]["support"][browserName];

  // if version_added is less than or equal to browserVersion
  if (
    (supportData[0] &&
      (supportData[0].version_added * 100).toFixed(2) <=
        browserCompareVersion) ||
    (supportData.version_added * 100).toFixed(2) <= browserCompareVersion
  ) {
    // full support
    return {
      supported: true
    };
    // if not full support, check for support via prefix without a required flag
  } else if (
    supportData[1] &&
    !supportData[1].flags &&
    ((supportData[1].version_added * 100).toFixed(2) <= browserCompareVersion ||
      (supportData.version_added * 100).toFixed(2) <= browserCompareVersion)
  ) {
    return {
      supported: false,
      prefixSupported: true,
      prefix: supportData[1].prefix
    };
  } else {
    // not supported
    return {
      supported: false
    };
  }
}

module.exports = {
  isSupported
};
