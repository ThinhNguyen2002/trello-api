"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WHILELIST_DOMAINS = exports.HttpStatusCode = void 0;
var HttpStatusCode = {
  OK: 200,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  NOT_FOUND: 404,
  INTERNAL_SERVER: 500
};
exports.HttpStatusCode = HttpStatusCode;
var WHILELIST_DOMAINS = ['http://localhost:3000', 'https://trello-thinhnguyendev-web.web.app', 'http://localhost:4200', 'https://thinhnguyendev-angular-trello.web.app'];
exports.WHILELIST_DOMAINS = WHILELIST_DOMAINS;