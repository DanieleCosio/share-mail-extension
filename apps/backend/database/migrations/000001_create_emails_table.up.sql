CREATE TABLE IF NOT EXISTS
    emails (
        id SERIAL PRIMARY KEY,
        owner_address VARCHAR(255) NOT NULL,
        email_subject VARCHAR(255) NOT NULL,
        email_html TEXT NOT NULL,
        email_hash VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );