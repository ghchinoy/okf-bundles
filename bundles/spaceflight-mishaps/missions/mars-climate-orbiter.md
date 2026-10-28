---
type: "Mission"
title: "Mars Climate Orbiter (MCO) Navigation Loss"
description: "September 1999 loss of spacecraft during Mars orbital insertion when ground software output angular momentum impulse in pound-force seconds instead of contracted newton-seconds."
resource: "https://llis.nasa.gov/"
status: "stable"
triggered_by: ["imperial-metric-impulse-unit-mismatch", "mco-attitude-control-thrusters"]
tags: ["spaceflight", "missions", "nasa", "systems-engineering"]
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

# Mars Climate Orbiter (MCO) Navigation Loss

September 1999 loss of spacecraft during Mars orbital insertion when ground software output angular momentum impulse in pound-force seconds instead of contracted newton-seconds.

## Causal & Systems Engineering Links
- [mco-attitude-control-thrusters](/subsystems/mco-attitude-control-thrusters.md)
- [imperial-metric-impulse-unit-mismatch](/failure-modes/imperial-metric-impulse-unit-mismatch.md)
- [mco-trajectory-correction-maneuver-residual](/telemetry/mco-trajectory-correction-maneuver-residual.md)
- [siloed-interface-control-documents](/organizational-factors/siloed-interface-control-documents.md)
- [strict-si-unit-icd-automated-verification](/remediations/strict-si-unit-icd-automated-verification.md)
- [mars-polar-lander](/missions/mars-polar-lander.md)
- [trajectory-navigation-residual-divergence-sql](/computations/trajectory-navigation-residual-divergence-sql.md)
- [tour-invisible-math-and-metrology-bugs-in-deep-space](/tours/tour-invisible-math-and-metrology-bugs-in-deep-space.md)

## Related

- [imperial-metric-impulse-unit-mismatch](/failure-modes/imperial-metric-impulse-unit-mismatch.md)
- [mco-attitude-control-thrusters](/subsystems/mco-attitude-control-thrusters.md)
