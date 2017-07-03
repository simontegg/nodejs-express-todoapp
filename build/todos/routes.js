'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  var router = _express2.default.Router();

  router.route('/').get(getAllTodos, returnResponse).post(_isvalid.validate.body(_model.schema), createTodo, returnResponse).delete(clearTodos, returnResponse);

  router.route('/:id').all(getOneTodo).get(returnResponse).patch(patchTodo, returnResponse).delete(deleteTodo, returnResponse);

  async function getAllTodos(req, res, next) {
    res.locals.todos = await _db2.default.all(todoTable).catch(function (err) {
      return next(err);
    });
    next();
  }

  async function clearTodos(req, res, next) {
    var rows = await _db2.default.clear(todoTable).catch(function (err) {
      return next(err);
    });
    res.locals.todos = rows;
    res.status(204);
    next();
  }

  async function createTodo(req, res, next) {
    if (req.body.order) {
      req.body.position = req.body.order;
      delete req.body.order;
    }
    var todo = await _db2.default.create(todoTable, req.body).catch(function (err) {
      return next(err);
    });
    res.locals.todo = todo[0];
    res.status(201);
    next();
  }

  async function getOneTodo(req, res, next) {
    var todo = await _db2.default.getById('todos', req.params.id).catch(function (err) {
      return next(err);
    });
    res.locals.todo = todo && todo[0];
    if (!res.locals.todo) {
      return next(new _expressSimpleErrors.errors.NotFound('This todo does not exist'));
    }
    next();
  }

  async function patchTodo(req, res, next) {
    var todo = Object.assign({}, res.locals.todo[0], req.body);
    if (todo.order) {
      todo.position = todo.order;
      delete todo.order;
    }

    var updatedTodo = await _db2.default.update(todoTable, req.params.id, todo).catch(function (err) {
      return next(err);
    });
    res.locals.todo = updatedTodo[0];
    next();
  }

  async function deleteTodo(req, res, next) {
    res.locals.todo = await _db2.default.deleteById(todoTable, req.params.id).catch(function (err) {
      return next(err);
    });
    res.status(204);
    next();
  }

  function returnResponse(req, res) {
    // handle no responses here
    res.locals.baseUrl = req.protocol + '://' + req.get('host');
    res.json((0, _model2.default)(res.locals));
  }

  return router;
};

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _isvalid = require('isvalid');

var _expressSimpleErrors = require('express-simple-errors');

var _model = require('./model');

var _model2 = _interopRequireDefault(_model);

var _db = require('../db');

var _db2 = _interopRequireDefault(_db);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var todoTable = 'todos'; // eslint-disable-line no-unused-variables
//# sourceMappingURL=routes.js.map