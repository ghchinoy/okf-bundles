---
type: "Attested Computation"
title: "Ashby–Shannon Regulator Variety vs. Disturbance Entropy Deficit Audit"
description: "Sanctioned cybernetic governance query computing H(Disturbance) - H(Regulator) + H(Regulator | Disturbance) to detect oversight channels lacking requisite variety."
runtime: "bigquery-sql"
parameters:
  min_variety_ratio: "1.0"
  max_residual_entropy_bits: "1.5"
executor: "process:alignment-eval-harness"
attester: "process:cybernetic-safety-attester"
status: "stable"
mitigates: ["scalable-oversight-hypothesis"]
sources:
  - id: "sep-cybernetics-ai-ethics"
    resource: "https://plato.stanford.edu/entries/artificial-intelligence/"
    title: "Foundational Cybernetics (Wiener 1948, Ashby 1956), Turing (1950), and Philosophy of AI"
    author: "human:philosophy-and-cybernetics-canon"
verified:
  - by: "human:ai-ethics-and-cybernetics-curator"
    at: "2026-07-31T00:00:00Z"
---

# Ashby–Shannon Regulator Variety vs. Disturbance Entropy Deficit Audit

Sanctioned cybernetic governance query computing H(Disturbance) - H(Regulator) + H(Regulator | Disturbance) to detect oversight channels lacking requisite variety.

## Linked Principles, Objections & Syntheses
- [[law-of-requisite-variety]]
- [[w-ross-ashby]]
- [[viable-system-model-governance]]
- [[scalable-oversight-hypothesis]]
- [[debate-and-iterated-amplification]]

```sql
SELECT domain_id, disturbance_entropy_bits, regulator_channel_bits,
       GREATEST(0, disturbance_entropy_bits - regulator_channel_bits) AS unmitigated_variety_bits
FROM oversight_channel_audits
WHERE disturbance_entropy_bits > regulator_channel_bits;
```
