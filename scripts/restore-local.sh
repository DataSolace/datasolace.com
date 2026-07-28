#!/usr/bin/env bash
set -euo pipefail

STACK=${1:-}
BACKUP_DIR=${2:-}

if [[ -z "$STACK" || -z "$BACKUP_DIR" ]]; then
  echo "Usage: $0 [production|staging] .local-backups/payload/<stack>/<timestamp>" >&2
  exit 2
fi

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
    echo "Usage: $0 [production|staging] <backup-dir>" >&2
    exit 2
    ;;
esac

if [[ ! -f "$BACKUP_DIR/postgres.dump" || ! -f "$BACKUP_DIR/media.tar.gz" ]]; then
  echo "Backup directory must contain postgres.dump and media.tar.gz" >&2
  exit 1
fi

echo "Restoring $STACK database from $BACKUP_DIR/postgres.dump"
docker compose exec -T "$DB_SERVICE" dropdb -U "$DB_USER" --if-exists payload
docker compose exec -T "$DB_SERVICE" createdb -U "$DB_USER" payload
docker compose exec -T "$DB_SERVICE" pg_restore -U "$DB_USER" -d payload --clean --if-exists < "$BACKUP_DIR/postgres.dump"

echo "Restoring $STACK media volume from $BACKUP_DIR/media.tar.gz"
docker run --rm -v "${MEDIA_VOLUME}:/media" -v "$(pwd)/$BACKUP_DIR:/backup:ro" alpine:3.20 sh -c 'rm -rf /media/* && tar -xzf /backup/media.tar.gz -C /media'

echo "Restore complete"
