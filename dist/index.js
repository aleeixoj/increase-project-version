"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.increaseVersion = increaseVersion;

var _fs = _interopRequireDefault(require("fs"));

var _readlineSync = _interopRequireDefault(require("readline-sync"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function increaseVersion(packageJsonPath) {
  const pkg = _fs.default.readFileSync(packageJsonPath).toString();

  const newPkg = [];
  pkg.split(/\r?\n/).forEach(line => {
    if (line.includes('"version":')) {
      const answer = _readlineSync.default.question(`This compilation is
        [1] - Stable version
        [2] - Hard update
        [3] - Soft update
        [4] - To cancel\n`); // eslint-disable-next-line prefer-const


      let [lts, hard, soft] = line.substring(14, line.length - 2).split('.');

      if (answer === '1') {
        lts = (Number(lts) + 1).toString();
        hard = '0';
        soft = '0';
      }

      if (answer === '2') {
        hard = (Number(hard) + 1).toString();
        soft = '0';
      }

      if (answer === '3') {
        soft = (Number(soft) + 1).toString();
      } // eslint-disable-next-line no-param-reassign


      line = `  "version": "${lts}.${hard}.${soft}",`;
    }

    newPkg.push(line);
  });

  _fs.default.writeFileSync(packageJsonPath, newPkg.join('\n'));
}

increaseVersion('./package.json');