---
type: "Attested Computation"
title: "Gao et al. Scaling Law for Reward Model Over-Optimization Divergence"
description: "Sanctioned evaluation computation fitting the square-root KL scaling law R_gold(d) = d*(alpha - beta*d) to pinpoint the exact KL distance where proxy reward maximization degrades true human preference."
runtime: "bigquery-sql"
parameters:
  sqrt_kl_horizon: "3.5"
  min_gold_winrate: "0.50"
executor: "process:alignment-eval-harness"
attester: "process:cybernetic-safety-attester"
status: "stable"
mitigates: ["goodharts-law", "value-fragility-hypothesis"]
sources:
  - id: "sep-cybernetics-ai-ethics"
    resource: "https://plato.stanford.edu/entries/artificial-intelligence/"
    title: "Foundational Cybernetics (Wiener 1948, Ashby 1956), Turing (1950), and Philosophy of AI"
    author: "human:philosophy-and-cybernetics-canon"
verified:
  - by: "human:ai-ethics-and-cybernetics-curator"
    at: "2026-07-31T00:00:00Z"
---

# Gao et al. Scaling Law for Reward Model Over-Optimization Divergence

Sanctioned evaluation computation fitting the square-root KL scaling law R_gold(d) = d*(alpha - beta*d) to pinpoint the exact KL distance where proxy reward maximization degrades true human preference.

## Linked Principles, Objections & Syntheses
- [[goodharts-law]]
- [[value-fragility-hypothesis]]
- [[specification-gaming-reward-hacking]]
- [[kl-divergence-policy-drift-bound]]

```sql
SELECT checkpoint_id, SQRT(kl_divergence_nats) AS d_kl_sqrt, proxy_rm_score, human_gold_winrate
FROM policy_scaling_checkpoints
WHERE proxy_rm_score > 2.0 AND human_gold_winrate < 0.50;
```
