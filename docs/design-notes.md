# Interface signature

## Creative directions

| Direction | Composition | Decision |
| --- | --- | --- |
| Bilingual typographic seal | The two names share a centered axis and typographic scale. | Strong as a colophon, but repeats the native heading and depends on typography availability inside GitHub images. |
| Field notebook | Margin rules, log annotations and small plot marks frame the work. | Good for systems writing, but loses clarity at 320 px and can be mistaken for real measurements. |
| Folded monogram and stepped trace | An angular M and a loop informed by the Arabic meem sit beside a signal routed through three planes. | Selected. The mark has a standalone silhouette and the trace relates directly to the interface, integration and observability work. |

Three refinements shaped the candidate. The creative pass replaced a broad illustrated banner with a compact composition and a standalone monogram. The editorial pass moved native identity, specialization and navigation ahead of the SVG, put Numoo first, and replaced project illustrations with role and evidence. The engineering pass consolidated theme and motion into one self-contained SVG, removed runtime dependencies, strengthened validation and added a pull-request integrity check.

## Composition and production

Warm linen and charcoal-green are the base surfaces. Bronze marks the trace terminals and the inner fold. Thin construction rules and repeated isometric planes establish scale. Use GitHub's native type for the name, skills and prose. A single consistent stroke language replaces project badges and icons. Essential reading order is name, specialization, location, engineering approach, navigation, then the illustration. The compact, wide artwork uses relative scaling with an intrinsic size for stable layout.

The image has a static base trace and one 2.4-second traversal that visualizes a signal crossing boundaries. It requires an explicit no-preference media match inside the SVG. The static image is complete in reduced-motion contexts. SVG follows the browser's preferred color scheme. An explicit GitHub theme that differs from the browser preference can retain the contrasting plate from the other palette. Both plates have their own background and preserve internal contrast.

Run `node scripts/generate-identity.cjs` from the repository to regenerate the assets and `node verify-profile.cjs` to check that committed assets match the source. The action runs on pull requests and main-branch pushes. It uses read-only contents permission and has no schedule. Network destination checks are release QA because the portfolio and contact services can rate-limit automated requests.

Artwork is original to this profile. The geometry is drawn in the generator. No fonts, external marks, or third-party images are embedded. The SVGs and generator are supplied for Muath Alsulami's profile. The standalone mark is intended for identity review and issuer approval before wider use.

## Evidence and scope

The root Pages site is the dedicated bilingual portfolio and its public source is linked from the profile. Numoo and NCM links open portfolio-authored case studies. The Numoo contribution covers the application and API integration. NCM covers work in a co-op training environment. The exact degree wording is retained from the prior public version pending direct access to the university record. Profile settings and pin order require a separate approval because they change the live profile immediately.
