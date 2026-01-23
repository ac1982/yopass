#!/usr/bin/env bash
set -euo pipefail

step() { printf "\n==> %s\n" "$1"; }
fail() { printf "\n!! %s\n" "$1" >&2; exit 1; }

ROOT="$(git rev-parse --show-toplevel 2>/dev/null || true)"
[[ -n "$ROOT" ]] || fail "not inside a git repo"

COMPOSE_FILE="$ROOT/deploy/docker-compose/insecure/docker-compose.yml"
[[ -f "$COMPOSE_FILE" ]] || fail "missing $COMPOSE_FILE"

if command -v docker-compose >/dev/null 2>&1; then
  COMPOSE=(docker-compose)
elif docker compose version >/dev/null 2>&1; then
  COMPOSE=(docker compose)
else
  fail "docker compose not available; install docker-compose or Docker Desktop"
fi

step "Stop containers"
"${COMPOSE[@]}" -f "$COMPOSE_FILE" down

echo "OK: containers stopped"
