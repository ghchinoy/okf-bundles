#!/usr/bin/env bash
# Builds, validates, reviews, graphs, and projects all OKF v0.2 bundles from corpora/.
#
# Prerequisites:
#   - `binder` must be installed globally on PATH (e.g., `brew install ghchinoy/tap/binder`
#     or downloaded from https://github.com/ghchinoy/binder/releases), OR specified via
#     the BINDER_BIN environment variable (`BINDER_BIN=/path/to/binder ./scripts/build.sh`).
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
BINDER="${BINDER_BIN:-binder}"
if ! command -v "$BINDER" >/dev/null 2>&1; then
  echo "Error: '$BINDER' not found on PATH." >&2
  echo "Install binder globally via: brew install ghchinoy/tap/binder" >&2
  echo "Or download a release binary: https://github.com/ghchinoy/binder/releases" >&2
  echo "Or pass a custom binary path: BINDER_BIN=/path/to/binder ./scripts/build.sh" >&2
  exit 1
fi
export SOURCE_DATE_EPOCH="${SOURCE_DATE_EPOCH:-1785456000}" # 2026-07-31T00:00:00Z

CORPORA=(
  "nist-ai-rmf"
  "ietf-rfcs"
  "cybersecurity-cwe-attack"
  "classical-mythology"
  "spaceflight-mishaps"
  "cybernetics-ai-ethics"
  "earth-bio-feedback"
)

FM_REF_KEYS="parent,related,prerequisite,supersedes,contrasts_with,mitigates,triggered_by,amplifies,inhibits,steps"

for name in "${CORPORA[@]}"; do
  src="$ROOT/corpora/$name"
  out="$ROOT/bundles/$name"
  proj="$ROOT/projections/$name"

  echo "=== Building & verifying $name ==="

  # 1. Lint source corpus (--strict, using 1960-01-01 baseline so intentionally deprecated historical specs/subsystems do not gate lint before conversion)
  "$BINDER" lint --strict --today "1960-01-01" "$src" >/dev/null

  # 2. Convert source corpus into an OKF v0.2 bundle with catalog & graph annotations
  rm -rf "$out"
  "$BINDER" convert "$src" -o "$out" \
    --fm-ref-keys "$FM_REF_KEYS" \
    --group-by-type \
    --include-graph \
    --include-backlinks >/dev/null

  # 3. Validate emitted OKF v0.2 bundle (--strict gates on any trust/actor advisories)
  "$BINDER" validate --strict "$out"

  # 4. Review bundle with minimum trust-tier gate
  "$BINDER" review --require-tier machine-confirmed "$out" >/dev/null

  # 5. Export graph visualizations (JSON, DOT, HTML) into projections/<name>/
  #    so bundles/<name>/ contains ONLY pure OKF .md files.
  rm -rf "$proj"
  "$BINDER" project "$out" --target spanner --out "$proj" --today "2026-07-31" >/dev/null
  "$BINDER" graph --format json "$out" > "$proj/graph.json"
  "$BINDER" graph --format dot  "$out" > "$proj/graph.dot"
  "$BINDER" graph --format html "$out" > "$proj/viz.html"
done

echo "All ${#CORPORA[@]} bundles built, validated (--strict), reviewed, graphed, and projected!"
