"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.corsOptions = void 0;

var _constants = require("../untilities/constants");

var corsOptions = {
  origin: function origin(_origin, callback) {
    if (_constants.WHILELIST_DOMAINS.indexOf(_origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("".concat(_origin, "  Not allowed by CORS")));
    }
  },
  optionsSuccessStatus: 200
};
exports.corsOptions = corsOptions;