# Release-candidate evidence

Captured 8 November 2026 from GitHub in anonymous Microsoft Edge (Playwright). The before is the published profile README; the after is the README rendered on branch `design/engineering-profile`, content commit `7bccbc453d8546a254670a46c59e36012d03f20f`. Each PNG is an actual screenshot of the GitHub README element, not a full browser-window capture. Desktop uses a 1440 px viewport; mobile uses a 390 px emulated viewport, not a physical device. The before/after WebP places the two real dark screenshots side by side with labels; blank space reflects the shorter published README.

- Dark, light and mobile: `before-*.png` and `after-*.png`.
- `no-images-mobile.png`: candidate with image requests blocked. The name, degree, work descriptions and links remained present; 15 image requests were blocked, and 23 links remained in the README.
- `results.json`: browser checks at 320, 390, 430 and 1440 px; all four README images loaded and had alternative text. Automated axe checks scoped to the README found no WCAG A/AA violations under the tested rules. Axe was injected into a separate test context with CSP bypassed for injection only; this does not test the GitHub shell, all assistive technologies, or establish full WCAG conformance. No physical-device or screen-reader test was performed.

The three abstract graphics share a restrained visual language but are not evidence of a unique personal logo. Numoo and the monitoring artwork are explicitly labeled as illustrations; the portfolio image is a real screenshot. No claim of operational results or simulated-failure testing is made by those illustrations.

## Prepared public profile settings (not applied)

- Bio: `CS & AI graduate building software, integrating intelligent features, and learning how systems work.`
- Website: https://muathmalsulami.github.io/learn-git-with-pathy/
- Pinned repositories: put `learn-git-with-pathy` first; do not invent additional repositories.
