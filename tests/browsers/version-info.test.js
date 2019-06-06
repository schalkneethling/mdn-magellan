"use strict";

jest.mock("mdn-browser-compat-data");

const versionInfo = require("../../src/browsers/version-info");

describe("getBrowserVersionData", () => {
  const BROWSER_DATA = {
    firefox: {
      name: "Firefox",
      pref_url: "about:config",
      releases: {
        "66": {
          release_date: "2019-03-19",
          release_notes:
            "https://developer.mozilla.org/en-US/docs/Mozilla/Firefox/Releases/66",
          status: "current",
          engine: "Gecko",
          engine_version: "66"
        },
        "67": {
          release_date: "2019-05-21",
          release_notes:
            "https://developer.mozilla.org/en-US/docs/Mozilla/Firefox/Releases/67",
          status: "beta",
          engine: "Gecko",
          engine_version: "67"
        },
        "68": {
          release_date: "2019-07-09",
          release_notes:
            "https://developer.mozilla.org/en-US/docs/Mozilla/Firefox/Releases/68",
          status: "nightly",
          engine: "Gecko",
          engine_version: "68"
        }
      }
    }
  };

  beforeEach(() => {
    require("mdn-browser-compat-data").__setMockData("browsers", BROWSER_DATA);
  });

  test("returns current release version data by default", () => {
    const browserName = "firefox";
    const versionData = versionInfo.getBrowserVersionData(browserName);
    const expected = BROWSER_DATA[browserName]["releases"]["66"];

    expect(versionData).toBe(expected);
  });

  test("returns correct version data for status of type beta", () => {
    const browserName = "firefox";
    const expected = BROWSER_DATA[browserName]["releases"]["67"];
    const type = "beta";
    const versionData = versionInfo.getBrowserVersionData(browserName, type);

    expect(versionData).toBe(expected);
  });

  test("returns correct version number for status of type nightly", () => {
    const browserName = "firefox";
    const expected = BROWSER_DATA[browserName]["releases"]["68"];
    const type = "nightly";
    const versionData = versionInfo.getBrowserVersionData(browserName, type);

    expect(versionData).toBe(expected);
  });

  test("returns error message for unknown status type", () => {
    const browserName = "firefox";
    const type = "earlymorning";
    const expected = `No version data for ${browserName} of type ${type}`;
    const version = versionInfo.getBrowserVersionData(browserName, type);

    expect(version).toBe(expected);
  });
});

describe("getBrowserVersionNumber", () => {
  const BROWSER_DATA = {
    firefox: {
      name: "Firefox",
      pref_url: "about:config",
      releases: {
        "66": {
          release_date: "2019-03-19",
          release_notes:
            "https://developer.mozilla.org/en-US/docs/Mozilla/Firefox/Releases/66",
          status: "current",
          engine: "Gecko",
          engine_version: "66"
        },
        "67": {
          release_date: "2019-05-21",
          release_notes:
            "https://developer.mozilla.org/en-US/docs/Mozilla/Firefox/Releases/67",
          status: "beta",
          engine: "Gecko",
          engine_version: "67"
        },
        "68": {
          release_date: "2019-07-09",
          release_notes:
            "https://developer.mozilla.org/en-US/docs/Mozilla/Firefox/Releases/68",
          status: "nightly",
          engine: "Gecko",
          engine_version: "68"
        }
      }
    }
  };

  beforeEach(() => {
    require("mdn-browser-compat-data").__setMockData("browsers", BROWSER_DATA);
  });

  test("returns current release version number by default", () => {
    const browserName = "firefox";
    const version = versionInfo.getBrowserVersionNumber(browserName);
    const expected = "66";

    expect(version).toBe(expected);
  });

  test("returns correct version number for status of type beta", () => {
    const browserName = "firefox";
    const expected = "67";
    const type = "beta";
    const version = versionInfo.getBrowserVersionNumber(browserName, type);

    expect(version).toBe(expected);
  });

  test("returns correct version number for status of type nightly", () => {
    const browserName = "firefox";
    const expected = "68";
    const type = "nightly";
    const version = versionInfo.getBrowserVersionNumber(browserName, type);

    expect(version).toBe(expected);
  });

  test("returns error message for unknown status type", () => {
    const browserName = "firefox";
    const type = "earlymorning";
    const expected = `No version for ${browserName} of type ${type}`;
    const version = versionInfo.getBrowserVersionNumber(browserName, type);

    expect(version).toBe(expected);
  });
});

describe("getBrowserVersions", () => {
  const BROWSER_DATA = {
    firefox: {
      name: "Firefox",
      pref_url: "about:config",
      releases: {
        "64": {
          release_date: "2018-12-11",
          release_notes:
            "https://developer.mozilla.org/en-US/docs/Mozilla/Firefox/Releases/64",
          status: "retired",
          engine: "Gecko",
          engine_version: "64"
        },
        "65": {
          release_date: "2019-01-29",
          release_notes:
            "https://developer.mozilla.org/en-US/docs/Mozilla/Firefox/Releases/65",
          status: "retired",
          engine: "Gecko",
          engine_version: "65"
        },
        "66": {
          release_date: "2019-03-19",
          release_notes:
            "https://developer.mozilla.org/en-US/docs/Mozilla/Firefox/Releases/66",
          status: "current",
          engine: "Gecko",
          engine_version: "66"
        },
        "67": {
          release_date: "2019-05-21",
          release_notes:
            "https://developer.mozilla.org/en-US/docs/Mozilla/Firefox/Releases/67",
          status: "beta",
          engine: "Gecko",
          engine_version: "67"
        }
      }
    }
  };

  beforeEach(() => {
    require("mdn-browser-compat-data").__setMockData("browsers", BROWSER_DATA);
  });

  test("returns all browser versions", () => {
    const browserName = "firefox";
    const expected = BROWSER_DATA[browserName].releases;
    const versions = versionInfo.getBrowserVersions(browserName);
    expect(versions).toEqual(expected);
  });
});

describe("getLastThreeVersions with no current version", () => {
  const BROWSER_DATA = {
    chrome: {
      name: "Chrome",
      pref_url: "chrome://flags",
      releases: {
        "1": {
          release_date: "2008-12-11",
          release_notes:
            "https://chromereleases.googleblog.com/2008/12/stable-release-google-chrome-is-out-of.html",
          status: "retired",
          engine: "WebKit",
          engine_version: "528"
        },
        "2": {
          release_date: "2009-05-21",
          release_notes:
            "https://chromereleases.googleblog.com/2009/05/stable-update-google-chrome-2017228.html",
          status: "retired",
          engine: "WebKit",
          engine_version: "530"
        },
        "3": {
          release_date: "2009-09-15",
          release_notes:
            "https://chromereleases.googleblog.com/2009/09/stable-channel-update.html",
          status: "retired",
          engine: "WebKit",
          engine_version: "532"
        },
        "4": {
          release_date: "2010-01-25",
          release_notes:
            "https://chromereleases.googleblog.com/2010/01/stable-channel-update_25.html",
          status: "retired",
          engine: "WebKit",
          engine_version: "532.5"
        }
      }
    }
  };

  beforeEach(() => {
    require("mdn-browser-compat-data").__setMockData("browsers", BROWSER_DATA);
  });

  test("returns last three browser versions", () => {
    const browserName = "chrome";
    const lastThreeVersions = versionInfo.getLastThreeVersions(browserName);
    const expected = BROWSER_DATA[browserName].releases;
    const versionsAsArray = Object.entries(lastThreeVersions);

    expect(versionsAsArray.length).toBe(3);
    expect(versionsAsArray[2][0]).toBe("4");
    expect(versionsAsArray[2][1].engine_version).toBe("532.5");

    versionsAsArray.forEach(version => {
      expect(version[1].status).not.toBe("current");
    });
  });
});

describe("getLastThreeVersions with a current version", () => {
  const BROWSER_DATA = {
    firefox: {
      name: "Firefox",
      pref_url: "about:config",
      releases: {
        "64": {
          release_date: "2018-12-11",
          release_notes:
            "https://developer.mozilla.org/en-US/docs/Mozilla/Firefox/Releases/64",
          status: "retired",
          engine: "Gecko",
          engine_version: "64"
        },
        "65": {
          release_date: "2019-01-29",
          release_notes:
            "https://developer.mozilla.org/en-US/docs/Mozilla/Firefox/Releases/65",
          status: "retired",
          engine: "Gecko",
          engine_version: "65"
        },
        "66": {
          release_date: "2019-03-19",
          release_notes:
            "https://developer.mozilla.org/en-US/docs/Mozilla/Firefox/Releases/66",
          status: "current",
          engine: "Gecko",
          engine_version: "66"
        },
        "67": {
          release_date: "2019-05-21",
          release_notes:
            "https://developer.mozilla.org/en-US/docs/Mozilla/Firefox/Releases/67",
          status: "beta",
          engine: "Gecko",
          engine_version: "67"
        }
      }
    }
  };

  beforeEach(() => {
    require("mdn-browser-compat-data").__setMockData("browsers", BROWSER_DATA);
  });

  test("returns latest three browser versions", () => {
    const browserName = "firefox";
    const lastThreeVersions = versionInfo.getLastThreeVersions(browserName);
    const expected = BROWSER_DATA[browserName].releases;
    const versionsAsArray = Object.entries(lastThreeVersions);

    expect(versionsAsArray.length).toBe(3);
    expect(versionsAsArray[0][0]).toBe("64");
    expect(versionsAsArray[1][0]).toBe("65");
    expect(versionsAsArray[2][0]).toBe("66");
    expect(versionsAsArray[2][1].status).toBe("current");
  });
});
