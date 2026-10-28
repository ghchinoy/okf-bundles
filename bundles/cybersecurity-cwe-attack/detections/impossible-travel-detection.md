---
type: "Attested Computation"
title: "Impossible Travel & Anomalous Session Detection (T1078)"
description: "Sanctioned SIEM SQL analytic detecting concurrent authentication events from geographically distant ASN/IP locations exceeding 900 km/h."
runtime: "bigquery-sql"
parameters:
  max_velocity_kmh: "900"
  lookback_hours: "24"
executor: "process:siem-detection-engine"
attester: "process:sigma-sql-attester"
status: "stable"
mitigates: ["t1078", "cwe-287"]
sources:
  - id: "mitre-car-2020-09-001"
    resource: "https://car.mitre.org/"
    title: "MITRE Cyber Analytics Repository"
    author: "process:mitre-car"
verified:
  - by: "human:secops-detection-lead"
    at: "2026-07-31T00:00:00Z"
generated:
  at: "2026-07-31T00:00:00Z"
  by: binder/0.8.1-0.20261026041026-3bd0c625532d
---

# Impossible Travel & Anomalous Session Detection

An OKF v0.2 **Attested Computation** detecting [t1078](/techniques/t1078.md) (Valid Accounts abuse) and complementing [m1032](/mitigations/m1032.md) (MFA) and [cwe-287](/weaknesses/cwe-287.md).

```sql
SELECT user_id, ip_prev, ip_curr, distance_km / NULLIF(hours_elapsed, 0) AS velocity_kmh
FROM auth_session_pairs
WHERE distance_km / NULLIF(hours_elapsed, 0) > 900;
```

## Related

- [t1078](/techniques/t1078.md)
- [cwe-287](/weaknesses/cwe-287.md)
