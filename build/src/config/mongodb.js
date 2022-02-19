"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getDB = exports.connectDB = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _mongodb = require("mongodb");

var _environtment = require("./environtment");

//Password mongodb : eZPKgRbQhAuIBA61
var dbInstance = null;

var connectDB = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
    var clinet;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            clinet = new _mongodb.MongoClient(_environtment.env.MONGODB_URL, {
              useUnifiedTopology: true,
              useNewUrlParser: true
            }); //connect to databases

            _context.next = 3;
            return clinet.connect();

          case 3:
            dbInstance = clinet.db(_environtment.env.DATABASE_NAME);

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function connectDB() {
    return _ref.apply(this, arguments);
  };
}(); //GET database instance


exports.connectDB = connectDB;

var getDB = function getDB() {
  if (!dbInstance) throw new Error('Must connect to database first!');
  return dbInstance;
}; // const listDatabases = async clinet => {
//     const databasesList = await clinet.db().admin().listDatabases()
//     console.log(databasesList)
//     console.log('Your database : ')
//     databasesList.databases.forEach(db => console.log(`- ${db.name}`))
// }


exports.getDB = getDB;