"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.gitPushAutomatic = gitPushAutomatic;

var _commands = require("./commands/commands.util");

const common = new _commands.Command();

async function gitPushAutomatic(branch) {
  common.execute(`git checkout -b ${branch}`);
  common.execute(`git add .`);
  common.execute(`git commit -m "${branch}"`);
  common.execute(`git push --set-upstream origin ${branch}`); // const gitBranch = await common.execute(`git checkout -b ${branch}`)
}