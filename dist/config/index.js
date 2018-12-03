'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let config = {
  "env": process.env.NODE_ENV || 'development', // "development" "production"
  "viewDir": _path2.default.join(__dirname, '..', 'views'),
  "staticDir": _path2.default.join(__dirname, '..', 'assets'),
  "port": 8080
};

const init = app => {
  // 开发环境
  if (process.env.NODE_ENV === 'development') {
    const devConfig = {
      // port: '8080'
    };
    config = _lodash2.default.extend(config, devConfig);
  }
  // 生产环境
  if (process.env.NODE_ENV === 'production') {
    const prodConfig = {
      port: '8081'
    };
    config = _lodash2.default.extend(config, prodConfig);
  }
  return config;
};

exports.default = app => init(app);