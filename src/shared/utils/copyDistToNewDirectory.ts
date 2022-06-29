import fs from 'fs';
import path from 'path';

export async function copyDistToNewDirectory(
  src: string,
  dest: string
): Promise<void> {
  const distExists = fs.existsSync(src);
  const stats = fs.statSync(src);

  if (distExists && stats.isDirectory()) {
    fs.mkdirSync(dest);
    fs.readdirSync(src).forEach((childrenName: any) => {
      copyDistToNewDirectory(
        path.join(src, childrenName),
        path.join(dest, childrenName)
      );
    });
  } else {
    fs.copyFileSync(src, dest);
  }
}
