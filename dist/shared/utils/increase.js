"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.increaseVersion = increaseVersion;

var _fs = _interopRequireDefault(require("fs"));

var _readlineSync = _interopRequireDefault(require("readline-sync"));

var _copyDistToNewDirectory = require("./copyDistToNewDirectory");

var _deleteDistFolder = require("./deleteDistFolder");

var _copyVersionToAnotherDist = require("./copyVersionToAnotherDist");

var _gitPushAutomatic = require("./gitPushAutomatic");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

async function increaseVersion(packageJsonPath) {
  const pkg = _fs.default.readFileSync(packageJsonPath).toString();

  const newPkg = [];
  let version = '';
  pkg.split(/\r?\n/).forEach(line => {
    if (line.includes('"version":')) {
      const answer = _readlineSync.default.question(`This compilation is
  [1] - Stable version
  [2] - Hard update
  [3] - Soft update
Or
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
      }

      if (answer === '4') {
        process.exit();
      }

      version = `${lts}.${hard}.${soft}`; // eslint-disable-next-line no-param-reassign

      line = `  "version": "${version}",`;
    }

    newPkg.push(line);
  });

  _fs.default.writeFileSync(packageJsonPath, newPkg.join('\n'));

  const copy = _readlineSync.default.question(`Do you want to create a folder with the new version?[y/n]\n`);

  if (copy === 'y') {
    await (0, _copyDistToNewDirectory.copyDistToNewDirectory)('./dist', version);

    const deleteDir = _readlineSync.default.question(`Do you want to delete the dist folder?[y/n]\n`);

    if (deleteDir === 'y') {
      await (0, _deleteDistFolder.deleteDistFolder)('./dist');
    }
  }

  if (copy === 'n') {
    process.exit();
  }

  const writeRealeseNotes = _readlineSync.default.question(`Do you want to write a change logs for this new version?[y/n]\n`);

  if (writeRealeseNotes === 'y') {
    const realeaseNotes = _readlineSync.default.question('Write here\n');

    _fs.default.writeFileSync(`./${version}/changelog.md`, realeaseNotes.toString());
  }

  const copyToAnotheProject = _readlineSync.default.question(`If you use the build in another repository, it is possible to copy it there! Do you want to proceed?[y/n]\n`);

  if (copyToAnotheProject === 'y') {
    const destToAnotherProject = _readlineSync.default.question(`Enter the path of the other project (local) here:\n`);

    await (0, _copyVersionToAnotherDist.copyVersionToAnotherDist)(`./${version}`, `${destToAnotherProject}/${version}`);
  }

  const gitPush = _readlineSync.default.question(`Do you want to do an automatic push to git?[y/n]\n`);

  if (gitPush === 'y') {
    await (0, _gitPushAutomatic.gitPushAutomatic)(version);
  }

  if (gitPush === 'n') {
    process.exit();
  }
}