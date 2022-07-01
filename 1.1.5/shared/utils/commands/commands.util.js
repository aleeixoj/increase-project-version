"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Command = void 0;

var _child_process = require("child_process");

var _lodash = _interopRequireDefault(require("lodash"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable prettier/prettier */

/* eslint-disable @typescript-eslint/no-empty-function */
class Command {
  constructor() {
    this.processList = [];
  }

  execute(commandLine) {
    this.processList.push(commandLine);

    if (this.processList.length === 1) {
      this.processCommand();
      return true;
    }

    return false;
  }

  processCommand() {
    if (_lodash.default.isNil(this.processList[0])) {
      return false;
    }

    const commandLine = this.processList[0];
    const commandArray = commandLine.split(' ');
    const command = commandArray[0];
    const parameters = [...commandArray].filter((_, idx) => idx > 0);
    if (_lodash.default.isUndefined(command)) return false;
    const commands = (0, _child_process.spawn)(command, parameters);
    commands.stdout.on('data', data => {
      if (data.indexOf('Executing') < 0) {
        console.log(`${data}`);
      }
    });
    commands.stderr.on('data', data => {
      console.error(`command: ${commandLine}`);
      console.error(`stderr: ${data}`); // process.exit();
    });
    commands.on('error', error => {
      console.error(`command: ${commandLine}`);
      console.error(`error: ${error.message}`); // process.exit();
    });
    commands.on('exit', (code, sign) => {
      this.processList = this.processList.filter((_, idx) => idx !== 0);
      commands.removeAllListeners();
      process.removeListener('exit', () => {});
      process.removeListener('SIGINT', () => {});
      this.processCommand();
    });
    return true;
  }

}

exports.Command = Command;