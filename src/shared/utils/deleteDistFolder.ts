import fs from 'fs';

export async function deleteDistFolder(src: string) {
  const distExists = fs.existsSync(src);
  const stats = fs.statSync(src);
  if (distExists && stats.isDirectory()) {
    fs.rmSync(src, { recursive: true });
  }
}
