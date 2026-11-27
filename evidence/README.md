# Profile design review

The previous image-first opening delayed the name and gave the legacy portfolio the most visual weight. The candidate leads with both names, Makkah, three technical areas and direct navigation. The folded monogram and stepped signal trace establish a distinct identity. The work entries expose role, scope and evidence in the same reading order.

- [GitHub-rendered desktop comparison](desktop-comparison.webp)
- [GitHub-rendered mobile comparison](mobile-comparison.webp)
- [45 reference profiles](../docs/reference-review.md)
- [36 baseline findings](../docs/baseline-audit.md)
- [Three design directions, refinements and maintenance](../docs/design-notes.md)

## Weighted self-assessment

| Criterion | Before | Candidate | Evidence and remaining gap |
| --- | ---: | ---: | --- |
| Originality and memorability | 14/20 | 18/20 | The prior path becomes a personal mark with a standalone silhouette. Independent recognition without the name remains untested. |
| Visual identity and art direction | 14/20 | 18/20 | Folded geometry, restrained bronze and two surfaces make a consistent composition. The mark has only one in-profile application. |
| Professional credibility | 13/15 | 14/15 | Numoo credits teammates for model training. NCM is scoped to training. Public case studies open directly. Primary degree wording and implementation artifacts for the two cases remain unavailable. |
| Typography and hierarchy | 8/10 | 9/10 | Identity, specialty and actions appear first in native text. The long NCM heading and role still wrap on narrow screens. |
| GitHub-native technical creativity | 5/10 | 9/10 | The renderer retains image source selection, local navigation and disclosure. The hero is an image rather than an interactive diagram. |
| Information architecture | 7/10 | 9/10 | A consistent format distinguishes team, training and published work. The sidebar website and pin still favor the legacy deployment pending approval. |
| Responsive and accessible design | 4/5 | 4/5 | All eight widths and both themes render without overflow. Keyboard and no-image tests pass. Screen-reader and physical-device coverage remain open. |
| Motion quality and purpose | 1/5 | 4/5 | A brief pulse communicates movement across the system. Its timing is tied to image load, and the treatment is subtle at phone scale. |
| Performance and reliability | 4/5 | 5/5 | The chosen SVG is under 5 KiB, with one README art request and zero external SVG dependencies. This score covers repository-controlled asset delivery. Linked destinations retain external dependencies. |
| **Total** | **70/100** | **90/100** | **Below the 97/100 target.** |

Rasbt has similarly direct positioning, and antfu reaches destination links with even less copy. The original mark adds a distinctive visual identity. Karpathy and Simon Willison offer deeper inspectable evidence through coherent public repositories and releases. Lowlighter demonstrates SVG generation as a body of work in its own right. Here generation makes the identity reproducible and keeps the image small. The main gaps to 97 are external recognition and recruiter testing, broader assistive-technology coverage and stronger access to primary evidence.

## Validation

Captured 27 November 2026 in anonymous Microsoft Edge. The before is the public profile and the candidate is the README served by GitHub from the development branch. The different GitHub shells have slightly different content widths. The comparisons crop the actual browser screenshots. Full README captures and raw browser results accompany the desktop delivery.

The matrix used 320, 375, 390, 430, 768, 1024, 1440 and 1920 px viewports in browser light and dark modes. The candidate had zero README or page overflow and one loading image with descriptive alternative text. At 390 px in dark mode, the image-blocked page retained readable identity, work and navigation. Pressing Enter on the education disclosure opened and closed it at 390 and 1440 px in both themes. Scoped axe WCAG A/AA checks in those captures found zero violations under the tested rules.

The dedicated portfolio, both case-study dialogs, public source, historical PR and Pathy credential resolved. LinkedIn blocked the anonymous automated request. The existing email link was checked for syntax without sending a message. The current degree wording was carried forward because the [Umm Al-Qura program catalog](https://uqu.edu.sa/en/App/Degrees?dept=1&faculty=14) cannot identify the credential on the personal record. Main and live account settings are outside the candidate branch.

The first engineering check found the motion could still run in an embedded SVG when Edge emulated reduced motion on the host page. The candidate now makes the selection at the page level using a GitHub-rendered picture source. A repeated four-frame pixel comparison on GitHub measured 0, 230, 233 and 0 changed pixels with motion enabled, and 0 in every frame with reduced motion. The rendered source URL confirmed that the fallback was the separate static SVG.

The final mobile review found that explicit HTML height caused GitHub to reserve extra vertical space around the image. Removing those HTML dimensions let the renderer use the SVG's intrinsic aspect ratio. The final hero measured 254 × 70 px at a 320 px viewport, 324 × 89 px at 390 px, and 800 × 220 px on desktop. Clicking Selected work scrolled the section into view at all three widths.
