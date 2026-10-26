---
type: "Weakness"
title: "CWE-89: SQL Injection (SQLi)"
description: "Improper neutralization of special elements used in an SQL command allows attackers to modify or execute arbitrary database queries."
resource: "https://cwe.mitre.org/data/definitions/89.html"
status: "stable"
tags: ["cwe", "sqli", "database"]
sources:
  - id: "cwe-89"
    resource: "https://cwe.mitre.org/data/definitions/89.html"
    title: "CWE-89: SQL Injection (SQLi)"
    author: "process:mitre-cti"
verified:
  - by: "process:mitre-stix-validator"
    at: "2026-07-31T00:00:00Z"
generated:
  at: "2026-07-31T00:00:00Z"
  by: binder/0.8.1-0.20261023014107-c59404ef16b0
---

# CWE-89: SQL Injection (SQLi)

Improper neutralization of special elements used in an SQL command allows attackers to modify or execute arbitrary database queries.

## Linked Weaknesses, Techniques & Mitigations
- [t1190](/techniques/t1190.md)
- [m1050](/mitigations/m1050.md)
- [parameterized-queries](/mitigations/parameterized-queries.md)
