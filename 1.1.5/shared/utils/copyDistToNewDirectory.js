"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.copyDistToNewDirectory = copyDistToNewDirectory;

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

async function copyDistToNewDirectory(src, dest) {
  const distExists = _fs.default.existsSync(src);

  const stats = _fs.default.statSync(src);

  if (distExists && stats.isDirectory()) {
    _fs.default.mkdirSync(dest);

    _fs.default.readdirSync(src).forEach(childrenName => {
      copyDistToNewDirectory(_path.default.join(src, childrenName), _path.default.join(dest, childrenName));
    });
  } else {
    _fs.default.copyFileSync(src, dest);
  }
}