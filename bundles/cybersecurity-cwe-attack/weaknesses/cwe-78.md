---
type: "Weakness"
title: "CWE-78: OS Command Injection"
description: "Improper neutralization of special elements used in an OS command allows arbitrary command execution on the host operating system."
resource: "https://cwe.mitre.org/data/definitions/78.html"
status: "stable"
tags: ["cwe", "rce", "command-injection"]
sources:
  - id: "cwe-78"
    resource: "https://cwe.mitre.org/data/definitions/78.html"
    title: "CWE-78: OS Command Injection"
    author: "process:mitre-cti"
verified:
  - by: "process:mitre-stix-validator"
    at: "2026-07-31T00:00:00Z"
generated:
  at: "2026-07-31T00:00:00Z"
  by: binder/0.8.1-0.20261023014107-c59404ef16b0
---

# CWE-78: OS Command Injection

Improper neutralization of special elements used in an OS command allows arbitrary command execution on the host operating system.

## Linked Weaknesses, Techniques & Mitigations
- [t1190](/techniques/t1190.md)
- [t1059](/techniques/t1059.md)
- [m1050](/mitigations/m1050.md)
