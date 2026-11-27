const fs = require('node:fs');
const path = require('node:path');
const logos = require('./brand-paths.json').paths;
const out = path.join(__dirname, 'art');
const check = process.argv.includes('--check');

const themes = {
  light: ['#f9eee5','#291d37','#623a66','#e7c8cd','#e9a256','#bd382d','#40398e','#a080a0','#fff9ef','#bc7e99'],
  dark: ['#23192f','#fff0e5','#e8c4dd','#503451','#ffd087','#f77661','#a99bf9','#775779','#3a2744','#c890ac'],
};
const fields = ['paper','ink','muted','tone','amber','coral','iris','rule','surface','rose'];
const theme = values => fields.map((field,index)=>`.${field}{fill:${values[index]}}.s-${field}{stroke:${values[index]}}.stop-${field}{stop-color:${values[index]}}`).join('');
const typography = '.depth{fill:#36243e}@media(prefers-color-scheme:dark){.depth{fill:#130e1d}}text{font-family:Arial,Helvetica,sans-serif}.serif{font-family:Georgia,serif;letter-spacing:-.055em}.mono{font-family:Consolas,monospace;letter-spacing:.10em}';
const txt = (x,y,words,size,classes='ink',weight=600) => `<text x="${x}" y="${y}" font-size="${size}" font-weight="${weight}" class="${classes}">${words.replaceAll('&','&amp;')}</text>`;
const rect = (x,y,w,h,r,classes) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" class="${classes}"/>`;
const stroke = (d,classes,w=1) => `<path d="${d}" fill="none" class="${classes}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"/>`;
const dot = (x,y,r,classes) => `<circle cx="${x}" cy="${y}" r="${r}" class="${classes}"/>`;
const shift = (x,y,s,body) => `<g transform="translate(${x} ${y}) scale(${s})">${body}</g>`;
function svg(w,h,title,body,extra=''){
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" role="img">
  <title>${title}</title>
  <style>${theme(themes.light)}@media(prefers-color-scheme:dark){${theme(themes.dark)}}${typography}${extra}</style>
  <defs>
    <linearGradient id="field" x2="1" y2="1"><stop class="stop-surface"/><stop offset="1" class="stop-tone"/></linearGradient>
    <linearGradient id="heat" x1="0" y1="1" x2="1" y2="0"><stop class="stop-coral"/><stop offset="1" class="stop-amber"/></linearGradient>
    <linearGradient id="fold" x2="1" y2="1"><stop class="stop-iris"/><stop offset="1" class="stop-rose"/></linearGradient>
    <pattern id="hatch" width="6" height="6" patternUnits="userSpaceOnUse"><path d="M 0 6 L 6 0" class="s-rule" stroke-width=".65" opacity=".6"/></pattern>
  </defs>
  ${body}
</svg>
`.replace(/[ \t]+$/gm,'');
}

const main = 'M 39 219 L 39 95 Q 39 54 84 41 L 154 19 L 214 82 L 286 19 L 351 39 Q 385 50 385 89 L 385 151 Q 385 171 362 179 L 314 196 L 281 159 L 319 146 Q 332 141 332 126 L 332 96 Q 332 82 318 77 L 296 70 L 212 145 L 141 69 L 106 81 Q 92 85 92 103 L 92 202 Z';
const loop = 'M 126 194 L 126 164 L 180 144 L 216 185 L 272 166 L 296 195 L 220 222 Q 208 227 197 215 L 173 189 L 173 208 Q 173 223 160 227 L 107 247 L 83 224 L 114 213 Q 126 208 126 194 Z';
const facets = 'M 39 95 Q 39 54 84 41 L 154 19 L 141 69 L 106 81 Q 92 85 92 103 Z M 214 82 L 286 19 L 296 70 L 212 145 Z M 351 39 Q 385 50 385 89 L 385 151 L 332 126 L 332 96 Q 332 82 318 77 Z';
const assemblyRoute = 'M 26 223 C 80 214 96 172 133 159 L 170 146 Q 184 142 196 155 L 212 174 Q 225 187 240 181 L 326 150 Q 351 141 351 118 V 96 Q 351 79 338 70 L 291 55';
function mark(animated=false) {
  return `<g class="upper">
  <path d="${main}" class="depth" transform="translate(0 10)" opacity=".92"/>
  <path d="${main}" fill="url(#heat)"/>
  <path d="${facets}" fill="url(#hatch)" opacity=".42"/>
  ${stroke('M 48 95 Q 48 61 85 50 L 152 29 L 212 93 L 285 31 L 345 48 Q 376 60 376 89','s-surface',1.4)}
  ${stroke('M 104 78 L 143 65 L 212 139 L 290 69 M 332 137 Q 331 150 320 154 L 291 165','s-ink',1.1)}
  </g>
  <g class="lower">
    <path d="${loop}" class="depth" transform="translate(0 9)" opacity=".93"/>
    <path d="${loop}" fill="url(#fold)"/>
    ${stroke('M 132 168 L 178 152 L 214 193 L 271 174','s-surface',1.2)}
  </g>
  <path d="${assemblyRoute}" class="route s-surface" pathLength="100" fill="none" stroke-width="2.3" stroke-linecap="round"/>
  ${animated ? `<path d="${assemblyRoute}" class="travel s-amber" pathLength="100" fill="none" stroke-width="6" stroke-linecap="round"/>` : ''}
  <g class="terminal">${dot(291,55,8,'ink')}${dot(291,55,3.6,'amber')}</g>`;
}
const animation = `@media(prefers-reduced-motion:no-preference){
  .upper,.lower,.terminal{transform-box:fill-box;transform-origin:center}
  .upper{animation:upper 1.75s cubic-bezier(.16,.72,.25,1) .20s both}
  .lower{animation:lower 1.65s cubic-bezier(.16,.72,.25,1) .92s both}
  .route{stroke-dasharray:100;animation:draw 1.7s cubic-bezier(.44,.08,.33,1) 2.05s both}
  .travel{stroke-dasharray:12 100;animation:travel 1.78s ease-in-out 3.65s both}
  .terminal{animation:lock .75s cubic-bezier(.18,.75,.3,1) 4.93s both}
  .draft{animation:draft 2.4s ease-out both}
  @keyframes upper{from{opacity:.23;transform:translate(-28px,-24px) rotate(-8deg)}to{opacity:1;transform:none}}
  @keyframes lower{from{opacity:.18;transform:translate(25px,44px) rotate(9deg)}to{opacity:1;transform:none}}
  @keyframes draw{from{stroke-dashoffset:100;opacity:.25}to{stroke-dashoffset:0;opacity:1}}
  @keyframes travel{0%{opacity:0;stroke-dashoffset:112}16%{opacity:1}80%{opacity:1}100%{opacity:0;stroke-dashoffset:0}}
  @keyframes lock{0%{opacity:.2;transform:scale(.65)}55%{opacity:1;transform:scale(1.22)}100%{opacity:1;transform:scale(1)}}
  @keyframes draft{from{opacity:.78}to{opacity:.43}}
}.travel{opacity:0}.draft{opacity:.43}`;

function hero(small, animated) {
  const w=small?600:920, h=small?355:322;
  const plate= `<rect width="${w}" height="${h}" rx="22" fill="url(#field)"/>
    <clipPath id="frame"><rect width="${w}" height="${h}" rx="22"/></clipPath>
    <g clip-path="url(#frame)">
      <path class="paper" d="${small?'M 0 0 H 600 L 400 355 H 0 Z':'M 0 0 H 630 L 480 322 H 0 Z'}"/>
      <path fill="url(#hatch)" opacity=".45" d="${small?'M 460 0 H 600 V 355 H 360 Z':'M 744 0 H 920 V 322 H 650 Z'}"/>
    </g>`;
  const construction = `<g class="draft">
    <ellipse cx="199" cy="132" rx="204" ry="119" class="s-rule" fill="none"/>
    <ellipse cx="200" cy="132" rx="169" ry="85" class="s-rule" fill="none" stroke-dasharray="2 5"/>
    ${stroke('M -15 132 H 424 M 200 5 V 261 M 49 41 V 73 M 35 57 H 63 M 365 190 V 222 M 350 206 H 379','s-rule')}
    </g>`;
  const visual = shift(small?100:414,small?26:25,small?1.02:1.13,construction+mark(animated));
  const editorial = small
    ? `${txt(34,319,'From interface to signal',42,'ink serif')}${stroke('M 38 335 H 561','s-rule')}`
    : `${txt(46,79,'From interface',57,'ink serif')}${txt(46,139,'to signal.',68,'ink serif')}${stroke('M 50 170 H 321','s-rule')}
        ${txt(51,210,'APPLICATION',15,'muted mono')}${txt(51,236,'MODEL INTEGRATION',15,'muted mono')}${txt(51,262,'OBSERVABILITY',15,'muted mono')}`;
  return svg(w,h,'A folded personal signature connects an interface, model integration and observability signal.',plate+visual+editorial,animated?animation:'');
}

const stacks=[
  ['Build',[['html5','HTML'],['css','CSS'],['javascript','JS']]],
  ['Integrate',[['python','Python'],['flask','Flask']]],
  ['Observe',[['docker','Docker'],['prometheus','Prom.'],['grafana','Grafana']]],
  ['Ship',[['git','Git'],['github','GitHub']]],
];
function capabilities(small) {
  const w=small?600:920,h=small?246:134;
  const body=stacks.map(([label,tools],index)=>{
    const x=small?25+300*(index%2):24+230*index;
    const y=small?19+117*Math.floor(index/2):18;
    const spacing=small?75:66;
    const icons=tools.map(([key,name],i)=>{
      const xx=i*spacing;
      return `${shift(xx+9,39,1.25,`<path class="ink" d="${logos[key]}"/>`)}
        ${txt(xx+((small?17:16)-(name.length*3)),90,name,small?16:14,'muted',600)}`;
    }).join('');
    return shift(x,y,1,`${txt(9,20,label,small?27:24,'ink serif')}
      ${stroke(`M 8 29 H ${small?249:195}`,index%2?'s-rose':'s-rule')}
      ${icons}`);
  }).join('');
  const connections = small
    ? [`M 277 24 H 315 M 307 19 L 315 24 L 307 29`,`M 277 141 H 315 M 307 136 L 315 141 L 307 146`]
    : [202,432,662].map(x=>`M ${x} 30 H ${x+34} L ${x+28} 25 M ${x+34} 30 L ${x+28} 35`);
  return svg(w,h,'Build with HTML, CSS and JavaScript. Integrate with Python and Flask. Observe with Docker, Prometheus and Grafana. Ship with Git and GitHub.',rect(0,0,w,h,15,'surface')+body+connections.map(d=>stroke(d,'s-rose',1.4)).join(''));
}

function numoo(w,h) {
  const width=450,height=260;
  const layers=Array.from({length:4},(_,i)=>`<path class="${i%2?'tone':'surface'} s-rule" stroke-width=".8" d="M ${269+i*13} ${105-i*10} L ${376+i*13} ${76-i*10} L ${376+i*13} ${142-i*10} L ${269+i*13} ${171-i*10} Z"/>`).join('');
  const shell= `${rect(0,0,width,height,0,'paper')}
    <path d="M 0 174 L 450 67 V 260 H 0 Z" fill="url(#field)"/>
    <path d="M 14 228 L 438 123 V 244 H 14 Z" fill="url(#hatch)" opacity=".35"/>
    ${layers}
    ${stroke('M 42 191 L 211 191 Q 229 191 236 172 L 252 130 H 324','s-coral',3.2)}
    ${rect(45,76,162,105,9,'ink')}
    ${rect(45,69,162,105,9,'surface s-rule')}
    ${stroke('M 46 91 H 206 M 57 105 H 111 M 57 115 H 95','s-rule',1.5)}
    ${dot(58,80,2.4,'coral')}${dot(66,80,2.4,'amber')}${dot(74,80,2.4,'iris')}
    ${stroke('M 61 153 L 84 145 L 107 148 L 126 128 L 144 134 L 170 114 L 191 107','s-iris',2.8)}
    ${dot(324,130,6,'iris')}${dot(236,174,6,'coral')}
    ${txt(24,40,'Numoo',29,'ink serif')}
    ${txt(45,208,'APP',11,'muted mono')}${txt(202,208,'FLASK API',11,'muted mono')}${txt(313,208,'TEAM MODEL',11,'muted mono')}
  `;
  return scaledScene(w,h,width,height,shell);
}
function ncm(w,h) {
  const width=450,height=260;
  const bands=[0,1,2,3].map(i=>`<path d="M 109 ${107+i*18} L 377 ${51+i*18} L 429 ${92+i*18} L 163 ${150+i*18} Z" class="${i%2?'tone':'surface'} s-rule" stroke-width=".8"/>`).join('');
  return scaledScene(w,h,width,height,`${rect(0,0,width,height,0,'surface')}
    <path d="M 0 165 L 450 51 V 260 H 0 Z" fill="url(#field)"/>${bands}
    ${stroke('M 35 193 H 87 L 133 165 H 162 L 202 148 L 242 155 L 276 116 L 300 118 L 337 104 L 362 110 L 392 85','s-iris',3)}
    ${stroke('M 43 219 H 123 M 146 219 H 227 M 248 219 H 409','s-rule',1.1)}
    ${dot(87,193,5,'coral')}${dot(276,116,5,'amber')}${dot(392,85,5,'iris')}
    ${txt(24,40,'NCM',29,'ink serif')}
    ${txt(43,239,'HOST',11,'muted mono')}${txt(146,239,'METRICS',11,'muted mono')}${txt(248,239,'LOGS',11,'muted mono')}`);
}
function portfolio(w,h){
  const width=450,height=260;
  const page=(x,y,flip)=>shift(x,y,1,`
    ${rect(0,9,139,132,7,'ink')}${rect(0,0,139,132,7,'surface s-rule')}
    <path d="M 1 27 H 138 V 73 H 1 Z" fill="url(#fold)"/>
    ${stroke('M 13 14 H 31 M 97 14 H 126','s-rule',1.4)}
    ${stroke(flip?'M 54 88 H 125 M 74 100 H 125 M 53 116 H 125':'M 15 88 H 86 M 15 100 H 67 M 15 116 H 87','s-muted',1.5)}
    ${txt(flip?99:15,57,flip?'ع':'EN',20,'surface')}`);
  return scaledScene(w,h,width,height,`${rect(0,0,width,height,0,'paper')}
    <path d="M 0 179 L 450 57 V 260 H 0 Z" fill="url(#field)"/>
    <path d="M 206 0 H 450 V 260 H 303 Z" fill="url(#hatch)" opacity=".28"/>
    ${page(56,78,false)}${page(252,47,true)}
    ${stroke('M 194 147 C 216 147 221 114 251 111','s-coral',2.6)}
    ${dot(221,129,4.5,'amber')}
    ${txt(24,38,'Bilingual portfolio',29,'ink serif')}
    ${txt(57,236,'ENGLISH',11,'muted mono')}${txt(251,236,'ARABIC',11,'muted mono')}`);
}
function scaledScene(w,h,width,height,body){
  const sx=w/width, sy=h/height;
  const natural=Math.sqrt(sx*sy);
  const shape=body.replace(/<text x="([^"]+)" y="([^"]+)"/g, (tag,x,y)=>
    `${tag} transform="translate(${x} ${y}) scale(${(natural/sx).toFixed(4)} ${(natural/sy).toFixed(4)}) translate(-${x} -${y})"`);
  return `<g transform="scale(${sx} ${sy})">${shape}</g>`;
}
function gallery(small){
  const w=small?600:920,h=small?650:338;
  const scenes=small
    ? numoo(600,223)+shift(0,224,1,ncm(600,210))+shift(0,435,1,portfolio(600,215))
    : numoo(460,338)+shift(461,0,1,ncm(459,168))+shift(461,169,1,portfolio(459,169));
  return svg(w,h,'Conceptual project studies. Numoo connects a web interface to teammates’ models with Flask. NCM connects host metrics and logs. The portfolio pairs Arabic and English layouts.',`<clipPath id="gallery"><rect width="${w}" height="${h}" rx="15"/></clipPath><g clip-path="url(#gallery)">${rect(0,0,w,h,0,'rule')}${scenes}</g>`);
}

function timeline(small=false){
  if(small){
    const entries=[[105,78,"2025","NCM"],[300,47,"2026","University"],[495,78,"2026","Pathy"]];
    return svg(600,126,"NCM co-op in 2025, followed by university graduation and Pathy training in 2026.",
      rect(0,0,600,126,13,"surface")+stroke("M 22 78 H 156 L 204 47 H 395 L 442 78 H 578","s-rule",2)+
      entries.map(([x,y,year,name],i)=>dot(x,y,5,i===1?"iris":"coral")+txt(x-24,y-15,year,18,"muted mono")+txt(x-name.length*5,y+28,name,24,"ink serif")).join(""));
  }
  const moments=[
    [145,87,'2025','NCM co-op','coral'],
    [449,57,'2026','Umm Al-Qura','iris'],
    [750,87,'2026','Pathy','coral'],
  ];
  return svg(920,158,'Journey from the 2025 NCM co-op through university graduation and Pathy training in 2026.',`
    ${rect(0,0,920,158,14,'surface')}
    <path d="M 35 88 H 226 L 295 58 H 600 L 665 88 H 886" class="s-rule" fill="none" stroke-width="2"/>
    ${moments.map(([x,y,year,name,color])=>`
      <path d="M ${x} ${y-8} l 8 8 -8 8 -8 -8 Z" class="${color}"/>
      ${txt(x-24,y-15,year,18,'muted mono')}
      ${txt(x-(name.length*5),y+32,name,25,'ink serif')}`).join('')}`);
}

const output={
  'hero.svg':hero(false,true),'hero-still.svg':hero(false,false),
  'hero-mobile.svg':hero(true,true),'hero-mobile-still.svg':hero(true,false),
  'capabilities.svg': capabilities(false),'capabilities-mobile.svg': capabilities(true),
  'work.svg':gallery(false),'work-mobile.svg':gallery(true),
  'journey.svg':timeline(),'journey-mobile.svg':timeline(true),
  'signature.svg':svg(112,80,'Folded Muath Alsulami signature',shift(3,2,.265,mark())),
};
for(const [name,content] of Object.entries(output)){
  const filename=path.join(out,name);
  if(check){
    if(fs.readFileSync(filename,'utf8').replaceAll('\r\n','\n')!==content) throw Error(`Regenerate ${name}`);
  }else fs.writeFileSync(filename,content);
}
