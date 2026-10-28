---
type: "Failure Mode"
title: "4.45x lbf·s vs. N·s Small-Forces Impulse Unit Conversion Mismatch"
description: "Ground software file AMD output thruster impulse in English pound-force seconds while navigation software expected SI newton-seconds, biasing periapsis altitude down to 57 km."
resource: "https://llis.nasa.gov/"
status: "stable"
triggered_by: ["siloed-interface-control-documents"]
tags: ["spaceflight", "failure-modes", "nasa", "systems-engineering"]
sources:
  - id: "nasa-llis-sp-6105"
    resource: "https://llis.nasa.gov/"
    title: "NASA Lessons Learned Information System (LLIS) & NASA/SP-2016-6105 Systems Engineering Handbook"
    author: "process:nasa-mishap-investigation-board"
verified:
  - by: "human:aerospace-safety-panel"
    at: "2026-07-31T00:00:00Z"
generated:
  at: "2026-07-31T00:00:00Z"
  by: binder/0.8.1-0.20261026041026-3bd0c625532d
---

# 4.45x lbf·s vs. N·s Small-Forces Impulse Unit Conversion Mismatch

Ground software file AMD output thruster impulse in English pound-force seconds while navigation software expected SI newton-seconds, biasing periapsis altitude down to 57 km.

## Causal & Systems Engineering Links
- [mars-climate-orbiter](/missions/mars-climate-orbiter.md)
- [mco-attitude-control-thrusters](/subsystems/mco-attitude-control-thrusters.md)
- [mco-trajectory-correction-maneuver-residual](/telemetry/mco-trajectory-correction-maneuver-residual.md)
- [strict-si-unit-icd-automated-verification](/remediations/strict-si-unit-icd-automated-verification.md)
- [trajectory-navigation-residual-divergence-sql](/computations/trajectory-navigation-residual-divergence-sql.md)

## Related

- [siloed-interface-control-documents](/organizational-factors/siloed-interface-control-documents.md)
