'use strict';

var _server = require('./server');

var _server2 = _interopRequireDefault(_server);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var port = process.env.PORT || 3000;

_server2.default.listen(port, function () {
  console.log('Your app is running on port ' + port); // eslint-disable-line
});
//# sourceMappingURL=index.js.map