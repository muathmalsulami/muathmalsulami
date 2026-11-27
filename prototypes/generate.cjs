const fs = require('node:fs');
const path = require('node:path');
const root = path.join(__dirname, '..');
const check = process.argv.includes('--check');

const directions = {
  'creative-engineer': {
    light: ['#F8E9DF','#24162A','#B83C1F','#634393','#F6A06B','#F1D2C8'],
    dark: ['#2B1B34','#FFF0E1','#FF9F74','#C2A1FA','#E06345','#4A3155'],
    name: 'Creative Engineer', motif: 'A split ribbon folding into an open M.',
    hero: ['Software','in use'],
    stages: ['Interface','Model output','Service health'],
  },
  'engineering-signature': {
    light: ['#E9EFFB','#152453','#2049BD','#006875','#ECD755','#CFDDF8'],
    dark: ['#101C3C','#F3F5FF','#8CABFF','#71DDD7','#F2DC61','#233865'],
    name: 'Engineering Signature', motif: 'Three fitted planes form a stepped junction with a luminous core.',
    hero: ['Interface','API','Signals'],
    stages: ['Application','Integration','Observability'],
  },
  'recruiter-first': {
    light: ['#F7EEE9','#27253D','#9B2341','#304A80','#EFB6B3','#EACED0'],
    dark: ['#251E31','#FFF1EB','#FF9AB0','#B0C4FF','#96556A','#423247'],
    name: 'Recruiter First', motif: 'An offset open bracket with a diamond-shaped terminal.',
    hero: ['Build','Integrate','Observe'],
    stages: ['Software development','AI integration','Observability'],
  },
};

const projects = [
  { key: 'numoo', label: 'Interface / REST API', glyph: '<rect x="0" y="8" width="86" height="60" rx="8"/><path d="M 0 24 H 86 M 17 45 H 37 M 50 45 H 67 M 43 68 V 85 H 115"/><circle cx="122" cy="85" r="6"/>' },
  { key: 'ncm', label: 'Metrics / logs', glyph: '<path d="M 0 70 H 20 V 15 H 40 V 52 H 62 V 31 H 85 V 70 H 130 M 0 83 H 130"/><circle cx="40" cy="15" r="5"/><circle cx="85" cy="31" r="5"/>' },
  { key: 'portfolio', label: 'Arabic / English', glyph: '<path d="M 12 72 V 14 H 59 V 72 Z M 73 72 V 14 H 120 V 72 Z M 23 32 H 46 M 23 44 H 40 M 87 32 H 109 M 92 44 H 109 M 41 86 H 90"/>' },
];
const escape = value => value.replaceAll('&', '&amp;').replaceAll('<', '&lt;');
const text = (x, y, value, size, cls = 'ink', weight = 700) =>
  `<text x="${x}" y="${y}" font-size="${size}" font-weight="${weight}" class="${cls}">${escape(value)}</text>`;

function palette(values) {
  return ['bg','ink','accent','second','highlight','soft'].map((key,i) =>
    `.${key}{fill:${values[i]}} .s-${key}{stroke:${values[i]}}`).join(' ');
}

function svg(d, width, height, label, body, motion = '') {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" role="img">
  <title>${escape(label)}</title>
  <style>
    ${palette(d.light)}
    @media(prefers-color-scheme:dark){${palette(d.dark)}}
    text{font-family:Arial,Helvetica,sans-serif;letter-spacing:-.025em}
    ${motion}
  </style>
  ${body}
</svg>
`;
}

const mark = {
  'creative-engineer': '<path class="accent" d="M 0 71 L 0 3 Q 0 0 4 0 H 22 L 48 31 L 75 0 H 95 Q 99 0 99 4 V 71 H 78 V 30 L 49 62 L 21 30 V 71 Z"/><path class="second" d="M 27 64 L 49 83 L 72 64 V 79 L 49 99 L 27 79 Z"/>',
  'engineering-signature': '<path class="second" d="M 6 41 L 49 16 L 92 41 L 49 66 Z"/><path class="accent" d="M 6 47 L 44 70 V 99 L 6 76 Z"/><path class="ink" d="M 54 70 L 92 47 V 76 L 54 99 Z"/><path class="highlight" d="M 49 0 L 68 11 L 49 22 L 30 11 Z"/>',
  'recruiter-first': '<path class="accent" d="M 0 0 H 64 V 16 H 16 V 73 H 49 V 89 H 0 Z"/><path class="second" d="M 41 25 H 86 V 49 H 70 V 41 H 41 Z"/><path class="ink" d="M 78 55 L 97 74 L 78 93 L 59 74 Z"/>',
};

function hero(key, d, animated) {
  const plate = '<rect class="bg" width="800" height="300" rx="20"/>';
  let art;
  let animation;
  if (key === 'creative-engineer') {
    art = `${plate}
    <path class="soft" d="M 419 300 V 0 H 728 Q 800 0 800 73 V 280 Q 800 300 780 300 Z"/>
    <path class="second" d="M 802 13 C 674 1 657 94 566 94 L 512 94 C 443 94 418 131 418 183 V 299 H 492 V 188 C 492 163 502 161 529 161 H 587 C 704 161 718 67 802 84 Z"/>
    <path class="highlight" d="M 800 176 C 724 122 673 202 614 205 H 559 V 275 H 615 C 688 271 725 208 800 253 Z"/>
    <g transform="translate(564 88) scale(1.57)"><g class="fold">${mark[key]}</g></g>
    <g class="copy">${text(42,107,'Software',81)}${text(42,191,'in use.',95,'accent')}${text(45,246,'Interfaces · APIs · systems',29,'second',600)}</g>
    <path class="drawing s-ink" d="M 429 268 L 494 203 Q 524 173 553 173 H 591 Q 624 173 649 148 L 682 115" fill="none" stroke-width="4" stroke-linecap="round" pathLength="100"/>
    `;
    animation = `.fold{transform-box:fill-box;transform-origin:center;animation:fold 1.4s .35s both}
      .copy{animation:appear 1.5s .1s both}.drawing{stroke-dasharray:100;animation:draw 2.3s 1.6s both}
      @keyframes fold{from{transform:rotate(-28deg) scale(.68);opacity:.2}to{transform:rotate(0) scale(1);opacity:1}}
      @keyframes appear{from{opacity:.4;transform:translateY(13px)}to{opacity:1;transform:translateY(0)}}
      @keyframes draw{from{stroke-dashoffset:100;opacity:.1}to{stroke-dashoffset:0;opacity:1}}`;
  } else if (key === 'engineering-signature') {
    const stations = [
      [140, 'Interface', 'M -53 11 L 0 -19 L 55 11 L 0 41 Z', 's-accent'],
      [400, 'Model API', 'M -54 11 L 0 -19 L 54 11 L 0 41 Z', 's-second'],
      [660, 'Signals', 'M -54 11 L 0 -19 L 54 11 L 0 41 Z', 's-accent'],
    ];
    art = `${plate}
      <path class="soft" d="M 0 195 L 800 70 V 268 Q 800 300 777 300 H 20 Q 0 300 0 277 Z"/>
      <path class="s-accent line" d="M 140 171 H 264 L 300 129 H 524 L 560 171 H 660" pathLength="100" stroke-width="5" stroke-linecap="round" fill="none"/>
      ${stations.map(([x,label,shape,stroke],i)=>`<g transform="translate(${x} 133)">
        <g class="module layer-${i}">
          <path class="second" d="M -54 11 L 0 41 L 54 11 V 39 L 0 69 L -54 39 Z"/>
          <path class="bg ${stroke}" stroke-width="3" d="${shape}"/>
          <path class="highlight" d="M -20 12 L 0 1 L 20 12 L 0 23 Z"/>
        </g>
      </g>${text(x-(i===0?65:i===1?73:52),261,label,32,'ink')}`).join('')}
      ${text(33,53,'Application systems',45)}
      <g transform="translate(703 17) scale(.58)">${mark[key]}</g>
      <path class="pulse s-highlight" d="M 140 171 H 264 L 300 129 H 524 L 560 171 H 660" pathLength="100" stroke-width="7" stroke-linecap="round" fill="none"/>
    `;
    animation = `.module{animation:seat .9s cubic-bezier(.2,.7,.25,1) both}
      .layer-1{animation-delay:.65s}.layer-2{animation-delay:1.3s}
      .line{stroke-dasharray:100;animation:draw 1.55s 1.8s both}
      .pulse{stroke-dasharray:9 100;opacity:0;animation:pulse 1.45s 3.35s both}
      @keyframes seat{from{opacity:.2;transform:translateY(-22px)}to{opacity:1;transform:translateY(0)}}
      @keyframes draw{from{stroke-dashoffset:100}to{stroke-dashoffset:0}}
      @keyframes pulse{0%{opacity:0;stroke-dashoffset:109}12%{opacity:1}82%{opacity:1}100%{opacity:0;stroke-dashoffset:0}}`;
    if (!animated) art = art.replace(/<path class="pulse[^>]+\/>/, '');
  } else {
    art = `${plate}
      <path class="soft" d="M 595 0 H 780 Q 800 0 800 20 V 280 Q 800 300 780 300 H 595 Z"/>
      <path class="highlight" d="M 595 0 L 800 127 V 152 L 595 43 Z"/>
      <g transform="translate(623 93) scale(1.17)"><g class="lock">${mark[key]}</g></g>
      ${d.hero.map((label,i)=>`<g class="step step-${i}">
        ${text(49,89+i*72,label,60,i===1?'accent':'ink')}
        <path class="s-second track" d="M 380 ${69+i*72} H 540" pathLength="100" stroke-width="3"/>
        <path class="second" d="M 535 ${63+i*72} L 541 ${69+i*72} L 535 ${75+i*72} L 529 ${69+i*72} Z"/>
      </g>`).join('')}
      `;
    animation = `.step{animation:register .95s both}.step-1{animation-delay:.7s}.step-2{animation-delay:1.4s}
      .track{stroke-dasharray:100;animation:draw 1.35s 1.75s both}
      .lock{transform-box:fill-box;transform-origin:center;animation:lock 1.3s 2.9s both}
      @keyframes register{from{opacity:.35;transform:translateX(-13px)}to{opacity:1;transform:translateX(0)}}
      @keyframes draw{from{stroke-dashoffset:100}to{stroke-dashoffset:0}}
      @keyframes lock{0%{transform:scale(.91)}45%{transform:scale(1.07)}100%{transform:scale(1)}}`;
  }
  return svg(d, 800, 300, d.name + '. ' + d.motif, art, animated ? `@media(prefers-reduced-motion:no-preference){${animation}}` : '');
}

const functions = ['Build','Integrate','Observe','Ship'];
const glyphs = [
  '<path d="M 6 26 L 25 8 L 44 26 L 25 44 Z M 16 26 H 34"/>',
  '<path d="M 6 15 H 23 V 34 H 43 M 36 27 L 43 34 L 36 41"/><circle cx="6" cy="15" r="3"/>',
  '<path d="M 4 34 H 12 L 19 16 L 27 41 L 34 22 H 45"/>',
  '<path d="M 10 41 V 10 H 39 M 28 0 L 39 10 L 28 21"/>',
];

function capability(key,d) {
  const backdrop = '<rect class="bg" width="800" height="132" rx="17"/>';
  const segments = functions.map((name,i) => {
    const x = 100+200*i;
    const base = key==='creative-engineer'
      ? `<ellipse class="${i%2?'soft':'highlight'}" cx="${x}" cy="47" rx="53" ry="28" transform="rotate(${i%2?9:-9} ${x} 47)"/>`
      : key==='engineering-signature'
      ? `<path class="soft" d="M ${x-50} 47 L ${x} 15 L ${x+50} 47 L ${x} 79 Z"/>`
      : `<path class="s-accent" fill="none" stroke-width="4" d="M ${x-47} 60 V 22 H ${x+47} V 56"/>`;
    return `${base}<g transform="translate(${x-22} 26)" class="s-ink" fill="none" stroke-width="4" stroke-linecap="round" stroke-linejoin="round">${glyphs[i]}</g>${text(x-[39,66,61,34][i],114,name,32)}`;
  }).join('');
  return svg(d,800,132,'Build, integrate, observe and ship',backdrop+segments);
}

function project(key,d,p,i) {
  const basic = '<rect class="bg" width="800" height="116" rx="14"/>';
  const scaled = `<g transform="translate(56 14) scale(.94)" class="s-ink" fill="none" stroke-width="4" stroke-linecap="round" stroke-linejoin="round">${p.glyph}</g>`;
  let overlay;
  if (key==='creative-engineer') {
    const shape = [
      '<path class="highlight" d="M 0 96 L 78 0 H 240 L 176 116 H 0 Z"/>',
      '<path class="soft" d="M 0 10 C 93 -29 136 90 238 28 V 116 H 0 Z"/>',
      '<path class="highlight" d="M 0 0 H 190 Q 243 58 190 116 H 0 Z"/>',
    ][i];
    overlay = `${shape}${scaled}${text(267,72,p.label,45,'ink')}<g transform="translate(725 34) scale(.43)">${mark[key]}</g>`;
  } else if (key==='engineering-signature') {
    overlay = `<path class="soft" d="M 4 103 L 100 5 H 261 L 181 115 H 9 Z"/>${scaled}
      <path class="s-second" d="M 206 92 H 644 L 682 59 H 766" fill="none" stroke-width="2"/>
      ${text(270,61,p.label,43,'ink')}<g transform="translate(710 24) scale(.63)">${mark[key]}</g>`;
  } else {
    overlay = `<path class="soft" d="M 0 0 H 208 V 116 H 0 Z"/>${scaled}
      <path class="s-accent" stroke-width="3" d="M 222 20 V 96"/>
      ${text(264,71,p.label,44,'ink')}
      <path class="accent" d="M 720 38 L 740 58 L 720 78 L 700 58 Z"/>`;
  }
  return svg(d,800,116,p.label+' conceptual illustration',basic+overlay);
}

for (const [key,direction] of Object.entries(directions)) {
  const folder=path.join(root,key,'art');
  if(!check) fs.mkdirSync(folder,{recursive:true});
  const artwork = {
    'hero.svg':hero(key,direction,true),
    'hero-still.svg':hero(key,direction,false),
    'capabilities.svg':capability(key,direction),
    'signature.svg':svg(direction,124,124,direction.motif,
      `<rect class="bg" width="124" height="124" rx="19"/><g transform="translate(13 12)">${mark[key]}</g>`),
  };
  projects.forEach((p,i)=>artwork[`${p.key}.svg`]=project(key,direction,p,i));
  for (const [name,data] of Object.entries(artwork)) {
    const dest=path.join(folder,name);
    if(check) {
      if(fs.readFileSync(dest,'utf8').replaceAll('\r\n','\n')!==data) throw Error(`Regenerate ${dest}`);
    } else fs.writeFileSync(dest,data);
  }
}
