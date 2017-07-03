'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _pg = require('pg');

var _pg2 = _interopRequireDefault(_pg);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var conString = process.env.DATABASE_URL;

function query(qs) {
  return new Promise(function (resolve, reject) {
    return _pg2.default.connect(conString, function (err, client, done) {
      if (err) return reject(new Error(err));
      client.query(qs, function (err, result) {
        if (err) {
          done();
          return reject(new Error(err));
        }
        done();
        resolve(result.rows);
      });
    });
  });
}

function normalizeValue(value) {
  if (typeof value === 'string') {
    return '\'' + value + '\'';
  }
  return value;
}

function all(table) {
  return query('SELECT * FROM ' + table);
}

function clear(table) {
  return query('DELETE FROM ' + table);
}

function create(table, params) {
  var assigns = Object.keys(params);
  var values = Object.values(params).map(function (value) {
    return normalizeValue(value);
  });
  return query('INSERT INTO ' + table + ' (' + assigns + ') VALUES (' + values + ') RETURNING *');
}

function getById(table, id) {
  return query('SELECT * FROM ' + table + ' WHERE id=' + id);
}

function update(table, id, params) {
  if (params.id) delete params.id;
  var assigns = Object.keys(params);
  var values = assigns.map(function (key) {
    return key + '=' + normalizeValue(params[key]);
  }).join(', '); // eslint-disable-line
  return query('UPDATE ' + table + ' SET ' + values + ' WHERE id=' + id + ' RETURNING *');
}

function deleteById(table, id) {
  return query('DELETE FROM ' + table + ' WHERE id = ' + id);
}

exports.default = { all: all, clear: clear, create: create, deleteById: deleteById, getById: getById, update: update };
//# sourceMappingURL=db.js.map