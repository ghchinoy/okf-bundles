---
type: "Weakness"
title: "CWE-22: Path Traversal"
description: "Improper limitation of a pathname to a restricted directory (dot-dot-slash) allows access to files and directories outside the intended root."
resource: "https://cwe.mitre.org/data/definitions/22.html"
status: "stable"
tags: ["cwe", "filesystem", "path-traversal"]
sources:
  - id: "cwe-22"
    resource: "https://cwe.mitre.org/data/definitions/22.html"
    title: "CWE-22: Path Traversal"
    author: "process:mitre-cti"
verified:
  - by: "process:mitre-stix-validator"
    at: "2026-07-31T00:00:00Z"
generated:
  at: "2026-07-31T00:00:00Z"
  by: binder/0.8.1-0.20261023014107-c59404ef16b0+dirty
---

# CWE-22: Path Traversal

Improper limitation of a pathname to a restricted directory (dot-dot-slash) allows access to files and directories outside the intended root.

## Linked Weaknesses, Techniques & Mitigations
- [t1190](/techniques/t1190.md)
- [m1022](/mitigations/m1022.md)
