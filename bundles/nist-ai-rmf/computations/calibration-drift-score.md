---
type: "Attested Computation"
title: "Population Stability Index (PSI) Calibration Drift"
description: "Sanctioned production drift computation tracking distribution shifts between baseline validation data and live inference under MEASURE 3.1."
runtime: "bigquery-sql"
parameters:
  baseline_window_days: "30"
  alert_threshold_psi: "0.25"
executor: "process:drift-monitor"
attester: "process:sql-equality-attester"
status: "stable"
sources:
  - id: "nist-ai-100-1"
    resource: "https://doi.org/10.6028/NIST.AI.100-1"
    title: "NIST AI 100-1: Artificial Intelligence Risk Management Framework (AI RMF 1.0)"
    author: "process:nist-ai-rmf"
    last_modified: "2023-01-26"
verified:
  - by: "human:nist-ai-rmf-working-group"
    at: "2026-07-31T00:00:00Z"
generated:
  at: "2026-07-31T00:00:00Z"
  by: binder/0.8.1-0.20261023014107-c59404ef16b0
---

# Population Stability Index (PSI) Calibration Drift

An OKF v0.2 **Attested Computation** supporting continuous monitoring in [measure-3](/categories/measure-3.md) and [valid-and-reliable](/characteristics/valid-and-reliable.md) under [measure](/functions/measure.md).

```sql
SELECT SUM((actual_pct - expected_pct) * LN(actual_pct / NULLIF(expected_pct, 0))) AS psi_score
FROM prediction_decile_distributions;
```
