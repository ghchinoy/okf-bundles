# okf-bundles

A curated collection of **public-domain and open-standard [Open Knowledge Format (OKF) v0.2](https://github.com/GoogleCloudPlatform/knowledge-catalog/blob/main/okf/SPEC.md) bundles**, built and verified with [`binder`](https://github.com/ghchinoy/binder).

![license](https://img.shields.io/badge/license-CC0--1.0-blue)
![okf](https://img.shields.io/badge/OKF-v0.2-00ADD8)

Each bundle in this repository is:
- **100% Conformant to OKF v0.2 (`binder validate --strict`)** — zero errors, zero advisories, zero broken links, and zero orphans.
- **Richly Cross-Linked with Typed Relationship Edges & Guided Tours** — source corpora use `[[wikilinks]]`, `#hashtags`, frontmatter relationship keys (`parent`, `related`, `prerequisite`, `supersedes`, `contrasts_with`, `mitigates`, `triggered_by`, `amplifies`, `inhibits`, `steps`), and `type: Tour` narrative episode sequences that `binder convert` resolves into deterministic bundle-relative links and a type-grouped `# Catalog` with inbound/outbound graph annotations.
- **Provenance & Trust Attested** — exercises the full OKF v0.2 trust & lifecycle vocabulary (`sources`, `generated`, `verified`, `status: draft|stable|deprecated`, `stale_after`, and `type: Attested Computation`), deriving `human-reviewed` and `machine-confirmed` trust tiers.
- **Ready for Graph Databases & Agents** — pre-projected into **Google Cloud Spanner SQL/PGQ** property-graph schemas (`schema.ddl`, `nodes.csv`, `edges.csv`, `node_verified.csv`, `load.sql`, `derivation.sql`) plus Graphviz DOT, JSON, and self-contained HTML under [`projections/`](projections/).

---

## Included OKF v0.2 Bundles

| Bundle (Start Here) | Guided Tours | Interactive Graph | Domain & License Basis | Concepts | Edges | OKF v0.2 Features Exercised |
| :--- | :--- | :--- | :--- | :---: | :---: | :--- |
| **[`bundles/nist-ai-rmf`](bundles/nist-ai-rmf/index.md)** | [`tours/`](bundles/nist-ai-rmf/tours/index.md) | [`viz.html`](projections/nist-ai-rmf/viz.html) | **NIST AI Risk Management Framework (AI RMF 1.0)** (17 U.S.C. § 105 Public Domain) | 28 | 122 | `Function`, `Category`, `Trustworthiness Characteristic`, 2 `Attested Computation` SQL fairness/drift metrics, 2 `Tour` paths, `parent`/`related`/`prerequisite`/`steps` edges, `human-reviewed` tier |
| **[`bundles/ietf-rfcs`](bundles/ietf-rfcs/index.md)** | [`tours/`](bundles/ietf-rfcs/tours/index.md) | [`viz.html`](projections/ietf-rfcs/viz.html) | **Core IETF HTTP, QUIC, TLS 1.3, OAuth 2.1, JWT & JSON RFCs** (Public Specification Metadata) | 19 | 70 | `RFC`, `Internet-Draft`, & `Tour` types, full lifecycle spectrum (`status: stable`, `status: draft`, `status: deprecated` on RFC 2616 / RFC 5246), `supersedes`/`prerequisite`/`steps` edges, `stale_after` dates, `machine-confirmed` tier |
| **[`bundles/cybersecurity-cwe-attack`](bundles/cybersecurity-cwe-attack/index.md)** | [`tours/`](bundles/cybersecurity-cwe-attack/tours/index.md) | [`viz.html`](projections/cybersecurity-cwe-attack/viz.html) | **MITRE CWE, ATT&CK Enterprise & OWASP Defenses** (Public Domain / Open Threat Intel) | 20 | 80 | `Weakness`, `Technique`, `Mitigation`, `Attested Computation` (SIEM SQL analytic for Impossible Travel `T1078`), & `Tour` kill-chain paths, `triggered_by`/`mitigates`/`steps` edges |
| **[`bundles/classical-mythology`](bundles/classical-mythology/index.md)** | [`tours/`](bundles/classical-mythology/tours/index.md) | [`viz.html`](projections/classical-mythology/viz.html) | **Bulfinch's Mythology: The Age of Fable** (Project Gutenberg #4928, Pure Public Domain) | 26 | 176 | Dense 6-type entity graph (`Deity`, `Hero`, `Place`, `Quest`, `Artifact`, `Tour`) with `parent`, `prerequisite`, `contrasts_with`, and `steps` edges for multi-hop graph traversal |
| **[`bundles/spaceflight-mishaps`](bundles/spaceflight-mishaps/index.md)** | [`tours/`](bundles/spaceflight-mishaps/tours/index.md) | [`viz.html`](projections/spaceflight-mishaps/viz.html) | **NASA Spaceflight Mishaps & Systems Engineering** (17 U.S.C. § 105 NASA LLIS & SP-2016-6105 Public Domain) | 46 | 244 | 8 `Mission` nodes (Apollo 1, Apollo 13, Challenger, Columbia, Mars Climate Orbiter, Mars Polar Lander, Genesis, Hubble SM1), `Subsystem`, `Failure Mode`, `Telemetry Anomaly`, `Organizational Factor`, `Remediation`, 3 PRA/flight-dynamics `Attested Computation` SQL audits, & 2 `Tour` paths |
| **[`bundles/cybernetics-ai-ethics`](bundles/cybernetics-ai-ethics/index.md)** | [`tours/`](bundles/cybernetics-ai-ethics/tours/index.md) | [`viz.html`](projections/cybernetics-ai-ethics/viz.html) | **Dialectical AI Ethics, Philosophy of Mind & Cybernetics** (Public Domain / Open Philosophical Canon) | 48 | 240 | `Foundational Principle` (Wiener, Ashby, Goodhart, Hume, Kant, Mill), `Thesis`, `Thought Experiment` (Turing Test, Chinese Room, Paperclip Maximizer), `Objection`, `Synthesis` (CIRL, Constitutional AI, Debate, VSM), `Thinker`, 3 RLHF/variety `Attested Computation` SQL queries, & 3 dialectical `Tour` paths |
| **[`bundles/earth-bio-feedback`](bundles/earth-bio-feedback/index.md)** | [`tours/`](bundles/earth-bio-feedback/tours/index.md) | [`viz.html`](projections/earth-bio-feedback/viz.html) | **Earth-System & Human Physiological Feedback Loops** (NOAA/NASA & NLM NCBI Public Domain) | 46 | 210 | Coupled planetary climate & physiological homeostasis graph (`Reservoir`, `Pathway`, `Feedback Loop`, `Driver`, `Tipping Point`, `Intervention`), `amplifies`/`inhibits`/`triggered_by`/`mitigates` edges, 3 `Attested Computation` SQL models (Myhre CO2 forcing, Revelle factor, HOMA-IR), & 3 cross-scale `Tour` paths |

---

## Where to Start (For Humans & AI Agents)

If you are new to the **Open Knowledge Format (OKF)**, think of an OKF bundle as a **self-contained, cross-referenced book of Markdown files** designed so both humans and AI agents can navigate a subject like a map rather than reading a giant wall of text.

Depending on what you want to do, here is where to point your readers or tools:

1. **Browsing a Topic as a Human Reader $\rightarrow$ Start in [`bundles/<name>/index.md`](bundles/spaceflight-mishaps/index.md) or [`bundles/<name>/tours/`](bundles/spaceflight-mishaps/tours/index.md)**
   - **Master Catalog (`bundles/<name>/index.md`):** Every bundle has a top-level `index.md` that groups every concept by type and shows how connected each concept is (`(out: X, in: Y)`).
   - **Guided Tours (`bundles/<name>/tours/`):** Want a narrative story instead of an alphabetical index? Open any bundle's `tours/` folder (for example, [*Normalization of Deviance — From Challenger O-Rings to Columbia Foam*](bundles/spaceflight-mishaps/tours/tour-normalization-of-deviance-challenger-columbia.md)) for a step-by-step walkthrough across the graph.
   - **Two-Way Links on Every Page:** Every concept file in `bundles/` has three parts:
     1. **YAML Frontmatter ("Nutrition Label"):** Lists the concept's `type`, `status` (`stable`, `draft`, `deprecated`), `sources` (provenance), and `verified` stamps (who checked it and when).
     2. **Concept Body:** Concise explanation (or sanctioned SQL query for `Attested Computation` nodes) with standard Markdown links to related concepts.
     3. **`## Related Concepts` & `## Inbound References`:** Auto-generated outbound links and incoming backlinks at the bottom of every page so you can always see both what a page references and *what references it*.

2. **Pointing an AI Agent or MCP Client $\rightarrow$ Point at `bundles/<name>/`**
   - Always point AI agents (or `binder mcp`) at **`bundles/<name>/`** (starting at `bundles/<name>/index.md`), never `corpora/`.

3. **Exploring Visually or Loading a Graph Database $\rightarrow$ Point at `projections/<name>/`**
   - Open **`projections/<name>/viz.html`** in any browser to explore an interactive force-directed diagram of the bundle.
   - Use **`projections/<name>/schema.ddl`**, **`nodes.csv`**, **`edges.csv`**, and **`load.sql`** to load the bundle directly into Google Cloud Spanner Graph (or inspect **`graph.json`** / **`graph.dot`**).

---

## Why Three Folders? (`corpora/` vs. `bundles/` vs. `projections/`)

This repository is structured as a 3-stage pipeline (`corpora/` $\rightarrow$ `bundles/` $\rightarrow$ `projections/`):

```text
okf-bundles/
├── corpora/       # 1. Author's Draft: human-friendly Markdown with [[wikilinks]], #hashtags, & FM refs
├── bundles/       # 2. Published OKF v0.2 Bundles: 100% conformant, pure .md with catalogs & backlinks
├── projections/   # 3. Database & Visual Exports: Spanner SQL/PGQ DDL & CSVs + graph.json, graph.dot, viz.html
└── scripts/
    ├── generate-corpora.mjs  # Generates the 7 source corpora under corpora/
    └── build.sh              # Runs binder lint -> convert -> validate -> review -> graph -> project
```

- **Why keep `corpora/` separate from `bundles/`?**
  Authors like writing shorthand (`[[zeus]]`, `#mythology`, `mitigates: ["cwe-89"]`). `binder convert` compiles that shorthand into strict, portable OKF v0.2 Markdown under `bundles/<name>/`—resolving every link into a relative `.md` path, organizing concepts into type subfolders, and generating `index.md` catalogs and backlinks.
- **Why keep `projections/` separate from `bundles/`?**
  The OKF specification requires a bundle directory (`bundles/<name>/`) to contain **only Markdown (`.md`) files**. Non-Markdown derivatives—like CSV tables, SQL DDL, JSON graphs, and HTML visualizations—live alongside the bundles in `projections/<name>/`.

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
