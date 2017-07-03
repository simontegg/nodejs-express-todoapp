'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.default = transformResponse;
var schema = exports.schema = {
  title: {
    type: String,
    required: true,
    errors: {
      type: 'Title must be a string.',
      required: 'Title is required.'
    }
  },
  completed: {
    type: Boolean,
    required: false,
    default: false
  },
  order: {
    type: Number,
    required: false
  }
};

function cleanUpTodoObject(todo, baseUrl) {
  if (todo.hasOwnProperty('position')) {
    todo.order = todo.position;
    delete todo.position;
  }

  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = Object.entries(todo)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var _step$value = _slicedToArray(_step.value, 2),
          key = _step$value[0],
          value = _step$value[1];

      if (value === null || value === undefined) delete todo[key];
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  todo.url = baseUrl + '/todos/' + todo.id;

  return todo;
}

function transformResponse(result) {
  if (result.todos) {
    result = result.todos.map(function (obj) {
      return cleanUpTodoObject(obj, result.baseUrl);
    });
  }

  if (result.todo) {
    result = cleanUpTodoObject(result.todo, result.baseUrl);
  }

  return result;
}
//# sourceMappingURL=model.js.map