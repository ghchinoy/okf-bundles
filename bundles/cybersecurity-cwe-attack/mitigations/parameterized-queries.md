---
type: "Mitigation"
title: "Parameterized Queries (Prepared Statements)"
description: "Separate SQL code structure from user-supplied data parameters so that input is never interpreted as SQL commands."
resource: "https://cheatsheetseries.owasp.org/cheatsheets/SQL_Injection_Prevention_Cheat_Sheet.html"
status: "stable"
mitigates: ["cwe-89"]
tags: ["owasp", "sqli-defense"]
sources:
  - id: "parameterized-queries"
    resource: "https://cheatsheetseries.owasp.org/cheatsheets/SQL_Injection_Prevention_Cheat_Sheet.html"
    title: "Parameterized Queries (Prepared Statements)"
    author: "process:mitre-cti"
verified:
  - by: "process:mitre-stix-validator"
    at: "2026-07-31T00:00:00Z"
generated:
  at: "2026-07-31T00:00:00Z"
  by: binder/0.8.1-0.20261026041026-3bd0c625532d
---

# Parameterized Queries (Prepared Statements)

Separate SQL code structure from user-supplied data parameters so that input is never interpreted as SQL commands.

## Linked Weaknesses, Techniques & Mitigations
- [cwe-89](/weaknesses/cwe-89.md)
- [m1050](/mitigations/m1050.md)

## Related

- [cwe-89](/weaknesses/cwe-89.md)
