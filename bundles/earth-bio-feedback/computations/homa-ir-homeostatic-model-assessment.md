---
type: "Attested Computation"
title: "HOMA-IR & Disposition Index Glycemic Feedback Loop Gain Computation"
description: "Sanctioned endocrinology SQL computation evaluating Homeostatic Model Assessment of Insulin Resistance (Fasting Glucose * Fasting Insulin / 405) to detect hyperbolic beta-cell loop degradation."
runtime: "bigquery-sql"
parameters:
  normal_homa_ir_ceiling: "2.5"
  fasting_glucose_mg_dl_ceiling: "100.0"
executor: "process:earth-bio-telemetry-engine"
attester: "process:systems-flux-attester"
status: "stable"
sources:
  - id: "noaa-nasa-ncbi-homeostasis"
    resource: "https://www.ncbi.nlm.nih.gov/books/"
    title: "NOAA/NASA Earth System Carbon-Climate Cycles & NLM NCBI Bookshelf Physiological Homeostasis"
    author: "process:earth-and-physiological-systems-working-group"
verified:
  - by: "human:systems-science-panel"
    at: "2026-07-31T00:00:00Z"
generated:
  at: "2026-07-31T00:00:00Z"
  by: binder/0.8.1-0.20261026041026-3bd0c625532d
---

# HOMA-IR & Disposition Index Glycemic Feedback Loop Gain Computation

Sanctioned endocrinology SQL computation evaluating Homeostatic Model Assessment of Insulin Resistance (Fasting Glucose * Fasting Insulin / 405) to detect hyperbolic beta-cell loop degradation.

## Linked Reservoirs, Pathways & Feedbacks
- [blood-plasma-glucose-pool](/reservoirs/blood-plasma-glucose-pool.md)
- [pancreatic-beta-cell-insulin-cascade](/pathways/pancreatic-beta-cell-insulin-cascade.md)
- [insulin-glucagon-glycemic-homeostasis](/feedback-loops/insulin-glucagon-glycemic-homeostasis.md)
- [glp1-receptor-agonist-incretin-modulation](/interventions/glp1-receptor-agonist-incretin-modulation.md)

```sql
SELECT patient_cohort_id, fasting_glucose_mg_dl, fasting_insulin_uiu_ml,
       (fasting_glucose_mg_dl * fasting_insulin_uiu_ml) / 405.0 AS homa_ir_score
FROM metabolic_clamp_registry
WHERE (fasting_glucose_mg_dl * fasting_insulin_uiu_ml) / 405.0 > 2.5;
```
