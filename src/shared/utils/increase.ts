import fs from 'fs';
import readlineSync from 'readline-sync';

import { copyDistToNewDirectory } from '@utils/copyDistToNewDirectory';
import { deleteDistFolder } from '@utils/deleteDistFolder';

import { copyVersionToAnotherDist } from './copyVersionToAnotherDist';
import { gitPushAutomatic } from './gitPushAutomatic';

export async function increaseVersion(packageJsonPath: string) {
  const pkg = fs.readFileSync(packageJsonPath).toString();
  const newPkg: any[] = [];
  let version = '';
  pkg.split(/\r?\n/).forEach((line: string) => {
    if (line.includes('"version":')) {
      const answer = readlineSync.question(
        `This compilation is
  [1] - Stable version
  [2] - Hard update
  [3] - Soft update
Or
  [4] - To cancel\n`
      );

      // eslint-disable-next-line prefer-const
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
      version = `${lts}.${hard}.${soft}`;

      // eslint-disable-next-line no-param-reassign
      line = `  "version": "${version}",`;
    }
    newPkg.push(line);
  });
  fs.writeFileSync(packageJsonPath, newPkg.join('\n'));

  const copy = readlineSync.question(
    `Do you want to create a folder with the new version?[y/n]\n`
  );
  if (copy === 'y') {
    await copyDistToNewDirectory('./dist', version);
    const deleteDir = readlineSync.question(
      `Do you want to delete the dist folder?[y/n]\n`
    );
    if (deleteDir === 'y') {
      await deleteDistFolder('./dist');
    }
  }
  if (copy === 'n') {
    process.exit();
  }
  const writeRealeseNotes = readlineSync.question(
    `Do you want to write a change logs for this new version?[y/n]\n`
  );

  if (writeRealeseNotes === 'y') {
    const realeaseNotes = readlineSync.question('Write here\n');

    fs.writeFileSync(`./${version}/changelog.md`, realeaseNotes.toString());
  }
  const copyToAnotheProject = readlineSync.question(
    `If you use the build in another repository, it is possible to copy it there! Do you want to proceed?[y/n]\n`
  );

  if (copyToAnotheProject === 'y') {
    const destToAnotherProject = readlineSync.question(
      `Enter the path of the other project (local) here:\n`
    );

    await copyVersionToAnotherDist(
      `./${version}`,
      `${destToAnotherProject}/${version}`
    );
  }

  const gitPush = readlineSync.question(
    `Do you want to do an automatic push to git?[y/n]\n`
  );

  if (gitPush === 'y') {
    await gitPushAutomatic(version);
  }

  if (gitPush === 'n') {
    process.exit();
  }
}
