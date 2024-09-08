-- name: GetUrl :one
SELECT
    *
FROM
    urls
WHERE
    id = $1
LIMIT
    1;

-- name: GetFreeUrl :one
SELECT
    *
FROM
    urls
WHERE
    email_id IS NULL
LIMIT
    1;

-- name: GetUrlFromEmailId :one
SELECT
    *
FROM
    urls
WHERE
    email_id = $1
LIMIT
    1;

-- name: ListUrls :many
SELECT
    *
FROM
    urls
ORDER BY
    id;

-- name: CreateUrl :one
INSERT INTO
    urls (path, email_id)
VALUES
    ($1, $2)
RETURNING
    *;

-- name: CreateUrls :many
INSERT INTO
    urls (path, email_id)
VALUES (
    UNNEST(sqlc.arg(path)::text[]),
    UNNEST(sqlc.arg(email_id)::int[])
)
ON CONFLICT DO NOTHING
RETURNING
    *;

-- name: UpdateUrl :one
UPDATE urls
SET
    path = $2,
    email_id = $3
WHERE
    id = $1
RETURNING
    *;

-- name: DeleteUrl :exec
DELETE FROM urls
WHERE
    id = $1;

-- name: FreeUrls :exec
UPDATE urls
SET
    email_id = NULL
WHERE
    id = ANY (sqlc.arg(ids)::int[]);

-- name: UseUrl :one
UPDATE urls
SET
    email_id = sqlc.arg(email_id)
WHERE
    id = sqlc.arg(url_id)
RETURNING
    *;
