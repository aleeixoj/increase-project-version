import { Command } from '@shared/utils/commands/commands.util';

const common = new Command();

export async function gitPushAutomatic(branch: string) {
  common.execute(`git checkout -b ${branch}`);
  common.execute(`git add .`);
  common.execute(`git commit -m "${branch}"`);
  common.execute(`git push --set-upstream origin ${branch}`);
}
