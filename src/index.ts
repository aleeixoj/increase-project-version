import fs from 'fs';
import readlineSync from 'readline-sync';

export function increaseVersion(packageJsonPath: string): void {
  const pkg = fs.readFileSync(packageJsonPath).toString();
  const newPkg: any[] = [];
  pkg.split(/\r?\n/).forEach((line: string) => {
    if (line.includes('"version":')) {
      const answer = readlineSync.question(
        'Essa compilação é \n[1] - correção de bugs ou [2] - versão estavel?'
      );

      // eslint-disable-next-line prefer-const
      let [lts, control, bug] = line.substring(14, line.length - 2).split('.');

      if (answer === '1') {
        bug = (Number(bug) + 1).toString();
      }
      if (answer === '2') {
        lts = (Number(lts) + 1).toString();
      }

      // eslint-disable-next-line no-param-reassign
      line = `  "version": "${lts}.${control}.${bug}",`;
    }
    newPkg.push(line);
  });
  fs.writeFileSync(packageJsonPath, newPkg.join('\n'));
}
