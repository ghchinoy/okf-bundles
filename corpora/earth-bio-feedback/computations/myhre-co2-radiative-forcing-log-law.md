---
type: "Attested Computation"
title: "Myhre–IPCC Logarithmic CO2 Radiative Forcing & Equilibrium Climate Sensitivity"
description: "Sanctioned atmospheric physics SQL computation evaluating radiative forcing Delta_F = 5.35 * ln(C / C_0) W/m2 and net Planck + fast-feedback temperature response."
runtime: "bigquery-sql"
parameters:
  preindustrial_co2_ppm: "278.0"
  planck_response_wm2_k: "3.2"
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
---

# Myhre–IPCC Logarithmic CO2 Radiative Forcing & Equilibrium Climate Sensitivity

Sanctioned atmospheric physics SQL computation evaluating radiative forcing Delta_F = 5.35 * ln(C / C_0) W/m2 and net Planck + fast-feedback temperature response.

## Linked Reservoirs, Pathways & Feedbacks
- [[atmospheric-co2-methane-pool]]
- [[anthropogenic-fossil-carbon-flux]]
- [[water-vapor-lapse-rate-feedback]]
- [[planck-blackbody-radiative-damping]]

```sql
SELECT year, co2_ppm,
       5.35 * LN(co2_ppm / 278.0) AS radiative_forcing_wm2,
       (5.35 * LN(co2_ppm / 278.0)) / NULLIF(3.2 - fast_positive_feedback_wm2_k, 0) AS equilibrium_delta_t_k
FROM atmospheric_carbon_observatory;
```
