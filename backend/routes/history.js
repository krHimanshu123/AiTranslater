const express = require('express');
const { sendError } = require('../lib/http');
const {
  deleteHistoryItem,
  getHistory,
  toggleFavorite
} = require('../services/translationRepository');

const router = express.Router();

router.get('/history', (req, res) => {
  return res.json({
    success: true,
    data: getHistory()
  });
});

router.post('/favorite/:id', (req, res) => {
  const id = Number(req.params.id);

  if (Number.isNaN(id)) {
    return sendError(res, 400, 'A valid translation id is required.', 'VALIDATION_ERROR');
  }

  const updated = toggleFavorite(id);

  if (!updated) {
    return sendError(res, 404, 'Translation not found.', 'NOT_FOUND');
  }

  return res.json({
    success: true,
    data: updated
  });
});

router.delete('/history/:id', (req, res) => {
  const id = Number(req.params.id);

  if (Number.isNaN(id)) {
    return sendError(res, 400, 'A valid translation id is required.', 'VALIDATION_ERROR');
  }

  const deleted = deleteHistoryItem(id);

  if (!deleted) {
    return sendError(res, 404, 'Translation not found.', 'NOT_FOUND');
  }

  return res.json({
    success: true,
    data: { id }
  });
});

module.exports = router;
