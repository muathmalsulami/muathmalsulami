const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const {execFileSync} = require('node:child_process');
execFileSync(process.execPath, [path.join(__dirname,'generate.cjs'),'--check'], {stdio:'inherit'});
const readme=fs.readFileSync(path.join(__dirname,'README.md'),'utf8');
assert.match(readme,/^# Muath Alsulami\b/);
assert.match(readme,/<span lang="ar" dir="rtl">معاذ السلمي<\/span>/);
assert.match(readme,/3\.54\/4\.00/);
assert.equal((readme.match(/<img\b[^>]*alt="[^"]+"/g)||[]).length,5);
assert.match(readme,/hero-mobile-still\.svg/);
const headings=new Set([...readme.matchAll(/^#+ (.+)$/gm)].map(([,h])=>h.trim().toLowerCase().replaceAll(' ','-')));
for (const [,anchor] of readme.matchAll(/\]\(#([^)]+)\)/g)) assert(headings.has(anchor),anchor);
for(const file of fs.readdirSync(path.join(__dirname,'art'))){
  const svg=fs.readFileSync(path.join(__dirname,'art',file),'utf8');
  assert(readme.includes(file),file);
  assert(Buffer.byteLength(svg)<16384,file);
  assert.match(svg, /viewBox="0 0 \d+ \d+"/);
  assert.doesNotMatch(svg,/<script|<foreignObject|<image|@import|href=/i);
  if(file.endsWith('-still.svg')) assert.doesNotMatch(svg,/@keyframes|class="travel/);
}
console.log('V3 source, profile anchors, visual assets and static fallbacks verified');
