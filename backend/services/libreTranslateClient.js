const axios = require('axios');

const libreTranslateBaseUrl = process.env.LIBRETRANSLATE_URL || 'http://127.0.0.1:5000';

const translate = async ({ text, sourceLang, targetLang }) => {
  const response = await axios.post(
    `${libreTranslateBaseUrl}/translate`,
    {
      q: text,
      source: sourceLang === 'auto' ? 'auto' : sourceLang,
      target: targetLang,
      format: 'text'
    },
    {
      timeout: 30000,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
    }
  );

  return {
    translatedText: response.data.translatedText,
    detectedLanguage:
      typeof response.data.detectedSourceLanguage === 'object'
        ? response.data.detectedSourceLanguage.language
        : response.data.detectedSourceLanguage || sourceLang
  };
};

const getServiceStatus = async () => {
  const response = await axios.get(`${libreTranslateBaseUrl}/languages`, {
    timeout: 5000
  });

  return {
    libretranslate: 'connected',
    languageCount: Array.isArray(response.data) ? response.data.length : 0
  };
};

const getSupportedLanguages = async () => {
  const response = await axios.get(`${libreTranslateBaseUrl}/languages`, {
    timeout: 5000,
    headers: {
      Accept: 'application/json'
    }
  });

  return Array.isArray(response.data) ? response.data : [];
};

module.exports = {
  getSupportedLanguages,
  getServiceStatus,
  libreTranslateBaseUrl,
  translate
};
