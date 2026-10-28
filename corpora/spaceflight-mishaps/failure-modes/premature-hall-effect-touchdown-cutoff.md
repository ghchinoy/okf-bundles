---
type: "Failure Mode"
title: "Unfiltered Hall-Effect Touchdown Sensor Latching During Leg Deployment"
description: "Flight control software failed to flush latched Hall-effect touchdown bits generated when landing legs unfolded at 40 m altitude, cutting descent engines in midair."
resource: "https://llis.nasa.gov/"
status: "stable"
triggered_by: ["inadequate-flight-like-test-as-you-fly"]
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

# Unfiltered Hall-Effect Touchdown Sensor Latching During Leg Deployment

Flight control software failed to flush latched Hall-effect touchdown bits generated when landing legs unfolded at 40 m altitude, cutting descent engines in midair.

## Causal & Systems Engineering Links
- [[mars-polar-lander]]
- [[inadequate-flight-like-test-as-you-fly]]
- [[strict-si-unit-icd-automated-verification]]
