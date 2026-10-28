---
type: "Attested Computation"
title: "Ocean Carbonate Revelle Buffer Factor & Aragonite Saturation Horizon Audit"
description: "Sanctioned marine chemistry query tracking the Revelle factor (d[CO2]/CO2) / (d[DIC]/DIC) as surface carbonate ions are titrated by anthropogenic CO2 uptake."
runtime: "bigquery-sql"
parameters:
  critical_revelle_threshold: "12.0"
  min_omega_aragonite: "1.5"
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

# Ocean Carbonate Revelle Buffer Factor & Aragonite Saturation Horizon Audit

Sanctioned marine chemistry query tracking the Revelle factor (d[CO2]/CO2) / (d[DIC]/DIC) as surface carbonate ions are titrated by anthropogenic CO2 uptake.

## Linked Reservoirs, Pathways & Feedbacks
- [surface-ocean-mixed-layer](/reservoirs/surface-ocean-mixed-layer.md)
- [marine-biological-carbon-pump](/pathways/marine-biological-carbon-pump.md)
- [coral-reef-thermal-bleaching-threshold](/tipping-points/coral-reef-thermal-bleaching-threshold.md)
- [marine-alkalinity-enhancement](/interventions/marine-alkalinity-enhancement.md)
- [bohr-haldane-hemoglobin-allostery](/feedback-loops/bohr-haldane-hemoglobin-allostery.md)

```sql
SELECT station_id, sea_surface_temp_c, dic_umol_kg, talk_umol_kg, revelle_factor, omega_aragonite
FROM global_ocean_ship_hydrography
WHERE revelle_factor > 12.0 OR omega_aragonite < 1.5;
```
