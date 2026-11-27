const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const {execFileSync} = require('node:child_process');
for (const source of ['generate.cjs','readmes.cjs']) {
  execFileSync(process.execPath,[path.join(__dirname,source),'--check']);
}
for (const key of ['creative-engineer','engineering-signature','recruiter-first']) {
  const root = path.join(__dirname,key);
  const readme = fs.readFileSync(path.join(root,'README.md'),'utf8');
  assert.match(readme, /# Muath Alsulami/);
  assert.match(readme, /معاذ السلمي/);
  assert.match(readme, /3\.54\/4\.00/);
  assert.doesNotMatch(readme, /<details>|<script/);
  const headings = [...readme.matchAll(/^#+ (.+)$/gm)].map(match=>match[1].trim().toLowerCase().replaceAll(' ','-'));
  for(const [,anchor] of readme.matchAll(/\]\(#([^)]+)\)/g)) assert(headings.includes(anchor),anchor);
  assert.match(readme, /media="\(prefers-reduced-motion: no-preference\)" srcset="art\/hero\.svg"/);
  for(const name of fs.readdirSync(path.join(root,'art'))) {
    const file=fs.readFileSync(path.join(root,'art',name),'utf8');
    assert(Buffer.byteLength(file)<8192,name);
    assert.match(file, /viewBox="0 0 \d+ \d+"/);
    assert.doesNotMatch(file, /<script|<foreignObject|<image|@import|href=/i);
    if(name==='hero-still.svg') assert.doesNotMatch(file, /@keyframes/);
    if(name!=='hero.svg') assert(readme.includes(name),name);
  }
}
console.log('Three prototype READMEs and generated SVGs pass integrity checks');
