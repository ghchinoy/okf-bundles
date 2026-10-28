---
type: "Attested Computation"
title: "KL-Divergence Reference Policy Regularization & Reward Over-Optimization Audit"
description: "Sanctioned RLHF/RLAIF telemetry query monitoring Kullback-Leibler divergence D_KL(pi_theta || pi_ref) to detect Goodhart over-optimization of the proxy reward model."
runtime: "bigquery-sql"
parameters:
  kl_penalty_beta: "0.05"
  max_kl_nats_threshold: "12.0"
executor: "process:alignment-eval-harness"
attester: "process:cybernetic-safety-attester"
status: "stable"
mitigates: ["specification-gaming-reward-hacking", "goodharts-law"]
sources:
  - id: "sep-cybernetics-ai-ethics"
    resource: "https://plato.stanford.edu/entries/artificial-intelligence/"
    title: "Foundational Cybernetics (Wiener 1948, Ashby 1956), Turing (1950), and Philosophy of AI"
    author: "human:philosophy-and-cybernetics-canon"
verified:
  - by: "human:ai-ethics-and-cybernetics-curator"
    at: "2026-07-31T00:00:00Z"
---

# KL-Divergence Reference Policy Regularization & Reward Over-Optimization Audit

Sanctioned RLHF/RLAIF telemetry query monitoring Kullback-Leibler divergence D_KL(pi_theta || pi_ref) to detect Goodhart over-optimization of the proxy reward model.

## Linked Principles, Objections & Syntheses
- [[goodharts-law]]
- [[specification-gaming-reward-hacking]]
- [[constitutional-ai-rlaif]]
- [[goodhart-proxy-true-reward-divergence]]

```sql
SELECT step, mean_proxy_reward, gold_eval_score, kl_divergence_nats,
       mean_proxy_reward - (0.05 * kl_divergence_nats) AS regularized_objective
FROM rlhf_training_telemetry
WHERE kl_divergence_nats > 12.0 AND gold_eval_score < LAG(gold_eval_score) OVER (ORDER BY step);
```
