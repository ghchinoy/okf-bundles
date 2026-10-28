---
type: "Attested Computation"
title: "Demographic Parity Ratio (80% Four-Fifths Rule)"
description: "Sanctioned fairness computation measuring the ratio of selection rates between the least-favored and most-favored demographic groups under MEASURE 1.1 and MEASURE 2.11."
runtime: "bigquery-sql"
parameters:
  protected_attribute: "demographic_group"
  outcome_column: "positive_prediction"
  threshold: "0.80"
executor: "process:fairness-evaluator"
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
  by: binder/0.8.1-0.20261026041026-3bd0c625532d
---

# Demographic Parity Ratio

An OKF v0.2 **Attested Computation** implementing quantitative fairness evaluation for [measure-1](/categories/measure-1.md) and [fair-with-harmful-bias-managed](/characteristics/fair-with-harmful-bias-managed.md) under the [measure](/functions/measure.md) function. Featured in [tour-governance-to-sql-metrics](/tours/tour-governance-to-sql-metrics.md).

```sql
WITH group_rates AS (
  SELECT demographic_group, AVG(CAST(positive_prediction AS FLOAT64)) AS selection_rate
  FROM model_predictions
  GROUP BY demographic_group
)
SELECT MIN(selection_rate) / NULLIF(MAX(selection_rate), 0) AS demographic_parity_ratio
FROM group_rates;
```
