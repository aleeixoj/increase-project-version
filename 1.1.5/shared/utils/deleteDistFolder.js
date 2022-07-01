"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteDistFolder = deleteDistFolder;

var _fs = _interopRequireDefault(require("fs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

async function deleteDistFolder(src) {
  const distExists = _fs.default.existsSync(src);

  const stats = _fs.default.statSync(src);

  if (distExists && stats.isDirectory()) {
    _fs.default.rmSync(src, {
      recursive: true
    });
  }
}