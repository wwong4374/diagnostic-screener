#!/bin/bash

set -e
if [ -f .env ]; then
  export $(grep -v '^#' .env | xargs)
fi

: "${PGUSER:=postgres}"
: "${PGHOST:=localhost}"
: "${PGPORT:=5432}"


psql -U "$PGUSER" -h "$PGHOST" -p "$PGPORT" -d postgres -f "schema.sql"