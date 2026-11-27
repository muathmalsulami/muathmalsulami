const assert = require('node:assert/strict');
const { readFileSync, readdirSync, existsSync } = require('node:fs');
const { join } = require('node:path');
const { execFileSync } = require('node:child_process');

const root = __dirname;
const readme = readFileSync(join(root, 'README.md'), 'utf8').replaceAll('\r\n', '\n');
const identity = join(root, 'assets', 'identity');

execFileSync(process.execPath, [join(root, 'scripts', 'generate-identity.cjs'), '--check'], { stdio: 'inherit' });
assert.equal((readme.match(/^# /gm) || []).length, 1);
assert.match(readme, /<span lang="ar" dir="rtl">معاذ السلمي<\/span>/);
assert.match(readme, /<details>\s*<summary>Education and Git training<\/summary>/);
assert.doesNotMatch(readme, /learn-git-with-pathy|<script|TODO|FIXME/i);

const targets = [...readme.matchAll(/\[([^\]\n]+)\]\(([^\s)]+)\)/g)];
const headings = new Set([...readme.matchAll(/^#{1,6} (.+)$/gm)].map(([, heading]) =>
  heading.trim().toLowerCase().replace(/[^\p{L}\p{N} -]/gu, '').replaceAll(' ', '-')));
for (const [, , target] of targets) {
  if (target.startsWith('#')) {
    assert(headings.has(target.slice(1)), `Unknown README anchor ${target}`);
  } else if (!/^(https:\/\/|mailto:)/.test(target)) {
    assert(existsSync(join(root, target)), `Missing README destination ${target}`);
  }
}

const images = [...readme.matchAll(/<img\b[^>]*src="([^"]+)"[^>]*alt="([^"]+)"/g)];
assert.equal(images.length, 1);
assert.equal(images[0][1], 'assets/identity/interface-signature-still.svg');
assert(images[0][2].trim().length > 0, 'Hero needs descriptive alternative text');
assert.match(readme, /<source media="\(prefers-reduced-motion: no-preference\)" srcset="assets\/identity\/interface-signature\.svg">/);
assert.doesNotMatch(readFileSync(join(root, images[0][1]), 'utf8'), /@keyframes|class="pulse/);
for (const name of readdirSync(identity)) {
  assert.match(name, /\.svg$/);
  const svg = readFileSync(join(identity, name), 'utf8');
  assert(Buffer.byteLength(svg) < 8192, `${name} exceeds 8 KiB`);
  assert.match(svg, /<svg[\s\S]*viewBox="0 0 \d+ \d+"/);
  assert.match(svg, /<title id="title">[^<]+<\/title>/);
  assert.match(svg, /<desc id="description">[^<]+<\/desc>/);
  assert.doesNotMatch(svg, /<(?:script|image|foreignObject)\b|\bon\w+\s*=|\b(?:xlink:)?href\s*=|@import/i);
}
console.log('README hierarchy, local destinations, alternative text and SVG checks passed');
