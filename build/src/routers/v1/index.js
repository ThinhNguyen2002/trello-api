"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.apiV1 = void 0;

var _express = _interopRequireDefault(require("express"));

var _constants = require("../../untilities/constants");

var _board = require("./board.router");

var _column = require("./column.router");

var _card = require("./card.router");

var router = _express["default"].Router();
/*  GET v1/status */


router.get('/status', function (req, res) {
  return res.status(_constants.HttpStatusCode.OK).json({
    status: 'OK!'
  });
});
/* Board APIs */

router.use('/boards', _board.boardRouters);
/* Column APIs */

router.use('/columns', _column.columnRouters);
/* Card APIs */

router.use('/cards', _card.cardRouters);
var apiV1 = router;
exports.apiV1 = apiV1;