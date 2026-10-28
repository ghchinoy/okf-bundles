---
type: "Mitigation"
title: "Strict Content-Security-Policy (CSP)"
description: "Enforce nonce-based or hash-based Content-Security-Policy headers (script-src, object-src none) to neutralize reflected and stored XSS."
resource: "https://cheatsheetseries.owasp.org/cheatsheets/Content_Security_Policy_Cheat_Sheet.html"
status: "stable"
mitigates: ["cwe-79"]
tags: ["owasp", "xss-defense", "csp"]
sources:
  - id: "csp-header-policy"
    resource: "https://cheatsheetseries.owasp.org/cheatsheets/Content_Security_Policy_Cheat_Sheet.html"
    title: "Strict Content-Security-Policy (CSP)"
    author: "process:mitre-cti"
verified:
  - by: "process:mitre-stix-validator"
    at: "2026-07-31T00:00:00Z"
---

# Strict Content-Security-Policy (CSP)

Enforce nonce-based or hash-based Content-Security-Policy headers (script-src, object-src none) to neutralize reflected and stored XSS.

## Linked Weaknesses, Techniques & Mitigations
- [[cwe-79]]
- [[m1050]]
