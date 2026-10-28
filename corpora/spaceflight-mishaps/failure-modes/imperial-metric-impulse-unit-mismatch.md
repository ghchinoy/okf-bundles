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
---

# 4.45x lbf·s vs. N·s Small-Forces Impulse Unit Conversion Mismatch

Ground software file AMD output thruster impulse in English pound-force seconds while navigation software expected SI newton-seconds, biasing periapsis altitude down to 57 km.

## Causal & Systems Engineering Links
- [[mars-climate-orbiter]]
- [[mco-attitude-control-thrusters]]
- [[mco-trajectory-correction-maneuver-residual]]
- [[strict-si-unit-icd-automated-verification]]
- [[trajectory-navigation-residual-divergence-sql]]
