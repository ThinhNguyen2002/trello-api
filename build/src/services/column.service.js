"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ColumnSevice = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _column = require("../models/column.model");

var _card = require("../models/card.model");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

var createNew = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(data) {
    var newColumn;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _column.ColumnModel.createNew(data);

          case 3:
            newColumn = _context.sent;
            newColumn.cards = [];
            return _context.abrupt("return", newColumn);

          case 8:
            _context.prev = 8;
            _context.t0 = _context["catch"](0);
            throw new Error(_context.t0);

          case 11:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 8]]);
  }));

  return function createNew(_x) {
    return _ref.apply(this, arguments);
  };
}();

var update = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(id, data) {
    var updateData, result;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            updateData = _objectSpread(_objectSpread({}, data), {}, {
              updatedAt: Date.now()
            });
            if (updateData._id) delete updateData._id;
            if (updateData.cards) delete updateData.cards;
            _context2.next = 6;
            return _column.ColumnModel.update(id, updateData);

          case 6:
            result = _context2.sent;

            if (updateData._destroy) {
              _card.CardModel.deleteMany(updateData.cardOrder);
            }

            return _context2.abrupt("return", result);

          case 11:
            _context2.prev = 11;
            _context2.t0 = _context2["catch"](0);
            throw new Error(_context2.t0);

          case 14:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 11]]);
  }));

  return function update(_x2, _x3) {
    return _ref2.apply(this, arguments);
  };
}();

var ColumnSevice = {
  createNew: createNew,
  update: update
};
exports.ColumnSevice = ColumnSevice;