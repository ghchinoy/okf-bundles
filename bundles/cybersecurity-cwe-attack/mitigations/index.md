# Concepts

* [Strict Content-Security-Policy (CSP)](csp-header-policy.md) - Enforce nonce-based or hash-based Content-Security-Policy headers (script-src, object-src none) to neutralize reflected and stored XSS.
* [M1022: Restrict File and Directory Permissions](m1022.md) - Restrict access by setting directory and file permissions that are not specific to users or privileged accounts, and enforce chroot/root-jail boundaries.
* [M1032: Multi-Factor Authentication (MFA)](m1032.md) - Require two or more pieces of evidence to authenticate to a system, prioritizing phishing-resistant FIDO2/WebAuthn passkeys.
* [M1037: Filter Network Traffic & Egress Allowlisting](m1037.md) - Use network appliances and host-level egress allowlists (e.g., blocking 169.254.169.254 IMDSv1) to filter ingress and egress traffic.
* [M1050: Exploit Protection & Input Validation](m1050.md) - Use capabilities to detect and block conditions that may lead to or be indicative of a software exploit, paired with strict allowlist input validation.
* [Parameterized Queries (Prepared Statements)](parameterized-queries.md) - Separate SQL code structure from user-supplied data parameters so that input is never interpreted as SQL commands.
