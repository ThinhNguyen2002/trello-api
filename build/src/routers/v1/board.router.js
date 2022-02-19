"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.boardRouters = void 0;

var _express = _interopRequireDefault(require("express"));

var _board = require("../../controllers/board.controller");

var _board2 = require("../../validations/board.validation");

var router = _express["default"].Router();

router.route('/') // .get((req, res) => console.log('GET board'))
.post(_board2.BoardValidation.createNew, _board.BoardController.createNew);
router.route('/:id').get(_board.BoardController.getFullBoard).put(_board2.BoardValidation.update, _board.BoardController.update);
var boardRouters = router;
exports.boardRouters = boardRouters;