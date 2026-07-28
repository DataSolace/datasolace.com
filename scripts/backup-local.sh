#!/usr/bin/env bash
set -euo pipefail

STACK=${1:-production}
STAMP=$(date -u +%Y%m%dT%H%M%SZ)
BACKUP_ROOT=${BACKUP_ROOT:-.local-backups/payload}
mkdir -p "$BACKUP_ROOT/$STACK/$STAMP"

case "$STACK" in
  production)
    DB_SERVICE=postgres
    DB_USER=payload
    MEDIA_VOLUME=datasolace-com_media_uploads
    ;;
  staging)
    DB_SERVICE=staging-postgres
    DB_USER=payload
    MEDIA_VOLUME=datasolace-com_staging_media_uploads
    ;;
  *)
    echo "Usage: $0 [production|staging]" >&2
    exit 2
    ;;
esac

DB_OUT="$BACKUP_ROOT/$STACK/$STAMP/postgres.dump"
MEDIA_OUT="$BACKUP_ROOT/$STACK/$STAMP/media.tar.gz"

docker compose exec -T "$DB_SERVICE" pg_dump -U "$DB_USER" -d payload -Fc > "$DB_OUT"
docker run --rm -v "${MEDIA_VOLUME}:/media:ro" -v "$(pwd)/$BACKUP_ROOT/$STACK/$STAMP:/backup" alpine:3.20 \
  tar -czf /backup/media.tar.gz -C /media .

echo "Backup written: $BACKUP_ROOT/$STACK/$STAMP"
echo "  database: $DB_OUT"
echo "  media:    $MEDIA_OUT"
