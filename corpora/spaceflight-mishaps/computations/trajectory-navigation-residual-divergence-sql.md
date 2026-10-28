---
type: "Attested Computation"
title: "Deep-Space Doppler Navigation Residual vs. Small-Forces Impulse Audit"
description: "Sanctioned flight-dynamics SQL check comparing integrated attitude-control desaturation impulse against two-way DSN Doppler residuals to flag unit-scale anomalies."
runtime: "bigquery-sql"
parameters:
  max_doppler_residual_hz: "0.15"
  si_unit_scale_tolerance: "0.01"
executor: "process:nasa-sma-pra-engine"
attester: "process:safety-mission-assurance-attester"
status: "stable"
mitigates: ["imperial-metric-impulse-unit-mismatch", "siloed-interface-control-documents"]
sources:
  - id: "nasa-llis-sp-6105"
    resource: "https://llis.nasa.gov/"
    title: "NASA Lessons Learned Information System (LLIS) & NASA/SP-2016-6105 Systems Engineering Handbook"
    author: "process:nasa-mishap-investigation-board"
verified:
  - by: "human:aerospace-safety-panel"
    at: "2026-07-31T00:00:00Z"
---

# Deep-Space Doppler Navigation Residual vs. Small-Forces Impulse Audit

Sanctioned flight-dynamics SQL check comparing integrated attitude-control desaturation impulse against two-way DSN Doppler residuals to flag unit-scale anomalies.

## Linked Missions, Failure Modes & Remediations
- [[mars-climate-orbiter]]
- [[mco-attitude-control-thrusters]]
- [[imperial-metric-impulse-unit-mismatch]]
- [[mco-trajectory-correction-maneuver-residual]]
- [[strict-si-unit-icd-automated-verification]]

```sql
SELECT desat_event_id, amd_reported_impulse, dsn_derived_impulse_ns,
       amd_reported_impulse / NULLIF(dsn_derived_impulse_ns, 0) AS scale_ratio
FROM deep_space_desaturation_audit
WHERE ABS((amd_reported_impulse / NULLIF(dsn_derived_impulse_ns, 0)) - 1.0) > 0.01;
```
