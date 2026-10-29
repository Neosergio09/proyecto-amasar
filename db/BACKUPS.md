# Copias de seguridad de la BD

El workflow `.github/workflows/backup-bd.yml` hace una copia diaria (03:00 de Bogotá) con
`supabase db dump`: roles, esquema y datos (incluye `auth.users`). No incluye los archivos
de Storage (imágenes de productos).

La copia se sube cifrada como artifact del run y se guarda 30 días:
GitHub → Actions → **Backup BD** → el run del día → Artifacts.

## Secretos necesarios (Settings → Secrets and variables → Actions)

| Secreto | Valor |
| :--- | :--- |
| `SUPABASE_DB_URL` | Supabase → **Connect** → *Session pooler* (URI con la contraseña de la BD) |
| `BACKUP_PASSPHRASE` | Contraseña larga para cifrar. Guárdala fuera de GitHub: sin ella la copia no sirve |

## Restaurar

```sh
gpg --decrypt amasar-bd-AAAA-MM-DD/backup.tar.gz.gpg | tar -xzf - -C restaurar/
psql --single-transaction --variable ON_ERROR_STOP=1 \
  --file restaurar/roles.sql \
  --file restaurar/schema.sql \
  --command 'SET session_replication_role = replica' \
  --file restaurar/data.sql \
  --dbname "<URI de la BD destino>"
```

Restaurar sobre un proyecto nuevo de Supabase, nunca encima del de producción.
