# Curriculum Scope: Water & Wastewater Treatment Operator

Status: **Scoping only** — this document is a planning artifact, not shipped
content. Nothing here is wired into the app. The course stays out of
`src/data/courses.ts` (and therefore off the purchase flow, training
dashboard, sitemap, and exam system) until modules are fully authored,
reviewed for regulatory accuracy, and an exam question bank exists.
Today it appears on `/courses` only as a "Coming Soon" teaser
(`src/data/upcomingCourses.ts`, id `water-wastewater`).

## Why this track

State-licensed, chronic national workforce shortage (many utilities report
a wave of retirements with too few operators behind them), no degree
required — a state certification exam is the credential, not a diploma.
Fits the platform's existing "no college required" positioning better than
almost any other candidate track.

## How it fits the existing course architecture

Every track follows the same shape: the shared 10-module electrical/safety
foundation (`src/data/modules.ts`, `MODULES`, numbered 1–10) plus a
trade-specific block. The newer "Tech" tier tracks (Pump Tech, Ref Tech,
BAS Tech, Fire Alarm Tech, etc.) all use **6 trade-specific modules,
numbered 11–16, for 16 total modules** — that's the pattern this track
should follow for consistency, rather than the older 25–33-module "FSE"
tier tracks (UPS, HVAC, Generator, Data Center Engineer).

Each module, once authored, needs (matching `TrainingModule` in
`src/data/modules.ts`): an `id`, `num`, `title`, `desc`, an array of
~5 `slides` (each with body paragraphs, key points, and 1 embedded quiz
question — some slides warrant a diagram, following the existing
`images: [{ src, alt, caption }]` pattern pointing at a new SVG in
`/public/diagrams/`), and a 10-question end-of-module `test`.

Planned identifiers for when this moves from scope to build:
- `id`: `water-wastewater`
- `accessKey` / `stripeProductId`: `training_water_wastewater`
- `certTitle`: `Jr. Water & Wastewater Treatment Operator`
- `examLevel`: `jr_water_wastewater`
- `color`: `sky`
- `totalModules`: `16`

## Regulatory grounding

The curriculum should be built around the real regulatory framework
operators are actually tested on, not generic "how pumps work" content:

- **Safe Drinking Water Act (SDWA, 1974)** — EPA's National Primary
  Drinking Water Regulations; states typically hold primacy and run their
  own operator certification programs.
- **Clean Water Act (CWA, 1972)** — regulates wastewater discharges via
  **NPDES** (National Pollutant Discharge Elimination System) permits.
- **State operator certification** — most states use tiered classes
  (commonly Class I–IV) with separate water and wastewater licenses,
  continuing education requirements, and reciprocity coordinated through
  the **Association of Boards of Certification (ABC)**.
- **40 CFR Part 503** — the federal biosolids rule (Class A vs. Class B,
  pollutant limits, vector attraction reduction, land application).
- **OSHA 29 CFR 1910.146** (permit-required confined spaces) and
  **1910.147** (lockout/tagout) — directly relevant since wet wells,
  digesters, and tanks are textbook confined-space hazards in this trade.

## Proposed module outline (11–16)

**Module 11 — Water & Wastewater Industry Fundamentals**
The water cycle and the utility's role: source water → treatment →
distribution → collection → treatment → discharge/reuse. Regulatory
framework (SDWA/EPA, CWA/NPDES). State primacy and operator certification
classes, separate water vs. wastewater licenses, the Operator of Record
(ORC), plant classification by size/complexity, ABC reciprocity.

**Module 12 — Drinking Water Treatment Processes**
Coagulation and flocculation (alum, ferric chloride, polymers, rapid mix,
floc basins). Sedimentation/clarification. Filtration (rapid sand,
dual-media, membrane — UF/MF/RO — and backwashing). Disinfection
(chlorination, chloramination, UV, ozone; the CT concept — concentration
× time — for pathogen inactivation). Corrosion control and the Lead and
Copper Rule. Fluoridation basics.

**Module 13 — Wastewater Treatment Processes**
Preliminary treatment (bar screens, grit chambers). Primary treatment
(clarifiers, settling). Secondary/biological treatment — activated sludge
(aeration, mixed liquor, sludge age/MCRT, F:M ratio), trickling filters,
oxidation ditches, SBRs. Secondary clarification, RAS/WAS. Advanced
treatment: nitrification/denitrification for nitrogen, biological/chemical
phosphorus removal. Effluent disinfection and dechlorination.

**Module 14 — Biosolids & Residuals Management**
Thickening (gravity, dissolved air flotation). Digestion (aerobic,
anaerobic — mesophilic/thermophilic, biogas capture). Dewatering (belt
filter press, centrifuge, drying beds). 40 CFR Part 503 in practice:
Class A vs. Class B requirements, land application, pollutant limits,
vector attraction reduction.

**Module 15 — Monitoring, Sampling & Regulatory Compliance**
Lab fundamentals: BOD, COD, TSS, DO, pH, turbidity, coliform/E. coli,
chlorine residual. Sampling protocol (grab vs. composite, chain of
custody). SCADA and process instrumentation (flow meters, level sensors,
DO probes, alarms/telemetry). NPDES compliance: Discharge Monitoring
Reports, permit limits, violation consequences. Public reporting —
Consumer Confidence Reports (drinking water), annual reports.

**Module 16 — Safety, Confined Space & Emergency Response**
Confined space entry per OSHA 1910.146 (wet wells, digesters, tanks;
permit-required vs. non-permit; atmospheric testing; entrant/attendant/
supervisor roles). Chlorine gas and chemical hazards, SCBA use.
Lockout/tagout (1910.147) for pumps and mechanical equipment. Pathogen
exposure and PPE. Emergency response planning — spill response, backup
power, public notification requirements. Certification exam prep: exam
structure, common calculation types, study strategy.

## Open questions before moving to full build

1. **Water track, wastewater track, or combined?** Many state programs
   license water and wastewater operators separately (some people hold
   both). This scope treats it as one combined foundational track, which
   fits the "Jr." entry-level framing used everywhere else on the
   platform — worth confirming that's still the right call before writing
   6 modules of content around it.
2. **Diagrams needed** — process-flow diagrams for the drinking water and
   wastewater treatment trains are the highest-value visuals (mirrors how
   Pump Tech uses a pump-curve diagram and Ref Tech uses a refrigeration-
   cycle diagram). Plan for at least 2–3 new SVGs in `/public/diagrams/`.
3. **State variation** — operator certification is state-administered, so
   exact class structures and calculation formats vary. Content should
   stay at the level of concepts and terminology that generalize across
   states rather than any one state's exact exam, similar to how the
   existing electrical/safety foundation stays code-general rather than
   citing one state's amendments.

## Next step

Author Module 11 in full (slides + quiz + end-of-module test) as a
reviewable sample before committing to all 6 — same level of technical
density as `src/data/pump-tech-modules.ts` — so the format and tone can be
signed off on before the remaining 5 modules are written.
