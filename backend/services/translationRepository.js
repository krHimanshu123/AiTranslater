const db = require('../config/database');

const baseSelect = `
  SELECT
    id,
    sourceText,
    translatedText,
    sourceLang,
    targetLang,
    isFavorite,
    createdAt
  FROM translations
`;

const normalizeRow = (row) => ({
  ...row,
  isFavorite: Boolean(row.isFavorite)
});

const insertTranslationStatement = db.prepare(`
  INSERT INTO translations (
    sourceText,
    translatedText,
    sourceLang,
    targetLang,
    isFavorite
  ) VALUES (
    @sourceText,
    @translatedText,
    @sourceLang,
    @targetLang,
    0
  )
`);

const getByIdStatement = db.prepare(`${baseSelect} WHERE id = ?`);
const getAllStatement = db.prepare(`${baseSelect} ORDER BY datetime(createdAt) DESC, id DESC`);
const deleteStatement = db.prepare(`DELETE FROM translations WHERE id = ?`);
const toggleFavoriteStatement = db.prepare(`
  UPDATE translations
  SET isFavorite = CASE WHEN isFavorite = 1 THEN 0 ELSE 1 END
  WHERE id = ?
`);

const createTranslation = ({ sourceText, translatedText, sourceLang, targetLang }) => {
  const result = insertTranslationStatement.run({
    sourceText,
    translatedText,
    sourceLang,
    targetLang
  });

  return normalizeRow(getByIdStatement.get(result.lastInsertRowid));
};

const getHistory = () => getAllStatement.all().map(normalizeRow);

const deleteHistoryItem = (id) => {
  const result = deleteStatement.run(id);
  return result.changes > 0;
};

const toggleFavorite = (id) => {
  const result = toggleFavoriteStatement.run(id);

  if (!result.changes) {
    return null;
  }

  return normalizeRow(getByIdStatement.get(id));
};

module.exports = {
  createTranslation,
  deleteHistoryItem,
  getHistory,
  toggleFavorite
};
