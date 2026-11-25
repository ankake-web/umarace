import { readFileSync, mkdirSync, copyFileSync, cpSync, existsSync } from 'node:fs';
import { SourceTextModule, Script } from 'node:vm';
import { resolve } from 'node:path';
const html = readFileSync('index.html', 'utf8');
let scripts = 0;
for (const match of html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/g)) {
  if (/type=["']module["']/.test(match[1])) new SourceTextModule(match[2]);
  else new Script(match[2]);
  scripts++;
}
if (scripts < 2) throw new Error('Game scripts missing');
if (html.includes('href="../../"')) throw new Error('Portal link remains');
for (const match of html.matchAll(/(?:src=["']|url\(["']?)(assets\/[^"')]+)["')]/g)) {
  if (!existsSync(resolve(match[1]))) throw new Error('Asset missing: ' + match[1]);
}
mkdirSync('dist', { recursive: true });
for (const name of ['index.html', 'favicon.svg', '.nojekyll', 'umauma-race.html']) {
  if (existsSync(name)) copyFileSync(name, 'dist/' + name);
}
if (existsSync('assets')) cpSync('assets', 'dist/assets', { recursive: true });
console.log('Built standalone game; inline JavaScript and local assets verified.');
