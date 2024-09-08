-- name: GetAttachment :one
SELECT
    *
FROM
    attachments
WHERE
    id = $1
LIMIT
    1;

-- name: ListAttachments :many
SELECT
    *
FROM
    attachments
ORDER BY
    id;

-- name: CreateAttachment :one
INSERT INTO
    attachments (name, attachment_url, preview_url, size, mime_type, email_id)
VALUES
    ($1, $2, $3, $4, $5, $6)
RETURNING
    *;

-- name: UpdateAttachment :one
UPDATE attachments
SET
    name = $2,
    attachment_url = $3,
    preview_url = $4,
    size = $5,
    mime_type = $6,
    email_id = $7
WHERE
    id = $1
RETURNING
    *;

-- name: DeleteAttachment :exec
DELETE FROM attachments
WHERE
    id = $1;