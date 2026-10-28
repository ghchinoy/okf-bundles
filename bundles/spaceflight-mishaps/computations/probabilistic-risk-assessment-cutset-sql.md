---
type: "Attested Computation"
title: "Spacecraft Fault-Tree Minimal Cut-Set & Single-Point Failure Audit"
description: "Sanctioned Probabilistic Risk Assessment (PRA) query identifying unmitigated Crit-1 / Crit-1R failure modes lacking independent physical or procedural redundancy."
runtime: "bigquery-sql"
parameters:
  criticality_tier: "1"
  max_unmitigated_cutset_prob: "1e-5"
executor: "process:nasa-sma-pra-engine"
attester: "process:safety-mission-assurance-attester"
status: "stable"
mitigates: ["cryo-tank-teflon-ignition", "inadequate-flight-like-test-as-you-fly"]
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

# Spacecraft Fault-Tree Minimal Cut-Set & Single-Point Failure Audit

Sanctioned Probabilistic Risk Assessment (PRA) query identifying unmitigated Crit-1 / Crit-1R failure modes lacking independent physical or procedural redundancy.

## Linked Missions, Failure Modes & Remediations
- [apollo-13](/missions/apollo-13.md)
- [cryo-tank-teflon-ignition](/failure-modes/cryo-tank-teflon-ignition.md)
- [inadequate-flight-like-test-as-you-fly](/organizational-factors/inadequate-flight-like-test-as-you-fly.md)
- [independent-technical-authority-ita](/remediations/independent-technical-authority-ita.md)

```sql
SELECT subsystem_id, failure_mode_id, criticality, cutset_probability, independent_barriers
FROM pra_fault_tree_cutsets
WHERE criticality IN ('1', '1R') AND independent_barriers < 2;
```

## Related

- [cryo-tank-teflon-ignition](/failure-modes/cryo-tank-teflon-ignition.md)
- [inadequate-flight-like-test-as-you-fly](/organizational-factors/inadequate-flight-like-test-as-you-fly.md)
