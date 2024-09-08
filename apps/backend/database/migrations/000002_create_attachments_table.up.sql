CREATE TABLE IF NOT EXISTS
    attachments (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        attachment_url TEXT NOT NULL,
        preview_url TEXT,
        size VARCHAR(255) NOT NULL,
        mime_type VARCHAR(255) NOT NULL,
        email_id INTEGER NOT NULL,
        FOREIGN KEY (email_id) REFERENCES emails (id) ON DELETE CASCADE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );