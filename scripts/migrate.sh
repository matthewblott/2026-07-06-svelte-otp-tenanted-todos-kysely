#!/usr/bin/env bash

set -e

GOOSE_DRIVER=sqlite3
MIGRATIONS_DIR=../migrations/tenants

for db_file in ../storage/tenants/*.sqlite3; do
  echo "Migrating $db_file..."
  GOOSE_DBSTRING="$db_file" goose -dir "$MIGRATIONS_DIR" "$GOOSE_DRIVER" up
done
