const bcd = require("mdn-browser-compat-data");

/**
 * Returns the version information for the browser and type
 * @param {String} browserName The browser name
 * @param {String} [type] One of current, beta or nightly. Default: "current"
 * @returns An Object of the form:
 * { release_date: '2019-04-23',
 * release_notes:
 *  'https://chromereleases.googleblog.com/2019/04/stable-channel-update-for-desktop_23.html',
 * status: 'current',
 * engine: 'Blink',
 * engine_version: '74' }
 */
function getBrowserVersionData(browserName, type = "current") {
  const releases = Object.entries(bcd.browsers[browserName].releases);
  // each release is in the format ["versionNumber", {...}]
  let release = releases.filter(release => release[1].status === type);

  if (release[0]) {
    // return the version information Object
    return release[0][1];
  } else {
    return `No version data for ${browserName} of type ${type}`;
  }
}

/**
 * Returns the version number for the browser and type
 * @param {String} browserName - The browser name
 * @param {String} [type] One of current, beta or nightly. Default: "current"
 * @returns The browser version number
 */
function getBrowserVersionNumber(browserName, type = "current") {
  const releases = Object.entries(bcd.browsers[browserName].releases);
  // each release is in the format ["versionNumber", {...}]
  let release = releases.filter(release => release[1].status === type);
  if (release[0]) {
    // return the version number
    return release[0][1].engine_version;
  } else {
    return `No version for ${browserName} of type ${type}`;
  }
}

function getBrowserVersions(browserName) {
  return bcd.browsers[browserName].releases;
}

function getLastThreeVersions(browserName) {
  const versions = Object.entries(getBrowserVersions(browserName));
  const versionsLength = versions.length;

  let lastThreeVersions = [];

  for (let i = 0, l = versionsLength; i < l; i++) {
    if (versions[i][1].status === "current") {
      lastThreeVersions = versions.slice(i - 2, i + 1);
    }
  }

  // if no "current" version found
  if (!lastThreeVersions.length) {
    // return the last three  versions in the `Array`
    lastThreeVersions = versions.slice(versionsLength - 3, versionsLength + 1);
  }

  // format as `Object` and return
  return Object.fromEntries(lastThreeVersions);
}

module.exports = {
  getBrowserVersionData,
  getBrowserVersionNumber,
  getBrowserVersions,
  getLastThreeVersions
};
