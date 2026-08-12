const express = require('express');
const router = express.Router();

// Import middleware langsung (tanpa kurung kurawal)
const validateChatInput = require('../middlewares/validateChatInput.middleware');

// Import controller (sebagai object yang berisi fungsi chat dan getHistory)
const { chat, getHistory } = require('../controllers/chat.controller');

// 1. Endpoint Kirim Pesan ke AI + Simpan Riwayat (POST)
router.post('/', validateChatInput, chat);

// 2. Endpoint Ambil Riwayat Percakapan User (GET)
router.get('/history/:userId', getHistory);

module.exports = router;