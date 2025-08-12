#!/bin/bash
set -euo pipefail

echo Adding Index for Migration

# get latest file in migrations dir
latestMigration=$(ls src/migrations | tail -2 | head -1)

# append to index.ts file exporting it again
cleanMigrationName=${latestMigration%.ts}

echo "export * from './$cleanMigrationName';" >> src/migrations/index.ts