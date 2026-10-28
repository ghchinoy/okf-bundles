---
type: "Attested Computation"
title: "SRB Field-Joint O-Ring Thermal Distress & Erosion Logistic Regression"
description: "Sanctioned post-flight engineering query correlating launch ambient temperature and leak-check stabilization pressure with primary O-ring thermal erosion depth across STS flights."
runtime: "bigquery-sql"
parameters:
  ambient_temp_threshold_f: "53"
  min_safety_factor: "2.0"
executor: "process:nasa-sma-pra-engine"
attester: "process:safety-mission-assurance-attester"
status: "stable"
mitigates: ["viton-oring-low-temp-extrusion-blowby", "normalization-of-deviance"]
sources:
  - id: "nasa-llis-sp-6105"
    resource: "https://llis.nasa.gov/"
    title: "NASA Lessons Learned Information System (LLIS) & NASA/SP-2016-6105 Systems Engineering Handbook"
    author: "process:nasa-mishap-investigation-board"
verified:
  - by: "human:aerospace-safety-panel"
    at: "2026-07-31T00:00:00Z"
---

# SRB Field-Joint O-Ring Thermal Distress & Erosion Logistic Regression

Sanctioned post-flight engineering query correlating launch ambient temperature and leak-check stabilization pressure with primary O-ring thermal erosion depth across STS flights.

## Linked Missions, Failure Modes & Remediations
- [[sts-51l-challenger]]
- [[srb-field-joint-oring]]
- [[viton-oring-low-temp-extrusion-blowby]]
- [[sts-51l-t-plus-59s-plume-flicker]]
- [[normalization-of-deviance]]
- [[captured-feature-triple-oring-joint-heater]]

```sql
SELECT flight_id, ambient_temp_f, leak_check_psi, max_erosion_mils, blowby_observed
FROM srb_postflight_joint_inspections
WHERE ambient_temp_f < 65 OR max_erosion_mils > 0
ORDER BY ambient_temp_f ASC;
```
