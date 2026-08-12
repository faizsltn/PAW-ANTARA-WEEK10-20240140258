const express = require('express');
const router = express.Router();
const validateChatInput = require('../middlewares/validateChatInput.middleware');
const { chat, getHistory } = require('../controllers/chat.controller');

// 1. Endpoint Kirim Pesan ke AI + Simpan Riwayat (POST)
// Path: POST /api/chat/ (atau menyesuaikan prefix route di app.js)
router.post('/', validateChatInput, chat);

// 2. Endpoint Ambil Riwayat Percakapan User (GET)
// Path: GET /api/chat/history/:userId
router.get('/history/:userId', getHistory);

module.exports = router;