"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CardModel = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _joi = _interopRequireDefault(require("joi"));

var _mongodb = require("mongodb");

var _mongodb2 = require("../config/mongodb");

var _column = require("./column.model");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

//Define card colections
var cardColectionName = 'cards';

var cardColectionSchema = _joi["default"].object({
  boardId: _joi["default"].string().required(),
  // also ObjectId when create new
  columnId: _joi["default"].string().required(),
  // also ObjectId when create new
  title: _joi["default"].string().required().min(3).max(30).trim(),
  cover: _joi["default"].string()["default"](null),
  createdAt: _joi["default"].date().timestamp()["default"](Date.now()),
  updatedAt: _joi["default"].date().timestamp()["default"](null),
  _destroy: _joi["default"]["boolean"]()["default"](false)
});

var validateSchema = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(data) {
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return cardColectionSchema.validateAsync(data, {
              abortEarly: false
            });

          case 2:
            return _context.abrupt("return", _context.sent);

          case 3:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function validateSchema(_x) {
    return _ref.apply(this, arguments);
  };
}();

var createNew = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(data) {
    var validatedValue, insertValue, result, dataInserted;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return validateSchema(data);

          case 3:
            validatedValue = _context2.sent;
            insertValue = _objectSpread(_objectSpread({}, validatedValue), {}, {
              boardId: (0, _mongodb.ObjectId)(validatedValue.boardId),
              columnId: (0, _mongodb.ObjectId)(validatedValue.columnId)
            });
            _context2.next = 7;
            return (0, _mongodb2.getDB)().collection(cardColectionName).insertOne(insertValue);

          case 7:
            result = _context2.sent;
            _context2.next = 10;
            return (0, _mongodb2.getDB)().collection(cardColectionName).findOne({
              _id: result.insertedId
            });

          case 10:
            dataInserted = _context2.sent;
            _context2.next = 13;
            return _column.ColumnModel.pushCardOrder(dataInserted.boardId.toString(), dataInserted._id.toString());

          case 13:
            return _context2.abrupt("return", dataInserted);

          case 16:
            _context2.prev = 16;
            _context2.t0 = _context2["catch"](0);
            throw new Error(_context2.t0);

          case 19:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 16]]);
  }));

  return function createNew(_x2) {
    return _ref2.apply(this, arguments);
  };
}();
/**
 * @param {Array of string card id} ids
 */


var deleteMany = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(ids) {
    var transformIds, result;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            transformIds = ids.map(function (i) {
              return (0, _mongodb.ObjectId)(i);
            });
            _context3.next = 4;
            return (0, _mongodb2.getDB)().collection(cardColectionName).updateMany({
              _id: {
                $in: transformIds
              }
            }, {
              $set: {
                _destroy: true
              }
            });

          case 4:
            result = _context3.sent;
            return _context3.abrupt("return", result);

          case 8:
            _context3.prev = 8;
            _context3.t0 = _context3["catch"](0);
            throw new Error(_context3.t0);

          case 11:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[0, 8]]);
  }));

  return function deleteMany(_x3) {
    return _ref3.apply(this, arguments);
  };
}();

var update = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(id, data) {
    var updateData, result;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            updateData = _objectSpread({}, data);
            if (data.columnId) updateData.columnId = (0, _mongodb.ObjectId)(data.columnId);
            if (updateData.boardId) updateData.boardId = (0, _mongodb.ObjectId)(updateData.boardId);
            _context4.next = 6;
            return (0, _mongodb2.getDB)().collection(cardColectionName).findOneAndUpdate({
              _id: (0, _mongodb.ObjectId)(id)
            }, {
              $set: updateData
            }, {
              returnDocument: 'after'
            });

          case 6:
            result = _context4.sent;
            return _context4.abrupt("return", result.value);

          case 10:
            _context4.prev = 10;
            _context4.t0 = _context4["catch"](0);
            throw new Error(_context4.t0);

          case 13:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[0, 10]]);
  }));

  return function update(_x4, _x5) {
    return _ref4.apply(this, arguments);
  };
}();

var CardModel = {
  cardColectionName: cardColectionName,
  createNew: createNew,
  deleteMany: deleteMany,
  update: update
};
exports.CardModel = CardModel;