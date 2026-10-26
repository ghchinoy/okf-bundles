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
    'An OKF v0.2 **Attested Computation** implementing quantitative fairness evaluation for [[measure-1]] and [[fair-with-harmful-bias-managed]] under the [[measure]] function.',
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
    'An OKF v0.2 **Attested Computation** supporting continuous monitoring in [[measure-3]] and [[valid-and-reliable]] under [[measure]].',
    '',
    '```sql',
    'SELECT SUM((actual_pct - expected_pct) * LN(actual_pct / NULLIF(expected_pct, 0))) AS psi_score',
    'FROM prediction_decile_distributions;',
    '```',
  ]);
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
      links: ['rfc9111', 'rfc9113', 'rfc9114', 'rfc8446', 'rfc3986', 'rfc2616', 'rfc9457'],
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
      links: ['rfc6749', 'rfc6750', 'rfc7636'],
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
    { id: 't1190', dir: 'techniques', type: 'Technique', title: 'T1190: Exploit Public-Facing Application', desc: 'Adversaries may attempt to exploit a weakness in an Internet-facing host or system to initially access a network.', url: 'https://attack.mitre.org/techniques/T1190/', links: ['cwe-79', 'cwe-89', 'cwe-78', 'cwe-22', 'cwe-502', 'cwe-918', 'm1050', 'm1037'], tags: ['attack', 'initial-access'] },
    { id: 't1059', dir: 'techniques', type: 'Technique', title: 'T1059: Command and Scripting Interpreter', desc: 'Adversaries may abuse command and script interpreters to execute commands, scripts, or binaries.', url: 'https://attack.mitre.org/techniques/T1059/', links: ['cwe-78', 'cwe-502', 'm1022'], tags: ['attack', 'execution'] },
    { id: 't1078', dir: 'techniques', type: 'Technique', title: 'T1078: Valid Accounts', desc: 'Adversaries may obtain and abuse credentials of existing accounts as a means of gaining Initial Access, Persistence, Privilege Escalation, or Defense Evasion.', url: 'https://attack.mitre.org/techniques/T1078/', links: ['cwe-287', 't1552', 'm1032', 'impossible-travel-detection'], tags: ['attack', 'credential-access', 'persistence'] },
    { id: 't1552', dir: 'techniques', type: 'Technique', title: 'T1552: Unsecured Credentials', desc: 'Adversaries may search compromised systems or cloud metadata endpoints to find and obtain insecurely stored credentials.', url: 'https://attack.mitre.org/techniques/T1552/', links: ['cwe-918', 't1078', 'm1022', 'm1037'], tags: ['attack', 'credential-access'] },
    // Mitigations & Controls
    { id: 'm1050', dir: 'mitigations', type: 'Mitigation', title: 'M1050: Exploit Protection & Input Validation', desc: 'Use capabilities to detect and block conditions that may lead to or be indicative of a software exploit, paired with strict allowlist input validation.', url: 'https://attack.mitre.org/mitigations/M1050/', links: ['cwe-79', 'cwe-89', 'cwe-78', 'cwe-502', 'parameterized-queries', 'csp-header-policy'], tags: ['mitigation', 'appsec'] },
    { id: 'm1032', dir: 'mitigations', type: 'Mitigation', title: 'M1032: Multi-Factor Authentication (MFA)', desc: 'Require two or more pieces of evidence to authenticate to a system, prioritizing phishing-resistant FIDO2/WebAuthn passkeys.', url: 'https://attack.mitre.org/mitigations/M1032/', links: ['cwe-287', 't1078', 'impossible-travel-detection'], tags: ['mitigation', 'mfa', 'authentication'] },
    { id: 'm1022', dir: 'mitigations', type: 'Mitigation', title: 'M1022: Restrict File and Directory Permissions', desc: 'Restrict access by setting directory and file permissions that are not specific to users or privileged accounts, and enforce chroot/root-jail boundaries.', url: 'https://attack.mitre.org/mitigations/M1022/', links: ['cwe-22', 't1059', 't1552'], tags: ['mitigation', 'least-privilege'] },
    { id: 'm1037', dir: 'mitigations', type: 'Mitigation', title: 'M1037: Filter Network Traffic & Egress Allowlisting', desc: 'Use network appliances and host-level egress allowlists (e.g., blocking 169.254.169.254 IMDSv1) to filter ingress and egress traffic.', url: 'https://attack.mitre.org/mitigations/M1037/', links: ['cwe-918', 't1190', 't1552'], tags: ['mitigation', 'network-security', 'ssrf-defense'] },
    { id: 'parameterized-queries', dir: 'mitigations', type: 'Mitigation', title: 'Parameterized Queries (Prepared Statements)', desc: 'Separate SQL code structure from user-supplied data parameters so that input is never interpreted as SQL commands.', url: 'https://cheatsheetseries.owasp.org/cheatsheets/SQL_Injection_Prevention_Cheat_Sheet.html', links: ['cwe-89', 'm1050'], tags: ['owasp', 'sqli-defense'] },
    { id: 'csp-header-policy', dir: 'mitigations', type: 'Mitigation', title: 'Strict Content-Security-Policy (CSP)', desc: 'Enforce nonce-based or hash-based Content-Security-Policy headers (script-src, object-src none) to neutralize reflected and stored XSS.', url: 'https://cheatsheetseries.owasp.org/cheatsheets/Content_Security_Policy_Cheat_Sheet.html', links: ['cwe-79', 'm1050'], tags: ['owasp', 'xss-defense', 'csp'] },
  ];

  for (const it of items) {
    writeConcept(c, `${it.dir}/${it.id}.md`, [
      `type: "${it.type}"`,
      `title: "${it.title}"`,
      `description: "${it.desc}"`,
      `resource: "${it.url}"`,
      'status: "stable"',
      `tags: [${it.tags.map((t) => `"${t}"`).join(', ')}]`,
      'sources:',
      `  - id: "${it.id}"`,
      `    resource: "${it.url}"`,
      `    title: "${it.title}"`,
      '    author: "process:mitre-cti"',
      'verified:',
      '  - by: "process:mitre-stix-validator"',
      '    at: "2026-07-31T00:00:00Z"',
    ], [
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
    { id: 'zeus', dir: 'deities', type: 'Deity', title: 'Zeus (Jupiter)', desc: 'King of the Olympian gods, ruler of Mount Olympus, and god of the sky, lightning, thunder, law, and order.', links: ['hera', 'athena', 'apollo', 'artemis', 'hermes', 'heracles', 'perseus', 'mount-olympus', 'aegis', 'trojan-war'] },
    { id: 'hera', dir: 'deities', type: 'Deity', title: 'Hera (Juno)', desc: 'Queen of the Olympian gods, goddess of marriage, women, childbirth, and family, and sister-wife of Zeus.', links: ['zeus', 'mount-olympus', 'heracles', 'jason', 'trojan-war', 'twelve-labors-of-heracles'] },
    { id: 'poseidon', dir: 'deities', type: 'Deity', title: 'Poseidon (Neptune)', desc: 'Olympian god of the sea, storms, earthquakes, and horses; brother of Zeus and Hades.', links: ['zeus', 'hades', 'athena', 'odysseus', 'odyssey', 'trojan-war', 'mount-olympus'] },
    { id: 'hades', dir: 'deities', type: 'Deity', title: 'Hades (Pluto)', desc: 'Lord of the Underworld and ruler of the dead; brother of Zeus and Poseidon.', links: ['zeus', 'poseidon', 'underworld', 'heracles', 'twelve-labors-of-heracles', 'hermes'] },
    { id: 'athena', dir: 'deities', type: 'Deity', title: 'Athena (Minerva)', desc: 'Virgin goddess of wisdom, handicraft, and strategic warfare, sprung fully armed from the forehead of Zeus.', links: ['zeus', 'poseidon', 'odysseus', 'perseus', 'jason', 'aegis', 'trojan-war', 'odyssey', 'quest-for-the-golden-fleece', 'mount-olympus'] },
    { id: 'apollo', dir: 'deities', type: 'Deity', title: 'Apollo', desc: 'Olympian god of music, prophecy, truth, healing, the sun, and archery; twin brother of Artemis and patron of Delphi.', links: ['zeus', 'artemis', 'delphi', 'achilles', 'trojan-war', 'troy', 'mount-olympus'] },
    { id: 'artemis', dir: 'deities', type: 'Deity', title: 'Artemis (Diana)', desc: 'Olympian goddess of the hunt, the wilderness, wild animals, and the moon; twin sister of Apollo.', links: ['zeus', 'apollo', 'heracles', 'twelve-labors-of-heracles', 'trojan-war', 'mount-olympus'] },
    { id: 'hermes', dir: 'deities', type: 'Deity', title: 'Hermes (Mercury)', desc: 'Herald and messenger of the Olympian gods, guide of souls to the Underworld (Psychopompos), and patron of travelers.', links: ['zeus', 'hades', 'perseus', 'odysseus', 'underworld', 'odyssey', 'mount-olympus'] },
    // Heroes
    { id: 'odysseus', dir: 'heroes', type: 'Hero', title: 'Odysseus (Ulysses)', desc: 'King of Ithaca renowned for his intellect, cunning, the Trojan Horse stratagem, and his ten-year homeward voyage.', links: ['athena', 'poseidon', 'hermes', 'achilles', 'trojan-war', 'odyssey', 'troy', 'ithaca'] },
    { id: 'achilles', dir: 'heroes', type: 'Hero', title: 'Achilles', desc: 'Greatest warrior of the Achaeans in the Trojan War, son of Peleus and the sea-nymph Thetis, central figure of Homer\'s Iliad.', links: ['apollo', 'odysseus', 'trojan-war', 'troy'] },
    { id: 'heracles', dir: 'heroes', type: 'Hero', title: 'Heracles (Hercules)', desc: 'Divine hero, son of Zeus and Alcmene, famed for his extraordinary strength and the completion of the Twelve Labors.', links: ['zeus', 'hera', 'athena', 'hades', 'jason', 'twelve-labors-of-heracles', 'quest-for-the-golden-fleece', 'underworld'] },
    { id: 'perseus', dir: 'heroes', type: 'Hero', title: 'Perseus', desc: 'Legendary founder of Mycenae and slayer of the Gorgon Medusa, aided by Athena and Hermes.', links: ['zeus', 'athena', 'hermes', 'aegis'] },
    { id: 'jason', dir: 'heroes', type: 'Hero', title: 'Jason', desc: 'Leader of the Argonauts on the voyage of the Argo to recover the Golden Fleece from Colchis.', links: ['hera', 'athena', 'heracles', 'quest-for-the-golden-fleece', 'golden-fleece'] },
    // Places
    { id: 'mount-olympus', dir: 'places', type: 'Place', title: 'Mount Olympus', desc: 'Highest mountain in Greece and throne of the Twelve Olympian deities ruled by Zeus and Hera.', links: ['zeus', 'hera', 'poseidon', 'athena', 'apollo', 'artemis', 'hermes'] },
    { id: 'underworld', dir: 'places', type: 'Place', title: 'The Underworld (Hades)', desc: 'Realm of the dead bounded by the rivers Styx and Acheron, ruled by Hades and Persephone.', links: ['hades', 'hermes', 'heracles', 'odysseus', 'odyssey', 'twelve-labors-of-heracles'] },
    { id: 'troy', dir: 'places', type: 'Place', title: 'Troy (Ilium)', desc: 'Ancient fortified city in Anatolia besieged by the Achaeans during the ten-year Trojan War.', links: ['trojan-war', 'achilles', 'odysseus', 'apollo', 'poseidon', 'athena'] },
    { id: 'delphi', dir: 'places', type: 'Place', title: 'Oracle of Delphi', desc: 'Sacred precinct on Mount Parnassus where the Pythia delivered prophecies inspired by Apollo.', links: ['apollo', 'heracles', 'twelve-labors-of-heracles', 'odysseus'] },
    { id: 'ithaca', dir: 'places', type: 'Place', title: 'Ithaca', desc: 'Ionian island kingdom of Odysseus, Penelope, and Telemachus, destination of the Odyssey.', links: ['odysseus', 'odyssey', 'athena'] },
    // Events / Quests & Artifacts
    { id: 'trojan-war', dir: 'quests', type: 'Quest', title: 'The Trojan War', desc: 'Ten-year expedition of the Achaean coalition against the city of Troy, culminating in Odysseus\'s Trojan Horse.', links: ['troy', 'achilles', 'odysseus', 'zeus', 'hera', 'athena', 'apollo', 'poseidon', 'odyssey'] },
    { id: 'odyssey', dir: 'quests', type: 'Quest', title: 'The Odyssey (Voyage of Odysseus)', desc: 'Ten-year perilous return journey of Odysseus from the fall of Troy back to Ithaca.', links: ['odysseus', 'ithaca', 'troy', 'trojan-war', 'athena', 'poseidon', 'hermes', 'underworld'] },
    { id: 'twelve-labors-of-heracles', dir: 'quests', type: 'Quest', title: 'The Twelve Labors of Heracles', desc: 'Series of twelve penitential feats imposed by King Eurystheus upon Heracles under the influence of Hera.', links: ['heracles', 'hera', 'zeus', 'athena', 'hades', 'artemis', 'delphi', 'underworld'] },
    { id: 'quest-for-the-golden-fleece', dir: 'quests', type: 'Quest', title: 'Quest of the Argonauts for the Golden Fleece', desc: 'Maritime expedition led by Jason aboard the Argo to Colchis to retrieve the Golden Fleece.', links: ['jason', 'heracles', 'hera', 'athena', 'golden-fleece'] },
    { id: 'golden-fleece', dir: 'artifacts', type: 'Artifact', title: 'The Golden Fleece', desc: 'Fleece of the gold-haired winged ram Chrysomallus, symbol of kingship and authority sought by Jason and the Argonauts.', links: ['jason', 'quest-for-the-golden-fleece', 'zeus', 'hera'] },
    { id: 'aegis', dir: 'artifacts', type: 'Artifact', title: 'The Aegis', desc: 'Divine shield or breastplate borne by Zeus and Athena, mounted with the head of the Gorgon Medusa given by Perseus.', links: ['zeus', 'athena', 'perseus'] },
  ];

  for (const n of nodes) {
    writeConcept(c, `${n.dir}/${n.id}.md`, [
      `type: "${n.type}"`,
      `title: "${n.title}"`,
      `description: "${n.desc}"`,
      'resource: "https://www.gutenberg.org/ebooks/4928"',
      'status: "stable"',
      `tags: ["mythology", "${n.dir}", "public-domain"]`,
      ...gutenbergSource,
      'verified:',
      '  - by: "human:classical-corpus-curator"',
      '    at: "2026-07-31T00:00:00Z"',
    ], [
      `# ${n.title}`,
      '',
      n.desc,
      '',
      '## Mythological Relationships',
      ...n.links.map((l) => `- [[${l}]]`),
    ]);
  }
}

buildNistAiRmf();
buildIetfRfcs();
buildCybersecurity();
buildClassicalMythology();
console.log('Successfully generated all 4 public-domain corpora under corpora/.');
