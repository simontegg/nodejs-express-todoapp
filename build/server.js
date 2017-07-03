'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _expressSimpleErrors = require('express-simple-errors');

var _expressSimpleErrors2 = _interopRequireDefault(_expressSimpleErrors);

var _routes = require('./todos/routes');

var _routes2 = _interopRequireDefault(_routes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

// app middleware
app.use((0, _cors2.default)());
app.use(_bodyParser2.default.json({ type: 'application/json' }));
app.disable('etag');

app.use('/todos', (0, _routes2.default)());

var errorHandler = new _expressSimpleErrors2.default();

// validation errors are not typed correctly - changing here
app.use(function (err, req, res, next) {
  if (err.validator) {
    err.name = 'ValidationError';
    err.code = 400;
  }
  next(err);
});

errorHandler.setHandler('ValidationError', function validationHandler(err, stack) {
  var res = {};
  res.status = 'Error';
  res.message = 'Schema Validation Error: ' + err.message;
  res.code = err.code;
  if (stack) res.stackTrace = err.stack;
  return res;
});

app.use(errorHandler.middleware());

exports.default = app;
//# sourceMappingURL=server.js.map