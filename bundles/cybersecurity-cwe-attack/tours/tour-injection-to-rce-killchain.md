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
generated:
  at: "2026-07-31T00:00:00Z"
  by: binder/0.8.1-0.20261026041026-3bd0c625532d
---

# Tour: Anatomy of an Application Injection-to-RCE Kill Chain

Walks from public-facing exploitation (T1190) across XSS, SQLi, Command Injection, and Deserialization to shell execution (T1059) and OWASP defense-in-depth mitigations.

## Episode / Tour Sequence
1. [t1190](/techniques/t1190.md)
2. [cwe-79](/weaknesses/cwe-79.md)
3. [csp-header-policy](/mitigations/csp-header-policy.md)
4. [cwe-89](/weaknesses/cwe-89.md)
5. [parameterized-queries](/mitigations/parameterized-queries.md)
6. [cwe-78](/weaknesses/cwe-78.md)
7. [cwe-502](/weaknesses/cwe-502.md)
8. [t1059](/techniques/t1059.md)
9. [m1050](/mitigations/m1050.md)
10. [m1022](/mitigations/m1022.md)

## Related

- [t1190](/techniques/t1190.md)
- [cwe-79](/weaknesses/cwe-79.md)
- [csp-header-policy](/mitigations/csp-header-policy.md)
- [cwe-89](/weaknesses/cwe-89.md)
- [parameterized-queries](/mitigations/parameterized-queries.md)
- [cwe-78](/weaknesses/cwe-78.md)
- [cwe-502](/weaknesses/cwe-502.md)
- [t1059](/techniques/t1059.md)
- [m1050](/mitigations/m1050.md)
- [m1022](/mitigations/m1022.md)
