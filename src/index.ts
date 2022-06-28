import fs from 'fs';
import readlineSync from 'readline-sync';

export function increaseVersion(packageJsonPath: string): void {
  const pkg = fs.readFileSync(packageJsonPath).toString();
  const newPkg: any[] = [];
  pkg.split(/\r?\n/).forEach((line: string) => {
    if (line.includes('"version":')) {
      const answer = readlineSync.question(
        `This compilation is
        [1] - Stable version
        [2] - Hard update
        [3] - Soft update
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

      // eslint-disable-next-line no-param-reassign
      line = `  "version": "${lts}.${hard}.${soft}",`;
    }
    newPkg.push(line);
  });
  fs.writeFileSync(packageJsonPath, newPkg.join('\n'));
}

increaseVersion('./package.json');
