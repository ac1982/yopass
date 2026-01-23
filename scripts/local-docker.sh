#!/usr/bin/env bash
set -euo pipefail

step() { printf "\n==> %s\n" "$1"; }
fail() { printf "\n!! %s\n" "$1" >&2; exit 1; }

ROOT="$(git rev-parse --show-toplevel 2>/dev/null || true)"
[[ -n "$ROOT" ]] || fail "not inside a git repo"

COMPOSE_FILE="$ROOT/deploy/docker-compose/insecure/docker-compose.yml"
[[ -f "$COMPOSE_FILE" ]] || fail "missing $COMPOSE_FILE"

if ! grep -q "image: mirage" "$COMPOSE_FILE"; then
  fail "compose is not configured for local image; set image: mirage"
fi
if ! grep -q "build: ../../.." "$COMPOSE_FILE"; then
  fail "compose is missing build context; add build: ../../.."
fi

if command -v docker-compose >/dev/null 2>&1; then
  COMPOSE=(docker-compose)
elif docker compose version >/dev/null 2>&1; then
  COMPOSE=(docker compose)
else
  fail "docker compose not available; install docker-compose or Docker Desktop"
fi

step "Build local image (mirage)"
docker build -t mirage "$ROOT"

step "Start containers"
"${COMPOSE[@]}" -f "$COMPOSE_FILE" up -d

step "Status"
"${COMPOSE[@]}" -f "$COMPOSE_FILE" ps

echo "OK: mirage running at http://localhost"
echo "Hint: to clean unused layers run: docker system prune -f"
