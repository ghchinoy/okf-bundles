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
generated:
  at: "2026-07-31T00:00:00Z"
  by: binder/0.8.1-0.20261026041026-3bd0c625532d
---

# SRB Field-Joint O-Ring Thermal Distress & Erosion Logistic Regression

Sanctioned post-flight engineering query correlating launch ambient temperature and leak-check stabilization pressure with primary O-ring thermal erosion depth across STS flights.

## Linked Missions, Failure Modes & Remediations
- [sts-51l-challenger](/missions/sts-51l-challenger.md)
- [srb-field-joint-oring](/subsystems/srb-field-joint-oring.md)
- [viton-oring-low-temp-extrusion-blowby](/failure-modes/viton-oring-low-temp-extrusion-blowby.md)
- [sts-51l-t-plus-59s-plume-flicker](/telemetry/sts-51l-t-plus-59s-plume-flicker.md)
- [normalization-of-deviance](/organizational-factors/normalization-of-deviance.md)
- [captured-feature-triple-oring-joint-heater](/remediations/captured-feature-triple-oring-joint-heater.md)

```sql
SELECT flight_id, ambient_temp_f, leak_check_psi, max_erosion_mils, blowby_observed
FROM srb_postflight_joint_inspections
WHERE ambient_temp_f < 65 OR max_erosion_mils > 0
ORDER BY ambient_temp_f ASC;
```

## Related

- [viton-oring-low-temp-extrusion-blowby](/failure-modes/viton-oring-low-temp-extrusion-blowby.md)
- [normalization-of-deviance](/organizational-factors/normalization-of-deviance.md)
