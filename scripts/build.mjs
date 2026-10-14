import { cp, mkdir, rm, stat } from 'node:fs/promises';
import { join, resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const dist = join(root, 'dist');
const publicFiles = ['index.html', 'styles.css', 'favicon.svg', 'manifest.webmanifest', 'sw.js', 'assets', 'src'];
await rm(dist, { recursive:true, force:true });
await mkdir(dist, { recursive:true });
for (const item of publicFiles) {
  await stat(join(root,item));
  await cp(join(root,item), join(dist,item), { recursive:true });
}
console.log(`Build complete: ${publicFiles.length} app assets copied into dist/`);
console.log('Deploy dist/ to any static host, including GitHub Pages.');
