const fs = require('node:fs');
const path = require('node:path');
const check = process.argv.includes('--check');
const identity = '# Muath Alsulami\n\n<span lang="ar" dir="rtl">معاذ السلمي</span> · Makkah, Saudi Arabia';
const hero = (alt) => `<picture>
  <source media="(prefers-reduced-motion: no-preference)" srcset="art/hero.svg">
  <img src="art/hero-still.svg" alt="${alt}">
</picture>`;
const img = (name,alt) => `![${alt}](art/${name}.svg)`;
const journey = `**2026 · Umm Al-Qura University**<br>
B.Sc. Computer Science & Artificial Intelligence · GPA 3.54/4.00 · Second Class Honors.

**2025 · National Center for Meteorology, Jeddah**<br>
Completed IT co-op in monitoring and logging. [Training case study](https://muathmalsulami.github.io/?case=ncm)

**2026 · Pathy**<br>
Software Project Management (Git & GitHub). [Verify the certificate](https://learn.pathy.sa/certificate/PTHYHCR6WZ3G5Q93)`;
const contact = '[Portfolio](https://muathmalsulami.github.io/) · [LinkedIn](https://www.linkedin.com/in/muath-m-alsulami/) · [Email](mailto:muath.m.alsulami@gmail.com)';
const sections = {
  numoo: {
    title:'Numoo',
    status:'Completed university graduation project · Team',
    art:img('numoo','Conceptual diagram of an application interface connected to an API'),
    contribution:'Built the application interfaces and Python/Flask REST API that brought stock-direction predictions from teammates’ models into the app.',
    tools:'Python · Flask · REST/JSON',
    link:'[Numoo case study](https://muathmalsulami.github.io/?case=numoo)',
  },
  ncm: {
    title:'National Center for Meteorology',
    status:'Completed IT co-op · Jeddah',
    art:img('ncm','Conceptual illustration of metric and log signals, with no operational data'),
    contribution:'Worked on a co-op monitoring setup using service dashboards, host metrics, PromQL queries and logs. Documented the training work.',
    tools:'Docker Compose · Node Exporter · Prometheus · Grafana · Loki',
    link:'[NCM training case study](https://muathmalsulami.github.io/?case=ncm)',
  },
  portfolio: {
    title:'Bilingual portfolio',
    status:'Published personal website',
    art:img('portfolio','Conceptual illustration of paired Arabic and English web layouts'),
    contribution:'Built and published a bilingual portfolio with case studies and source links so readers can inspect the scope and evidence for each project.',
    tools:'HTML · CSS · JavaScript · Git · GitHub',
    link:'[Visit the site](https://muathmalsulami.github.io/) · [Browse the source](https://github.com/muathmalsulami/muathmalsulami.github.io)',
  },
};
const phases = {
  Build:['Turn application requirements into usable web interfaces.','Python · Flask · HTML · CSS · JavaScript','[Numoo](#numoo) and [bilingual portfolio](#bilingual-portfolio)'],
  Integrate:['Connect a user-facing feature to model output through an explicit API.','REST APIs · JSON · model-to-application integration','[Numoo](#numoo)'],
  Observe:['Inspect host metrics, service behavior and logs in a co-op training stack.','Docker Compose · Node Exporter · Prometheus · Grafana · Loki · PromQL','[NCM](#national-center-for-meteorology)'],
  Ship:['Make changes traceable through branches, review, checks and documentation.','Git · GitHub · pull requests · CI · technical documentation','[Profile workflow and evidence](https://github.com/muathmalsulami/muathmalsulami/pull/1)'],
};
const close = (alt) => `## Contact

<img src="art/signature.svg" width="56" alt="${alt}">

${contact}`;
const capabilities = img('capabilities','Four illustrated engineering functions: Build, Integrate, Observe and Ship');
const artNote = 'Project artwork is conceptual.';

const creativeProjects = Object.values(sections).map(p => `### ${p.title}

${p.art}

*${p.status}* · ${p.link}

${p.contribution} **${p.tools}**`).join('\n\n');
const technicalProjects = Object.values(sections).map(p => `### ${p.title}

**${p.status}**

${p.art}

> ${p.contribution}

**Stack** · ${p.tools}<br>
**Evidence** · ${p.link}`).join('\n\n');
const recruitingProjects = Object.values(sections).map(p => `### ${p.title}

**${p.status}** · ${p.link}

${p.contribution}

${p.art}

**Tools used** · ${p.tools}`).join('\n\n');

const variants = {
'creative-engineer': `${identity}

**Software development · AI integration · Observability**

${hero('A split ribbon assembles into an open M beside a line that draws toward the signature.')}

I build web interfaces, connect them to APIs, and follow the signals that show how the software behaves.

[Selected work](#selected-work) · [Capabilities](#capabilities) · [Journey](#journey)

## Selected work

${artNote}

${creativeProjects}

## Capabilities

${capabilities}

${Object.entries(phases).map(([k,[action,tools,proof]])=>`### ${k}

${action}<br>
**${tools}** · ${proof}`).join('\n\n')}

## Journey

${journey}

## Current interests

I am interested in practical AI features and the small design choices that make the behavior of a service easier to understand.

${close('Open M formed by two folded ribbons')}`,
'engineering-signature': `${identity}

**Application interfaces, model integration and service observability**

I build interfaces, connect them to models through APIs, and inspect service behavior with metrics and logs.

[Capabilities](#engineering-capabilities) · [Selected work](#selected-work) · [Journey](#journey)

${hero('Three isometric modules seat in sequence, linking an interface, a model API and service signals.')}

## Engineering capabilities

${capabilities}

${Object.entries(phases).map(([k,[action,tools,proof]])=>`**${k}** — ${action}<br>
${tools} · ${proof}`).join('\n\n')}

## Selected work

${artNote}

${technicalProjects}

## Journey

${journey}

## Current interests

I am interested in traceable model-to-application integrations and observability for small services.

${close('Stepped junction formed by three fitted planes')}`,
'recruiter-first': `${identity}

**Software development · AI integration · Observability**

I develop web interfaces and Flask APIs, with practical experience in model integration and monitoring. [Umm Al-Qura University, 2026 · Second Class Honors](#education-and-training).

[Project evidence](#selected-work) · [Capabilities](#capabilities-at-a-glance) · [Education](#education-and-training)

${hero('Build, Integrate and Observe register in sequence beside an open bracket signature.')}

## Capabilities at a glance

${capabilities}

| Function | Tools and evidence |
| --- | --- |
${Object.entries(phases).map(([k,[,tools,proof]])=>`| **${k}** | ${tools} · ${proof} |`).join('\n')}

## Selected work

${artNote}

${recruitingProjects}

## Education and training

${journey}

## Current interests

I am interested in application engineering roles involving web development, API integration and systems that can be tested and observed.

${close('Offset open bracket with a diamond terminal')}`,
};
for (const [key,content] of Object.entries(variants)) {
  const file=path.join(__dirname,key,'README.md');
  if(check) {
    if(fs.readFileSync(file,'utf8').replaceAll('\r\n','\n')!==content+'\n') throw Error(`Regenerate ${file}`);
  } else fs.writeFileSync(file,content+'\n');
}
