const mongoose = require('mongoose');

const TranslationSchema = new mongoose.Schema({
  sourceText: String,
  translatedText: String,
  sourceLang: String,
  targetLang: String,
  timestamp: { type: Date, default: Date.now }
});


module.exports = mongoose.model('Translation', TranslationSchema);

