# okf-bundles

A curated collection of **public-domain and open-standard [Open Knowledge Format (OKF) v0.2](https://github.com/GoogleCloudPlatform/knowledge-catalog/blob/main/okf/SPEC.md) bundles**, built and verified with [`binder`](https://github.com/ghchinoy/binder).

![license](https://img.shields.io/badge/license-CC0--1.0-blue)
![okf](https://img.shields.io/badge/OKF-v0.2-00ADD8)

Each bundle in this repository is:
- **100% Conformant to OKF v0.2 (`binder validate --strict`)** — zero errors, zero advisories, zero broken links, and zero orphans.
- **Richly Cross-Linked** — source corpora use `[[wikilinks]]`, `#hashtags`, and frontmatter relationship keys (`parent`, `related`) that `binder convert` resolves into deterministic bundle-relative links and a type-grouped `# Catalog` with inbound/outbound graph annotations.
- **Provenance & Trust Attested** — exercises the full OKF v0.2 trust & lifecycle vocabulary (`sources`, `generated`, `verified`, `status: draft|stable|deprecated`, `stale_after`, and `type: Attested Computation`), deriving `human-reviewed` and `machine-confirmed` trust tiers.
- **Ready for Graph Databases & Agents** — pre-projected into **Google Cloud Spanner SQL/PGQ** property-graph schemas (`schema.ddl`, `nodes.csv`, `edges.csv`, `node_verified.csv`, `load.sql`, `derivation.sql`) plus Graphviz DOT, JSON, and self-contained HTML under [`projections/`](projections/).

---

## Included OKF v0.2 Bundles

| Bundle | Source Corpus | Domain & License Basis | Concepts | Edges | OKF v0.2 Features Exercised |
| :--- | :--- | :--- | :---: | :---: | :--- |
| **[`bundles/nist-ai-rmf`](bundles/nist-ai-rmf)** | [`corpora/nist-ai-rmf`](corpora/nist-ai-rmf) | **NIST AI Risk Management Framework (AI RMF 1.0)** (17 U.S.C. § 105 Public Domain) | 26 | 104 | `Function`, `Category`, `Trustworthiness Characteristic`, 2 `Attested Computation` SQL fairness/drift metrics, `parent`/`related` frontmatter edges, `human-reviewed` tier |
| **[`bundles/ietf-rfcs`](bundles/ietf-rfcs)** | [`corpora/ietf-rfcs`](corpora/ietf-rfcs) | **Core IETF HTTP, QUIC, TLS 1.3, OAuth 2.1, JWT & JSON RFCs** (Public Specification Metadata) | 17 | 51 | `RFC` & `Internet-Draft` types, full lifecycle spectrum (`status: stable`, `status: draft`, `status: deprecated` on RFC 2616 / RFC 5246), `stale_after` dates, `machine-confirmed` tier |
| **[`bundles/cybersecurity-cwe-attack`](bundles/cybersecurity-cwe-attack)** | [`corpora/cybersecurity-cwe-attack`](corpora/cybersecurity-cwe-attack) | **MITRE CWE, ATT&CK Enterprise & OWASP Defenses** (Public Domain / Open Threat Intel) | 18 | 60 | `Weakness`, `Technique`, `Mitigation`, and `Attested Computation` (SIEM SQL analytic for Impossible Travel `T1078`), mixed `human-reviewed` + `machine-confirmed` tiers |
| **[`bundles/classical-mythology`](bundles/classical-mythology)** | [`corpora/classical-mythology`](corpora/classical-mythology) | **Bulfinch's Mythology: The Age of Fable** (Project Gutenberg #4928, Pure Public Domain) | 24 | 151 | Dense 5-type entity graph (`Deity`, `Hero`, `Place`, `Quest`, `Artifact`) ideal for multi-hop graph traversal demos (`binder mcp` `query_graph` and Spanner SQL/PGQ) |

---

## Repository Layout

```text
okf-bundles/
├── corpora/       # Authored source Markdown corpora (with [[wikilinks]], #hashtags, FM refs)
├── bundles/       # Emitted OKF v0.2 bundles (100% conformant, deterministic, pure .md)
├── projections/   # Spanner SQL/PGQ DDL & CSVs + graph.json, graph.dot, viz.html per bundle
└── scripts/
    ├── generate-corpora.mjs  # Generates the source corpora under corpora/
    └── build.sh              # Runs binder lint -> convert -> validate -> review -> graph -> project
```

---

## Using with `binder`

Install [`binder`](https://github.com/ghchinoy/binder):

```bash
brew install ghchinoy/tap/binder
```

### 1. Validate & Review Any Bundle

```bash
binder validate --strict bundles/nist-ai-rmf
binder review --require-tier human-reviewed bundles/nist-ai-rmf
```

### 2. Query as an Agent via `binder mcp`

Run `binder mcp` and use the `list_graphs` and `query_graph` MCP tools against any bundle in `bundles/` (for example, traversing 2 hops from `functions/measure` in `bundles/nist-ai-rmf` or from `heroes/odysseus` in `bundles/classical-mythology`).

### 3. Rebuild Everything from Source Corpora

```bash
./scripts/build.sh
```

`scripts/build.sh` pins `SOURCE_DATE_EPOCH=1785456000` (`2026-07-31T00:00:00Z`) so every `binder convert` and `binder project` run is byte-for-byte deterministic.

---

## License

Dedicated to the public domain under [CC0 1.0 Universal (CC0-1.0)](LICENSE).
