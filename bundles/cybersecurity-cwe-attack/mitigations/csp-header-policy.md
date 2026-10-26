---
type: "Mitigation"
title: "Strict Content-Security-Policy (CSP)"
description: "Enforce nonce-based or hash-based Content-Security-Policy headers (script-src, object-src none) to neutralize reflected and stored XSS."
resource: "https://cheatsheetseries.owasp.org/cheatsheets/Content_Security_Policy_Cheat_Sheet.html"
status: "stable"
tags: ["owasp", "xss-defense", "csp"]
sources:
  - id: "csp-header-policy"
    resource: "https://cheatsheetseries.owasp.org/cheatsheets/Content_Security_Policy_Cheat_Sheet.html"
    title: "Strict Content-Security-Policy (CSP)"
    author: "process:mitre-cti"
verified:
  - by: "process:mitre-stix-validator"
    at: "2026-07-31T00:00:00Z"
generated:
  at: "2026-07-31T00:00:00Z"
  by: binder/0.8.1-0.20261023014107-c59404ef16b0
---

# Strict Content-Security-Policy (CSP)

Enforce nonce-based or hash-based Content-Security-Policy headers (script-src, object-src none) to neutralize reflected and stored XSS.

## Linked Weaknesses, Techniques & Mitigations
- [cwe-79](/weaknesses/cwe-79.md)
- [m1050](/mitigations/m1050.md)
