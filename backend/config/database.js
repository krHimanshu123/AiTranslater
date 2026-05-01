const fs = require('fs');
const path = require('path');
const Database = require('better-sqlite3');

const dbFilePath = process.env.SQLITE_PATH
  ? path.resolve(process.env.SQLITE_PATH)
  : path.join(__dirname, '..', 'data', 'translations.db');

fs.mkdirSync(path.dirname(dbFilePath), { recursive: true });

const db = new Database(dbFilePath);

db.pragma('journal_mode = WAL');

// Keep the schema simple and query-friendly for the dashboard UI.
db.exec(`
  CREATE TABLE IF NOT EXISTS translations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    sourceText TEXT NOT NULL,
    translatedText TEXT NOT NULL,
    sourceLang TEXT NOT NULL,
    targetLang TEXT NOT NULL,
    isFavorite INTEGER NOT NULL DEFAULT 0,
    createdAt TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
  );

  CREATE INDEX IF NOT EXISTS idx_translations_created_at
    ON translations (createdAt DESC);
`);

module.exports = db;
