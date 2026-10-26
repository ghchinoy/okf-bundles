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
---

# CWE-89: SQL Injection (SQLi)

Improper neutralization of special elements used in an SQL command allows attackers to modify or execute arbitrary database queries.

## Linked Weaknesses, Techniques & Mitigations
- [[t1190]]
- [[m1050]]
- [[parameterized-queries]]
