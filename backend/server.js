const cors = require('cors');
const express = require('express');
require('dotenv').config();

require('./config/database');

const { sendError } = require('./lib/http');
const historyRoutes = require('./routes/history');
const translateRoutes = require('./routes/translate');
const {
  getServiceStatus,
  getSupportedLanguages,
  libreTranslateBaseUrl
} = require('./services/libreTranslateClient');

const app = express();
const port = Number(process.env.PORT) || 3001;
const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';

app.use(
  cors({
    origin: [frontendUrl, 'http://127.0.0.1:5173'],
    credentials: true
  })
);

app.use(express.json({ limit: '2mb' }));
app.use(express.urlencoded({ extended: true }));

app.get('/api/health', async (req, res) => {
  try {
    const serviceStatus = await getServiceStatus();

    return res.json({
      success: true,
      data: {
        status: 'ok',
        libreTranslateUrl: libreTranslateBaseUrl,
        ...serviceStatus
      }
    });
  } catch (error) {
    return sendError(
      res,
      503,
      'API is online, but LibreTranslate is unavailable.',
      'LIBRETRANSLATE_UNAVAILABLE',
      {
        libreTranslateUrl: libreTranslateBaseUrl,
        reason: error.message
      }
    );
  }
});

app.get('/health', async (req, res) => {
  try {
    const serviceStatus = await getServiceStatus();

    return res.json({
      status: 'ok',
      ...serviceStatus
    });
  } catch (error) {
    return res.status(503).json({
      status: 'degraded',
      libretranslate: 'disconnected'
    });
  }
});

app.get('/api/languages', async (req, res) => {
  try {
    const languages = await getSupportedLanguages();

    return res.json({
      success: true,
      data: languages
    });
  } catch (error) {
    return sendError(
      res,
      503,
      'Unable to load supported languages from LibreTranslate.',
      'LIBRETRANSLATE_UNAVAILABLE',
      {
        libreTranslateUrl: libreTranslateBaseUrl,
        reason: error.message
      }
    );
  }
});

app.use('/api/translate', translateRoutes);
app.use('/api', historyRoutes);

app.use((req, res) => {
  return sendError(res, 404, `Route ${req.originalUrl} was not found.`, 'NOT_FOUND');
});

app.use((error, req, res, next) => {
  console.error('Unhandled error:', error);
  return sendError(res, 500, 'Internal server error.', 'INTERNAL_SERVER_ERROR');
});

app.listen(port, () => {
  console.log(`API listening on http://localhost:${port}`);
  console.log(`Health check available at http://localhost:${port}/api/health`);
});
