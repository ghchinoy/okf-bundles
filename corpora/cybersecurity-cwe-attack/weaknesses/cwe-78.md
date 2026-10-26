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
---

# CWE-78: OS Command Injection

Improper neutralization of special elements used in an OS command allows arbitrary command execution on the host operating system.

## Linked Weaknesses, Techniques & Mitigations
- [[t1190]]
- [[t1059]]
- [[m1050]]
