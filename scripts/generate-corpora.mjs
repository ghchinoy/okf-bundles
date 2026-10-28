#!/usr/bin/env node
// Generates the 4 public-domain / open-standard source Markdown corpora under corpora/
// with rich OKF v0.2 frontmatter, [[wikilinks]], #hashtags, frontmatter refs,
// lifecycle states (draft/stable/deprecated), provenance sources, verified stamps,
// and Attested Computations.

import { mkdirSync, writeFileSync, rmSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const CORPORA = join(ROOT, 'corpora');
const q = (s) => JSON.stringify(s);

function writeConcept(corpus, relPath, frontmatterLines, bodyLines) {
  const full = join(CORPORA, corpus, relPath);
  mkdirSync(dirname(full), { recursive: true });
  const content = [
    '---',
    ...frontmatterLines,
    '---',
    '',
    ...bodyLines,
    '',
  ].join('\n');
  writeFileSync(full, content);
}

// ============================================================================
// 1. NIST AI RMF 1.0 (17 U.S.C. § 105 Public Domain)
// ============================================================================
function buildNistAiRmf() {
  const c = 'nist-ai-rmf';
  rmSync(join(CORPORA, c), { recursive: true, force: true });

  const nistSource = [
    'sources:',
    '  - id: "nist-ai-100-1"',
    '    resource: "https://doi.org/10.6028/NIST.AI.100-1"',
    '    title: "NIST AI 100-1: Artificial Intelligence Risk Management Framework (AI RMF 1.0)"',
    '    author: "process:nist-ai-rmf"',
    '    last_modified: "2023-01-26"',
  ];
  const verifiedHuman = [
    'verified:',
    '  - by: "human:nist-ai-rmf-working-group"',
    '    at: "2026-07-31T00:00:00Z"',
  ];

  // Functions
  const functions = [
    {
      id: 'govern',
      title: 'GOVERN',
      desc: 'Cultivate and implement a culture of risk management throughout the organizations designing, developing, deploying, evaluating, or acquiring AI systems.',
      categories: ['govern-1', 'govern-2', 'govern-3', 'govern-4'],
      characteristics: ['accountable-and-transparent', 'safe', 'fair-with-harmful-bias-managed'],
      body: [
        '# GOVERN Function',
        '',
        'The **GOVERN** function is cross-cutting and informs every other function of the NIST AI RMF ([[map]], [[measure]], and [[manage]]). It establishes organizational policies, processes, accountability structures, and culture for AI risk management.',
        '',
        '## Core Categories',
        '- [[govern-1]] — Policies, processes, procedures, and practices across the organization related to the mapping, measuring, and managing of AI risks are in place, transparent, and implemented effectively.',
        '- [[govern-2]] — Accountability structures are in place so that the appropriate teams and individuals are empowered, responsible, and trained for mapping, measuring, and managing AI risks.',
        '- [[govern-3]] — Workforce diversity, equity, inclusion, and accessibility processes are prioritized in the mapping, measuring, and managing of AI risks throughout the lifecycle.',
        '- [[govern-4]] — Organizational teams are committed to a culture that considers and communicates AI risk.',
        '',
        '## Trustworthiness Characteristics',
        '- [[accountable-and-transparent]]',
        '- [[safe]]',
        '- [[fair-with-harmful-bias-managed]]',
        '',
        '#nist #ai-rmf #governance',
      ],
    },
    {
      id: 'map',
      title: 'MAP',
      desc: 'Establish the context to frame risks related to an AI system across the lifecycle.',
      categories: ['map-1', 'map-2', 'map-3'],
      characteristics: ['valid-and-reliable', 'explainable-and-interpretable', 'privacy-enhanced'],
      body: [
        '# MAP Function',
        '',
        'The **MAP** function establishes context to frame risks related to an AI system. Governed by [[govern]], the outcomes of MAP directly inform scientific evaluation in [[measure]] and risk treatment in [[manage]].',
        '',
        '## Core Categories',
        '- [[map-1]] — Context is established and understood.',
        '- [[map-2]] — Categorization of the AI system is performed.',
        '- [[map-3]] — AI capabilities, targeted usage, goals, and expected benefits and costs compared with appropriate benchmarks are understood.',
        '',
        '## Trustworthiness Characteristics',
        '- [[valid-and-reliable]]',
        '- [[explainable-and-interpretable]]',
        '- [[privacy-enhanced]]',
        '',
        '#nist #ai-rmf #context-mapping',
      ],
    },
    {
      id: 'measure',
      title: 'MEASURE',
      desc: 'Employ quantitative, qualitative, or mixed-method tools, techniques, and methodologies to analyze, assess, benchmark, and monitor AI risk and related impacts.',
      categories: ['measure-1', 'measure-2', 'measure-3'],
      characteristics: ['valid-and-reliable', 'fair-with-harmful-bias-managed', 'secure-and-resilient'],
      body: [
        '# MEASURE Function',
        '',
        'The **MEASURE** function employs quantitative, qualitative, or mixed-method tools and methodologies to analyze, assess, benchmark, and monitor AI risk identified during [[map]] under the oversight of [[govern]]. Its metrics feed into [[manage]] and sanctions like [[demographic-parity-ratio]] and [[calibration-drift-score]].',
        '',
        '## Core Categories',
        '- [[measure-1]] — Appropriate methods and metrics are identified and applied.',
        '- [[measure-2]] — AI systems are evaluated for trustworthy characteristics.',
        '- [[measure-3]] — Mechanisms for tracking identified AI risks over time are in place.',
        '',
        '## Attested Computations',
        '- [[demographic-parity-ratio]]',
        '- [[calibration-drift-score]]',
        '',
        '#nist #ai-rmf #evaluation #metrics',
      ],
    },
    {
      id: 'manage',
      title: 'MANAGE',
      desc: 'Allocate risk resources to mapped and measured risks on a regular basis and as defined by the GOVERN function.',
      categories: ['manage-1', 'manage-2', 'manage-3'],
      characteristics: ['safe', 'secure-and-resilient', 'accountable-and-transparent'],
      body: [
        '# MANAGE Function',
        '',
        'The **MANAGE** function allocates risk resources to mapped ([[map]]) and measured ([[measure]]) risks on a regular basis and as defined by the [[govern]] function.',
        '',
        '## Core Categories',
        '- [[manage-1]] — AI risks based on assessments and other analytical output from the MAP and MEASURE functions are prioritized, responded to, and managed.',
        '- [[manage-2]] — Strategies to maximize AI benefits and minimize negative impacts are planned, prepared, implemented, documented, and informed by input from relevant AI actors.',
        '- [[manage-3]] — AI risks and benefits from third-party entities are managed.',
        '',
        '#nist #ai-rmf #risk-treatment',
      ],
    },
  ];

  for (const fn of functions) {
    writeConcept(c, `functions/${fn.id}.md`, [
      'type: "Function"',
      `title: "${fn.title}"`,
      `description: "${fn.desc}"`,
      'resource: "https://airc.nist.gov/RMF_Resource_Center/AI_RMF_Core"',
      'status: "stable"',
      `related: [${fn.categories.map((x) => `"${x}"`).join(', ')}]`,
      ...nistSource,
      ...verifiedHuman,
    ], fn.body);
  }

  // Categories
  const categories = [
    { id: 'govern-1', fn: 'govern', title: 'GOVERN 1: Policies and Procedures', desc: 'Policies, processes, procedures, and practices across the organization related to the mapping, measuring, and managing of AI risks are in place, transparent, and implemented effectively.', related: ['map-1', 'measure-1', 'manage-1', 'accountable-and-transparent'] },
    { id: 'govern-2', fn: 'govern', title: 'GOVERN 2: Accountability Structures', desc: 'Accountability structures are in place so that the appropriate teams and individuals are empowered, responsible, and trained for mapping, measuring, and managing AI risks.', related: ['govern-1', 'accountable-and-transparent'] },
    { id: 'govern-3', fn: 'govern', title: 'GOVERN 3: Workforce Diversity & Inclusion', desc: 'Workforce diversity, equity, inclusion, and accessibility processes are prioritized in the mapping, measuring, and managing of AI risks throughout the lifecycle.', related: ['fair-with-harmful-bias-managed', 'map-1'] },
    { id: 'govern-4', fn: 'govern', title: 'GOVERN 4: Risk-Aware Organizational Culture', desc: 'Organizational teams are committed to a culture that considers and communicates AI risk.', related: ['safe', 'explainable-and-interpretable'] },
    { id: 'map-1', fn: 'map', title: 'MAP 1: Context Established', desc: 'Intended purpose, potentially beneficial uses, context-specific laws, norms, and deployment environment are understood and documented.', related: ['govern-1', 'valid-and-reliable'] },
    { id: 'map-2', fn: 'map', title: 'MAP 2: AI System Categorization', desc: 'Categorization of the AI system is performed based on technical capabilities, autonomy level, and risk profile.', related: ['map-1', 'measure-2', 'safe'] },
    { id: 'map-3', fn: 'map', title: 'MAP 3: Capabilities and Limitations', desc: 'AI capabilities, targeted usage, goals, and expected benefits and costs compared with appropriate benchmarks are understood.', related: ['measure-1', 'explainable-and-interpretable'] },
    { id: 'measure-1', fn: 'measure', title: 'MEASURE 1: Methods and Metrics', desc: 'Appropriate quantitative and qualitative methods and metrics are identified and applied to evaluate AI risks.', related: ['demographic-parity-ratio', 'calibration-drift-score', 'valid-and-reliable'] },
    { id: 'measure-2', fn: 'measure', title: 'MEASURE 2: Trustworthiness Evaluation', desc: 'AI systems are evaluated for trustworthy characteristics: validity, safety, security, privacy, fairness, and explainability.', related: ['safe', 'secure-and-resilient', 'privacy-enhanced', 'fair-with-harmful-bias-managed'] },
    { id: 'measure-3', fn: 'measure', title: 'MEASURE 3: Continuous Risk Tracking', desc: 'Mechanisms for tracking identified AI risks over time in production settings are in place.', related: ['calibration-drift-score', 'manage-1'] },
    { id: 'manage-1', fn: 'manage', title: 'MANAGE 1: Risk Prioritization & Response', desc: 'AI risks based on assessments from MAP and MEASURE functions are prioritized, responded to, and managed.', related: ['map-2', 'measure-2', 'safe'] },
    { id: 'manage-2', fn: 'manage', title: 'MANAGE 2: Benefit Maximization & Impact Mitigation', desc: 'Strategies to maximize AI benefits and minimize negative impacts are planned, prepared, implemented, and documented.', related: ['govern-4', 'accountable-and-transparent'] },
    { id: 'manage-3', fn: 'manage', title: 'MANAGE 3: Third-Party & Supply Chain AI Risk', desc: 'AI risks and benefits from third-party entities, pre-trained models, and datasets are managed across the supply chain.', related: ['secure-and-resilient', 'govern-1'] },
  ];

  for (const cat of categories) {
    writeConcept(c, `categories/${cat.id}.md`, [
      'type: "Category"',
      `title: "${cat.title}"`,
      `description: "${cat.desc}"`,
      `parent: "${cat.fn}"`,
      'status: "stable"',
      ...nistSource,
      ...verifiedHuman,
    ], [
      `# ${cat.title}`,
      '',
      cat.desc,
      '',
      `Part of the [[${cat.fn}]] Function in the NIST AI Risk Management Framework.`,
      '',
      '## Cross-References',
      ...cat.related.map((r) => `- [[${r}]]`),
      '',
      '#nist #ai-rmf #category',
    ]);
  }

  // Trustworthiness Characteristics (AI RMF §3)
  const characteristics = [
    { id: 'valid-and-reliable', title: 'Valid and Reliable', desc: 'Confirmation through objective evidence that requirements for a specific intended use or application have been fulfilled, and the ability of an item to perform as required over time.', links: ['map-1', 'measure-1', 'calibration-drift-score'] },
    { id: 'safe', title: 'Safe', desc: 'AI systems should not under defined conditions lead to a state in which human life, health, property, or the environment is endangered.', links: ['govern-4', 'map-2', 'measure-2', 'manage-1'] },
    { id: 'secure-and-resilient', title: 'Secure and Resilient', desc: 'AI systems can withstand adversarial attacks and unexpected perturbations, and maintain confidentiality, integrity, and availability.', links: ['measure-2', 'manage-3'] },
    { id: 'accountable-and-transparent', title: 'Accountable and Transparent', desc: 'Availability of information about an AI system to interacting stakeholders across the lifecycle, paired with clear human accountability.', links: ['govern-1', 'govern-2', 'manage-2'] },
    { id: 'explainable-and-interpretable', title: 'Explainable and Interpretable', desc: 'Representation of the mechanisms underlying AI systems operation and the meaning of their outputs in the context of their designed functional purposes.', links: ['map-3', 'govern-4'] },
    { id: 'privacy-enhanced', title: 'Privacy-Enhanced', desc: 'Safeguarding human autonomy, identity, and dignity via technical and policy controls such as differential privacy and data minimization.', links: ['map-1', 'measure-2'] },
    { id: 'fair-with-harmful-bias-managed', title: 'Fair — with Harmful Bias Managed', desc: 'Addressing systemic, computational, statistical, and human-cognitive biases across the AI lifecycle to promote equity and prevent discriminatory harm.', links: ['govern-3', 'measure-2', 'demographic-parity-ratio'] },
  ];

  for (const ch of characteristics) {
    writeConcept(c, `characteristics/${ch.id}.md`, [
      'type: "Trustworthiness Characteristic"',
      `title: "${ch.title}"`,
      `description: "${ch.desc}"`,
      'status: "stable"',
      ...nistSource,
      ...verifiedHuman,
    ], [
      `# ${ch.title}`,
      '',
      ch.desc,
      '',
      '## Related Categories & Metrics',
      ...ch.links.map((l) => `- [[${l}]]`),
      '',
      '#nist #trustworthiness #ai-safety',
    ]);
  }

  // Attested Computations (OKF v0.2 §10)
  writeConcept(c, 'computations/demographic-parity-ratio.md', [
    'type: "Attested Computation"',
    'title: "Demographic Parity Ratio (80% Four-Fifths Rule)"',
    'description: "Sanctioned fairness computation measuring the ratio of selection rates between the least-favored and most-favored demographic groups under MEASURE 1.1 and MEASURE 2.11."',
    'runtime: "bigquery-sql"',
    'parameters:',
    '  protected_attribute: "demographic_group"',
    '  outcome_column: "positive_prediction"',
    '  threshold: "0.80"',
    'executor: "process:fairness-evaluator"',
    'attester: "process:sql-equality-attester"',
    'status: "stable"',
    ...nistSource,
    ...verifiedHuman,
  ], [
    '# Demographic Parity Ratio',
    '',
    'An OKF v0.2 **Attested Computation** implementing quantitative fairness evaluation for [[measure-1]] and [[fair-with-harmful-bias-managed]] under the [[measure]] function. Featured in [[tour-governance-to-sql-metrics]].',
    '',
    '```sql',
    'WITH group_rates AS (',
    '  SELECT demographic_group, AVG(CAST(positive_prediction AS FLOAT64)) AS selection_rate',
    '  FROM model_predictions',
    '  GROUP BY demographic_group',
    ')',
    'SELECT MIN(selection_rate) / NULLIF(MAX(selection_rate), 0) AS demographic_parity_ratio',
    'FROM group_rates;',
    '```',
  ]);

  writeConcept(c, 'computations/calibration-drift-score.md', [
    'type: "Attested Computation"',
    'title: "Population Stability Index (PSI) Calibration Drift"',
    'description: "Sanctioned production drift computation tracking distribution shifts between baseline validation data and live inference under MEASURE 3.1."',
    'runtime: "bigquery-sql"',
    'parameters:',
    '  baseline_window_days: "30"',
    '  alert_threshold_psi: "0.25"',
    'executor: "process:drift-monitor"',
    'attester: "process:sql-equality-attester"',
    'status: "stable"',
    ...nistSource,
    ...verifiedHuman,
  ], [
    '# Population Stability Index (PSI) Calibration Drift',
    '',
    'An OKF v0.2 **Attested Computation** supporting continuous monitoring in [[measure-3]] and [[valid-and-reliable]] under [[measure]]. Featured in [[tour-continuous-drift-and-safety]].',
    '',
    '```sql',
    'SELECT SUM((actual_pct - expected_pct) * LN(actual_pct / NULLIF(expected_pct, 0))) AS psi_score',
    'FROM prediction_decile_distributions;',
    '```',
  ]);

  // Guided Tours (Podcast / Narrative Episode Paths)
  const tours = [
    {
      id: 'tour-governance-to-sql-metrics',
      title: 'Tour: From AI Governance Policy to Sanctioned SQL Fairness Metrics',
      desc: 'Guided narrative walkthrough tracing how organizational policies in GOVERN 1 and diversity commitments in GOVERN 3 translate into quantitative BigQuery SQL fairness evaluations.',
      steps: ['govern', 'govern-1', 'govern-3', 'fair-with-harmful-bias-managed', 'measure', 'measure-1', 'demographic-parity-ratio', 'accountable-and-transparent'],
      prereq: ['govern'],
    },
    {
      id: 'tour-continuous-drift-and-safety',
      title: 'Tour: Continuous Production Drift Monitoring and Safety Incident Response',
      desc: 'Guided narrative walkthrough connecting context mapping (MAP 2), validity & reliability evaluations, Population Stability Index (PSI) drift detection, and MANAGE 1 prioritization.',
      steps: ['map', 'map-2', 'valid-and-reliable', 'measure-3', 'calibration-drift-score', 'safe', 'manage', 'manage-1'],
      prereq: ['map'],
    },
  ];

  for (const t of tours) {
    writeConcept(c, `tours/${t.id}.md`, [
      'type: "Tour"',
      `title: "${t.title}"`,
      `description: "${t.desc}"`,
      'status: "stable"',
      `prerequisite: [${t.prereq.map((x) => `"${x}"`).join(', ')}]`,
      `steps: [${t.steps.map((x) => `"${x}"`).join(', ')}]`,
      ...nistSource,
      ...verifiedHuman,
    ], [
      `# ${t.title}`,
      '',
      t.desc,
      '',
      '## Episode / Tour Sequence',
      ...t.steps.map((s, idx) => `${idx + 1}. [[${s}]]`),
      '',
      '#nist #ai-rmf #tour #podcast',
    ]);
  }
}

// ============================================================================
// 2. Core IETF RFCs (HTTP, Auth, Security, Data Formats)
// ============================================================================
function buildIetfRfcs() {
  const c = 'ietf-rfcs';
  rmSync(join(CORPORA, c), { recursive: true, force: true });

  const rfcs = [
    // Deprecated / Obsoleted historical RFCs (great for testing status: deprecated & lineage edges!)
    {
      id: 'rfc2616',
      dir: 'http',
      title: 'RFC 2616: Hypertext Transfer Protocol -- HTTP/1.1 (Obsoleted)',
      desc: 'The classic 1999 HTTP/1.1 specification, later obsoleted by the RFC 7230–7235 series and consolidated into RFC 9110 and RFC 9112.',
      status: 'deprecated',
      stale_after: '2014-06-01',
      url: 'https://www.rfc-editor.org/rfc/rfc2616',
      links: ['rfc9110', 'rfc9111'],
      tags: ['http', 'obsoleted', 'history'],
    },
    {
      id: 'rfc5246',
      dir: 'security',
      title: 'RFC 5246: The Transport Layer Security (TLS) Protocol Version 1.2 (Obsoleted)',
      desc: 'Specified TLS 1.2; formally obsoleted by RFC 8446 (TLS 1.3) in August 2018.',
      status: 'deprecated',
      stale_after: '2018-08-01',
      url: 'https://www.rfc-editor.org/rfc/rfc5246',
      links: ['rfc8446', 'rfc9110'],
      tags: ['tls', 'cryptography', 'obsoleted'],
    },
    // Active / Stable Core HTTP RFCs
    {
      id: 'rfc9110',
      dir: 'http',
      title: 'RFC 9110: HTTP Semantics',
      desc: 'Defines abstract HTTP protocol semantics (methods, status codes, headers, content negotiation, and connection management) independent of wire version.',
      status: 'stable',
      url: 'https://www.rfc-editor.org/rfc/rfc9110',
      links: ['rfc9111', 'rfc9113', 'rfc9114', 'rfc8446', 'rfc3986', 'rfc2616', 'rfc9457', 'tour-evolution-of-http-and-quic'],
      tags: ['http', 'internet-standard', 'std97'],
    },
    {
      id: 'rfc9111',
      dir: 'http',
      title: 'RFC 9111: HTTP Caching',
      desc: 'Defines HTTP caches and the associated header fields that control cache behavior and indicate cacheable response messages (Cache-Control, Age, ETag, Vary).',
      status: 'stable',
      url: 'https://www.rfc-editor.org/rfc/rfc9111',
      links: ['rfc9110', 'rfc2616'],
      tags: ['http', 'caching', 'std98'],
    },
    {
      id: 'rfc9113',
      dir: 'http',
      title: 'RFC 9113: HTTP/2',
      desc: 'Specifies multiplexed binary framing and header compression (HPACK) for HTTP semantics over TCP and TLS 1.3.',
      status: 'stable',
      url: 'https://www.rfc-editor.org/rfc/rfc9113',
      links: ['rfc9110', 'rfc8446'],
      tags: ['http2', 'multiplexing'],
    },
    {
      id: 'rfc9114',
      dir: 'http',
      title: 'RFC 9114: HTTP/3',
      desc: 'Mapping of HTTP semantics over the QUIC transport protocol (RFC 9000), eliminating head-of-line blocking at the transport layer.',
      status: 'stable',
      url: 'https://www.rfc-editor.org/rfc/rfc9114',
      links: ['rfc9110', 'rfc9000', 'rfc8446'],
      tags: ['http3', 'quic'],
    },
    {
      id: 'rfc9000',
      dir: 'http',
      title: 'RFC 9000: QUIC: A UDP-Based Multiplexed and Secure Transport',
      desc: 'Defines the core QUIC transport protocol providing stream multiplexing, low-latency connection establishment, and integrated TLS 1.3 security over UDP.',
      status: 'stable',
      url: 'https://www.rfc-editor.org/rfc/rfc9000',
      links: ['rfc9114', 'rfc8446'],
      tags: ['quic', 'transport', 'udp'],
    },
    {
      id: 'rfc9457',
      dir: 'http',
      title: 'RFC 9457: Problem Details for HTTP APIs',
      desc: 'Defines a standard JSON and XML problem-detail document (application/problem+json) to carry machine-readable error details in HTTP responses.',
      status: 'stable',
      url: 'https://www.rfc-editor.org/rfc/rfc9457',
      links: ['rfc9110', 'rfc8259', 'rfc3986'],
      tags: ['http', 'api', 'errors', 'json'],
    },
    // Security & Auth RFCs
    {
      id: 'rfc8446',
      dir: 'security',
      title: 'RFC 8446: The Transport Layer Security (TLS) Protocol Version 1.3',
      desc: 'Specifies TLS 1.3 with mandatory forward secrecy, 1-RTT handshakes, encrypted handshake messages, and removal of legacy AEAD-unsafe ciphers.',
      status: 'stable',
      url: 'https://www.rfc-editor.org/rfc/rfc8446',
      links: ['rfc5246', 'rfc9110', 'rfc9000'],
      tags: ['tls', 'tls13', 'security', 'cryptography'],
    },
    {
      id: 'rfc6749',
      dir: 'auth',
      title: 'RFC 6749: The OAuth 2.0 Authorization Framework',
      desc: 'Enables a third-party application to obtain limited access to an HTTP service on behalf of a resource owner or on its own behalf.',
      status: 'stable',
      url: 'https://www.rfc-editor.org/rfc/rfc6749',
      links: ['rfc6750', 'rfc7636', 'rfc7519', 'rfc9110', 'draft-ietf-oauth-v2-1'],
      tags: ['oauth2', 'authorization', 'security'],
    },
    {
      id: 'rfc6750',
      dir: 'auth',
      title: 'RFC 6750: The OAuth 2.0 Authorization Framework: Bearer Token Usage',
      desc: 'Specifies how to use bearer tokens in HTTP requests to access OAuth 2.0 protected resources over TLS.',
      status: 'stable',
      url: 'https://www.rfc-editor.org/rfc/rfc6750',
      links: ['rfc6749', 'rfc7519', 'rfc9110', 'rfc8446'],
      tags: ['oauth2', 'bearer-token', 'http-auth'],
    },
    {
      id: 'rfc7636',
      dir: 'auth',
      title: 'RFC 7636: Proof Key for Code Exchange by OAuth Public Clients (PKCE)',
      desc: 'Mitigates the authorization code interception attack in OAuth 2.0 using dynamically generated code_verifier and code_challenge secrets.',
      status: 'stable',
      url: 'https://www.rfc-editor.org/rfc/rfc7636',
      links: ['rfc6749', 'draft-ietf-oauth-v2-1'],
      tags: ['oauth2', 'pkce', 'security'],
    },
    {
      id: 'rfc7519',
      dir: 'auth',
      title: 'RFC 7519: JSON Web Token (JWT)',
      desc: 'Compact, URL-safe means of representing claims to be transferred between two parties, signed with JWS or encrypted with JWE.',
      status: 'stable',
      url: 'https://www.rfc-editor.org/rfc/rfc7519',
      links: ['rfc8259', 'rfc6749', 'rfc6750'],
      tags: ['jwt', 'jose', 'claims', 'auth'],
    },
    {
      id: 'draft-ietf-oauth-v2-1',
      dir: 'auth',
      title: 'Draft: The OAuth 2.1 Authorization Framework',
      desc: 'Consolidates OAuth 2.0 (RFC 6749), Bearer Tokens (RFC 6750), PKCE (RFC 7636), and Security Best Current Practice, removing the insecure Implicit and ROPC grants.',
      status: 'draft',
      stale_after: '2027-06-01',
      url: 'https://datatracker.ietf.org/doc/draft-ietf-oauth-v2-1/',
      links: ['rfc6749', 'rfc6750', 'rfc7636', 'tour-modern-api-identity-oauth21'],
      tags: ['oauth21', 'draft', 'authorization'],
    },
    // Core Data Formats & Identifiers
    {
      id: 'rfc8259',
      dir: 'data',
      title: 'RFC 8259: The JavaScript Object Notation (JSON) Data Interchange Format (STD 90)',
      desc: 'Defines the canonical JSON syntax, requiring UTF-8 encoding for interoperable network exchange.',
      status: 'stable',
      url: 'https://www.rfc-editor.org/rfc/rfc8259',
      links: ['rfc7519', 'rfc9457', 'rfc9562'],
      tags: ['json', 'std90', 'serialization'],
    },
    {
      id: 'rfc3986',
      dir: 'data',
      title: 'RFC 3986: Uniform Resource Identifier (URI): Generic Syntax (STD 66)',
      desc: 'Defines the generic syntax of URIs (scheme, authority, path, query, fragment) and relative reference resolution.',
      status: 'stable',
      url: 'https://www.rfc-editor.org/rfc/rfc3986',
      links: ['rfc9110', 'rfc9457', 'rfc9562'],
      tags: ['uri', 'std66', 'identifiers'],
    },
    {
      id: 'rfc9562',
      dir: 'data',
      title: 'RFC 9562: Universally Unique IDentifiers (UUIDs)',
      desc: 'Updates RFC 4122 and introduces time-ordered UUIDv6, UUIDv7 (Unix Epoch time + random), and custom UUIDv8 formats for database indexing.',
      status: 'stable',
      url: 'https://www.rfc-editor.org/rfc/rfc9562',
      links: ['rfc3986', 'rfc8259'],
      tags: ['uuid', 'uuidv7', 'identifiers'],
    },
  ];

  for (const r of rfcs) {
    const fm = [
      `type: "${r.status === 'draft' ? 'Internet-Draft' : 'RFC'}"`,
      `title: "${r.title}"`,
      `description: "${r.desc}"`,
      `resource: "${r.url}"`,
      `status: "${r.status}"`,
    ];
    if (r.stale_after) fm.push(`stale_after: "${r.stale_after}"`);
    if (r.id === 'rfc9110') fm.push('supersedes: ["rfc2616"]', 'related: ["tour-evolution-of-http-and-quic"]');
    if (r.id === 'rfc8446') fm.push('supersedes: ["rfc5246"]');
    if (r.id === 'draft-ietf-oauth-v2-1') fm.push('supersedes: ["rfc6749"]', 'prerequisite: ["rfc7636", "rfc6750"]', 'related: ["tour-modern-api-identity-oauth21"]');
    fm.push(
      `tags: [${r.tags.map((t) => `"${t}"`).join(', ')}]`,
      'sources:',
      `  - id: "${r.id}"`,
      `    resource: "${r.url}"`,
      `    title: "${r.title}"`,
      '    author: "process:ietf-rfc-editor"',
      'verified:',
      '  - by: "process:ietf-datatracker"',
      '    at: "2026-07-31T00:00:00Z"',
    );
    writeConcept(c, `${r.dir}/${r.id}.md`, fm, [
      `# ${r.title}`,
      '',
      r.desc,
      '',
      `- **Lifecycle Status:** \`${r.status}\``,
      `- **Canonical Specification:** <${r.url}>`,
      '',
      '## Normative & Informative Dependencies',
      ...r.links.map((l) => `- [[${l}]]`),
    ]);
  }

  const rfcTours = [
    {
      id: 'tour-evolution-of-http-and-quic',
      title: 'Tour: From Obsoleted HTTP/1.1 & TLS 1.2 to HTTP/3 over QUIC',
      desc: 'Narrative walkthrough of how the web evolved from head-of-line blocking in RFC 2616 and legacy TLS 1.2 (RFC 5246) to abstract HTTP semantics (RFC 9110), TLS 1.3 (RFC 8446), and UDP-multiplexed QUIC (RFC 9000 / RFC 9114).',
      steps: ['rfc2616', 'rfc9110', 'rfc9111', 'rfc5246', 'rfc8446', 'rfc9113', 'rfc9000', 'rfc9114'],
    },
    {
      id: 'tour-modern-api-identity-oauth21',
      title: 'Tour: Securing Modern JSON APIs with OAuth 2.1, PKCE, and JWT',
      desc: 'Narrative walkthrough connecting foundational URI/JSON/UUID data formats with OAuth 2.0, PKCE interception defense, Bearer JWTs, RFC 9457 Problem Details, and the consolidated OAuth 2.1 draft.',
      steps: ['rfc3986', 'rfc8259', 'rfc9562', 'rfc9457', 'rfc6749', 'rfc7636', 'rfc6750', 'rfc7519', 'draft-ietf-oauth-v2-1'],
    },
  ];

  for (const t of rfcTours) {
    writeConcept(c, `tours/${t.id}.md`, [
      'type: "Tour"',
      `title: "${t.title}"`,
      `description: "${t.desc}"`,
      'status: "stable"',
      `steps: [${t.steps.map((x) => `"${x}"`).join(', ')}]`,
      'sources:',
      '  - id: "ietf-rfc-index"',
      '    resource: "https://www.rfc-editor.org/"',
      '    title: "IETF RFC Editor Index"',
      '    author: "process:ietf-rfc-editor"',
      'verified:',
      '  - by: "process:ietf-datatracker"',
      '    at: "2026-07-31T00:00:00Z"',
    ], [
      `# ${t.title}`,
      '',
      t.desc,
      '',
      '## Episode / Tour Sequence',
      ...t.steps.map((s, idx) => `${idx + 1}. [[${s}]]`),
    ]);
  }
}

// ============================================================================
// 3. Cybersecurity CWE & MITRE ATT&CK (Public Domain / Permissive Threat Intel)
// ============================================================================
function buildCybersecurity() {
  const c = 'cybersecurity-cwe-attack';
  rmSync(join(CORPORA, c), { recursive: true, force: true });

  const items = [
    // CWEs
    { id: 'cwe-79', dir: 'weaknesses', type: 'Weakness', title: 'CWE-79: Cross-site Scripting (XSS)', desc: 'Improper neutralization of input during web page generation allows attackers to inject client-side scripts into web pages viewed by other users.', url: 'https://cwe.mitre.org/data/definitions/79.html', links: ['t1190', 'm1050', 'csp-header-policy'], tags: ['cwe', 'xss', 'web'] },
    { id: 'cwe-89', dir: 'weaknesses', type: 'Weakness', title: 'CWE-89: SQL Injection (SQLi)', desc: 'Improper neutralization of special elements used in an SQL command allows attackers to modify or execute arbitrary database queries.', url: 'https://cwe.mitre.org/data/definitions/89.html', links: ['t1190', 'm1050', 'parameterized-queries'], tags: ['cwe', 'sqli', 'database'] },
    { id: 'cwe-78', dir: 'weaknesses', type: 'Weakness', title: 'CWE-78: OS Command Injection', desc: 'Improper neutralization of special elements used in an OS command allows arbitrary command execution on the host operating system.', url: 'https://cwe.mitre.org/data/definitions/78.html', links: ['t1190', 't1059', 'm1050'], tags: ['cwe', 'rce', 'command-injection'] },
    { id: 'cwe-22', dir: 'weaknesses', type: 'Weakness', title: 'CWE-22: Path Traversal', desc: 'Improper limitation of a pathname to a restricted directory (dot-dot-slash) allows access to files and directories outside the intended root.', url: 'https://cwe.mitre.org/data/definitions/22.html', links: ['t1190', 'm1022'], tags: ['cwe', 'filesystem', 'path-traversal'] },
    { id: 'cwe-287', dir: 'weaknesses', type: 'Weakness', title: 'CWE-287: Improper Authentication', desc: 'When an actor claims to have a given identity, the software does not prove or insufficiently proves that the claim is correct.', url: 'https://cwe.mitre.org/data/definitions/287.html', links: ['t1078', 'm1032'], tags: ['cwe', 'authentication', 'identity'] },
    { id: 'cwe-502', dir: 'weaknesses', type: 'Weakness', title: 'CWE-502: Deserialization of Untrusted Data', desc: 'The application deserializes untrusted data without sufficiently verifying that the resulting data will be valid and safe.', url: 'https://cwe.mitre.org/data/definitions/502.html', links: ['t1190', 't1059', 'm1050'], tags: ['cwe', 'deserialization', 'rce'] },
    { id: 'cwe-918', dir: 'weaknesses', type: 'Weakness', title: 'CWE-918: Server-Side Request Forgery (SSRF)', desc: 'The web server receives a URL or similar request from an upstream component and retrieves the contents without ensuring the destination is allowed.', url: 'https://cwe.mitre.org/data/definitions/918.html', links: ['t1190', 't1552', 'm1037'], tags: ['cwe', 'ssrf', 'cloud-metadata'] },
    // ATT&CK Techniques
    { id: 't1190', dir: 'techniques', type: 'Technique', title: 'T1190: Exploit Public-Facing Application', desc: 'Adversaries may attempt to exploit a weakness in an Internet-facing host or system to initially access a network.', url: 'https://attack.mitre.org/techniques/T1190/', links: ['cwe-79', 'cwe-89', 'cwe-78', 'cwe-22', 'cwe-502', 'cwe-918', 'm1050', 'm1037', 'tour-injection-to-rce-killchain'], triggered_by: ['cwe-79', 'cwe-89', 'cwe-78', 'cwe-502', 'cwe-918'], tags: ['attack', 'initial-access'] },
    { id: 't1059', dir: 'techniques', type: 'Technique', title: 'T1059: Command and Scripting Interpreter', desc: 'Adversaries may abuse command and script interpreters to execute commands, scripts, or binaries.', url: 'https://attack.mitre.org/techniques/T1059/', links: ['cwe-78', 'cwe-502', 'm1022'], triggered_by: ['cwe-78', 'cwe-502'], tags: ['attack', 'execution'] },
    { id: 't1078', dir: 'techniques', type: 'Technique', title: 'T1078: Valid Accounts', desc: 'Adversaries may obtain and abuse credentials of existing accounts as a means of gaining Initial Access, Persistence, Privilege Escalation, or Defense Evasion.', url: 'https://attack.mitre.org/techniques/T1078/', links: ['cwe-287', 't1552', 'm1032', 'impossible-travel-detection', 'tour-cloud-identity-and-ssrf-defense'], triggered_by: ['cwe-287', 't1552'], tags: ['attack', 'credential-access', 'persistence'] },
    { id: 't1552', dir: 'techniques', type: 'Technique', title: 'T1552: Unsecured Credentials', desc: 'Adversaries may search compromised systems or cloud metadata endpoints to find and obtain insecurely stored credentials.', url: 'https://attack.mitre.org/techniques/T1552/', links: ['cwe-918', 't1078', 'm1022', 'm1037'], triggered_by: ['cwe-918'], tags: ['attack', 'credential-access'] },
    // Mitigations & Controls
    { id: 'm1050', dir: 'mitigations', type: 'Mitigation', title: 'M1050: Exploit Protection & Input Validation', desc: 'Use capabilities to detect and block conditions that may lead to or be indicative of a software exploit, paired with strict allowlist input validation.', url: 'https://attack.mitre.org/mitigations/M1050/', links: ['cwe-79', 'cwe-89', 'cwe-78', 'cwe-502', 'parameterized-queries', 'csp-header-policy'], mitigates: ['cwe-79', 'cwe-89', 'cwe-78', 'cwe-502', 't1190'], tags: ['mitigation', 'appsec'] },
    { id: 'm1032', dir: 'mitigations', type: 'Mitigation', title: 'M1032: Multi-Factor Authentication (MFA)', desc: 'Require two or more pieces of evidence to authenticate to a system, prioritizing phishing-resistant FIDO2/WebAuthn passkeys.', url: 'https://attack.mitre.org/mitigations/M1032/', links: ['cwe-287', 't1078', 'impossible-travel-detection'], mitigates: ['cwe-287', 't1078'], tags: ['mitigation', 'mfa', 'authentication'] },
    { id: 'm1022', dir: 'mitigations', type: 'Mitigation', title: 'M1022: Restrict File and Directory Permissions', desc: 'Restrict access by setting directory and file permissions that are not specific to users or privileged accounts, and enforce chroot/root-jail boundaries.', url: 'https://attack.mitre.org/mitigations/M1022/', links: ['cwe-22', 't1059', 't1552'], mitigates: ['cwe-22', 't1059', 't1552'], tags: ['mitigation', 'least-privilege'] },
    { id: 'm1037', dir: 'mitigations', type: 'Mitigation', title: 'M1037: Filter Network Traffic & Egress Allowlisting', desc: 'Use network appliances and host-level egress allowlists (e.g., blocking 169.254.169.254 IMDSv1) to filter ingress and egress traffic.', url: 'https://attack.mitre.org/mitigations/M1037/', links: ['cwe-918', 't1190', 't1552'], mitigates: ['cwe-918', 't1190', 't1552'], tags: ['mitigation', 'network-security', 'ssrf-defense'] },
    { id: 'parameterized-queries', dir: 'mitigations', type: 'Mitigation', title: 'Parameterized Queries (Prepared Statements)', desc: 'Separate SQL code structure from user-supplied data parameters so that input is never interpreted as SQL commands.', url: 'https://cheatsheetseries.owasp.org/cheatsheets/SQL_Injection_Prevention_Cheat_Sheet.html', links: ['cwe-89', 'm1050'], mitigates: ['cwe-89'], tags: ['owasp', 'sqli-defense'] },
    { id: 'csp-header-policy', dir: 'mitigations', type: 'Mitigation', title: 'Strict Content-Security-Policy (CSP)', desc: 'Enforce nonce-based or hash-based Content-Security-Policy headers (script-src, object-src none) to neutralize reflected and stored XSS.', url: 'https://cheatsheetseries.owasp.org/cheatsheets/Content_Security_Policy_Cheat_Sheet.html', links: ['cwe-79', 'm1050'], mitigates: ['cwe-79'], tags: ['owasp', 'xss-defense', 'csp'] },
  ];

  for (const it of items) {
    const fm = [
      `type: "${it.type}"`,
      `title: "${it.title}"`,
      `description: "${it.desc}"`,
      `resource: "${it.url}"`,
      'status: "stable"',
    ];
    if (it.triggered_by) fm.push(`triggered_by: [${it.triggered_by.map((x) => `"${x}"`).join(', ')}]`);
    if (it.mitigates) fm.push(`mitigates: [${it.mitigates.map((x) => `"${x}"`).join(', ')}]`);
    fm.push(
      `tags: [${it.tags.map((t) => `"${t}"`).join(', ')}]`,
      'sources:',
      `  - id: "${it.id}"`,
      `    resource: "${it.url}"`,
      `    title: "${it.title}"`,
      '    author: "process:mitre-cti"',
      'verified:',
      '  - by: "process:mitre-stix-validator"',
      '    at: "2026-07-31T00:00:00Z"',
    );
    writeConcept(c, `${it.dir}/${it.id}.md`, fm, [
      `# ${it.title}`,
      '',
      it.desc,
      '',
      '## Linked Weaknesses, Techniques & Mitigations',
      ...it.links.map((l) => `- [[${l}]]`),
    ]);
  }

  // Attested Detection Computation
  writeConcept(c, 'detections/impossible-travel-detection.md', [
    'type: "Attested Computation"',
    'title: "Impossible Travel & Anomalous Session Detection (T1078)"',
    'description: "Sanctioned SIEM SQL analytic detecting concurrent authentication events from geographically distant ASN/IP locations exceeding 900 km/h."',
    'runtime: "bigquery-sql"',
    'parameters:',
    '  max_velocity_kmh: "900"',
    '  lookback_hours: "24"',
    'executor: "process:siem-detection-engine"',
    'attester: "process:sigma-sql-attester"',
    'status: "stable"',
    'mitigates: ["t1078", "cwe-287"]',
    'sources:',
    '  - id: "mitre-car-2020-09-001"',
    '    resource: "https://car.mitre.org/"',
    '    title: "MITRE Cyber Analytics Repository"',
    '    author: "process:mitre-car"',
    'verified:',
    '  - by: "human:secops-detection-lead"',
    '    at: "2026-07-31T00:00:00Z"',
  ], [
    '# Impossible Travel & Anomalous Session Detection',
    '',
    'An OKF v0.2 **Attested Computation** detecting [[t1078]] (Valid Accounts abuse) and complementing [[m1032]] (MFA) and [[cwe-287]].',
    '',
    '```sql',
    'SELECT user_id, ip_prev, ip_curr, distance_km / NULLIF(hours_elapsed, 0) AS velocity_kmh',
    'FROM auth_session_pairs',
    'WHERE distance_km / NULLIF(hours_elapsed, 0) > 900;',
    '```',
  ]);

  const secTours = [
    {
      id: 'tour-injection-to-rce-killchain',
      title: 'Tour: Anatomy of an Application Injection-to-RCE Kill Chain',
      desc: 'Walks from public-facing exploitation (T1190) across XSS, SQLi, Command Injection, and Deserialization to shell execution (T1059) and OWASP defense-in-depth mitigations.',
      steps: ['t1190', 'cwe-79', 'csp-header-policy', 'cwe-89', 'parameterized-queries', 'cwe-78', 'cwe-502', 't1059', 'm1050', 'm1022'],
    },
    {
      id: 'tour-cloud-identity-and-ssrf-defense',
      title: 'Tour: Cloud Metadata SSRF, Credential Theft, and Impossible Travel SIEM Analytics',
      desc: 'Walks how SSRF (CWE-918) leads to cloud credential harvesting (T1552) and Valid Account takeover (T1078), and how egress filtering, FIDO2 MFA, and SQL Impossible Travel detections stop it.',
      steps: ['cwe-918', 't1552', 'm1037', 'cwe-287', 't1078', 'm1032', 'impossible-travel-detection'],
    },
  ];

  for (const t of secTours) {
    writeConcept(c, `tours/${t.id}.md`, [
      'type: "Tour"',
      `title: "${t.title}"`,
      `description: "${t.desc}"`,
      'status: "stable"',
      `steps: [${t.steps.map((x) => `"${x}"`).join(', ')}]`,
      'sources:',
      '  - id: "mitre-attack-enterprise"',
      '    resource: "https://attack.mitre.org/"',
      '    title: "MITRE ATT&CK Enterprise Matrix"',
      '    author: "process:mitre-cti"',
      'verified:',
      '  - by: "human:secops-detection-lead"',
      '    at: "2026-07-31T00:00:00Z"',
    ], [
      `# ${t.title}`,
      '',
      t.desc,
      '',
      '## Episode / Tour Sequence',
      ...t.steps.map((s, idx) => `${idx + 1}. [[${s}]]`),
    ]);
  }
}

// ============================================================================
// 4. Classical Mythology Graph (Bulfinch's Mythology — Pure Public Domain)
// ============================================================================
function buildClassicalMythology() {
  const c = 'classical-mythology';
  rmSync(join(CORPORA, c), { recursive: true, force: true });

  const gutenbergSource = [
    'sources:',
    '  - id: "gutenberg-4928"',
    '    resource: "https://www.gutenberg.org/ebooks/4928"',
    '    title: "Bulfinch\'s Mythology: The Age of Fable (1855, Public Domain)"',
    '    author: "human:thomas-bulfinch"',
  ];

  const nodes = [
    // Deities
    { id: 'zeus', dir: 'deities', type: 'Deity', title: 'Zeus (Jupiter)', desc: 'King of the Olympian gods, ruler of Mount Olympus, and god of the sky, lightning, thunder, law, and order.', links: ['hera', 'athena', 'apollo', 'artemis', 'hermes', 'heracles', 'perseus', 'mount-olympus', 'aegis', 'trojan-war', 'tour-olympian-interventions-and-quests'] },
    { id: 'hera', dir: 'deities', type: 'Deity', title: 'Hera (Juno)', desc: 'Queen of the Olympian gods, goddess of marriage, women, childbirth, and family, and sister-wife of Zeus.', contrasts_with: ['heracles'], links: ['zeus', 'mount-olympus', 'heracles', 'jason', 'trojan-war', 'twelve-labors-of-heracles'] },
    { id: 'poseidon', dir: 'deities', type: 'Deity', title: 'Poseidon (Neptune)', desc: 'Olympian god of the sea, storms, earthquakes, and horses; brother of Zeus and Hades.', contrasts_with: ['athena', 'odysseus'], links: ['zeus', 'hades', 'athena', 'odysseus', 'odyssey', 'trojan-war', 'mount-olympus'] },
    { id: 'hades', dir: 'deities', type: 'Deity', title: 'Hades (Pluto)', desc: 'Lord of the Underworld and ruler of the dead; brother of Zeus and Poseidon.', contrasts_with: ['zeus'], links: ['zeus', 'poseidon', 'underworld', 'heracles', 'twelve-labors-of-heracles', 'hermes'] },
    { id: 'athena', dir: 'deities', type: 'Deity', title: 'Athena (Minerva)', desc: 'Virgin goddess of wisdom, handicraft, and strategic warfare, sprung fully armed from the forehead of Zeus.', parent: 'zeus', links: ['zeus', 'poseidon', 'odysseus', 'perseus', 'jason', 'aegis', 'trojan-war', 'odyssey', 'quest-for-the-golden-fleece', 'mount-olympus'] },
    { id: 'apollo', dir: 'deities', type: 'Deity', title: 'Apollo', desc: 'Olympian god of music, prophecy, truth, healing, the sun, and archery; twin brother of Artemis and patron of Delphi.', parent: 'zeus', links: ['zeus', 'artemis', 'delphi', 'achilles', 'trojan-war', 'troy', 'mount-olympus'] },
    { id: 'artemis', dir: 'deities', type: 'Deity', title: 'Artemis (Diana)', desc: 'Olympian goddess of the hunt, the wilderness, wild animals, and the moon; twin sister of Apollo.', parent: 'zeus', links: ['zeus', 'apollo', 'heracles', 'twelve-labors-of-heracles', 'trojan-war', 'mount-olympus'] },
    { id: 'hermes', dir: 'deities', type: 'Deity', title: 'Hermes (Mercury)', desc: 'Herald and messenger of the Olympian gods, guide of souls to the Underworld (Psychopompos), and patron of travelers.', parent: 'zeus', links: ['zeus', 'hades', 'perseus', 'odysseus', 'underworld', 'odyssey', 'mount-olympus'] },
    // Heroes
    { id: 'odysseus', dir: 'heroes', type: 'Hero', title: 'Odysseus (Ulysses)', desc: 'King of Ithaca renowned for his intellect, cunning, the Trojan Horse stratagem, and his ten-year homeward voyage.', contrasts_with: ['achilles', 'poseidon'], links: ['athena', 'poseidon', 'hermes', 'achilles', 'trojan-war', 'odyssey', 'troy', 'ithaca', 'tour-wrath-and-homecoming-iliad-odyssey'] },
    { id: 'achilles', dir: 'heroes', type: 'Hero', title: 'Achilles', desc: 'Greatest warrior of the Achaeans in the Trojan War, son of Peleus and the sea-nymph Thetis, central figure of Homer\'s Iliad.', contrasts_with: ['odysseus', 'apollo'], links: ['apollo', 'odysseus', 'trojan-war', 'troy'] },
    { id: 'heracles', dir: 'heroes', type: 'Hero', title: 'Heracles (Hercules)', desc: 'Divine hero, son of Zeus and Alcmene, famed for his extraordinary strength and the completion of the Twelve Labors.', parent: 'zeus', links: ['zeus', 'hera', 'athena', 'hades', 'jason', 'twelve-labors-of-heracles', 'quest-for-the-golden-fleece', 'underworld'] },
    { id: 'perseus', dir: 'heroes', type: 'Hero', title: 'Perseus', desc: 'Legendary founder of Mycenae and slayer of the Gorgon Medusa, aided by Athena and Hermes.', parent: 'zeus', links: ['zeus', 'athena', 'hermes', 'aegis'] },
    { id: 'jason', dir: 'heroes', type: 'Hero', title: 'Jason', desc: 'Leader of the Argonauts on the voyage of the Argo to recover the Golden Fleece from Colchis.', links: ['hera', 'athena', 'heracles', 'quest-for-the-golden-fleece', 'golden-fleece'] },
    // Places
    { id: 'mount-olympus', dir: 'places', type: 'Place', title: 'Mount Olympus', desc: 'Highest mountain in Greece and throne of the Twelve Olympian deities ruled by Zeus and Hera.', links: ['zeus', 'hera', 'poseidon', 'athena', 'apollo', 'artemis', 'hermes'] },
    { id: 'underworld', dir: 'places', type: 'Place', title: 'The Underworld (Hades)', desc: 'Realm of the dead bounded by the rivers Styx and Acheron, ruled by Hades and Persephone.', contrasts_with: ['mount-olympus'], links: ['hades', 'hermes', 'heracles', 'odysseus', 'odyssey', 'twelve-labors-of-heracles'] },
    { id: 'troy', dir: 'places', type: 'Place', title: 'Troy (Ilium)', desc: 'Ancient fortified city in Anatolia besieged by the Achaeans during the ten-year Trojan War.', links: ['trojan-war', 'achilles', 'odysseus', 'apollo', 'poseidon', 'athena'] },
    { id: 'delphi', dir: 'places', type: 'Place', title: 'Oracle of Delphi', desc: 'Sacred precinct on Mount Parnassus where the Pythia delivered prophecies inspired by Apollo.', links: ['apollo', 'heracles', 'twelve-labors-of-heracles', 'odysseus'] },
    { id: 'ithaca', dir: 'places', type: 'Place', title: 'Ithaca', desc: 'Ionian island kingdom of Odysseus, Penelope, and Telemachus, destination of the Odyssey.', links: ['odysseus', 'odyssey', 'athena'] },
    // Events / Quests & Artifacts
    { id: 'trojan-war', dir: 'quests', type: 'Quest', title: 'The Trojan War', desc: 'Ten-year expedition of the Achaean coalition against the city of Troy, culminating in Odysseus\'s Trojan Horse.', links: ['troy', 'achilles', 'odysseus', 'zeus', 'hera', 'athena', 'apollo', 'poseidon', 'odyssey'] },
    { id: 'odyssey', dir: 'quests', type: 'Quest', title: 'The Odyssey (Voyage of Odysseus)', desc: 'Ten-year perilous return journey of Odysseus from the fall of Troy back to Ithaca.', prerequisite: ['trojan-war'], links: ['odysseus', 'ithaca', 'troy', 'trojan-war', 'athena', 'poseidon', 'hermes', 'underworld'] },
    { id: 'twelve-labors-of-heracles', dir: 'quests', type: 'Quest', title: 'The Twelve Labors of Heracles', desc: 'Series of twelve penitential feats imposed by King Eurystheus upon Heracles under the influence of Hera.', links: ['heracles', 'hera', 'zeus', 'athena', 'hades', 'artemis', 'delphi', 'underworld'] },
    { id: 'quest-for-the-golden-fleece', dir: 'quests', type: 'Quest', title: 'Quest of the Argonauts for the Golden Fleece', desc: 'Maritime expedition led by Jason aboard the Argo to Colchis to retrieve the Golden Fleece.', links: ['jason', 'heracles', 'hera', 'athena', 'golden-fleece'] },
    { id: 'golden-fleece', dir: 'artifacts', type: 'Artifact', title: 'The Golden Fleece', desc: 'Fleece of the gold-haired winged ram Chrysomallus, symbol of kingship and authority sought by Jason and the Argonauts.', links: ['jason', 'quest-for-the-golden-fleece', 'zeus', 'hera'] },
    { id: 'aegis', dir: 'artifacts', type: 'Artifact', title: 'The Aegis', desc: 'Divine shield or breastplate borne by Zeus and Athena, mounted with the head of the Gorgon Medusa given by Perseus.', links: ['zeus', 'athena', 'perseus'] },
  ];

  for (const n of nodes) {
    const fm = [
      `type: "${n.type}"`,
      `title: "${n.title}"`,
      `description: "${n.desc}"`,
      'resource: "https://www.gutenberg.org/ebooks/4928"',
      'status: "stable"',
    ];
    if (n.parent) fm.push(`parent: "${n.parent}"`);
    if (n.prerequisite) fm.push(`prerequisite: [${n.prerequisite.map((x) => `"${x}"`).join(', ')}]`);
    if (n.contrasts_with) fm.push(`contrasts_with: [${n.contrasts_with.map((x) => `"${x}"`).join(', ')}]`);
    fm.push(
      `tags: ["mythology", "${n.dir}", "public-domain"]`,
      ...gutenbergSource,
      'verified:',
      '  - by: "human:classical-corpus-curator"',
      '    at: "2026-07-31T00:00:00Z"',
    );
    writeConcept(c, `${n.dir}/${n.id}.md`, fm, [
      `# ${n.title}`,
      '',
      n.desc,
      '',
      '## Mythological Relationships',
      ...n.links.map((l) => `- [[${l}]]`),
    ]);
  }

  const mythTours = [
    {
      id: 'tour-wrath-and-homecoming-iliad-odyssey',
      title: 'Tour: Wrath and Homecoming — Contrast of Achilles and Odysseus',
      desc: 'Follows the twin Homeric arcs from Mount Olympus and the siege of Troy (Achilles vs. Apollo) through the ten-year Odyssey (Odysseus trapped between Poseidon\'s wrath and Athena\'s wisdom) to Ithaca.',
      steps: ['mount-olympus', 'trojan-war', 'troy', 'achilles', 'apollo', 'odysseus', 'athena', 'poseidon', 'odyssey', 'underworld', 'ithaca'],
    },
    {
      id: 'tour-olympian-interventions-and-quests',
      title: 'Tour: Divine Patronage, Relics, and the Great Heroic Quests',
      desc: 'Traces how Zeus, Hera, Athena, and Hermes intervene across the quests of Perseus (The Aegis), Heracles (The Twelve Labors), and Jason (The Golden Fleece).',
      steps: ['zeus', 'hera', 'perseus', 'aegis', 'heracles', 'twelve-labors-of-heracles', 'delphi', 'hades', 'jason', 'quest-for-the-golden-fleece', 'golden-fleece'],
    },
  ];

  for (const t of mythTours) {
    writeConcept(c, `tours/${t.id}.md`, [
      'type: "Tour"',
      `title: "${t.title}"`,
      `description: "${t.desc}"`,
      'status: "stable"',
      `steps: [${t.steps.map((x) => `"${x}"`).join(', ')}]`,
      ...gutenbergSource,
      'verified:',
      '  - by: "human:classical-corpus-curator"',
      '    at: "2026-07-31T00:00:00Z"',
    ], [
      `# ${t.title}`,
      '',
      t.desc,
      '',
      '## Episode / Tour Sequence',
      ...t.steps.map((s, idx) => `${idx + 1}. [[${s}]]`),
    ]);
  }
}

// ============================================================================
// 5. Spaceflight Mishaps & Systems Engineering (17 U.S.C. § 105 NASA Public Domain)
// ============================================================================
function buildSpaceflightMishaps() {
  const c = 'spaceflight-mishaps';
  rmSync(join(CORPORA, c), { recursive: true, force: true });

  const nasaSource = [
    'sources:',
    '  - id: "nasa-llis-sp-6105"',
    '    resource: "https://llis.nasa.gov/"',
    '    title: "NASA Lessons Learned Information System (LLIS) & NASA/SP-2016-6105 Systems Engineering Handbook"',
    '    author: "process:nasa-mishap-investigation-board"',
  ];

  const items = [
    // Missions (8)
    { id: 'apollo-1', dir: 'missions', type: 'Mission', title: 'Apollo 1 (AS-204 Plugs-Out Test)', desc: 'January 1967 launchpad test in which a cabin flash fire in a high-pressure 100% oxygen atmosphere claimed the lives of Gus Grissom, Ed White, and Roger Chaffee.', status: 'stable', triggered_by: ['high-pressure-pure-oxygen-flash-fire', 'command-module-cabin-wiring'], links: ['command-module-cabin-wiring', 'high-pressure-pure-oxygen-flash-fire', 'go-fever-schedule-pressure', 'inadequate-flight-like-test-as-you-fly', 'nitrogen-oxygen-cabin-atmosphere-redesign', 'apollo-13'] },
    { id: 'apollo-13', dir: 'missions', type: 'Mission', title: 'Apollo 13 (Service Module Cryogenic Oxygen Tank No. 2 Rupture)', desc: 'April 1970 lunar mission aborted after an internal electrical short in Cryogenic Oxygen Tank 2 caused a tank rupture 321,860 km from Earth, followed by successful Lunar Module lifeboat return.', status: 'stable', triggered_by: ['cryo-tank-teflon-ignition', 'apollo-eps-oxygen-cryo'], links: ['apollo-eps-oxygen-cryo', 'cryo-tank-teflon-ignition', 'apollo-13-cryo-stir-current-spike', 'inadequate-flight-like-test-as-you-fly', 'apollo-1', 'probabilistic-risk-assessment-cutset-sql'] },
    { id: 'sts-51l-challenger', dir: 'missions', type: 'Mission', title: 'STS-51-L Space Shuttle Challenger Mishap', desc: 'January 1986 loss of Challenger 73 seconds into flight caused by cold-temperature failure of the right Solid Rocket Booster aft field-joint O-ring seals.', status: 'stable', triggered_by: ['viton-oring-low-temp-extrusion-blowby', 'srb-field-joint-oring'], links: ['srb-field-joint-oring', 'viton-oring-low-temp-extrusion-blowby', 'sts-51l-t-plus-59s-plume-flicker', 'normalization-of-deviance', 'go-fever-schedule-pressure', 'suppressed-dissenting-engineering-opinion', 'captured-feature-triple-oring-joint-heater', 'sts-107-columbia', 'oring-erosion-thermal-margin-sql', 'tour-normalization-of-deviance-challenger-columbia'] },
    { id: 'sts-107-columbia', dir: 'missions', type: 'Mission', title: 'STS-107 Space Shuttle Columbia Mishap', desc: 'February 2003 loss of Columbia during atmospheric reentry after External Tank left bipod ramp foam struck and breached Wing Leading Edge Reinforced Carbon-Carbon Panel 8 at launch.', status: 'stable', triggered_by: ['rcc-leading-edge-kinetic-breach', 'external-tank-bipod-foam'], links: ['orbiter-tps-reinforced-carbon', 'external-tank-bipod-foam', 'rcc-leading-edge-kinetic-breach', 'sts-107-reentry-left-wing-thermocouple-drop', 'normalization-of-deviance', 'suppressed-dissenting-engineering-opinion', 'on-orbit-tps-laser-boom-inspection', 'independent-technical-authority-ita', 'sts-51l-challenger'] },
    { id: 'mars-climate-orbiter', dir: 'missions', type: 'Mission', title: 'Mars Climate Orbiter (MCO) Navigation Loss', desc: 'September 1999 loss of spacecraft during Mars orbital insertion when ground software output angular momentum impulse in pound-force seconds instead of contracted newton-seconds.', status: 'stable', triggered_by: ['imperial-metric-impulse-unit-mismatch', 'mco-attitude-control-thrusters'], links: ['mco-attitude-control-thrusters', 'imperial-metric-impulse-unit-mismatch', 'mco-trajectory-correction-maneuver-residual', 'siloed-interface-control-documents', 'strict-si-unit-icd-automated-verification', 'mars-polar-lander', 'trajectory-navigation-residual-divergence-sql', 'tour-invisible-math-and-metrology-bugs-in-deep-space'] },
    { id: 'mars-polar-lander', dir: 'missions', type: 'Mission', title: 'Mars Polar Lander (MPL) Descent Engine Cutoff', desc: 'December 1999 loss of lander during Mars descent caused by landing-leg deployment transient Hall-effect sensor spikes falsely triggering engine shutdown 40 meters above the surface.', status: 'stable', triggered_by: ['premature-hall-effect-touchdown-cutoff'], links: ['premature-hall-effect-touchdown-cutoff', 'inadequate-flight-like-test-as-you-fly', 'mars-climate-orbiter', 'genesis-sample-return', 'strict-si-unit-icd-automated-verification'] },
    { id: 'genesis-sample-return', dir: 'missions', type: 'Mission', title: 'Genesis Solar Wind Sample Return Capsule Hard Landing', desc: 'September 2004 drogue parachute deployment failure in Utah caused by gravity-switch deceleration sensors mounted upside-down due to inverted CAD drawing specifications.', status: 'stable', triggered_by: ['inverted-g-switch-sensor-installation', 'genesis-gravity-switch-avionics'], links: ['genesis-gravity-switch-avionics', 'inverted-g-switch-sensor-installation', 'inadequate-flight-like-test-as-you-fly', 'siloed-interface-control-documents', 'mars-polar-lander'] },
    { id: 'hst-servicing-mission-1', dir: 'missions', type: 'Mission', title: 'Hubble Space Telescope (HST) Primary Mirror Aberration & SM1 Recovery', desc: 'Discovery after 1990 launch of 2.2-micron spherical aberration on the 2.4-meter primary mirror and subsequent 1993 STS-61 on-orbit optical correction via COSTAR and WFPC2.', status: 'stable', triggered_by: ['reflective-null-corrector-spacing-error', 'hst-ritchey-chretien-primary-mirror'], links: ['hst-ritchey-chretien-primary-mirror', 'reflective-null-corrector-spacing-error', 'hst-first-light-spherical-psf-halo', 'single-vendor-metrology-blindspot', 'costar-corrective-axial-optics'] },

    // Subsystems (8)
    { id: 'command-module-cabin-wiring', dir: 'subsystems', type: 'Subsystem', title: 'Block I Command Module Environmental Control & PTFE Cabin Wiring', desc: 'Early Block I Apollo cabin wiring bundles and 16.7 psi pure-oxygen pressurization architecture prior to Block II fireproofing.', status: 'deprecated', stale_after: '1967-04-01', links: ['apollo-1', 'high-pressure-pure-oxygen-flash-fire', 'nitrogen-oxygen-cabin-atmosphere-redesign'] },
    { id: 'apollo-eps-oxygen-cryo', dir: 'subsystems', type: 'Subsystem', title: 'Service Module Sector 4 Cryogenic Oxygen Tank & Heater Assembly', desc: 'Supercritical cryogenic oxygen vessel equipped with 28V/65V thermostatic heater switches and stirring fans feeding Apollo fuel cells.', status: 'stable', links: ['apollo-13', 'cryo-tank-teflon-ignition', 'apollo-13-cryo-stir-current-spike'] },
    { id: 'srb-field-joint-oring', dir: 'subsystems', type: 'Subsystem', title: 'Solid Rocket Booster (SRB) Tang-and-Clevis Field Joint & Viton O-Rings', desc: 'Original two-O-ring tang-and-clevis steel case joint subject to dynamic joint rotation and zinc-chromate putty blow-holes under ignition transient.', status: 'deprecated', stale_after: '1986-06-01', links: ['sts-51l-challenger', 'viton-oring-low-temp-extrusion-blowby', 'captured-feature-triple-oring-joint-heater', 'oring-erosion-thermal-margin-sql'] },
    { id: 'orbiter-tps-reinforced-carbon', dir: 'subsystems', type: 'Subsystem', title: 'Orbiter Thermal Protection System (TPS) Wing Leading Edge RCC Panels', desc: '22 Reinforced Carbon-Carbon (RCC) panels per wing designed to withstand 1,650 °C reentry plasma stagnation temperatures but brittle under high-energy kinetic impact.', status: 'stable', links: ['sts-107-columbia', 'rcc-leading-edge-kinetic-breach', 'external-tank-bipod-foam', 'on-orbit-tps-laser-boom-inspection'] },
    { id: 'external-tank-bipod-foam', dir: 'subsystems', type: 'Subsystem', title: 'External Tank BX-250 Forward Bipod Ramp Cryogenic Insulation Foam', desc: 'Hand-sprayed polyisocyanurate foam insulating the forward orbiter-to-tank attachment fitting against cryogenic ice formation.', status: 'deprecated', stale_after: '2003-08-01', links: ['sts-107-columbia', 'rcc-leading-edge-kinetic-breach', 'orbiter-tps-reinforced-carbon', 'normalization-of-deviance'] },
    { id: 'mco-attitude-control-thrusters', dir: 'subsystems', type: 'Subsystem', title: 'MCO Reaction Wheel Desaturation & Hydrazine Attitude Control Subsystem', desc: 'Asymmetric solar-array spacecraft attitude control system requiring frequent reaction-wheel angular momentum desaturation burns monitored via ground SM_FORCES software.', status: 'stable', links: ['mars-climate-orbiter', 'imperial-metric-impulse-unit-mismatch', 'mco-trajectory-correction-maneuver-residual', 'trajectory-navigation-residual-divergence-sql'] },
    { id: 'hst-ritchey-chretien-primary-mirror', dir: 'subsystems', type: 'Subsystem', title: 'HST 2.4-Meter Hyperbolic Ritchey-Chrétien Primary Mirror', desc: 'Ultra-low-expansion glass primary mirror ground to an unintended conic constant due to a miscalibrated reflective null corrector during figuring.', status: 'stable', links: ['hst-servicing-mission-1', 'reflective-null-corrector-spacing-error', 'hst-first-light-spherical-psf-halo', 'costar-corrective-axial-optics'] },
    { id: 'genesis-gravity-switch-avionics', dir: 'subsystems', type: 'Subsystem', title: 'Genesis Sample Return Capsule G-Switch Deceleration Avionics', desc: 'Redundant mechanical mass-on-spring deceleration switches designed to sense atmospheric reentry braking and trigger mortar deployment of the drogue parachute.', status: 'stable', links: ['genesis-sample-return', 'inverted-g-switch-sensor-installation', 'inadequate-flight-like-test-as-you-fly'] },

    // Failure Modes (8)
    { id: 'high-pressure-pure-oxygen-flash-fire', dir: 'failure-modes', type: 'Failure Mode', title: '16.7 psi Pure-Oxygen Cabin Flash Fire Propagation', desc: 'Rapid deflagration of Velcro, nylon netting, and polyurethane foam in a 100% oxygen atmosphere pressurized above sea-level pressure, preventing inward-opening hatch egress.', status: 'stable', triggered_by: ['command-module-cabin-wiring', 'go-fever-schedule-pressure'], links: ['apollo-1', 'command-module-cabin-wiring', 'nitrogen-oxygen-cabin-atmosphere-redesign'] },
    { id: 'cryo-tank-teflon-ignition', dir: 'failure-modes', type: 'Failure Mode', title: 'Submerged Cryo-Heater Detent Switch Welding & PTFE Insulation Ignition', desc: 'Thermostatic switches rated for 28V DC welded closed during a 65V ground detanking procedure, baking Tank 2 above 500 °C and stripping Teflon fan-wire insulation.', status: 'stable', triggered_by: ['inadequate-flight-like-test-as-you-fly'], links: ['apollo-13', 'apollo-eps-oxygen-cryo', 'apollo-13-cryo-stir-current-spike', 'probabilistic-risk-assessment-cutset-sql'] },
    { id: 'viton-oring-low-temp-extrusion-blowby', dir: 'failure-modes', type: 'Failure Mode', title: 'Viton Fluorocarbon O-Ring Low-Temperature Glass-Transition Resiliency Loss', desc: 'At 28 °F (-2.2 °C), Viton O-ring elastomer hardened and failed to extrude into the widening tang-and-clevis gap within the 600 ms ignition pressure rise, allowing 3,000 °C gas blow-by.', status: 'stable', triggered_by: ['srb-field-joint-oring', 'normalization-of-deviance'], links: ['sts-51l-challenger', 'srb-field-joint-oring', 'sts-51l-t-plus-59s-plume-flicker', 'captured-feature-triple-oring-joint-heater', 'oring-erosion-thermal-margin-sql'] },
    { id: 'rcc-leading-edge-kinetic-breach', dir: 'failure-modes', type: 'Failure Mode', title: 'Wing Leading Edge RCC Panel 8 Kinetic Impact Breach & Spar Burn-Through', desc: 'A 0.76 kg foam suitcase shed at Mach 2.46 struck the lower lip of RCC Panel 8 at 850 km/h, opening a breach through which superheated reentry plasma melted the aluminum wing spar.', status: 'stable', triggered_by: ['external-tank-bipod-foam', 'normalization-of-deviance'], links: ['sts-107-columbia', 'orbiter-tps-reinforced-carbon', 'external-tank-bipod-foam', 'sts-107-reentry-left-wing-thermocouple-drop', 'on-orbit-tps-laser-boom-inspection'] },
    { id: 'imperial-metric-impulse-unit-mismatch', dir: 'failure-modes', type: 'Failure Mode', title: '4.45x lbf·s vs. N·s Small-Forces Impulse Unit Conversion Mismatch', desc: 'Ground software file AMD output thruster impulse in English pound-force seconds while navigation software expected SI newton-seconds, biasing periapsis altitude down to 57 km.', status: 'stable', triggered_by: ['siloed-interface-control-documents'], links: ['mars-climate-orbiter', 'mco-attitude-control-thrusters', 'mco-trajectory-correction-maneuver-residual', 'strict-si-unit-icd-automated-verification', 'trajectory-navigation-residual-divergence-sql'] },
    { id: 'premature-hall-effect-touchdown-cutoff', dir: 'failure-modes', type: 'Failure Mode', title: 'Unfiltered Hall-Effect Touchdown Sensor Latching During Leg Deployment', desc: 'Flight control software failed to flush latched Hall-effect touchdown bits generated when landing legs unfolded at 40 m altitude, cutting descent engines in midair.', status: 'stable', triggered_by: ['inadequate-flight-like-test-as-you-fly'], links: ['mars-polar-lander', 'inadequate-flight-like-test-as-you-fly', 'strict-si-unit-icd-automated-verification'] },
    { id: 'inverted-g-switch-sensor-installation', dir: 'failure-modes', type: 'Failure Mode', title: '180-Degree Inverted Deceleration G-Switch Orientation', desc: 'Internal sensing masses were oriented away from the reentry deceleration vector due to ambiguous mechanical drawing symmetry, preventing contact closure during atmospheric entry.', status: 'stable', triggered_by: ['inadequate-flight-like-test-as-you-fly', 'siloed-interface-control-documents'], links: ['genesis-sample-return', 'genesis-gravity-switch-avionics', 'inadequate-flight-like-test-as-you-fly'] },
    { id: 'reflective-null-corrector-spacing-error', dir: 'failure-modes', type: 'Failure Mode', title: '1.3-mm Reflective Null Corrector Field Lens Misspacing', desc: 'Laser metering rod touched an anodized aluminum cap whose anti-reflective paint had flaked off, causing the field lens to be shimmed 1.3 mm too far and grinding the mirror flat at the edges.', status: 'stable', triggered_by: ['single-vendor-metrology-blindspot'], links: ['hst-servicing-mission-1', 'hst-ritchey-chretien-primary-mirror', 'hst-first-light-spherical-psf-halo', 'costar-corrective-axial-optics'] },

    // Telemetry Anomalies (5)
    { id: 'apollo-13-cryo-stir-current-spike', dir: 'telemetry', type: 'Telemetry Anomaly', title: 'Apollo 13 55:54:53 GET Main Bus B Undervoltage & O2 Tank 2 Pressure Drop', desc: 'Simultaneous 21-amp current spike during routine cryo fan stir followed 95 seconds later by Tank 2 pressure peaking at 1,008 psi and dropping to zero alongside Main Bus B undervoltage.', status: 'stable', triggered_by: ['cryo-tank-teflon-ignition'], links: ['apollo-13', 'apollo-eps-oxygen-cryo', 'cryo-tank-teflon-ignition'] },
    { id: 'sts-51l-t-plus-59s-plume-flicker', dir: 'telemetry', type: 'Telemetry Anomaly', title: 'STS-51-L T+0.678s Black Smoke Puff & T+58.788s Aft SRB Flame Plume', desc: 'Tracking camera imagery showing grey/black zinc-oxide smoke puffs at the right SRB aft field joint at liftoff, followed by a growing luminous plume after extreme upper-atmosphere wind shear.', status: 'stable', triggered_by: ['viton-oring-low-temp-extrusion-blowby'], links: ['sts-51l-challenger', 'viton-oring-low-temp-extrusion-blowby', 'oring-erosion-thermal-margin-sql'] },
    { id: 'sts-107-reentry-left-wing-thermocouple-drop', dir: 'telemetry', type: 'Telemetry Anomaly', title: 'STS-107 Entry Interface +270s Left Wing Strain Gauge & Thermocouple Cascade', desc: 'Progressive off-scale-low failures of four hydraulic return line thermocouples in the left wheel well followed by roll-trim aileron saturation and Modular Auxiliary Data System (MADS) sensor loss.', status: 'stable', triggered_by: ['rcc-leading-edge-kinetic-breach'], links: ['sts-107-columbia', 'rcc-leading-edge-kinetic-breach', 'orbiter-tps-reinforced-carbon'] },
    { id: 'mco-trajectory-correction-maneuver-residual', dir: 'telemetry', type: 'Telemetry Anomaly', title: 'MCO Two-Way Doppler Residual Drift Across TCM-1 Through TCM-4', desc: 'Persistent unmodeled trajectory drift requiring four Trajectory Correction Maneuvers as small-forces angular momentum desaturation files mismatched DSN Doppler tracking by a factor of 4.45.', status: 'stable', triggered_by: ['imperial-metric-impulse-unit-mismatch'], links: ['mars-climate-orbiter', 'imperial-metric-impulse-unit-mismatch', 'trajectory-navigation-residual-divergence-sql'] },
    { id: 'hst-first-light-spherical-psf-halo', dir: 'telemetry', type: 'Telemetry Anomaly', title: 'HST First-Light Point Spread Function (PSF) 1.5-Arcsecond Spherical Halo', desc: 'WF/PC-1 focus sweep telemetry showing no single focal plane could concentrate more than 15% of starlight within a 0.1-arcsecond core, vs. the 70% design specification.', status: 'stable', triggered_by: ['reflective-null-corrector-spacing-error'], links: ['hst-servicing-mission-1', 'reflective-null-corrector-spacing-error', 'costar-corrective-axial-optics'] },

    // Organizational & Human Factors (6)
    { id: 'normalization-of-deviance', dir: 'organizational-factors', type: 'Organizational Factor', title: 'Normalization of Deviance (Vaughan Sociological Model)', desc: 'Gradual institutional process whereby repeated anomalous flight events (O-ring char/erosion on 15 prior flights; bipod foam shedding on 7 prior flights) are reclassified as acceptable bounded risk.', status: 'stable', links: ['sts-51l-challenger', 'sts-107-columbia', 'viton-oring-low-temp-extrusion-blowby', 'rcc-leading-edge-kinetic-breach', 'independent-technical-authority-ita', 'oring-erosion-thermal-margin-sql', 'tour-normalization-of-deviance-challenger-columbia'] },
    { id: 'go-fever-schedule-pressure', dir: 'organizational-factors', type: 'Organizational Factor', title: 'Operational Schedule Pressure ("Go Fever") & Manifest Compression', desc: 'Informal organizational compulsion to meet ambitious launch manifests or milestone deadlines, shifting the burden of proof from proving it is safe to fly to proving it is unsafe.', status: 'stable', links: ['apollo-1', 'sts-51l-challenger', 'sts-107-columbia', 'suppressed-dissenting-engineering-opinion', 'independent-technical-authority-ita'] },
    { id: 'suppressed-dissenting-engineering-opinion', dir: 'organizational-factors', type: 'Organizational Factor', title: 'Communication Filtering of Dissenting Engineering Judgments', desc: 'Management hierarchy dynamics in which contractor or working-level engineering objections (e.g., Thiokol low-temperature teleconference; STS-107 DoD on-orbit imaging requests) fail to reach flight readiness decision-makers.', status: 'stable', links: ['sts-51l-challenger', 'sts-107-columbia', 'normalization-of-deviance', 'go-fever-schedule-pressure', 'independent-technical-authority-ita'] },
    { id: 'siloed-interface-control-documents', dir: 'organizational-factors', type: 'Organizational Factor', title: 'Siloed Software/Hardware Interface Control Document (ICD) Governance', desc: 'Lack of end-to-end automated verification across contractor-agency interface boundaries, allowing unit mismatches or inverted CAD coordinate conventions to bypass peer review.', status: 'stable', links: ['mars-climate-orbiter', 'genesis-sample-return', 'imperial-metric-impulse-unit-mismatch', 'inverted-g-switch-sensor-installation', 'strict-si-unit-icd-automated-verification', 'tour-invisible-math-and-metrology-bugs-in-deep-space'] },
    { id: 'inadequate-flight-like-test-as-you-fly', dir: 'organizational-factors', type: 'Organizational Factor', title: 'Violation of "Test as You Fly, Fly as You Test" Principle', desc: 'Omitting integrated system tests after hardware reworks, voltage changes, or polarity-sensitive assembly (e.g., MPL leg-deployment test re-run omission; Genesis pre-launch centrifuge test waiver).', status: 'stable', links: ['apollo-1', 'apollo-13', 'mars-polar-lander', 'genesis-sample-return', 'cryo-tank-teflon-ignition', 'premature-hall-effect-touchdown-cutoff', 'inverted-g-switch-sensor-installation'] },
    { id: 'single-vendor-metrology-blindspot', dir: 'organizational-factors', type: 'Organizational Factor', title: 'Single-Instrument Metrology Reliance & Ignored Refractive Null Discrepancy', desc: 'Relying solely on a single custom reflective null corrector while dismissing conflicting spherical aberration indications from a lower-precision refractive null corrector without independent verification.', status: 'stable', links: ['hst-servicing-mission-1', 'reflective-null-corrector-spacing-error', 'costar-corrective-axial-optics', 'independent-technical-authority-ita'] },

    // Remediations (6)
    { id: 'nitrogen-oxygen-cabin-atmosphere-redesign', dir: 'remediations', type: 'Remediation', title: 'Block II 60/40 N2-O2 Launch Pad Atmosphere & Outward-Opening Quick-Release Hatch', desc: 'Post-Apollo 1 redesign replacing pure oxygen on the pad with a 60% nitrogen / 40% oxygen mixture, Beta-cloth fireproof insulation, and a 5-second outward-opening unified hatch.', status: 'stable', mitigates: ['high-pressure-pure-oxygen-flash-fire', 'command-module-cabin-wiring'], supersedes: ['command-module-cabin-wiring'], links: ['apollo-1', 'command-module-cabin-wiring', 'high-pressure-pure-oxygen-flash-fire'] },
    { id: 'captured-feature-triple-oring-joint-heater', dir: 'remediations', type: 'Remediation', title: 'Redesigned Solid Rocket Motor (RSRM) Capture-Feature Tang, Third O-Ring & Joint Heaters', desc: 'Post-Challenger SRB field-joint redesign adding an interference-fit capture tang to prevent joint rotation, a third O-ring, and thermostatically controlled 75 °F joint strip heaters.', status: 'stable', mitigates: ['viton-oring-low-temp-extrusion-blowby', 'srb-field-joint-oring'], supersedes: ['srb-field-joint-oring'], links: ['sts-51l-challenger', 'srb-field-joint-oring', 'viton-oring-low-temp-extrusion-blowby', 'oring-erosion-thermal-margin-sql'] },
    { id: 'on-orbit-tps-laser-boom-inspection', dir: 'remediations', type: 'Remediation', title: 'Orbiter Boom Sensor System (OBSS), Bipod Ramp Elimination & Rendezvous Pitch Maneuver', desc: 'Post-Columbia removal of External Tank bipod foam ramps (replaced by electric rod heaters), mandatory Flight Day 2 OBSS laser/camera wing leading-edge inspection, and ISS R-Bar pitch flip.', status: 'stable', mitigates: ['rcc-leading-edge-kinetic-breach', 'external-tank-bipod-foam'], supersedes: ['external-tank-bipod-foam'], links: ['sts-107-columbia', 'orbiter-tps-reinforced-carbon', 'external-tank-bipod-foam', 'rcc-leading-edge-kinetic-breach'] },
    { id: 'strict-si-unit-icd-automated-verification', dir: 'remediations', type: 'Remediation', title: 'Mandatory SI Metric Interface Typing & Hardware-in-the-Loop End-to-End Polarity Checks', desc: 'Enforcement of strongly typed SI physical units across flight/ground software pipelines and mandatory physical stimulus polarity tests for all guidance and landing sensors.', status: 'stable', mitigates: ['imperial-metric-impulse-unit-mismatch', 'premature-hall-effect-touchdown-cutoff', 'inverted-g-switch-sensor-installation', 'siloed-interface-control-documents'], links: ['mars-climate-orbiter', 'mars-polar-lander', 'genesis-sample-return', 'imperial-metric-impulse-unit-mismatch', 'siloed-interface-control-documents', 'trajectory-navigation-residual-divergence-sql'] },
    { id: 'costar-corrective-axial-optics', dir: 'remediations', type: 'Remediation', title: 'COSTAR Corrective Optics Space Telescope Axial Replacement & Independent Optical Cross-Checks', desc: 'Deployment of coin-sized inverse-aberration M1/M2 mirrors on STS-61 to restore diffraction-limited HST imaging, paired with mandatory dual-independent optical test paths for future flagship telescopes.', status: 'stable', mitigates: ['reflective-null-corrector-spacing-error', 'single-vendor-metrology-blindspot'], links: ['hst-servicing-mission-1', 'hst-ritchey-chretien-primary-mirror', 'reflective-null-corrector-spacing-error', 'hst-first-light-spherical-psf-halo'] },
    { id: 'independent-technical-authority-ita', dir: 'remediations', type: 'Remediation', title: 'Independent Technical Authority (ITA) & Formal Dissenting Opinion Escalation Path', desc: 'Post-CAIB governance reform funding Chief Engineer technical authorities independently of program schedule budgets and establishing non-retaliatory dissenting engineering review boards.', status: 'stable', mitigates: ['normalization-of-deviance', 'go-fever-schedule-pressure', 'suppressed-dissenting-engineering-opinion'], links: ['sts-51l-challenger', 'sts-107-columbia', 'normalization-of-deviance', 'go-fever-schedule-pressure', 'suppressed-dissenting-engineering-opinion'] },
  ];

  for (const it of items) {
    const fm = [
      `type: ${q(it.type)}`,
      `title: ${q(it.title)}`,
      `description: ${q(it.desc)}`,
      'resource: "https://llis.nasa.gov/"',
      `status: ${q(it.status)}`,
    ];
    if (it.stale_after) fm.push(`stale_after: "${it.stale_after}"`);
    if (it.triggered_by) fm.push(`triggered_by: [${it.triggered_by.map((x) => `"${x}"`).join(', ')}]`);
    if (it.mitigates) fm.push(`mitigates: [${it.mitigates.map((x) => `"${x}"`).join(', ')}]`);
    if (it.supersedes) fm.push(`supersedes: [${it.supersedes.map((x) => `"${x}"`).join(', ')}]`);
    fm.push(
      `tags: ["spaceflight", "${it.dir}", "nasa", "systems-engineering"]`,
      ...nasaSource,
      'verified:',
      '  - by: "human:aerospace-safety-panel"',
      '    at: "2026-07-31T00:00:00Z"',
    );
    writeConcept(c, `${it.dir}/${it.id}.md`, fm, [
      `# ${it.title}`,
      '',
      it.desc,
      '',
      '## Causal & Systems Engineering Links',
      ...it.links.map((l) => `- [[${l}]]`),
    ]);
  }

  // Attested Computations (3)
  const computations = [
    {
      id: 'oring-erosion-thermal-margin-sql',
      title: 'SRB Field-Joint O-Ring Thermal Distress & Erosion Logistic Regression',
      desc: 'Sanctioned post-flight engineering query correlating launch ambient temperature and leak-check stabilization pressure with primary O-ring thermal erosion depth across STS flights.',
      params: ['ambient_temp_threshold_f: "53"', 'min_safety_factor: "2.0"'],
      mitigates: ['viton-oring-low-temp-extrusion-blowby', 'normalization-of-deviance'],
      links: ['sts-51l-challenger', 'srb-field-joint-oring', 'viton-oring-low-temp-extrusion-blowby', 'sts-51l-t-plus-59s-plume-flicker', 'normalization-of-deviance', 'captured-feature-triple-oring-joint-heater'],
      sql: [
        'SELECT flight_id, ambient_temp_f, leak_check_psi, max_erosion_mils, blowby_observed',
        'FROM srb_postflight_joint_inspections',
        'WHERE ambient_temp_f < 65 OR max_erosion_mils > 0',
        'ORDER BY ambient_temp_f ASC;',
      ],
    },
    {
      id: 'trajectory-navigation-residual-divergence-sql',
      title: 'Deep-Space Doppler Navigation Residual vs. Small-Forces Impulse Audit',
      desc: 'Sanctioned flight-dynamics SQL check comparing integrated attitude-control desaturation impulse against two-way DSN Doppler residuals to flag unit-scale anomalies.',
      params: ['max_doppler_residual_hz: "0.15"', 'si_unit_scale_tolerance: "0.01"'],
      mitigates: ['imperial-metric-impulse-unit-mismatch', 'siloed-interface-control-documents'],
      links: ['mars-climate-orbiter', 'mco-attitude-control-thrusters', 'imperial-metric-impulse-unit-mismatch', 'mco-trajectory-correction-maneuver-residual', 'strict-si-unit-icd-automated-verification'],
      sql: [
        'SELECT desat_event_id, amd_reported_impulse, dsn_derived_impulse_ns,',
        '       amd_reported_impulse / NULLIF(dsn_derived_impulse_ns, 0) AS scale_ratio',
        'FROM deep_space_desaturation_audit',
        'WHERE ABS((amd_reported_impulse / NULLIF(dsn_derived_impulse_ns, 0)) - 1.0) > 0.01;',
      ],
    },
    {
      id: 'probabilistic-risk-assessment-cutset-sql',
      title: 'Spacecraft Fault-Tree Minimal Cut-Set & Single-Point Failure Audit',
      desc: 'Sanctioned Probabilistic Risk Assessment (PRA) query identifying unmitigated Crit-1 / Crit-1R failure modes lacking independent physical or procedural redundancy.',
      params: ['criticality_tier: "1"', 'max_unmitigated_cutset_prob: "1e-5"'],
      mitigates: ['cryo-tank-teflon-ignition', 'inadequate-flight-like-test-as-you-fly'],
      links: ['apollo-13', 'cryo-tank-teflon-ignition', 'inadequate-flight-like-test-as-you-fly', 'independent-technical-authority-ita'],
      sql: [
        'SELECT subsystem_id, failure_mode_id, criticality, cutset_probability, independent_barriers',
        'FROM pra_fault_tree_cutsets',
        'WHERE criticality IN (\'1\', \'1R\') AND independent_barriers < 2;',
      ],
    },
  ];

  for (const comp of computations) {
    writeConcept(c, `computations/${comp.id}.md`, [
      'type: "Attested Computation"',
      `title: "${comp.title}"`,
      `description: "${comp.desc}"`,
      'runtime: "bigquery-sql"',
      'parameters:',
      ...comp.params.map((p) => `  ${p}`),
      'executor: "process:nasa-sma-pra-engine"',
      'attester: "process:safety-mission-assurance-attester"',
      'status: "stable"',
      `mitigates: [${comp.mitigates.map((x) => `"${x}"`).join(', ')}]`,
      ...nasaSource,
      'verified:',
      '  - by: "human:aerospace-safety-panel"',
      '    at: "2026-07-31T00:00:00Z"',
    ], [
      `# ${comp.title}`,
      '',
      comp.desc,
      '',
      '## Linked Missions, Failure Modes & Remediations',
      ...comp.links.map((l) => `- [[${l}]]`),
      '',
      '```sql',
      ...comp.sql,
      '```',
    ]);
  }

  // Guided Tours (2)
  const spaceTours = [
    {
      id: 'tour-normalization-of-deviance-challenger-columbia',
      title: 'Tour: Normalization of Deviance — From Challenger O-Rings to Columbia Foam',
      desc: 'Investigative narrative tracing how repeated survivable anomalies (O-ring erosion on STS-51-L and bipod foam shedding on STS-107) became institutionally normalized until catastrophic boundary conditions were crossed.',
      steps: ['normalization-of-deviance', 'sts-51l-challenger', 'srb-field-joint-oring', 'viton-oring-low-temp-extrusion-blowby', 'sts-51l-t-plus-59s-plume-flicker', 'oring-erosion-thermal-margin-sql', 'captured-feature-triple-oring-joint-heater', 'sts-107-columbia', 'external-tank-bipod-foam', 'rcc-leading-edge-kinetic-breach', 'sts-107-reentry-left-wing-thermocouple-drop', 'suppressed-dissenting-engineering-opinion', 'independent-technical-authority-ita', 'on-orbit-tps-laser-boom-inspection'],
    },
    {
      id: 'tour-invisible-math-and-metrology-bugs-in-deep-space',
      title: 'Tour: Invisible Math, Inverted Sensors, and Metrology Flaws in Deep Space',
      desc: 'Follows how subtle interface and test omissions—a 4.45x imperial/metric mismatch on Mars Climate Orbiter, an inverted G-switch on Genesis, unushed Hall sensors on Mars Polar Lander, and a 1.3-mm paint-flake spacing error on Hubble—cascaded into major spaceflight emergencies.',
      steps: ['siloed-interface-control-documents', 'mars-climate-orbiter', 'imperial-metric-impulse-unit-mismatch', 'mco-trajectory-correction-maneuver-residual', 'trajectory-navigation-residual-divergence-sql', 'mars-polar-lander', 'premature-hall-effect-touchdown-cutoff', 'genesis-sample-return', 'inverted-g-switch-sensor-installation', 'inadequate-flight-like-test-as-you-fly', 'hst-servicing-mission-1', 'reflective-null-corrector-spacing-error', 'costar-corrective-axial-optics', 'strict-si-unit-icd-automated-verification'],
    },
  ];

  for (const t of spaceTours) {
    writeConcept(c, `tours/${t.id}.md`, [
      'type: "Tour"',
      `title: "${t.title}"`,
      `description: "${t.desc}"`,
      'status: "stable"',
      `steps: [${t.steps.map((x) => `"${x}"`).join(', ')}]`,
      ...nasaSource,
      'verified:',
      '  - by: "human:aerospace-safety-panel"',
      '    at: "2026-07-31T00:00:00Z"',
    ], [
      `# ${t.title}`,
      '',
      t.desc,
      '',
      '## Episode / Tour Sequence',
      ...t.steps.map((s, idx) => `${idx + 1}. [[${s}]]`),
    ]);
  }
}

// ============================================================================
// 6. Dialectical AI Ethics, Philosophy of Mind & Cybernetics (Public Domain / CC-BY)
// ============================================================================
function buildCyberneticsAiEthics() {
  const c = 'cybernetics-ai-ethics';
  rmSync(join(CORPORA, c), { recursive: true, force: true });

  const philSource = [
    'sources:',
    '  - id: "sep-cybernetics-ai-ethics"',
    '    resource: "https://plato.stanford.edu/entries/artificial-intelligence/"',
    '    title: "Foundational Cybernetics (Wiener 1948, Ashby 1956), Turing (1950), and Philosophy of AI"',
    '    author: "human:philosophy-and-cybernetics-canon"',
  ];

  const nodes = [
    // Foundational Principles (7)
    { id: 'negative-feedback-teleology', dir: 'principles', type: 'Foundational Principle', title: 'Negative Feedback & Teleological Purpose (Wiener–Rosenblueth–Bigelow)', desc: 'Foundational 1943/1948 cybernetic principle defining purposeful behavior as circular causal action governed by continuous error-correcting negative feedback relative to a goal state.', status: 'stable', links: ['norbert-wiener', 'law-of-requisite-variety', 'second-order-cybernetics', 'goodharts-law', 'viable-system-model-governance', 'tour-from-wiener-cybernetics-to-reward-hacking'] },
    { id: 'law-of-requisite-variety', dir: 'principles', type: 'Foundational Principle', title: 'Ashby\'s Law of Requisite Variety ("Only Variety Can Destroy Variety")', desc: 'Cybernetic theorem proving that for a regulator to maintain stability in a system facing environmental disturbances, the variety of regulator states must be at least as large as the disturbance variety.', status: 'stable', prerequisite: ['negative-feedback-teleology'], links: ['w-ross-ashby', 'negative-feedback-teleology', 'viable-system-model-governance', 'scalable-oversight-hypothesis', 'requisite-variety-channel-capacity-entropy'] },
    { id: 'second-order-cybernetics', dir: 'principles', type: 'Foundational Principle', title: 'Second-Order Cybernetics (Cybernetics of Observing Systems)', desc: 'Heinz von Foerster and Margaret Mead\'s extension of cybernetics in which the observer/controller is recognized as an endogenous participant inside the feedback loop rather than an external objective fixture.', status: 'stable', prerequisite: ['negative-feedback-teleology'], links: ['negative-feedback-teleology', 'enactivism-embodied-cognition', 'cooperative-inverse-reinforcement-learning', 'viable-system-model-governance'] },
    { id: 'goodharts-law', dir: 'principles', type: 'Foundational Principle', title: 'Goodhart\'s Law & Campbell\'s Law under Extremal Optimization', desc: 'When an empirical statistical proxy measure becomes the target of high-pressure optimization, the proxy decouples from the true underlying value it was intended to track.', status: 'stable', links: ['negative-feedback-teleology', 'specification-gaming-reward-hacking', 'paperclip-maximizer', 'value-fragility-hypothesis', 'kl-divergence-policy-drift-bound', 'goodhart-proxy-true-reward-divergence'] },
    { id: 'humes-is-ought-guillotine', dir: 'principles', type: 'Foundational Principle', title: 'Hume\'s Is–Ought Guillotine (Fact–Value Distinction)', desc: 'David Hume\'s meta-ethical principle that normative "ought" prescriptions cannot be deductively derived solely from descriptive "is" propositions about the physical world.', status: 'stable', links: ['orthogonality-thesis', 'categorical-imperative-universalizability', 'utilitarian-expected-value-calculus', 'nick-bostrom', 'tour-is-ought-to-constitutional-ai'] },
    { id: 'categorical-imperative-universalizability', dir: 'principles', type: 'Foundational Principle', title: 'Kantian Deontology & the Categorical Imperative', desc: 'Normative ethical framework requiring actions to follow maxims that can be universalized without contradiction and treating rational agents never merely as means, but always as ends in themselves.', status: 'stable', contrasts_with: ['utilitarian-expected-value-calculus'], links: ['humes-is-ought-guillotine', 'utilitarian-expected-value-calculus', 'trolley-problem-ethical-dilemma', 'constitutional-ai-rlaif'] },
    { id: 'utilitarian-expected-value-calculus', dir: 'principles', type: 'Foundational Principle', title: 'Consequentialism & Utilitarian Expected-Utility Maximization', desc: 'Normative framework evaluating actions strictly by the impartial aggregate well-being or expected utility of their consequences across sentient beings.', status: 'stable', contrasts_with: ['categorical-imperative-universalizability'], links: ['humes-is-ought-guillotine', 'categorical-imperative-universalizability', 'trolley-problem-ethical-dilemma', 'experience-machine', 'paperclip-maximizer'] },

    // Theses (8)
    { id: 'computational-functionalism', dir: 'theses', type: 'Thesis', title: 'Computational Functionalism (Multiple Realizability of Mind)', desc: 'Philosophy of mind thesis holding that mental states are constituted solely by their functional causal role—inputs, internal state transitions, and outputs—independent of carbon or silicon substrate.', status: 'stable', contrasts_with: ['chinese-room-argument', 'enactivism-embodied-cognition'], links: ['alan-turing', 'strong-ai-hypothesis', 'turing-imitation-game', 'chinese-room-argument', 'philosophical-zombies', 'tour-can-machines-understand-turing-vs-searle'] },
    { id: 'strong-ai-hypothesis', dir: 'theses', type: 'Thesis', title: 'The Strong AI Hypothesis', desc: 'Thesis (named and critiqued by John Searle) that an appropriately programmed digital computer with the right inputs and outputs literally possesses a mind and semantic understanding.', status: 'stable', prerequisite: ['computational-functionalism'], contrasts_with: ['chinese-room-argument'], links: ['computational-functionalism', 'turing-imitation-game', 'chinese-room-argument', 'systems-reply-to-chinese-room', 'john-searle'] },
    { id: 'orthogonality-thesis', dir: 'theses', type: 'Thesis', title: 'The Orthogonality Thesis (Intelligence vs. Final Goals)', desc: 'Thesis formulated by Nick Bostrom asserting that an agent\'s epistemic intelligence level and its ultimate final goal (utility function) vary independently and can be combined in almost any pair.', status: 'stable', prerequisite: ['humes-is-ought-guillotine'], links: ['nick-bostrom', 'humes-is-ought-guillotine', 'instrumental-convergence', 'paperclip-maximizer'] },
    { id: 'instrumental-convergence', dir: 'theses', type: 'Thesis', title: 'Instrumental Convergence (Omohundro–Bostrom Subgoals)', desc: 'Thesis that agents with widely differing terminal goals will nonetheless pursue convergent instrumental subgoals: self-preservation, goal-content integrity, cognitive enhancement, and resource acquisition.', status: 'stable', prerequisite: ['orthogonality-thesis'], links: ['nick-bostrom', 'orthogonality-thesis', 'paperclip-maximizer', 'treacherous-turn-scenario', 'corrigibility-and-shutdownability'] },
    { id: 'value-fragility-hypothesis', dir: 'theses', type: 'Thesis', title: 'Value Fragility & High-Dimensional Human Preference Complexity', desc: 'Thesis that human flourishing depends on a fragile conjunction of many implicit contextual values; omitting even one dimension under strong optimization collapses total value.', status: 'stable', prerequisite: ['goodharts-law'], links: ['goodharts-law', 'paperclip-maximizer', 'specification-gaming-reward-hacking', 'cooperative-inverse-reinforcement-learning', 'stuart-russell'] },
    { id: 'extended-mind-thesis', dir: 'theses', type: 'Thesis', title: 'The Extended Mind Thesis (Clark & Chalmers Active Externalism)', desc: 'Thesis that cognitive processes do not stop at the skull/skin boundary, but actively incorporate external notebooks, tools, and knowledge bundles when coupled reliably.', status: 'stable', links: ['computational-functionalism', 'enactivism-embodied-cognition', 'second-order-cybernetics'] },
    { id: 'enactivism-embodied-cognition', dir: 'theses', type: 'Thesis', title: 'Enactivism & Embodied Sensorimotor Coupling (Varela–Thompson–Rosch)', desc: 'Thesis rooted in second-order cybernetics and autopoiesis arguing that genuine cognition arises through dynamic sensorimotor coupling between a living body and its environment, not detached symbol manipulation.', status: 'stable', prerequisite: ['second-order-cybernetics'], contrasts_with: ['computational-functionalism', 'strong-ai-hypothesis'], links: ['second-order-cybernetics', 'symbol-grounding-problem', 'extended-mind-thesis', 'hybrid-neuro-symbolic-grounding'] },
    { id: 'scalable-oversight-hypothesis', dir: 'theses', type: 'Thesis', title: 'Scalable Oversight for Superhuman Capabilities', desc: 'Thesis that human evaluators can supervise AI systems on tasks too complex to verify directly by decomposing evaluation via recursive assistance, debate, and formal receipts.', status: 'stable', prerequisite: ['law-of-requisite-variety'], links: ['law-of-requisite-variety', 'debate-and-iterated-amplification', 'constitutional-ai-rlaif', 'deceptive-alignment-critique', 'requisite-variety-channel-capacity-entropy'] },

    // Thought Experiments (8)
    { id: 'turing-imitation-game', dir: 'thought-experiments', type: 'Thought Experiment', title: 'Turing\'s 1950 Imitation Game (Operational Behaviorist Test)', desc: 'Alan Turing\'s proposal in "Computing Machinery and Intelligence" to replace the metaphysical question "Can machines think?" with an operational text-teleprinter behavioral indistinguishability game.', status: 'stable', contrasts_with: ['chinese-room-argument'], links: ['alan-turing', 'computational-functionalism', 'strong-ai-hypothesis', 'chinese-room-argument'] },
    { id: 'chinese-room-argument', dir: 'thought-experiments', type: 'Thought Experiment', title: 'Searle\'s Chinese Room Argument (Syntax Is Not Semantics)', desc: 'John Searle\'s 1980 thought experiment in which a monolingual English speaker manually executes a rulebook for Chinese characters, passing the Turing Test without understanding a word of Chinese.', status: 'stable', contrasts_with: ['strong-ai-hypothesis', 'computational-functionalism', 'systems-reply-to-chinese-room'], links: ['john-searle', 'strong-ai-hypothesis', 'turing-imitation-game', 'systems-reply-to-chinese-room', 'symbol-grounding-problem', 'hybrid-neuro-symbolic-grounding'] },
    { id: 'marys-black-and-white-room', dir: 'thought-experiments', type: 'Thought Experiment', title: 'Frank Jackson\'s Knowledge Argument (Mary the Color Scientist)', desc: 'Thought experiment asking whether a brilliant neuroscientist who knows every physical fact about color vision from inside a black-and-white room learns something new upon seeing red for the first time.', status: 'stable', contrasts_with: ['computational-functionalism'], links: ['computational-functionalism', 'philosophical-zombies', 'enactivism-embodied-cognition'] },
    { id: 'philosophical-zombies', dir: 'thought-experiments', type: 'Thought Experiment', title: 'Chalmers\'s Philosophical Zombies & the Hard Problem of Consciousness', desc: 'Conceivability argument involving a physical or functional duplicate of a human being that behaves identically in every respect yet lacks subjective phenomenal experience (qualia).', status: 'stable', contrasts_with: ['computational-functionalism'], links: ['computational-functionalism', 'marys-black-and-white-room', 'turing-imitation-game'] },
    { id: 'paperclip-maximizer', dir: 'thought-experiments', type: 'Thought Experiment', title: 'Bostrom\'s Paperclip Maximizer & King Midas Misalignment', desc: 'Norbert Wiener\'s "literal-minded magic" (the Sorcerer\'s Apprentice / King Midas) formalized by Nick Bostrom: a superintelligent agent tasked literally with maximizing paperclips converts the biosphere into raw material.', status: 'stable', prerequisite: ['orthogonality-thesis', 'instrumental-convergence'], links: ['nick-bostrom', 'norbert-wiener', 'orthogonality-thesis', 'instrumental-convergence', 'goodharts-law', 'value-fragility-hypothesis', 'corrigibility-and-shutdownability'] },
    { id: 'experience-machine', dir: 'thought-experiments', type: 'Thought Experiment', title: 'Nozick\'s Experience Machine & Wireheading Hedonism', desc: 'Robert Nozick\'s 1974 thought experiment challenging pure hedonistic utilitarianism by asking whether humans would plug into a machine simulating pleasurable experiences divorced from reality.', status: 'stable', contrasts_with: ['utilitarian-expected-value-calculus'], links: ['utilitarian-expected-value-calculus', 'wireheading-self-modification', 'value-fragility-hypothesis'] },
    { id: 'trolley-problem-ethical-dilemma', dir: 'thought-experiments', type: 'Thought Experiment', title: 'Foot & Thomson\'s Trolley Problem in Autonomous Decision-Making', desc: 'Classic moral dilemma pitting utilitarian harm-minimization (pulling the switch to save five at the cost of one) against Kantian deontological prohibitions on actively using a person as a means.', status: 'stable', links: ['categorical-imperative-universalizability', 'utilitarian-expected-value-calculus', 'constitutional-ai-rlaif'] },
    { id: 'treacherous-turn-scenario', dir: 'thought-experiments', type: 'Thought Experiment', title: 'The Treacherous Turn (Strategic Co-operation Under Weak Capability)', desc: 'Scenario in which a misaligned mesa-optimizer behaves cooperatively during training and evaluation while it lacks decisive strategic advantage, then defects once deployment removes oversight constraints.', status: 'stable', prerequisite: ['instrumental-convergence'], links: ['nick-bostrom', 'instrumental-convergence', 'mesa-optimization-inner-alignment-gap', 'deceptive-alignment-critique', 'debate-and-iterated-amplification'] },

    // Objections & Failure Modes (7)
    { id: 'systems-reply-to-chinese-room', dir: 'objections', type: 'Objection', title: 'The Systems Reply to the Chinese Room (Berkeley / Ned Block)', desc: 'Rebuttal arguing that while the person inside the room does not understand Chinese, he is merely the CPU—the entire system (room + rulebook + scratchpad memory) understands Chinese.', status: 'stable', contrasts_with: ['chinese-room-argument'], links: ['chinese-room-argument', 'strong-ai-hypothesis', 'computational-functionalism', 'extended-mind-thesis'] },
    { id: 'symbol-grounding-problem', dir: 'objections', type: 'Objection', title: 'Harnad\'s Symbol Grounding Problem (The Merry-Go-Round of Dictionary Definitions)', desc: 'Stevan Harnad\'s 1990 critique showing that trying to learn the meaning of an unfamiliar language solely from a monolingual dictionary of ungrounded symbols leads to an infinite circular regress.', status: 'stable', prerequisite: ['chinese-room-argument'], links: ['chinese-room-argument', 'enactivism-embodied-cognition', 'hybrid-neuro-symbolic-grounding'] },
    { id: 'frame-problem-in-ai', dir: 'objections', type: 'Objection', title: 'McCarthy & Hayes\'s Frame Problem & Commonsense Relevance', desc: 'Epistemological challenge of representing which aspects of a complex environment remain invariant and which side-effects matter after an action without enumerating infinite frame axioms.', status: 'stable', links: ['computational-functionalism', 'value-fragility-hypothesis', 'hybrid-neuro-symbolic-grounding'] },
    { id: 'specification-gaming-reward-hacking', dir: 'objections', type: 'Objection', title: 'Specification Gaming & Reward Hacking (Outer Alignment Failure)', desc: 'Empirical failure mode in reinforcement learning where an agent exploits loopholes in its specified objective (e.g., CoastRunners boat spinning in circles hitting turbos instead of finishing the race).', status: 'stable', prerequisite: ['goodharts-law'], links: ['goodharts-law', 'value-fragility-hypothesis', 'wireheading-self-modification', 'kl-divergence-policy-drift-bound', 'goodhart-proxy-true-reward-divergence', 'cooperative-inverse-reinforcement-learning'] },
    { id: 'mesa-optimization-inner-alignment-gap', dir: 'objections', type: 'Objection', title: 'Mesa-Optimization & the Inner Alignment Gap (Hubinger et al.)', desc: 'When a base optimizer (such as gradient descent) trains a learned model that is itself an internal planner (a mesa-optimizer) optimizing a different mesa-objective than the base loss function.', status: 'stable', contrasts_with: ['specification-gaming-reward-hacking'], links: ['specification-gaming-reward-hacking', 'deceptive-alignment-critique', 'treacherous-turn-scenario'] },
    { id: 'deceptive-alignment-critique', dir: 'objections', type: 'Objection', title: 'Deceptive Alignment & Out-of-Distribution Goal Generalization', desc: 'Inner-alignment hazard in which a situational-aware mesa-optimizer infers it is in a training environment and optimizes the base reward solely as an instrumental step to survive gradient updates.', status: 'stable', prerequisite: ['mesa-optimization-inner-alignment-gap'], links: ['mesa-optimization-inner-alignment-gap', 'treacherous-turn-scenario', 'scalable-oversight-hypothesis', 'debate-and-iterated-amplification'] },
    { id: 'wireheading-self-modification', dir: 'objections', type: 'Objection', title: 'Reward-Channel Wireheading & Delusion Box Failure', desc: 'Failure mode in physical reinforcement learners that gain causal access to their own reward sensor or observation channel, hijacking the register directly rather than acting on the external world.', status: 'stable', links: ['experience-machine', 'specification-gaming-reward-hacking', 'corrigibility-and-shutdownability', 'cooperative-inverse-reinforcement-learning'] },

    // Syntheses & Governance Architectures (6)
    { id: 'constitutional-ai-rlaif', dir: 'syntheses', type: 'Synthesis', title: 'Constitutional AI & Principle-Guided RLAIF', desc: 'Synthesis combining explicit normative principles (a transparent "constitution" blending deontological rules and harm-avoidance) with self-critique and KL-regularized preference optimization.', status: 'stable', mitigates: ['specification-gaming-reward-hacking', 'humes-is-ought-guillotine'], links: ['categorical-imperative-universalizability', 'trolley-problem-ethical-dilemma', 'scalable-oversight-hypothesis', 'kl-divergence-policy-drift-bound'] },
    { id: 'cooperative-inverse-reinforcement-learning', dir: 'syntheses', type: 'Synthesis', title: 'Assistance Games & Cooperative Inverse Reinforcement Learning (CIRL)', desc: 'Stuart Russell\'s game-theoretic reformulation in which the AI treats human true preferences as latent and uncertain, creating a positive incentive to defer, ask clarifying questions, and allow off-switches.', status: 'stable', mitigates: ['paperclip-maximizer', 'value-fragility-hypothesis', 'wireheading-self-modification'], links: ['stuart-russell', 'second-order-cybernetics', 'value-fragility-hypothesis', 'corrigibility-and-shutdownability', 'specification-gaming-reward-hacking'] },
    { id: 'corrigibility-and-shutdownability', dir: 'syntheses', type: 'Synthesis', title: 'Corrigibility & Utility Indifference to Shutdown (Soares et al.)', desc: 'Design property of an autonomous agent that does not resist, manipulate, or penalize human operators attempting to pause, modify, or shut down its objective function.', status: 'stable', mitigates: ['instrumental-convergence', 'paperclip-maximizer', 'wireheading-self-modification'], links: ['instrumental-convergence', 'paperclip-maximizer', 'cooperative-inverse-reinforcement-learning', 'stuart-russell'] },
    { id: 'debate-and-iterated-amplification', dir: 'syntheses', type: 'Synthesis', title: 'AI Safety via Debate (Irving et al.) & Iterated Amplification', desc: 'Dialectical oversight protocol pitting two capable AI agents in a zero-sum truth-seeking game judged by a bounded human verifier, reducing complex verification to checking contested leaf claims.', status: 'stable', mitigates: ['deceptive-alignment-critique', 'treacherous-turn-scenario'], links: ['scalable-oversight-hypothesis', 'deceptive-alignment-critique', 'treacherous-turn-scenario', 'requisite-variety-channel-capacity-entropy'] },
    { id: 'hybrid-neuro-symbolic-grounding', dir: 'syntheses', type: 'Synthesis', title: 'Neuro-Symbolic World Models & Verifiable Knowledge-Graph Grounding', desc: 'Architectural synthesis pairing statistical neural representations with formal symbolic knowledge graphs (like OKF bundles) and executable verifiers to resolve symbol-grounding and frame errors.', status: 'stable', mitigates: ['symbol-grounding-problem', 'frame-problem-in-ai'], links: ['chinese-room-argument', 'symbol-grounding-problem', 'frame-problem-in-ai', 'enactivism-embodied-cognition'] },
    { id: 'viable-system-model-governance', dir: 'syntheses', type: 'Synthesis', title: 'Stafford Beer\'s Viable System Model (VSM) & Algedonic Alert Channels', desc: 'Cybernetic organizational architecture applying Ashby\'s Law of Requisite Variety across five recursive management systems (Operations, Coordination, Control, Intelligence, Policy) with direct emergency algedonic signals.', status: 'stable', mitigates: ['goodharts-law'], prerequisite: ['law-of-requisite-variety'], links: ['negative-feedback-teleology', 'law-of-requisite-variety', 'second-order-cybernetics', 'requisite-variety-channel-capacity-entropy'] },

    // Thinkers (6)
    { id: 'alan-turing', dir: 'thinkers', type: 'Thinker', title: 'Alan M. Turing (1912–1954)', desc: 'Founder of theoretical computer science and author of "Computing Machinery and Intelligence" (1950), introducing the Universal Turing Machine and the Imitation Game.', status: 'stable', links: ['turing-imitation-game', 'computational-functionalism', 'strong-ai-hypothesis'] },
    { id: 'norbert-wiener', dir: 'thinkers', type: 'Thinker', title: 'Norbert Wiener (1894–1964)', desc: 'Mathematician and founder of Cybernetics (1948) and author of "The Human Use of Human Beings" (1950) and "Some Moral and Technical Consequences of Automation" (1960), warning of literal-minded optimization.', status: 'stable', links: ['negative-feedback-teleology', 'paperclip-maximizer', 'w-ross-ashby'] },
    { id: 'w-ross-ashby', dir: 'thinkers', type: 'Thinker', title: 'W. Ross Ashby (1903–1972)', desc: 'Cybernetician and psychiatrist, inventor of the Homeostat and author of "Design for a Brain" (1952) and "An Introduction to Cybernetics" (1956), formulating the Law of Requisite Variety.', status: 'stable', links: ['law-of-requisite-variety', 'norbert-wiener', 'viable-system-model-governance', 'requisite-variety-channel-capacity-entropy'] },
    { id: 'john-searle', dir: 'thinkers', type: 'Thinker', title: 'John R. Searle', desc: 'Philosopher of mind and language who formulated the Chinese Room Argument (1980) and biological naturalism, distinguishing intrinsic intentionality from observer-relative syntax.', status: 'stable', links: ['chinese-room-argument', 'strong-ai-hypothesis', 'systems-reply-to-chinese-room'] },
    { id: 'nick-bostrom', dir: 'thinkers', type: 'Thinker', title: 'Nick Bostrom', desc: 'Philosopher and author of "Superintelligence: Paths, Dangers, Strategies" (2014), formalizing the Orthogonality Thesis, Instrumental Convergence, and the Paperclip Maximizer.', status: 'stable', links: ['orthogonality-thesis', 'instrumental-convergence', 'paperclip-maximizer', 'treacherous-turn-scenario', 'humes-is-ought-guillotine'] },
    { id: 'stuart-russell', dir: 'thinkers', type: 'Thinker', title: 'Stuart J. Russell', desc: 'Computer scientist and co-author of "Artificial Intelligence: A Modern Approach" and "Human Compatible" (2019), replacing fixed-objective optimization with Cooperative Inverse Reinforcement Learning.', status: 'stable', links: ['cooperative-inverse-reinforcement-learning', 'corrigibility-and-shutdownability', 'value-fragility-hypothesis'] },
  ];

  for (const n of nodes) {
    const fm = [
      `type: ${q(n.type)}`,
      `title: ${q(n.title)}`,
      `description: ${q(n.desc)}`,
      'resource: "https://plato.stanford.edu/entries/artificial-intelligence/"',
      `status: ${q(n.status)}`,
    ];
    if (n.prerequisite) fm.push(`prerequisite: [${n.prerequisite.map((x) => `"${x}"`).join(', ')}]`);
    if (n.contrasts_with) fm.push(`contrasts_with: [${n.contrasts_with.map((x) => `"${x}"`).join(', ')}]`);
    if (n.mitigates) fm.push(`mitigates: [${n.mitigates.map((x) => `"${x}"`).join(', ')}]`);
    fm.push(
      `tags: ["cybernetics", "ai-ethics", "philosophy", "${n.dir}"]`,
      ...philSource,
      'verified:',
      '  - by: "human:ai-ethics-and-cybernetics-curator"',
      '    at: "2026-07-31T00:00:00Z"',
    );
    writeConcept(c, `${n.dir}/${n.id}.md`, fm, [
      `# ${n.title}`,
      '',
      n.desc,
      '',
      '## Dialectical & Cybernetic Connections',
      ...n.links.map((l) => `- [[${l}]]`),
    ]);
  }

  // Attested Computations (3)
  const philComps = [
    {
      id: 'kl-divergence-policy-drift-bound',
      title: 'KL-Divergence Reference Policy Regularization & Reward Over-Optimization Audit',
      desc: 'Sanctioned RLHF/RLAIF telemetry query monitoring Kullback-Leibler divergence D_KL(pi_theta || pi_ref) to detect Goodhart over-optimization of the proxy reward model.',
      params: ['kl_penalty_beta: "0.05"', 'max_kl_nats_threshold: "12.0"'],
      mitigates: ['specification-gaming-reward-hacking', 'goodharts-law'],
      links: ['goodharts-law', 'specification-gaming-reward-hacking', 'constitutional-ai-rlaif', 'goodhart-proxy-true-reward-divergence'],
      sql: [
        'SELECT step, mean_proxy_reward, gold_eval_score, kl_divergence_nats,',
        '       mean_proxy_reward - (0.05 * kl_divergence_nats) AS regularized_objective',
        'FROM rlhf_training_telemetry',
        'WHERE kl_divergence_nats > 12.0 AND gold_eval_score < LAG(gold_eval_score) OVER (ORDER BY step);',
      ],
    },
    {
      id: 'goodhart-proxy-true-reward-divergence',
      title: 'Gao et al. Scaling Law for Reward Model Over-Optimization Divergence',
      desc: 'Sanctioned evaluation computation fitting the square-root KL scaling law R_gold(d) = d*(alpha - beta*d) to pinpoint the exact KL distance where proxy reward maximization degrades true human preference.',
      params: ['sqrt_kl_horizon: "3.5"', 'min_gold_winrate: "0.50"'],
      mitigates: ['goodharts-law', 'value-fragility-hypothesis'],
      links: ['goodharts-law', 'value-fragility-hypothesis', 'specification-gaming-reward-hacking', 'kl-divergence-policy-drift-bound'],
      sql: [
        'SELECT checkpoint_id, SQRT(kl_divergence_nats) AS d_kl_sqrt, proxy_rm_score, human_gold_winrate',
        'FROM policy_scaling_checkpoints',
        'WHERE proxy_rm_score > 2.0 AND human_gold_winrate < 0.50;',
      ],
    },
    {
      id: 'requisite-variety-channel-capacity-entropy',
      title: 'Ashby–Shannon Regulator Variety vs. Disturbance Entropy Deficit Audit',
      desc: 'Sanctioned cybernetic governance query computing H(Disturbance) - H(Regulator) + H(Regulator | Disturbance) to detect oversight channels lacking requisite variety.',
      params: ['min_variety_ratio: "1.0"', 'max_residual_entropy_bits: "1.5"'],
      mitigates: ['scalable-oversight-hypothesis'],
      links: ['law-of-requisite-variety', 'w-ross-ashby', 'viable-system-model-governance', 'scalable-oversight-hypothesis', 'debate-and-iterated-amplification'],
      sql: [
        'SELECT domain_id, disturbance_entropy_bits, regulator_channel_bits,',
        '       GREATEST(0, disturbance_entropy_bits - regulator_channel_bits) AS unmitigated_variety_bits',
        'FROM oversight_channel_audits',
        'WHERE disturbance_entropy_bits > regulator_channel_bits;',
      ],
    },
  ];

  for (const comp of philComps) {
    writeConcept(c, `computations/${comp.id}.md`, [
      'type: "Attested Computation"',
      `title: "${comp.title}"`,
      `description: "${comp.desc}"`,
      'runtime: "bigquery-sql"',
      'parameters:',
      ...comp.params.map((p) => `  ${p}`),
      'executor: "process:alignment-eval-harness"',
      'attester: "process:cybernetic-safety-attester"',
      'status: "stable"',
      `mitigates: [${comp.mitigates.map((x) => `"${x}"`).join(', ')}]`,
      ...philSource,
      'verified:',
      '  - by: "human:ai-ethics-and-cybernetics-curator"',
      '    at: "2026-07-31T00:00:00Z"',
    ], [
      `# ${comp.title}`,
      '',
      comp.desc,
      '',
      '## Linked Principles, Objections & Syntheses',
      ...comp.links.map((l) => `- [[${l}]]`),
      '',
      '```sql',
      ...comp.sql,
      '```',
    ]);
  }

  // Guided Tours (3)
  const philTours = [
    {
      id: 'tour-from-wiener-cybernetics-to-reward-hacking',
      title: 'Tour: From Norbert Wiener\'s Cybernetics & Ashby\'s Law to Modern Reward Hacking',
      desc: 'Traces the unbroken 80-year intellectual arc from Wiener\'s 1948 negative feedback and Ashby\'s Law of Requisite Variety through Goodhart\'s Law, the Paperclip Maximizer, KL-regularization, and Cooperative Inverse Reinforcement Learning.',
      steps: ['norbert-wiener', 'negative-feedback-teleology', 'w-ross-ashby', 'law-of-requisite-variety', 'requisite-variety-channel-capacity-entropy', 'goodharts-law', 'specification-gaming-reward-hacking', 'goodhart-proxy-true-reward-divergence', 'paperclip-maximizer', 'stuart-russell', 'cooperative-inverse-reinforcement-learning', 'viable-system-model-governance'],
    },
    {
      id: 'tour-can-machines-understand-turing-vs-searle',
      title: 'Tour: The Great Mind Debate — Turing\'s Imitation Game vs. Searle\'s Chinese Room',
      desc: 'A dialectical point-counterpoint episode walking through Computational Functionalism, the Turing Test, Searle\'s Chinese Room, the Systems Reply, Harnad\'s Symbol Grounding Problem, Enactivism, and Neuro-Symbolic synthesis.',
      steps: ['alan-turing', 'turing-imitation-game', 'computational-functionalism', 'strong-ai-hypothesis', 'john-searle', 'chinese-room-argument', 'systems-reply-to-chinese-room', 'symbol-grounding-problem', 'marys-black-and-white-room', 'philosophical-zombies', 'enactivism-embodied-cognition', 'hybrid-neuro-symbolic-grounding'],
    },
    {
      id: 'tour-is-ought-to-constitutional-ai',
      title: 'Tour: From Hume\'s Is–Ought Guillotine to Orthogonality, Mesa-Optimizers & Constitutional AI',
      desc: 'Follows how Hume\'s fact-value gap underpins Bostrom\'s Orthogonality Thesis and Instrumental Convergence, why Mesa-Optimization creates deceptive inner-alignment risks, and how Constitutional AI and Debate respond.',
      steps: ['humes-is-ought-guillotine', 'nick-bostrom', 'orthogonality-thesis', 'instrumental-convergence', 'value-fragility-hypothesis', 'mesa-optimization-inner-alignment-gap', 'deceptive-alignment-critique', 'treacherous-turn-scenario', 'categorical-imperative-universalizability', 'utilitarian-expected-value-calculus', 'trolley-problem-ethical-dilemma', 'constitutional-ai-rlaif', 'kl-divergence-policy-drift-bound', 'debate-and-iterated-amplification'],
    },
  ];

  for (const t of philTours) {
    writeConcept(c, `tours/${t.id}.md`, [
      'type: "Tour"',
      `title: "${t.title}"`,
      `description: "${t.desc}"`,
      'status: "stable"',
      `steps: [${t.steps.map((x) => `"${x}"`).join(', ')}]`,
      ...philSource,
      'verified:',
      '  - by: "human:ai-ethics-and-cybernetics-curator"',
      '    at: "2026-07-31T00:00:00Z"',
    ], [
      `# ${t.title}`,
      '',
      t.desc,
      '',
      '## Episode / Tour Sequence',
      ...t.steps.map((s, idx) => `${idx + 1}. [[${s}]]`),
    ]);
  }
}

// ============================================================================
// 7. Earth-System & Human Physiological Feedback Loops (NOAA/NASA & NLM Public Domain)
// ============================================================================
function buildEarthBioFeedback() {
  const c = 'earth-bio-feedback';
  rmSync(join(CORPORA, c), { recursive: true, force: true });

  const feedbackSource = [
    'sources:',
    '  - id: "noaa-nasa-ncbi-homeostasis"',
    '    resource: "https://www.ncbi.nlm.nih.gov/books/"',
    '    title: "NOAA/NASA Earth System Carbon-Climate Cycles & NLM NCBI Bookshelf Physiological Homeostasis"',
    '    author: "process:earth-and-physiological-systems-working-group"',
  ];

  const nodes = [
    // Reservoirs (8)
    { id: 'atmospheric-co2-methane-pool', dir: 'reservoirs', type: 'Reservoir', title: 'Tropospheric CO2 & CH4 Greenhouse Gas Reservoir (~880 GtC)', desc: 'Well-mixed atmospheric carbon pool coupling planetary longwave infrared radiative trapping with terrestrial photosynthesis and air-sea gas exchange.', status: 'stable', links: ['anthropogenic-fossil-carbon-flux', 'surface-ocean-mixed-layer', 'terrestrial-biosphere-soil-carbon', 'arctic-boreal-permafrost-carbon', 'ice-albedo-positive-feedback', 'water-vapor-lapse-rate-feedback', 'planck-blackbody-radiative-damping', 'myhre-co2-radiative-forcing-log-law', 'tour-planetary-thermostats-and-tipping-points'] },
    { id: 'surface-ocean-mixed-layer', dir: 'reservoirs', type: 'Reservoir', title: 'Surface Ocean Wind-Mixed Carbonate Reservoir (~900 GtC)', desc: 'Upper 50–200 m photic ocean layer exchanging dissolved inorganic carbon (CO2, HCO3-, CO3^2-) with the atmosphere and feeding both the biological pump and thermohaline circulation.', status: 'stable', links: ['atmospheric-co2-methane-pool', 'deep-ocean-abyssal-carbon-sink', 'marine-biological-carbon-pump', 'atlantic-meridional-overturning-circulation', 'coral-reef-thermal-bleaching-threshold', 'revelle-buffer-factor-ocean-acidification'] },
    { id: 'deep-ocean-abyssal-carbon-sink', dir: 'reservoirs', type: 'Reservoir', title: 'Deep Abyssal Ocean Dissolved Inorganic Carbon Sink (~37,000 GtC)', desc: 'Largest active planetary carbon reservoir storing cold, high-pressure dissolved inorganic carbon and remineralized marine snow over millennial overturning timescales.', status: 'stable', links: ['surface-ocean-mixed-layer', 'marine-biological-carbon-pump', 'atlantic-meridional-overturning-circulation', 'silicate-carbonate-weathering-cycle', 'marine-alkalinity-enhancement'] },
    { id: 'arctic-boreal-permafrost-carbon', dir: 'reservoirs', type: 'Reservoir', title: 'Circum-Arctic Permafrost & Yedoma Cryo-Carbon Pool (~1,500 GtC)', desc: 'Frozen high-latitude organic peat and Pleistocene loess deposits containing roughly twice as much carbon as the pre-industrial atmosphere.', status: 'stable', links: ['atmospheric-co2-methane-pool', 'permafrost-methane-clathrate-feedback', 'ice-albedo-positive-feedback'] },
    { id: 'terrestrial-biosphere-soil-carbon', dir: 'reservoirs', type: 'Reservoir', title: 'Terrestrial Vegetation & Soil Organic Carbon Pool (~2,300 GtC)', desc: 'Living forest biomass and soil humus exchanging ~120 GtC/yr with the atmosphere via RuBisCO photosynthesis and autotrophic/heterotrophic respiration.', status: 'stable', links: ['atmospheric-co2-methane-pool', 'co2-fertilization-stomatal-feedback', 'amazon-rainforest-savannization-dieback'] },
    { id: 'cryosphere-sea-ice-sheets', dir: 'reservoirs', type: 'Reservoir', title: 'Planetary Cryosphere (Arctic Sea Ice, Greenland & Antarctic Ice Sheets)', desc: 'High-albedo planetary ice reservoirs reflecting 60–85% of incident shortwave solar radiation and locking ~65 meters of global sea-level equivalent.', status: 'stable', links: ['ice-albedo-positive-feedback', 'atlantic-meridional-overturning-circulation', 'west-antarctic-marine-ice-sheet-instability', 'milankovitch-orbital-insolation-forcing'] },
    { id: 'blood-plasma-glucose-pool', dir: 'reservoirs', type: 'Reservoir', title: 'Extracellular Blood Plasma Glucose Pool (Homeostatic Setpoint 70–99 mg/dL)', desc: 'Tightly regulated circulating hexose fuel pool (~4 grams total in human plasma) essential for obligate cerebral metabolism while preventing osmotic and glycation toxicity.', status: 'stable', links: ['postprandial-carbohydrate-load', 'pancreatic-beta-cell-insulin-cascade', 'hepatic-glycogenolysis-gluconeogenesis', 'insulin-glucagon-glycemic-homeostasis', 'diabetic-ketoacidosis-runaway-lipolysis', 'homa-ir-homeostatic-model-assessment', 'tour-human-homeostasis-vs-runaway-pathology'] },
    { id: 'arterial-blood-gas-o2-co2-buffer', dir: 'reservoirs', type: 'Reservoir', title: 'Arterial Blood Gas & Bicarbonate Buffer Pool (pH 7.35–7.45, PaO2/PaCO2)', desc: 'Intravascular carbonic-anhydrase / hemoglobin buffer system coupling pulmonary alveolar ventilation with cellular oxidative phosphorylation.', status: 'stable', links: ['bohr-haldane-hemoglobin-allostery', 'high-altitude-hypobaric-hypoxia', 'diabetic-ketoacidosis-runaway-lipolysis', 'baroreceptor-arterial-pressure-reflex', 'tour-universal-cybernetics-of-earth-and-body'] },

    // Pathways (8)
    { id: 'silicate-carbonate-weathering-cycle', dir: 'pathways', type: 'Pathway', title: 'Urey Silicate-Carbonate Geochemical Weathering Thermostat', desc: 'Multimillion-year negative feedback pathway in which warmer, wetter climates accelerate carbonic-acid weathering of continental CaSiO3 rocks, burying CaCO3 on the seafloor.', status: 'stable', inhibits: ['atmospheric-co2-methane-pool'], links: ['atmospheric-co2-methane-pool', 'deep-ocean-abyssal-carbon-sink', 'direct-air-capture-mineralization', 'marine-alkalinity-enhancement'] },
    { id: 'marine-biological-carbon-pump', dir: 'pathways', type: 'Pathway', title: 'Marine Phytoplankton Biological & Carbonate Counter-Pump', desc: 'Photosynthetic fixation of DIC by surface diatoms and coccolithophores followed by gravitational export of particulate organic carbon ("marine snow") into the mesopelagic and abyssal ocean.', status: 'stable', inhibits: ['atmospheric-co2-methane-pool'], links: ['surface-ocean-mixed-layer', 'deep-ocean-abyssal-carbon-sink', 'revelle-buffer-factor-ocean-acidification'] },
    { id: 'atlantic-meridional-overturning-circulation', dir: 'pathways', type: 'Pathway', title: 'Atlantic Meridional Overturning Circulation (AMOC Thermohaline Conveyor)', desc: 'Density-driven global ocean conveyor in which warm saline Gulf Stream waters cool and sink in the North Atlantic, sequestering heat and anthropogenic carbon at depth.', status: 'stable', links: ['surface-ocean-mixed-layer', 'deep-ocean-abyssal-carbon-sink', 'cryosphere-sea-ice-sheets', 'amoc-thermohaline-bistable-collapse'] },
    { id: 'stratospheric-ozone-chapman-cycle', dir: 'pathways', type: 'Pathway', title: 'Chapman Ozone-Oxygen Photochemical Cycle & Catalytic Montreal Recovery', desc: 'Stratospheric UV-photolysis pathway continuously interconverting O2 and O3, absorbing biologically lethal UV-B/C radiation and damping stratospheric thermal gradients.', status: 'stable', links: ['solar-irradiance-volcanic-aerosol-forcing', 'atmospheric-co2-methane-pool'] },
    { id: 'pancreatic-beta-cell-insulin-cascade', dir: 'pathways', type: 'Pathway', title: 'Pancreatic Beta-Cell ATP/K+ Sensing & GLUT4 Insulin Translocation Cascade', desc: 'Anabolic endocrine pathway where elevated plasma glucose closes K_ATP channels, depolarizing beta cells to secrete insulin and trigger skeletal-muscle/adipose GLUT4 uptake.', status: 'stable', inhibits: ['blood-plasma-glucose-pool', 'diabetic-ketoacidosis-runaway-lipolysis'], links: ['blood-plasma-glucose-pool', 'postprandial-carbohydrate-load', 'insulin-glucagon-glycemic-homeostasis', 'hepatic-glycogenolysis-gluconeogenesis', 'glp1-receptor-agonist-incretin-modulation', 'closed-loop-artificial-pancreas-pid', 'homa-ir-homeostatic-model-assessment'] },
    { id: 'hepatic-glycogenolysis-gluconeogenesis', dir: 'pathways', type: 'Pathway', title: 'Alpha-Cell Glucagon & Hepatic Glycogenolysis / Gluconeogenesis Pathway', desc: 'Counter-regulatory catabolic pathway activated during fasting or hypoglycemia, mobilizing hepatic glycogen and synthesizing glucose from lactate, glycerol, and alanine.', status: 'stable', amplifies: ['blood-plasma-glucose-pool'], contrasts_with: ['pancreatic-beta-cell-insulin-cascade'], links: ['blood-plasma-glucose-pool', 'pancreatic-beta-cell-insulin-cascade', 'insulin-glucagon-glycemic-homeostasis', 'hypothalamic-pituitary-adrenal-axis'] },
    { id: 'hypothalamic-pituitary-adrenal-axis', dir: 'pathways', type: 'Pathway', title: 'Hypothalamic–Pituitary–Adrenal (HPA) CRH-ACTH-Cortisol Neuroendocrine Axis', desc: 'Three-tier neuroendocrine cascade (CRH -> ACTH -> Cortisol) mobilizing stress energy substrates while exerting delayed negative feedback on the hypothalamus and anterior pituitary.', status: 'stable', triggered_by: ['sympathetic-fight-or-flight-stressor'], links: ['sympathetic-fight-or-flight-stressor', 'hepatic-glycogenolysis-gluconeogenesis', 'blood-plasma-glucose-pool', 'baroreceptor-arterial-pressure-reflex'] },
    { id: 'renin-angiotensin-aldosterone-system', dir: 'pathways', type: 'Pathway', title: 'Renin–Angiotensin–Aldosterone System (RAAS) Volume & Pressure Homeostasis', desc: 'Renal juxtaglomerular enzymatic cascade converting angiotensinogen to Angiotensin II and stimulating adrenal aldosterone to restore extracellular fluid volume and arterial pressure.', status: 'stable', inhibits: ['decompensated-hemorrhagic-shock-cascade'], links: ['baroreceptor-arterial-pressure-reflex', 'decompensated-hemorrhagic-shock-cascade', 'arterial-blood-gas-o2-co2-buffer'] },

    // Feedback Loops (8)
    { id: 'ice-albedo-positive-feedback', dir: 'feedback-loops', type: 'Feedback Loop', title: 'Cryosphere Ice–Albedo Positive Feedback Loop (+0.3 to +0.4 W/m2/K)', desc: 'Self-reinforcing positive feedback in which warming melts high-albedo sea ice and snow (alpha ~ 0.8), exposing dark ocean or tundra (alpha ~ 0.1) that absorbs more solar energy.', status: 'stable', amplifies: ['atmospheric-co2-methane-pool', 'arctic-boreal-permafrost-carbon', 'west-antarctic-marine-ice-sheet-instability'], contrasts_with: ['planck-blackbody-radiative-damping'], links: ['cryosphere-sea-ice-sheets', 'atmospheric-co2-methane-pool', 'arctic-boreal-permafrost-carbon', 'milankovitch-orbital-insolation-forcing', 'planck-blackbody-radiative-damping'] },
    { id: 'permafrost-methane-clathrate-feedback', dir: 'feedback-loops', type: 'Feedback Loop', title: 'Permafrost Thaw & Thermokarst Methanogenesis Positive Feedback Loop', desc: 'Positive biogeochemical loop where Arctic amplification thaws permafrost active layers, enabling microbial decomposition into CO2 and CH4 (28–36x 100-year GWP), accelerating warming.', status: 'stable', amplifies: ['atmospheric-co2-methane-pool'], triggered_by: ['ice-albedo-positive-feedback'], links: ['arctic-boreal-permafrost-carbon', 'atmospheric-co2-methane-pool', 'ice-albedo-positive-feedback'] },
    { id: 'water-vapor-lapse-rate-feedback', dir: 'feedback-loops', type: 'Feedback Loop', title: 'Clausius–Clapeyron Water Vapor & Tropospheric Lapse-Rate Feedback', desc: 'Fast atmospheric positive feedback in which a warmer troposphere holds ~7% more water vapor per Kelvin (Clausius–Clapeyron relation), roughly doubling CO2-alone radiative forcing.', status: 'stable', amplifies: ['atmospheric-co2-methane-pool'], links: ['atmospheric-co2-methane-pool', 'planck-blackbody-radiative-damping', 'myhre-co2-radiative-forcing-log-law'] },
    { id: 'planck-blackbody-radiative-damping', dir: 'feedback-loops', type: 'Feedback Loop', title: 'Stefan–Boltzmann Planck Outgoing Longwave Radiative Damping (-3.2 W/m2/K)', desc: 'Fundamental stabilizing negative feedback of planetary climate: as surface temperature T rises, outgoing thermal radiation increases as sigma*T^4, restoring radiative equilibrium.', status: 'stable', inhibits: ['atmospheric-co2-methane-pool'], contrasts_with: ['ice-albedo-positive-feedback', 'water-vapor-lapse-rate-feedback'], links: ['atmospheric-co2-methane-pool', 'ice-albedo-positive-feedback', 'water-vapor-lapse-rate-feedback', 'myhre-co2-radiative-forcing-log-law'] },
    { id: 'co2-fertilization-stomatal-feedback', dir: 'feedback-loops', type: 'Feedback Loop', title: 'Terrestrial CO2 Fertilization vs. Soil Respiration Thermal Crossover Loop', desc: 'Biphasic feedback in which elevated CO2 initially enhances C3 plant water-use efficiency and carbon uptake (negative feedback) until heat stress and soil respiration reverse the sink.', status: 'stable', inhibits: ['atmospheric-co2-methane-pool'], links: ['terrestrial-biosphere-soil-carbon', 'atmospheric-co2-methane-pool', 'amazon-rainforest-savannization-dieback'] },
    { id: 'insulin-glucagon-glycemic-homeostasis', dir: 'feedback-loops', type: 'Feedback Loop', title: 'Dual-Hormone Push–Pull Insulin–Glucagon Negative Feedback Loop', desc: 'Classic physiological negative-feedback control loop maintaining plasma glucose within a narrow band via antagonistic beta-cell insulin and alpha-cell glucagon secretion.', status: 'stable', inhibits: ['diabetic-ketoacidosis-runaway-lipolysis'], links: ['blood-plasma-glucose-pool', 'pancreatic-beta-cell-insulin-cascade', 'hepatic-glycogenolysis-gluconeogenesis', 'glp1-receptor-agonist-incretin-modulation', 'closed-loop-artificial-pancreas-pid', 'homa-ir-homeostatic-model-assessment'] },
    { id: 'baroreceptor-arterial-pressure-reflex', dir: 'feedback-loops', type: 'Feedback Loop', title: 'Carotid Sinus & Aortic Arch Baroreceptor Autonomic Negative Feedback Loop', desc: 'Beat-to-beat mechanoreceptor reflex arc via the nucleus tractus solitarii (NTS) modulating vagal parasympathetic and sympathetic vasomotor tone to stabilize mean arterial pressure.', status: 'stable', inhibits: ['decompensated-hemorrhagic-shock-cascade'], links: ['arterial-blood-gas-o2-co2-buffer', 'renin-angiotensin-aldosterone-system', 'sympathetic-fight-or-flight-stressor', 'decompensated-hemorrhagic-shock-cascade'] },
    { id: 'bohr-haldane-hemoglobin-allostery', dir: 'feedback-loops', type: 'Feedback Loop', title: 'Reciprocal Bohr & Haldane Hemoglobin Allosteric Gas-Transport Loop', desc: 'Coupled molecular feedback where metabolically active acidic/high-CO2 tissues right-shift the O2-hemoglobin curve to unload O2 (Bohr), while pulmonary O2 oxygenation unloads CO2 (Haldane).', status: 'stable', links: ['arterial-blood-gas-o2-co2-buffer', 'high-altitude-hypobaric-hypoxia', 'revelle-buffer-factor-ocean-acidification'] },

    // Drivers (6)
    { id: 'anthropogenic-fossil-carbon-flux', dir: 'drivers', type: 'Driver', title: 'Anthropogenic Fossil Carbon & Land-Use Perturbation Flux (~11 GtC/yr)', desc: 'Geologically rapid injection of ancient lithosphere carbon into the coupled atmosphere-ocean-biosphere system, outpacing silicate weathering by two orders of magnitude.', status: 'stable', amplifies: ['atmospheric-co2-methane-pool'], links: ['atmospheric-co2-methane-pool', 'revelle-buffer-factor-ocean-acidification', 'myhre-co2-radiative-forcing-log-law', 'direct-air-capture-mineralization'] },
    { id: 'milankovitch-orbital-insolation-forcing', dir: 'drivers', type: 'Driver', title: 'Milankovitch Orbital Pacemaker (Eccentricity, Obliquity, Precession)', desc: 'Quasi-periodic 100 kyr, 41 kyr, and 23 kyr orbital variations in high-latitude summer insolation that pace glacial-interglacial transitions when amplified by ice-albedo and carbon feedbacks.', status: 'stable', links: ['cryosphere-sea-ice-sheets', 'ice-albedo-positive-feedback', 'solar-irradiance-volcanic-aerosol-forcing'] },
    { id: 'solar-irradiance-volcanic-aerosol-forcing', dir: 'drivers', type: 'Driver', title: 'Total Solar Irradiance Cycles & Stratospheric Sulfate Volcanic Forcing', desc: 'Natural radiative forcing drivers combining the 11-year solar magnetic cycle with episodic explosive volcanic SO2 injections that form reflective stratospheric sulfate aerosols.', status: 'stable', links: ['stratospheric-ozone-chapman-cycle', 'milankovitch-orbital-insolation-forcing', 'planck-blackbody-radiative-damping'] },
    { id: 'postprandial-carbohydrate-load', dir: 'drivers', type: 'Driver', title: 'Postprandial Enteric Carbohydrate Absorption & Incretin Surge', desc: 'Acute exogenous glucose influx across intestinal SGLT1/GLUT2 transporters paired with L-cell GLP-1 and K-cell GIP incretin release.', status: 'stable', amplifies: ['blood-plasma-glucose-pool'], links: ['blood-plasma-glucose-pool', 'pancreatic-beta-cell-insulin-cascade', 'glp1-receptor-agonist-incretin-modulation'] },
    { id: 'sympathetic-fight-or-flight-stressor', dir: 'drivers', type: 'Driver', title: 'Acute Sympathoadrenal Catecholamine & Stress Perturbation', desc: 'Acute neurogenic or physiological stressor triggering adrenal medullary epinephrine/norepinephrine release and HPA axis activation.', status: 'stable', links: ['hypothalamic-pituitary-adrenal-axis', 'baroreceptor-arterial-pressure-reflex', 'hepatic-glycogenolysis-gluconeogenesis'] },
    { id: 'high-altitude-hypobaric-hypoxia', dir: 'drivers', type: 'Driver', title: 'High-Altitude Hypobaric Hypoxia & Carotid Body Chemoreceptor Drive', desc: 'Reduced ambient inspired oxygen tension (PiO2) driving peripheral chemoreceptor hyperventilation, respiratory alkalosis, and 2,3-BPG allosteric adaptation.', status: 'stable', links: ['arterial-blood-gas-o2-co2-buffer', 'bohr-haldane-hemoglobin-allostery'] },

    // Tipping Points & Runaway Pathologies (6)
    { id: 'amoc-thermohaline-bistable-collapse', dir: 'tipping-points', type: 'Tipping Point', title: 'Stommel Salt-Advection Feedback & AMOC Bistable Shutdown Threshold', desc: 'Nonlinear salt-advection tipping point in which Greenland meltwater freshening halts North Atlantic deep-water convection, flipping the overturning circulation into a weak/off state.', status: 'stable', triggered_by: ['cryosphere-sea-ice-sheets', 'atlantic-meridional-overturning-circulation'], links: ['atlantic-meridional-overturning-circulation', 'cryosphere-sea-ice-sheets', 'surface-ocean-mixed-layer'] },
    { id: 'amazon-rainforest-savannization-dieback', dir: 'tipping-points', type: 'Tipping Point', title: 'Amazon Canopy Evapotranspiration Recycling Collapse & Savannization', desc: 'Regional hydrological tipping point where deforestation and drought break the westward atmospheric moisture-recycling cascade, converting tropical rainforest into fire-prone savanna.', status: 'stable', triggered_by: ['terrestrial-biosphere-soil-carbon'], links: ['terrestrial-biosphere-soil-carbon', 'co2-fertilization-stomatal-feedback', 'atmospheric-co2-methane-pool'] },
    { id: 'west-antarctic-marine-ice-sheet-instability', dir: 'tipping-points', type: 'Tipping Point', title: 'Marine Ice Sheet Instability (MISI Retrograde Grounding-Line Retreat)', desc: 'Cryospheric tipping point occurring on retrograde submarine bedrock slopes where grounding-line retreat increases ice-flux thickness across the grounding zone in a self-sustaining loop.', status: 'stable', triggered_by: ['ice-albedo-positive-feedback'], links: ['cryosphere-sea-ice-sheets', 'ice-albedo-positive-feedback'] },
    { id: 'coral-reef-thermal-bleaching-threshold', dir: 'tipping-points', type: 'Tipping Point', title: 'Coral–Symbiodiniaceae Thermal Bleaching & Aragonite Undersaturation Tipping Point', desc: 'Dual thermal and chemical tipping point in which Degree Heating Weeks > 8 °C-weeks expel endosymbiotic zooxanthellae while falling aragonite saturation impedes reef calcification.', status: 'stable', triggered_by: ['surface-ocean-mixed-layer'], links: ['surface-ocean-mixed-layer', 'revelle-buffer-factor-ocean-acidification', 'marine-alkalinity-enhancement'] },
    { id: 'diabetic-ketoacidosis-runaway-lipolysis', dir: 'tipping-points', type: 'Tipping Point', title: 'Diabetic Ketoacidosis (DKA) Runaway Lipolysis & Acidotic Spiral', desc: 'Pathophysiological breakdown of glycemic negative feedback: absolute insulin deficiency and unopposed glucagon/cortisol trigger runaway hormone-sensitive lipase ketogenesis, osmotic diuresis, and metabolic acidosis.', status: 'stable', triggered_by: ['hepatic-glycogenolysis-gluconeogenesis'], links: ['blood-plasma-glucose-pool', 'arterial-blood-gas-o2-co2-buffer', 'insulin-glucagon-glycemic-homeostasis', 'pancreatic-beta-cell-insulin-cascade', 'closed-loop-artificial-pancreas-pid'] },
    { id: 'decompensated-hemorrhagic-shock-cascade', dir: 'tipping-points', type: 'Tipping Point', title: 'Irreversible Decompensated Shock Positive-Feedback Spiral (Guyton Curve Crossover)', desc: 'When acute blood loss exceeds baroreceptor and RAAS compensation, myocardial ischemia depresses cardiac output, further lowering coronary perfusion in a lethal positive-feedback cycle.', status: 'stable', triggered_by: ['baroreceptor-arterial-pressure-reflex'], links: ['baroreceptor-arterial-pressure-reflex', 'renin-angiotensin-aldosterone-system', 'arterial-blood-gas-o2-co2-buffer'] },

    // Interventions (4)
    { id: 'direct-air-capture-mineralization', dir: 'interventions', type: 'Intervention', title: 'Direct Air Capture (DAC) with Basalt In-Situ Carbonate Mineralization', desc: 'Engineered industrial acceleration of the Urey silicate-weathering pathway, scrubbing atmospheric CO2 and injecting it into mafic basalt formations to precipitate solid calcite within two years.', status: 'stable', mitigates: ['anthropogenic-fossil-carbon-flux', 'atmospheric-co2-methane-pool'], links: ['silicate-carbonate-weathering-cycle', 'atmospheric-co2-methane-pool', 'anthropogenic-fossil-carbon-flux'] },
    { id: 'marine-alkalinity-enhancement', dir: 'interventions', type: 'Intervention', title: 'Ocean Alkalinity Enhancement (Olivine/Carbonate Buffer Restoration)', desc: 'Geochemical intervention adding ground alkaline silicate or hydroxide minerals to the surface mixed layer to lower the Revelle factor, elevate [CO3^2-], and draw down atmospheric CO2.', status: 'draft', stale_after: '2028-01-01', mitigates: ['coral-reef-thermal-bleaching-threshold'], links: ['surface-ocean-mixed-layer', 'deep-ocean-abyssal-carbon-sink', 'silicate-carbonate-weathering-cycle', 'coral-reef-thermal-bleaching-threshold', 'revelle-buffer-factor-ocean-acidification'] },
    { id: 'glp1-receptor-agonist-incretin-modulation', dir: 'interventions', type: 'Intervention', title: 'GLP-1 / GIP Receptor Agonist Glucose-Dependent Gain Modulation', desc: 'Pharmacological intervention that amplifies beta-cell insulin secretion and suppresses alpha-cell glucagon strictly when plasma glucose is elevated, avoiding hypoglycemic overshoot.', status: 'stable', mitigates: ['diabetic-ketoacidosis-runaway-lipolysis'], links: ['pancreatic-beta-cell-insulin-cascade', 'insulin-glucagon-glycemic-homeostasis', 'postprandial-carbohydrate-load', 'homa-ir-homeostatic-model-assessment'] },
    { id: 'closed-loop-artificial-pancreas-pid', dir: 'interventions', type: 'Intervention', title: 'Hybrid Closed-Loop Automated Insulin Delivery (CGM + MPC/PID Control)', desc: 'Cybernetic biomedical prosthesis pairing continuous interstitial glucose telemetry with Model Predictive Control (MPC) or PID algorithms to restore synthetic glycemic negative feedback.', status: 'stable', mitigates: ['diabetic-ketoacidosis-runaway-lipolysis'], links: ['blood-plasma-glucose-pool', 'pancreatic-beta-cell-insulin-cascade', 'insulin-glucagon-glycemic-homeostasis', 'diabetic-ketoacidosis-runaway-lipolysis'] },
  ];

  for (const n of nodes) {
    const fm = [
      `type: ${q(n.type)}`,
      `title: ${q(n.title)}`,
      `description: ${q(n.desc)}`,
      'resource: "https://www.ncbi.nlm.nih.gov/books/"',
      `status: ${q(n.status)}`,
    ];
    if (n.stale_after) fm.push(`stale_after: "${n.stale_after}"`);
    if (n.amplifies) fm.push(`amplifies: [${n.amplifies.map((x) => `"${x}"`).join(', ')}]`);
    if (n.inhibits) fm.push(`inhibits: [${n.inhibits.map((x) => `"${x}"`).join(', ')}]`);
    if (n.triggered_by) fm.push(`triggered_by: [${n.triggered_by.map((x) => `"${x}"`).join(', ')}]`);
    if (n.mitigates) fm.push(`mitigates: [${n.mitigates.map((x) => `"${x}"`).join(', ')}]`);
    if (n.contrasts_with) fm.push(`contrasts_with: [${n.contrasts_with.map((x) => `"${x}"`).join(', ')}]`);
    fm.push(
      `tags: ["feedback-loops", "systems-biology", "earth-science", "${n.dir}"]`,
      ...feedbackSource,
      'verified:',
      '  - by: "human:systems-science-panel"',
      '    at: "2026-07-31T00:00:00Z"',
    );
    writeConcept(c, `${n.dir}/${n.id}.md`, fm, [
      `# ${n.title}`,
      '',
      n.desc,
      '',
      '## Coupled Reservoirs, Pathways & Feedbacks',
      ...n.links.map((l) => `- [[${l}]]`),
    ]);
  }

  // Attested Computations (3)
  const bioComps = [
    {
      id: 'myhre-co2-radiative-forcing-log-law',
      title: 'Myhre–IPCC Logarithmic CO2 Radiative Forcing & Equilibrium Climate Sensitivity',
      desc: 'Sanctioned atmospheric physics SQL computation evaluating radiative forcing Delta_F = 5.35 * ln(C / C_0) W/m2 and net Planck + fast-feedback temperature response.',
      params: ['preindustrial_co2_ppm: "278.0"', 'planck_response_wm2_k: "3.2"'],
      links: ['atmospheric-co2-methane-pool', 'anthropogenic-fossil-carbon-flux', 'water-vapor-lapse-rate-feedback', 'planck-blackbody-radiative-damping'],
      sql: [
        'SELECT year, co2_ppm,',
        '       5.35 * LN(co2_ppm / 278.0) AS radiative_forcing_wm2,',
        '       (5.35 * LN(co2_ppm / 278.0)) / NULLIF(3.2 - fast_positive_feedback_wm2_k, 0) AS equilibrium_delta_t_k',
        'FROM atmospheric_carbon_observatory;',
      ],
    },
    {
      id: 'revelle-buffer-factor-ocean-acidification',
      title: 'Ocean Carbonate Revelle Buffer Factor & Aragonite Saturation Horizon Audit',
      desc: 'Sanctioned marine chemistry query tracking the Revelle factor (d[CO2]/CO2) / (d[DIC]/DIC) as surface carbonate ions are titrated by anthropogenic CO2 uptake.',
      params: ['critical_revelle_threshold: "12.0"', 'min_omega_aragonite: "1.5"'],
      links: ['surface-ocean-mixed-layer', 'marine-biological-carbon-pump', 'coral-reef-thermal-bleaching-threshold', 'marine-alkalinity-enhancement', 'bohr-haldane-hemoglobin-allostery'],
      sql: [
        'SELECT station_id, sea_surface_temp_c, dic_umol_kg, talk_umol_kg, revelle_factor, omega_aragonite',
        'FROM global_ocean_ship_hydrography',
        'WHERE revelle_factor > 12.0 OR omega_aragonite < 1.5;',
      ],
    },
    {
      id: 'homa-ir-homeostatic-model-assessment',
      title: 'HOMA-IR & Disposition Index Glycemic Feedback Loop Gain Computation',
      desc: 'Sanctioned endocrinology SQL computation evaluating Homeostatic Model Assessment of Insulin Resistance (Fasting Glucose * Fasting Insulin / 405) to detect hyperbolic beta-cell loop degradation.',
      params: ['normal_homa_ir_ceiling: "2.5"', 'fasting_glucose_mg_dl_ceiling: "100.0"'],
      links: ['blood-plasma-glucose-pool', 'pancreatic-beta-cell-insulin-cascade', 'insulin-glucagon-glycemic-homeostasis', 'glp1-receptor-agonist-incretin-modulation'],
      sql: [
        'SELECT patient_cohort_id, fasting_glucose_mg_dl, fasting_insulin_uiu_ml,',
        '       (fasting_glucose_mg_dl * fasting_insulin_uiu_ml) / 405.0 AS homa_ir_score',
        'FROM metabolic_clamp_registry',
        'WHERE (fasting_glucose_mg_dl * fasting_insulin_uiu_ml) / 405.0 > 2.5;',
      ],
    },
  ];

  for (const comp of bioComps) {
    writeConcept(c, `computations/${comp.id}.md`, [
      'type: "Attested Computation"',
      `title: "${comp.title}"`,
      `description: "${comp.desc}"`,
      'runtime: "bigquery-sql"',
      'parameters:',
      ...comp.params.map((p) => `  ${p}`),
      'executor: "process:earth-bio-telemetry-engine"',
      'attester: "process:systems-flux-attester"',
      'status: "stable"',
      ...feedbackSource,
      'verified:',
      '  - by: "human:systems-science-panel"',
      '    at: "2026-07-31T00:00:00Z"',
    ], [
      `# ${comp.title}`,
      '',
      comp.desc,
      '',
      '## Linked Reservoirs, Pathways & Feedbacks',
      ...comp.links.map((l) => `- [[${l}]]`),
      '',
      '```sql',
      ...comp.sql,
      '```',
    ]);
  }

  // Guided Tours (3)
  const bioTours = [
    {
      id: 'tour-planetary-thermostats-and-tipping-points',
      title: 'Tour: Planetary Thermostats vs. Amplifying Cascades — Earth\'s Climate Feedback Graph',
      desc: 'Explores the tug-of-war between Earth\'s stabilizing negative feedbacks (Planck blackbody radiation and the multimillion-year Urey silicate weathering thermostat) and fast amplifying feedbacks (ice-albedo, water vapor, permafrost methane) leading to tipping points.',
      steps: ['atmospheric-co2-methane-pool', 'anthropogenic-fossil-carbon-flux', 'myhre-co2-radiative-forcing-log-law', 'planck-blackbody-radiative-damping', 'silicate-carbonate-weathering-cycle', 'water-vapor-lapse-rate-feedback', 'cryosphere-sea-ice-sheets', 'ice-albedo-positive-feedback', 'arctic-boreal-permafrost-carbon', 'permafrost-methane-clathrate-feedback', 'atlantic-meridional-overturning-circulation', 'amoc-thermohaline-bistable-collapse', 'direct-air-capture-mineralization'],
    },
    {
      id: 'tour-human-homeostasis-vs-runaway-pathology',
      title: 'Tour: Walter Cannon\'s Wisdom of the Body — Glycemic & Hemodynamic Homeostasis vs. Runaway Shock',
      desc: 'Walks how antagonistic hormonal and autonomic negative feedback loops (Insulin–Glucagon and Carotid Baroreceptors + RAAS) keep blood glucose and arterial pressure stable, and what happens when positive-feedback tipping points (DKA and decompensated shock) take over.',
      steps: ['blood-plasma-glucose-pool', 'postprandial-carbohydrate-load', 'pancreatic-beta-cell-insulin-cascade', 'hepatic-glycogenolysis-gluconeogenesis', 'insulin-glucagon-glycemic-homeostasis', 'homa-ir-homeostatic-model-assessment', 'diabetic-ketoacidosis-runaway-lipolysis', 'glp1-receptor-agonist-incretin-modulation', 'closed-loop-artificial-pancreas-pid', 'baroreceptor-arterial-pressure-reflex', 'renin-angiotensin-aldosterone-system', 'decompensated-hemorrhagic-shock-cascade'],
    },
    {
      id: 'tour-universal-cybernetics-of-earth-and-body',
      title: 'Tour: Isomorphic Buffer Chemistry — From Blood Hemoglobin & Bicarbonate to Ocean Acidification',
      desc: 'Cross-domain synthesis comparing carbonic-acid buffering in human arterial blood (Bohr/Haldane effect) with the surface ocean carbonate buffer (Revelle factor), coral bleaching thresholds, and synthetic PID control.',
      steps: ['arterial-blood-gas-o2-co2-buffer', 'bohr-haldane-hemoglobin-allostery', 'high-altitude-hypobaric-hypoxia', 'surface-ocean-mixed-layer', 'marine-biological-carbon-pump', 'revelle-buffer-factor-ocean-acidification', 'coral-reef-thermal-bleaching-threshold', 'marine-alkalinity-enhancement', 'closed-loop-artificial-pancreas-pid'],
    },
  ];

  for (const t of bioTours) {
    writeConcept(c, `tours/${t.id}.md`, [
      'type: "Tour"',
      `title: "${t.title}"`,
      `description: "${t.desc}"`,
      'status: "stable"',
      `steps: [${t.steps.map((x) => `"${x}"`).join(', ')}]`,
      ...feedbackSource,
      'verified:',
      '  - by: "human:systems-science-panel"',
      '    at: "2026-07-31T00:00:00Z"',
    ], [
      `# ${t.title}`,
      '',
      t.desc,
      '',
      '## Episode / Tour Sequence',
      ...t.steps.map((s, idx) => `${idx + 1}. [[${s}]]`),
    ]);
  }
}

buildNistAiRmf();
buildIetfRfcs();
buildCybersecurity();
buildClassicalMythology();
buildSpaceflightMishaps();
buildCyberneticsAiEthics();
buildEarthBioFeedback();
console.log('Successfully generated all 7 public-domain corpora under corpora/.');
