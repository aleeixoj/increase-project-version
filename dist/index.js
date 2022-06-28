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
      const answer = _readlineSync.default.question('Essa compilação é \n[1] - correção de bugs ou [2] - versão estavel?'); // eslint-disable-next-line prefer-const


      let [lts, control, bug] = line.substring(14, line.length - 2).split('.');

      if (answer === '1') {
        bug = (Number(bug) + 1).toString();
      }

      if (answer === '2') {
        lts = (Number(lts) + 1).toString();
      } // eslint-disable-next-line no-param-reassign


      line = `  "version": "${lts}.${control}.${bug}",`;
    }

    newPkg.push(line);
  });

  _fs.default.writeFileSync(packageJsonPath, newPkg.join('\n'));
}

increaseVersion('./package.json');