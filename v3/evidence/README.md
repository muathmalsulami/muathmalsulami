# V3 desktop, mobile and motion evidence

[V3 candidate](../README.md) · [Quality gate and refinements](../REVIEW.md) · [Source credits](../SOURCES.md)

GitHub's repository and README pages returned HTTP 504 during repeated browser and command-line requests, including control repositories. GitHub's Contents API returned HTTP 200 and supplied the rendered README HTML. The paired captures use that HTML with GitHub-style Markdown CSS in Edge and the exact committed SVG assets. They show the complete README and its animation. They do not include or validate the native repository or public profile shell.

| Viewport | Complete V3 README | Complete animation | B versus V3 |
| --- | --- | --- | --- |
| Desktop · 1440 px | [Light](v3-1440-light-api.webp) · [Dark](v3-1440-dark-api.webp) | [Light](motion-1440-light-api.gif) · [Dark](motion-1440-dark-api.gif) | [Both themes side by side](comparison-1440-api.webp) |
| Mobile · 390 px | [Light](v3-390-light-api.webp) · [Dark](v3-390-dark-api.webp) | [Light](motion-390-light-api.gif) · [Dark](motion-390-dark-api.gif) | [Both themes side by side](comparison-390-api.webp) |

The [previous native GitHub captures of B](../../prototypes/README.md) remain available separately. B and V3 use the same API presentation environment in the side-by-side images.

## Checks

- **Layout.** The eight-width matrix covers 320, 375, 390, 430, 768, 1024, 1440 and 1920 px in both themes. The API preview had zero page or README overflow. Picture sources selected the expected still layout and maintained intrinsic proportions. Image blocking retained name, honors and work content. Keyboard activation reached the Selected work anchor. [Data](render-results-api.json)
- **Accessibility.** Image descriptions and native text survived GitHub rendering. The four 390 and 1440 px theme captures had zero violations in the scoped axe scan after the underline fix. The result does not establish screen-reader conformance.
- **Motion.** Desktop and mobile use separate variants. Each 5.7-second sequence assembles the signature, draws the route, moves one signal and settles. Captured frame samples changed with motion enabled and remained identical with reduced motion. [Data](motion-results-api.json)
- **Destinations.** Both case-study dialogs, the portfolio and Pathy’s credential loaded. The source repository and historical workflow PR were verified through the GitHub API during the web gateway errors. LinkedIn blocked anonymous checking, and email remained a mailto link. [Browser responses](destination-results.json)
- **Native page.** No successful V3 repository-page capture. [Recorded HTTP failures](render-results.json)
