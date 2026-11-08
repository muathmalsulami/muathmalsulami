# Profile design notes

## Direction and evidence

**Selected: Engineering Atelier.** A modular path from idea to system uses an architectural drawing and a restrained palette from the published portfolio. The illustration is not an approved logo; the name and substance remain ordinary readable text. The portfolio image is a screenshot of the public site, captured before this change and saved locally as WebP. The Numoo and co-op descriptions are text accounts, not fabricated product screenshots or public source claims.

**Alternative: Constructive Intelligence.** A repeated vertical structure and large integrated title were prototyped, but rejected because the text crosses the graphic and the composition is less readable at small sizes. The prototype is preserved in the task workspace for comparison, not embedded in the profile.

## Reference review

- [Sindre Sorhus](https://github.com/sindresorhus): recognisable personal voice; repeated effects would overwhelm this use case.
- [Anthony Fu](https://github.com/antfu): compact navigation and short paths to work; this profile needs more project context.
- [Jess Frazelle](https://github.com/jessfraz): custom assets create identity; essential content should remain selectable text.
- [Cassidy Williams](https://github.com/cassidoo): conversational writing feels human; avoid presenting unsupported seniority.
- [Kent C. Dodds](https://github.com/kentcdodds): a concise opening and clear destination make the next action obvious.

## Proposed account settings after approval

- Bio: `CS & AI graduate building software, integrating intelligent features, and learning how systems work.`
- Website: `https://muathmalsulami.github.io/learn-git-with-pathy/`.
- Social link: retain existing LinkedIn link.
- Pinned: `learn-git-with-pathy` only; use Customize your pins on the profile and save after approval. Do not pin config, profile or template repositories just to fill space.
- Portfolio repository description currently describes a bilingual software and AI portfolio accurately; keep it. Topics can be reviewed separately after approval.

## Limits

Branch rendering is not publication. GitHub mobile and light-mode screenshots and an independent user study are not represented by static asset checks. No claim is made that Numoo's source or National Center for Meteorology training files are publicly available. Public account settings and the live profile remain unchanged pending one explicit approval.

## Release candidate v2

The hero is now a text-free, layered path; its meaning and headline remain readable Markdown even if images are disabled or displayed at narrow widths. Numoo and monitoring diagrams are clearly labeled illustrations, not application captures or operational data. The portfolio screenshot remains a real capture from the current public site.

GitHub theme settings can differ from the operating system color scheme; testing exposed a mismatch with theme-specific `<picture>` sources. The artwork now has a transparent background and a single green line color suitable for both page themes. Test the resulting profile on GitHub itself, not only the SVG renderer. The local test `node verify-profile.cjs` checks required assets, basic SVG safety, key content, alt descriptions and file-size limits; it is not a full accessibility or broken-link audit.
