---
type: "Tour"
title: "Tour: Anatomy of an Application Injection-to-RCE Kill Chain"
description: "Walks from public-facing exploitation (T1190) across XSS, SQLi, Command Injection, and Deserialization to shell execution (T1059) and OWASP defense-in-depth mitigations."
status: "stable"
steps: ["t1190", "cwe-79", "csp-header-policy", "cwe-89", "parameterized-queries", "cwe-78", "cwe-502", "t1059", "m1050", "m1022"]
sources:
  - id: "mitre-attack-enterprise"
    resource: "https://attack.mitre.org/"
    title: "MITRE ATT&CK Enterprise Matrix"
    author: "process:mitre-cti"
verified:
  - by: "human:secops-detection-lead"
    at: "2026-07-31T00:00:00Z"
---

# Tour: Anatomy of an Application Injection-to-RCE Kill Chain

Walks from public-facing exploitation (T1190) across XSS, SQLi, Command Injection, and Deserialization to shell execution (T1059) and OWASP defense-in-depth mitigations.

## Episode / Tour Sequence
1. [[t1190]]
2. [[cwe-79]]
3. [[csp-header-policy]]
4. [[cwe-89]]
5. [[parameterized-queries]]
6. [[cwe-78]]
7. [[cwe-502]]
8. [[t1059]]
9. [[m1050]]
10. [[m1022]]
