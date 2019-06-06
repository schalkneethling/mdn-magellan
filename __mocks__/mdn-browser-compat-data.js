"use strict";

const bcd = jest.genMockFromModule("mdn-browser-compat-data");

function __setMockData(key, data) {
  bcd[key] = data;
}

bcd.__setMockData = __setMockData;

module.exports = bcd;
