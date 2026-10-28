---
type: "Tour"
title: "Tour: Cloud Metadata SSRF, Credential Theft, and Impossible Travel SIEM Analytics"
description: "Walks how SSRF (CWE-918) leads to cloud credential harvesting (T1552) and Valid Account takeover (T1078), and how egress filtering, FIDO2 MFA, and SQL Impossible Travel detections stop it."
status: "stable"
steps: ["cwe-918", "t1552", "m1037", "cwe-287", "t1078", "m1032", "impossible-travel-detection"]
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

# Tour: Cloud Metadata SSRF, Credential Theft, and Impossible Travel SIEM Analytics

Walks how SSRF (CWE-918) leads to cloud credential harvesting (T1552) and Valid Account takeover (T1078), and how egress filtering, FIDO2 MFA, and SQL Impossible Travel detections stop it.

## Episode / Tour Sequence
1. [cwe-918](/weaknesses/cwe-918.md)
2. [t1552](/techniques/t1552.md)
3. [m1037](/mitigations/m1037.md)
4. [cwe-287](/weaknesses/cwe-287.md)
5. [t1078](/techniques/t1078.md)
6. [m1032](/mitigations/m1032.md)
7. [impossible-travel-detection](/detections/impossible-travel-detection.md)

## Related

- [cwe-918](/weaknesses/cwe-918.md)
- [t1552](/techniques/t1552.md)
- [m1037](/mitigations/m1037.md)
- [cwe-287](/weaknesses/cwe-287.md)
- [t1078](/techniques/t1078.md)
- [m1032](/mitigations/m1032.md)
- [impossible-travel-detection](/detections/impossible-travel-detection.md)
