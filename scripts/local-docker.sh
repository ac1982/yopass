#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

"$SCRIPT_DIR/local-docker-build.sh"
"$SCRIPT_DIR/local-docker-start.sh"
