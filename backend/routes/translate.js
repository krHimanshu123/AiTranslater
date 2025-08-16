const express = require('express');
const router = express.Router();
const Translation = require('../models/Translation');
const axios = require('axios');

router.post('/', async (req, res) => {
  const { text, sourceLang, targetLang } = req.body;


  
  try {
    const response = await axios.post('http://127.0.0.1:5000/translate', {
      q: text,
      source: sourceLang === 'auto' ? 'auto' : sourceLang,
      target: targetLang,
      format: "text",
      api_key: "15432h23i78"
    });

    const translatedText = response.data.translatedText;
    const detectedLanguage =
      typeof response.data.detectedSourceLanguage === 'object'
        ? response.data.detectedSourceLanguage.language
        : response.data.detectedSourceLanguage || sourceLang;

    const translation = new Translation({
      sourceText: text,
      translatedText,
      sourceLang: detectedLanguage,
      targetLang
    });

    
    
    await translation.save();
    res.json({ translatedText, detectedLanguage });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Translation failed" });
  }
});

module.exports = router;
