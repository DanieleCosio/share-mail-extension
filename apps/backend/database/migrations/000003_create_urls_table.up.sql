CREATE TABLE IF NOT EXISTS
    urls (
        id SERIAL PRIMARY KEY,
        path VARCHAR(255) UNIQUE NOT NULL,
        email_id INTEGER UNIQUE,
        FOREIGN KEY (email_id) REFERENCES emails (id),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );