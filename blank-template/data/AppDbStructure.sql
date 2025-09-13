-- File Path: /data/AppDbStructure
-- To run for settingup the database

-- Create a table
CREATE TABLE IF NOT EXISTS test (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  age INTEGER NOT NULL DEFAULT 5,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP
);

-- Insert sample data
INSERT INTO test (name, email) VALUES ('Alice', 'alice@example.com');
INSERT INTO test (name, email) VALUES ('Bob', 'bob@example.com');
INSERT INTO test (name, email) VALUES ('Charlie', 'charlie@example.com');