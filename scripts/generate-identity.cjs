const { readFileSync, writeFileSync } = require('node:fs');
const { join } = require('node:path');

const location = join(__dirname, '..', 'assets', 'identity');
const checking = process.argv.includes('--check');

const linen = {
  field: '#F4F0E7', ink: '#202A27', accent: '#805420',
  grid: '#C9BFAE', face: '#E5DED1', seam: '#9B8A71',
};
const graphite = {
  field: '#212925', ink: '#F4EBDD', accent: '#E3BD84',
  grid: '#46504A', face: '#303B34', seam: '#8B9588',
};

const monogram = `
  <path class="ink" fill="none" stroke-width="12" stroke-linejoin="bevel"
        d="M 18 113 V 36 L 67 80 L 115 36 V 113 L 78 136 L 53 120"/>
  <path class="accent" fill="none" stroke-width="5" stroke-linejoin="bevel"
        d="M 67 80 V 105 L 89 119 V 145 L 67 159 L 45 145 V 125"/>
  <path class="ink" fill="none" stroke-width="2" d="M 115 36 H 144 M 18 113 H 1"/>
  <circle class="dot" cx="144" cy="36" r="3"/>
`;

const trace = 'M 205 146 H 299 L 354 113 H 424 L 479 80 H 548 L 603 47 H 725';
const datum = [354, 479, 603];
const stations = datum.map(x => `
  <g transform="translate(${x} 0)">
    <path class="face seam" stroke-width="1" d="M 0 153 L 68 112 L 68 41 L 0 82 Z"/>
    <path class="seam" fill="none" stroke-width="1" d="M 0 153 L 9 158 L 77 117 V 46 L 68 41 M 68 112 L 77 117"/>
    <path class="grid" fill="none" stroke-width="1" d="M 10 135 L 57 107 M 10 124 L 57 96 M 10 113 L 57 85"/>
  </g>`).join('');

const ticks = Array.from({ length: 63 }, (_, index) => {
  const x = 38 + index * 11.7;
  return `M ${x.toFixed(1)} 202 v ${index % 5 === 0 ? 7 : 3}`;
}).join(' ');

function styles(p) {
  return `.field{fill:${p.field}} .ink{stroke:${p.ink}} .accent{stroke:${p.accent}}
    .grid{stroke:${p.grid}} .face{fill:${p.face}} .seam{stroke:${p.seam}} .dot{fill:${p.accent}}`;
}

function svg(width, height, title, description, content) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}" role="img" aria-labelledby="title description">
  <title id="title">${title}</title>
  <desc id="description">${description}</desc>
  <style>
    ${styles(linen)}
    @media (prefers-color-scheme: dark) { ${styles(graphite)} }
    @media (prefers-reduced-motion: no-preference) {
      .pulse { animation: trace 2.4s cubic-bezier(.35,0,.2,1) 1 both; }
      @keyframes trace {
        0% { stroke-dashoffset: 100; opacity: 0 }
        12% { opacity: 1 }
        80% { opacity: 1 }
        100% { stroke-dashoffset: -9; opacity: 0 }
      }
    }
    .pulse { opacity: 0; }
  </style>
  <rect class="field" x="0" y="0" width="${width}" height="${height}" rx="12"/>
  ${content}
</svg>
`;
}

const outputs = {
  'interface-signature.svg': svg(800, 220, 'Muath Alsulami interface signature',
    'A folded monogram sits beside a trace passing through three layered planes, representing an interface, integration and a system signal.',
    `<path class="grid" fill="none" stroke-width="1" d="M 38 18 H 762 M 38 202 H 762 M 205 30 V 180 M 762 30 V 180 ${ticks}"/>
  <g transform="translate(39 15) scale(1.03)">${monogram}
  </g>
  <path class="grid" fill="none" stroke-width="1" stroke-dasharray="2 7"
        d="M 220 80 H 762 M 220 113 H 762 M 220 146 H 762 M 299 30 V 180 M 424 30 V 180 M 548 30 V 180 M 725 30 V 180"/>
${stations}
  <path class="ink" fill="none" stroke-opacity=".72" stroke-width="2.5" d="${trace}"/>
  <path class="pulse accent" fill="none" stroke-linecap="round" stroke-width="4"
        pathLength="100" stroke-dasharray="9 100" stroke-dashoffset="100" d="${trace}"/>
  <g class="field accent" stroke-width="2.5">
    <circle cx="205" cy="146" r="5"/><circle cx="424" cy="113" r="4"/>
    <circle cx="548" cy="80" r="4"/><circle cx="725" cy="47" r="5"/>
  </g>`),
  'interface-monogram.svg': svg(192, 192, 'Muath Alsulami monogram',
    'A folded M with an enclosed lower loop drawn from the geometry of the Arabic meem.',
    `<g transform="translate(23 0)">${monogram}
  </g>`),
};

outputs['interface-signature-still.svg'] = outputs['interface-signature.svg']
  .replace(/    @media \(prefers-reduced-motion:[\s\S]*?\n    \.pulse \{ opacity: 0; \}\n/, '')
  .replace(/  <path class="pulse accent"[\s\S]*?\/>\n/, '');

for (const [name, content] of Object.entries(outputs)) {
  const path = join(location, name);
  if (checking) {
    if (readFileSync(path, 'utf8').replaceAll('\r\n', '\n') !== content) {
      throw new Error(`Regenerate ${name} with node scripts/generate-identity.cjs`);
    }
  } else {
    writeFileSync(path, content);
  }
}
console.log(checking ? 'Generated SVGs match their source' : 'Generated identity SVGs');
