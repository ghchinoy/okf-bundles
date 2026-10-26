---
type: "Weakness"
title: "CWE-79: Cross-site Scripting (XSS)"
description: "Improper neutralization of input during web page generation allows attackers to inject client-side scripts into web pages viewed by other users."
resource: "https://cwe.mitre.org/data/definitions/79.html"
status: "stable"
tags: ["cwe", "xss", "web"]
sources:
  - id: "cwe-79"
    resource: "https://cwe.mitre.org/data/definitions/79.html"
    title: "CWE-79: Cross-site Scripting (XSS)"
    author: "process:mitre-cti"
verified:
  - by: "process:mitre-stix-validator"
    at: "2026-07-31T00:00:00Z"
generated:
  at: "2026-07-31T00:00:00Z"
  by: binder/0.8.1-0.20261023014107-c59404ef16b0+dirty
---

# CWE-79: Cross-site Scripting (XSS)

Improper neutralization of input during web page generation allows attackers to inject client-side scripts into web pages viewed by other users.

## Linked Weaknesses, Techniques & Mitigations
- [t1190](/techniques/t1190.md)
- [m1050](/mitigations/m1050.md)
- [csp-header-policy](/mitigations/csp-header-policy.md)
