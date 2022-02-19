"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _express = _interopRequireDefault(require("express"));

var _cors = _interopRequireDefault(require("cors"));

var _cors2 = require("./config/cors");

var _mongodb = require("./config/mongodb");

var _v = require("./routers/v1");

// import { env } from '*/config/environtment'
(0, _mongodb.connectDB)().then(function () {
  return console.log('Connected successfully to database server');
}).then(function () {
  return bootServer();
})["catch"](function (error) {
  console.log(error);
  process.exit();
});

var bootServer = function bootServer() {
  var app = (0, _express["default"])(); //Mở mã hóa API bằng cors npm

  app.use((0, _cors["default"])(_cors2.corsOptions));
  /* Enable req.body data */

  app.use(_express["default"].json());
  /* Use APIs  */

  app.use('/v1', _v.apiV1); // app.listen(env.APP_POST, env.APP_HOST, () => {
  //     console.log(
  //         `Hello MERN stack, app listening on ${env.APP_HOST}:${env.APP_POST}`
  //     )
  // })
  //Support heroku deploy

  app.listen(process.env.PORT, function () {
    console.log("Hello MERN stack, app listening at port: ".concat(process.env.PORT));
  });
};