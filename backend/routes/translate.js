const express = require('express');
const { sendError } = require('../lib/http');
const { createTranslation } = require('../services/translationRepository');
const { translate } = require('../services/libreTranslateClient');

const router = express.Router();

router.post('/', async (req, res) => {
  const { text, sourceLang = 'auto', targetLang } = req.body;

  if (!text || !text.trim()) {
    return sendError(res, 400, 'Text is required.', 'VALIDATION_ERROR');
  }

  if (!targetLang) {
    return sendError(res, 400, 'Target language is required.', 'VALIDATION_ERROR');
  }

  try {
    const normalizedText = text.trim();

    const translationResult = await translate({
      text: normalizedText,
      sourceLang,
      targetLang
    });

    const savedTranslation = createTranslation({
      sourceText: normalizedText,
      translatedText: translationResult.translatedText,
      sourceLang: translationResult.detectedLanguage || sourceLang,
      targetLang
    });

    return res.json({
      success: true,
      data: {
        translatedText: translationResult.translatedText,
        detectedLanguage: translationResult.detectedLanguage || sourceLang,
        translation: savedTranslation
      }
    });
  } catch (error) {
    if (error.code === 'ECONNREFUSED' || error.code === 'ENOTFOUND') {
      return sendError(
        res,
        503,
        'LibreTranslate is unavailable. Start the translation service and try again.',
        'LIBRETRANSLATE_UNAVAILABLE'
      );
    }

    if (error.response) {
      return sendError(
        res,
        error.response.status || 502,
        error.response.data?.error || 'Translation service returned an unexpected response.',
        'LIBRETRANSLATE_ERROR'
      );
    }

    return sendError(res, 500, 'Translation failed. Please try again.', 'TRANSLATION_FAILED');
  }
});

module.exports = router;
