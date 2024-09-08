-- name: GetEmail :one
SELECT
    *
FROM
    emails
WHERE
    id = $1
LIMIT
    1;

-- name: LRGetEmail :many
SELECT
    sqlc.embed(emails),
    sqlc.embed(attachments),
    sqlc.embed(urls)
FROM emails
    JOIN attachments ON emails.id = attachments.email_id
    JOIN urls ON emails.id = urls.email_id
WHERE
    emails.id = $1
LIMIT
    1;

-- name: GetEmailByHash :one
SELECT
    *
FROM
    emails
WHERE email_hash = sqlc.arg(email_hash)
LIMIT
    1;

-- name: ListEmails :many
SELECT
    *
FROM
    emails
ORDER BY
    id;

-- name: LRListEmails :many
SELECT
    sqlc.embed(emails),
    sqlc.embed(attachments),
    sqlc.embed(urls)
FROM emails
    JOIN attachments ON emails.id = attachments.email_id
    JOIN urls ON emails.id = urls.email_id
ORDER BY
    emails.id;

-- name: ListEmailsByDate :many
SELECT
    *
FROM
    emails
WHERE
    created_at >= $1
ORDER BY
    id;

-- name: LRListEmailsByDate :many
SELECT
    sqlc.embed(emails),
    sqlc.embed(attachments),
    sqlc.embed(urls)
FROM emails
    JOIN attachments ON emails.id = attachments.email_id
    JOIN urls ON emails.id = urls.email_id
WHERE
    emails.created_at >= $1
ORDER BY
    emails.id;

-- name: CreateEmail :one
INSERT INTO
    emails (
        owner_address,
        email_subject,
        email_html,
        email_hash
    )
VALUES
    ($1, $2, $3, $4)
RETURNING
    *;

-- name: UpdateEmail :one
UPDATE emails
SET
    owner_address = $2,
    email_subject = $3,
    email_html  = $4,
    email_hash = $5
WHERE
    id = $1
RETURNING
    *;

-- name: DeleteEmail :exec
DELETE FROM emails
WHERE
    id = $1;

-- name: DeleteEmails :exec
DELETE FROM emails
WHERE
    id = ANY (sqlc.arg(ids)::int[]);